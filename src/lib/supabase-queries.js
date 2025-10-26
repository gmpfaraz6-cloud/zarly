import { supabase } from './supabase';

// ==================== STORE OPERATIONS ====================

export const getStore = async (userId) => {
  const { data, error } = await supabase
    .from('stores')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

export const createStore = async (userId, storeData) => {
  const { data, error } = await supabase
    .from('stores')
    .insert([{ user_id: userId, ...storeData }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateStore = async (storeId, updates) => {
  const { data, error } = await supabase
    .from('stores')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', storeId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// ==================== PRODUCT OPERATIONS ====================

export const getProducts = async (storeId, filters = {}) => {
  let query = supabase
    .from('products')
    .select('*, product_images(id, url, alt_text, position), product_variants(id, title, price, inventory_quantity, sku)')
    .eq('store_id', storeId)
    .order('created_at', { ascending: false });
  
  if (filters.status) {
    query = query.eq('status', filters.status);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data;
};

export const getProduct = async (productId) => {
  const { data, error } = await supabase
    .from('products')
    .select('*, product_images(*), product_variants(*)')
    .eq('id', productId)
    .single();
  
  if (error) throw error;
  return data;
};

export const createProduct = async (storeId, productData) => {
  const { data, error } = await supabase
    .from('products')
    .insert([{ store_id: storeId, ...productData }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateProduct = async (productId, updates) => {
  const { data, error } = await supabase
    .from('products')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', productId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteProduct = async (productId) => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId);
  
  if (error) throw error;
};

export const bulkUpdateProducts = async (productIds, updates) => {
  const { data, error } = await supabase
    .from('products')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .in('id', productIds)
    .select();
  
  if (error) throw error;
  return data;
};

// ==================== PRODUCT VARIANT OPERATIONS ====================

export const createVariant = async (productId, variantData) => {
  const { data, error } = await supabase
    .from('product_variants')
    .insert([{ product_id: productId, ...variantData }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateVariant = async (variantId, updates) => {
  const { data, error } = await supabase
    .from('product_variants')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', variantId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteVariant = async (variantId) => {
  const { error } = await supabase
    .from('product_variants')
    .delete()
    .eq('id', variantId);
  
  if (error) throw error;
};

// ==================== PRODUCT IMAGE OPERATIONS ====================

export const addProductImage = async (productId, imageUrl, altText, position) => {
  const { data, error } = await supabase
    .from('product_images')
    .insert([{ product_id: productId, url: imageUrl, alt_text: altText, position }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteProductImage = async (imageId) => {
  const { error } = await supabase
    .from('product_images')
    .delete()
    .eq('id', imageId);
  
  if (error) throw error;
};

// ==================== COLLECTION OPERATIONS ====================

export const getCollections = async (storeId) => {
  const { data, error } = await supabase
    .from('collections')
    .select('*, collection_products(product_id, products(id, title, product_images(url)))')
    .eq('store_id', storeId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const getCollection = async (collectionId) => {
  const { data, error } = await supabase
    .from('collections')
    .select('*, collection_products(product_id, products(*))')
    .eq('id', collectionId)
    .single();
  
  if (error) throw error;
  return data;
};

export const createCollection = async (storeId, collectionData) => {
  const { data, error } = await supabase
    .from('collections')
    .insert([{ store_id: storeId, ...collectionData }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateCollection = async (collectionId, updates) => {
  const { data, error } = await supabase
    .from('collections')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', collectionId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteCollection = async (collectionId) => {
  const { error } = await supabase
    .from('collections')
    .delete()
    .eq('id', collectionId);
  
  if (error) throw error;
};

export const addProductToCollection = async (collectionId, productId, position = 0) => {
  const { data, error } = await supabase
    .from('collection_products')
    .insert([{ collection_id: collectionId, product_id: productId, position }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const removeProductFromCollection = async (collectionId, productId) => {
  const { error } = await supabase
    .from('collection_products')
    .delete()
    .eq('collection_id', collectionId)
    .eq('product_id', productId);
  
  if (error) throw error;
};

// ==================== ORDER OPERATIONS ====================

export const getOrders = async (storeId, filters = {}) => {
  let query = supabase
    .from('orders')
    .select('*, customers(first_name, last_name, email), order_items(*)')
    .eq('store_id', storeId)
    .order('created_at', { ascending: false });
  
  if (filters.financial_status) {
    query = query.eq('financial_status', filters.financial_status);
  }
  
  if (filters.fulfillment_status) {
    query = query.eq('fulfillment_status', filters.fulfillment_status);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data;
};

export const getOrder = async (orderId) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*, customers(*), order_items(*, products(title), product_variants(title))')
    .eq('id', orderId)
    .single();
  
  if (error) throw error;
  return data;
};

export const createOrder = async (storeId, orderData) => {
  const { data, error } = await supabase
    .from('orders')
    .insert([{ store_id: storeId, ...orderData }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateOrder = async (orderId, updates) => {
  const { data, error } = await supabase
    .from('orders')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', orderId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const createOrderItem = async (orderId, itemData) => {
  const { data, error } = await supabase
    .from('order_items')
    .insert([{ order_id: orderId, ...itemData }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// ==================== CUSTOMER OPERATIONS ====================

export const getCustomers = async (storeId) => {
  const { data, error } = await supabase
    .from('customers')
    .select('*, customer_addresses(*)')
    .eq('store_id', storeId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const getCustomer = async (customerId) => {
  const { data, error } = await supabase
    .from('customers')
    .select('*, customer_addresses(*), orders(*)')
    .eq('id', customerId)
    .single();
  
  if (error) throw error;
  return data;
};

export const createCustomer = async (storeId, customerData) => {
  const { data, error } = await supabase
    .from('customers')
    .insert([{ store_id: storeId, ...customerData }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateCustomer = async (customerId, updates) => {
  const { data, error } = await supabase
    .from('customers')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', customerId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteCustomer = async (customerId) => {
  const { error } = await supabase
    .from('customers')
    .delete()
    .eq('id', customerId);
  
  if (error) throw error;
};

export const addCustomerAddress = async (customerId, addressData) => {
  const { data, error } = await supabase
    .from('customer_addresses')
    .insert([{ customer_id: customerId, ...addressData }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// ==================== INVENTORY OPERATIONS ====================

export const getInventoryLocations = async (storeId) => {
  const { data, error } = await supabase
    .from('inventory_locations')
    .select('*')
    .eq('store_id', storeId);
  
  if (error) throw error;
  return data;
};

export const getInventoryItems = async (locationId) => {
  const { data, error } = await supabase
    .from('inventory_items')
    .select('*, product_variants(*, products(title))')
    .eq('location_id', locationId);
  
  if (error) throw error;
  return data;
};

export const updateInventory = async (variantId, locationId, available) => {
  const { data, error } = await supabase
    .from('inventory_items')
    .upsert([{ variant_id: variantId, location_id: locationId, available, updated_at: new Date().toISOString() }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// ==================== DISCOUNT OPERATIONS ====================

export const getDiscounts = async (storeId) => {
  const { data, error } = await supabase
    .from('discounts')
    .select('*')
    .eq('store_id', storeId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const createDiscount = async (storeId, discountData) => {
  const { data, error } = await supabase
    .from('discounts')
    .insert([{ store_id: storeId, ...discountData }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateDiscount = async (discountId, updates) => {
  const { data, error } = await supabase
    .from('discounts')
    .update(updates)
    .eq('id', discountId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteDiscount = async (discountId) => {
  const { error } = await supabase
    .from('discounts')
    .delete()
    .eq('id', discountId);
  
  if (error) throw error;
};

// ==================== GIFT CARD OPERATIONS ====================

export const getGiftCards = async (storeId) => {
  const { data, error } = await supabase
    .from('gift_cards')
    .select('*, customers(first_name, last_name, email)')
    .eq('store_id', storeId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const createGiftCard = async (storeId, giftCardData) => {
  const { data, error } = await supabase
    .from('gift_cards')
    .insert([{ store_id: storeId, ...giftCardData }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateGiftCard = async (giftCardId, updates) => {
  const { data, error } = await supabase
    .from('gift_cards')
    .update(updates)
    .eq('id', giftCardId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// ==================== BLOG OPERATIONS ====================

export const getBlogPosts = async (storeId) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('store_id', storeId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const createBlogPost = async (storeId, postData) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert([{ store_id: storeId, ...postData }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateBlogPost = async (postId, updates) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', postId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteBlogPost = async (postId) => {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', postId);
  
  if (error) throw error;
};

// ==================== MENU OPERATIONS ====================

export const getMenus = async (storeId) => {
  const { data, error } = await supabase
    .from('menus')
    .select('*, menu_items(*)')
    .eq('store_id', storeId);
  
  if (error) throw error;
  return data;
};

export const createMenu = async (storeId, menuData) => {
  const { data, error } = await supabase
    .from('menus')
    .insert([{ store_id: storeId, ...menuData }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const addMenuItem = async (menuId, itemData) => {
  const { data, error } = await supabase
    .from('menu_items')
    .insert([{ menu_id: menuId, ...itemData }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// ==================== PAGE OPERATIONS ====================

export const getPages = async (storeId) => {
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('store_id', storeId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const createPage = async (storeId, pageData) => {
  const { data, error } = await supabase
    .from('pages')
    .insert([{ store_id: storeId, ...pageData }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updatePage = async (pageId, updates) => {
  const { data, error } = await supabase
    .from('pages')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', pageId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deletePage = async (pageId) => {
  const { error } = await supabase
    .from('pages')
    .delete()
    .eq('id', pageId);
  
  if (error) throw error;
};

// ==================== METAOBJECT OPERATIONS ====================

export const getMetaobjects = async (storeId, type = null) => {
  let query = supabase
    .from('metaobjects')
    .select('*')
    .eq('store_id', storeId);
  
  if (type) {
    query = query.eq('type', type);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data;
};

export const createMetaobject = async (storeId, metaobjectData) => {
  const { data, error } = await supabase
    .from('metaobjects')
    .insert([{ store_id: storeId, ...metaobjectData }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// ==================== CART OPERATIONS ====================

export const getCartItems = async (storeId, sessionId) => {
  const { data, error } = await supabase
    .from('cart_items')
    .select('*, products(*, product_images(url)), product_variants(*)')
    .eq('store_id', storeId)
    .eq('session_id', sessionId);
  
  if (error) throw error;
  return data;
};

export const addToCart = async (storeId, sessionId, productId, variantId, quantity) => {
  // Check if item already exists
  const { data: existing } = await supabase
    .from('cart_items')
    .select('*')
    .eq('store_id', storeId)
    .eq('session_id', sessionId)
    .eq('product_id', productId)
    .eq('variant_id', variantId)
    .single();
  
  if (existing) {
    // Update quantity
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity: existing.quantity + quantity, updated_at: new Date().toISOString() })
      .eq('id', existing.id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } else {
    // Insert new
    const { data, error } = await supabase
      .from('cart_items')
      .insert([{ store_id: storeId, session_id: sessionId, product_id: productId, variant_id: variantId, quantity }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

export const updateCartItem = async (cartItemId, quantity) => {
  const { data, error } = await supabase
    .from('cart_items')
    .update({ quantity, updated_at: new Date().toISOString() })
    .eq('id', cartItemId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const removeFromCart = async (cartItemId) => {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('id', cartItemId);
  
  if (error) throw error;
};

export const clearCart = async (storeId, sessionId) => {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('store_id', storeId)
    .eq('session_id', sessionId);
  
  if (error) throw error;
};

// ==================== DOMAIN OPERATIONS ====================

export const getDomains = async (storeId) => {
  const { data, error } = await supabase
    .from('domains')
    .select('*')
    .eq('store_id', storeId);
  
  if (error) throw error;
  return data;
};

export const addDomain = async (storeId, domain) => {
  const { data, error } = await supabase
    .from('domains')
    .insert([{ store_id: storeId, domain }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// ==================== STOREFRONT PUBLIC QUERIES ====================

export const getPublicProducts = async (storeId, filters = {}) => {
  let query = supabase
    .from('products')
    .select('*, product_images(*), product_variants(*)')
    .eq('store_id', storeId)
    .eq('status', 'active')
    .order('created_at', { ascending: false });
  
  if (filters.collection_id) {
    query = query.in('id', 
      supabase.from('collection_products').select('product_id').eq('collection_id', filters.collection_id)
    );
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data;
};

export const getPublicCollections = async (storeId) => {
  const { data, error } = await supabase
    .from('collections')
    .select('*, collection_products(product_id, products(id, title, price, product_images(url)))')
    .eq('store_id', storeId)
    .eq('published', true);
  
  if (error) throw error;
  return data;
};

