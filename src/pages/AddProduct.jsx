import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createProduct, getStore, uploadProductImage } from '../lib/supabase-queries';
import { supabase } from '../lib/supabase';
import './AddProduct.css';

function AddProduct({ onClose }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '0.00',
    status: 'active',
    type: '',
    vendor: '',
    collections: '',
    tags: '',
    inventoryTracked: true,
    quantity: '0',
    physicalProduct: true,
    weight: '0.0'
  });
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleBack = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const storeData = await getStore(user.id);
      if (!storeData) {
        alert('Store not found');
        return;
      }

      const uploadedImages = [];
      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${storeData.id}/${fileName}`;

        const { data, error } = await supabase.storage
          .from('product-images')
          .upload(filePath, file);

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);

        uploadedImages.push({
          url: publicUrl,
          path: filePath,
          alt: file.name
        });
      }

      setImages([...images, ...uploadedImages]);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = async (index) => {
    const imageToRemove = images[index];
    
    try {
      if (imageToRemove.path) {
        await supabase.storage
          .from('product-images')
          .remove([imageToRemove.path]);
      }
      setImages(images.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error removing image:', error);
      alert('Failed to remove image');
    }
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      alert('Please enter a product title');
      return;
    }

    setSaving(true);
    try {
      const storeData = await getStore(user.id);
      if (!storeData) {
        alert('Store not found');
        return;
      }

      const productData = {
        store_id: storeData.id,
        title: formData.title,
        description: formData.description,
        product_type: formData.type,
        vendor: formData.vendor,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        status: formData.status.toLowerCase(),
        price: parseFloat(formData.price) || 0,
        compare_at_price: null,
        inventory_quantity: parseInt(formData.quantity) || 0,
        sku: null,
        barcode: null,
        weight: parseFloat(formData.weight) || 0,
        weight_unit: 'kg',
        requires_shipping: formData.physicalProduct,
        track_inventory: formData.inventoryTracked
      };

      const newProduct = await createProduct(productData, images);
      
      alert(`Product "${formData.title}" saved successfully!`);
      if (onClose) {
        onClose();
      } else {
        navigate(-1);
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel? All changes will be lost.')) {
      // Clean up uploaded images
      images.forEach(async (image) => {
        if (image.path) {
          await supabase.storage
            .from('product-images')
            .remove([image.path]);
        }
      });
      handleBack();
    }
  };

  return (
    <div className="add-product-page">
      <div className="add-product-content">
        <div className="form-layout">
          {/* Left Column */}
          <div className="form-main">
            {/* Title */}
            <div className="form-card">
              <div className="form-group">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Short sleeve t-shirt"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>

              {/* Description */}
              <div className="form-group">
                <label className="form-label">Description</label>
                <div className="editor-toolbar">
                  <button className="editor-btn" title="Format">⚙</button>
                  <select className="editor-select">
                    <option>Paragraph</option>
                  </select>
                  <button className="editor-btn" title="Bold"><strong>B</strong></button>
                  <button className="editor-btn" title="Italic"><em>I</em></button>
                  <button className="editor-btn" title="Underline"><u>U</u></button>
                  <button className="editor-btn" title="Text color">A</button>
                  <button className="editor-btn" title="Align">≡</button>
                  <button className="editor-btn" title="Link">🔗</button>
                  <button className="editor-btn" title="Image">🖼️</button>
                  <button className="editor-btn" title="Emoji">😀</button>
                  <button className="editor-btn" title="More">...</button>
                  <button className="editor-btn" title="Code">&lt;/&gt;</button>
                </div>
                <textarea
                  className="form-textarea"
                  rows="6"
                  placeholder="Enter product description..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
            </div>

            {/* Media */}
            <div className="form-card">
              <label className="form-label">Media</label>
              <div className="media-upload">
                {images.length > 0 && (
                  <div className="image-preview-grid">
                    {images.map((image, index) => (
                      <div key={index} className="image-preview">
                        <img src={image.url} alt={image.alt} />
                        <button 
                          className="remove-image-btn"
                          onClick={() => handleRemoveImage(index)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="upload-area">
                  <input
                    type="file"
                    id="image-upload"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                    disabled={uploading}
                  />
                  <label htmlFor="image-upload" className="upload-btn">
                    {uploading ? 'Uploading...' : 'Upload new'}
                  </label>
                  <p className="upload-hint">Accepts images (JPG, PNG, GIF)</p>
                </div>
              </div>
            </div>

            {/* Category */}
            <div className="form-card">
              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="">Choose a product category</option>
                  <option value="apparel">Apparel & Accessories</option>
                  <option value="electronics">Electronics</option>
                  <option value="home">Home & Garden</option>
                </select>
                <p className="form-hint">Determines tax rates and adds metafields to improve search, filters, and cross-channel sales</p>
              </div>
            </div>

            {/* Price */}
            <div className="form-card">
              <h3 className="card-title">Price</h3>
              <div className="form-group">
                <input
                  type="text"
                  className="form-input"
                  placeholder="SAR 0.00"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                />
              </div>
              <div className="price-options">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Compare at</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Unit price</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Charge tax</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" defaultChecked />
                  <span>Yes</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Cost per item</span>
                </label>
              </div>
            </div>

            {/* Inventory */}
            <div className="form-card">
              <div className="card-header">
                <h3 className="card-title">Inventory</h3>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={formData.inventoryTracked}
                    onChange={(e) => setFormData({...formData, inventoryTracked: e.target.checked})}
                  />
                  <span className="toggle-slider"></span>
                  <span className="toggle-label">Inventory tracked</span>
                </label>
              </div>
              {formData.inventoryTracked && (
                <div className="inventory-table">
                  <div className="table-header">
                    <span>Quantity</span>
                    <span>Quantity</span>
                  </div>
                  <div className="table-row">
                    <span>Khairpur Mir's</span>
                    <input
                      type="number"
                      className="form-input small"
                      value={formData.quantity}
                      onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                    />
                  </div>
                </div>
              )}
              <div className="form-tabs">
                <button className="tab-btn active">SKU</button>
                <button className="tab-btn">Barcode</button>
                <button className="tab-btn">Sell when out of stock</button>
                <button className="tab-btn">Off</button>
              </div>
            </div>

            {/* Shipping */}
            <div className="form-card">
              <div className="card-header">
                <h3 className="card-title">Shipping</h3>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={formData.physicalProduct}
                    onChange={(e) => setFormData({...formData, physicalProduct: e.target.checked})}
                  />
                  <span className="toggle-slider"></span>
                  <span className="toggle-label">Physical product</span>
                </label>
              </div>
              {formData.physicalProduct && (
                <>
                  <div className="form-row">
                    <div className="form-group flex-1">
                      <label className="form-label-small">
                        Package
                        <span className="info-icon" title="Information">ⓘ</span>
                      </label>
                      <select className="form-select">
                        <option>📦 Store default • Sample box - 22 × 13.7 × 4.2 cm, 0...</option>
                      </select>
                    </div>
                    <div className="form-group" style={{ width: '200px' }}>
                      <label className="form-label-small">Product weight</label>
                      <div className="input-group">
                        <input
                          type="number"
                          className="form-input"
                          value={formData.weight}
                          onChange={(e) => setFormData({...formData, weight: e.target.value})}
                        />
                        <select className="input-suffix">
                          <option>kg</option>
                          <option>g</option>
                          <option>lb</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="form-tabs">
                    <button className="tab-btn active">Country of origin</button>
                    <button className="tab-btn">HS Code</button>
                  </div>
                </>
              )}
            </div>

            {/* Variants */}
            <div className="form-card">
              <h3 className="card-title">Variants</h3>
              <button className="add-variant-btn">
                <span className="plus-icon">+</span>
                <span>Add options like size or color</span>
              </button>
            </div>

            {/* Search Engine Listing */}
            <div className="form-card">
              <div className="card-header-flex">
                <h3 className="card-title">Search engine listing</h3>
                <button className="edit-btn">✎</button>
              </div>
              <p className="form-hint">Add a title and description to see how this product might appear in a search engine listing</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="form-sidebar">
            {/* Status */}
            <div className="form-card">
              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option>Active</option>
                  <option>Draft</option>
                  <option>Archived</option>
                </select>
              </div>
            </div>

            {/* Publishing */}
            <div className="form-card">
              <div className="card-header-flex">
                <label className="form-label">Publishing</label>
                <button className="icon-btn-small">⚙</button>
              </div>
              <div className="publishing-channels">
                <div className="channel-item">
                  <span>Online Store</span>
                  <span className="channel-icon">🌐</span>
                </div>
                <div className="channel-item">
                  <span>Point of Sale</span>
                </div>
              </div>
            </div>

            {/* Product Organization */}
            <div className="form-card">
              <div className="card-header-flex">
                <h3 className="card-title">Product organization</h3>
                <span className="info-icon" title="Information">ⓘ</span>
              </div>
              
              <div className="form-group">
                <label className="form-label-small">Type</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label className="form-label-small">Vendor</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.vendor}
                  onChange={(e) => setFormData({...formData, vendor: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label className="form-label-small">Collections</label>
                <div className="search-input">
                  <span className="search-icon">🔍</span>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.collections}
                    onChange={(e) => setFormData({...formData, collections: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label-small">Tags</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                />
              </div>
            </div>

            {/* Theme Template */}
            <div className="form-card">
              <div className="form-group">
                <label className="form-label">Theme template</label>
                <select className="form-select">
                  <option>Default product</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="add-product-footer">
        <button className="btn-secondary" onClick={handleBack}>Cancel</button>
        <button className="btn-primary">Save</button>
      </div>
    </div>
  );
}

export default AddProduct;

