import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Store, DollarSign, Truck, Mail, Phone, MapPin } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export default function Settings() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    store_name: 'ShopFraz',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
      country: 'United States',
    },
    tax_rate: 0,
    shipping_rates: [] as Array<{ name: string; price: number; estimated_days: number }>,
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('store_settings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setFormData({
          store_name: data.store_name || 'ShopFraz',
          email: data.email || '',
          phone: data.phone || '',
          address: data.address || formData.address,
          tax_rate: data.tax_rate || 0,
          shipping_rates: data.shipping_rates || [],
        });
      }
    } catch (error: any) {
      console.error('Failed to load settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    if (field.startsWith('address.')) {
      const addressField = field.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      // Check if settings exist
      const { data: existing } = await supabase
        .from('store_settings')
        .select('id')
        .limit(1)
        .single();

      if (existing) {
        // Update existing
        const { error } = await supabase
          .from('store_settings')
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existing.id);

        if (error) throw error;
      } else {
        // Create new
        const { error } = await supabase
          .from('store_settings')
          .insert([formData]);

        if (error) throw error;
      }

      toast.success('Settings saved successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading settings...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="w-4 h-4 mr-2" />
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <div className="space-y-6">
        {/* Store Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-lg border border-border p-6"
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Store className="w-5 h-5" />
            Store Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Store Name</label>
              <Input
                value={formData.store_name}
                onChange={(e) => handleInputChange('store_name', e.target.value)}
                placeholder="ShopFraz"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="contact@shopfraz.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone
              </label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+1 234 567 8900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Tax Rate (%)
              </label>
              <Input
                type="number"
                step="0.01"
                min="0"
                max="100"
                value={formData.tax_rate}
                onChange={(e) => handleInputChange('tax_rate', parseFloat(e.target.value) || 0)}
                placeholder="0.00"
              />
            </div>
          </div>
        </motion.div>

        {/* Store Address */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-lg border border-border p-6"
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Store Address
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Street Address</label>
              <Input
                value={formData.address.street}
                onChange={(e) => handleInputChange('address.street', e.target.value)}
                placeholder="123 Main St"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">City</label>
              <Input
                value={formData.address.city}
                onChange={(e) => handleInputChange('address.city', e.target.value)}
                placeholder="New York"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">State</label>
              <Input
                value={formData.address.state}
                onChange={(e) => handleInputChange('address.state', e.target.value)}
                placeholder="NY"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">ZIP Code</label>
              <Input
                value={formData.address.zip}
                onChange={(e) => handleInputChange('address.zip', e.target.value)}
                placeholder="10001"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Country</label>
              <Input
                value={formData.address.country}
                onChange={(e) => handleInputChange('address.country', e.target.value)}
                placeholder="United States"
              />
            </div>
          </div>
        </motion.div>

        {/* Shipping Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-lg border border-border p-6"
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Truck className="w-5 h-5" />
            Shipping
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Currently using Cash on Delivery (COD) with free shipping. Shipping rates can be configured here for future payment methods.
          </p>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium">Current Payment Method: Cash on Delivery (COD)</p>
            <p className="text-xs text-muted-foreground mt-1">Free shipping included</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
