import { useState } from 'react';
import './Settings.css';

function Settings() {
  const [activeSection, setActiveSection] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showConnectDomainModal, setShowConnectDomainModal] = useState(false);
  const [domainInput, setDomainInput] = useState('');
  const [paymentCapture, setPaymentCapture] = useState('automatic-checkout');
  const [contactMethod, setContactMethod] = useState('phone-email');
  const [fullNameOption, setFullNameOption] = useState('first-last');
  const [companyNameOption, setCompanyNameOption] = useState('dont-include');
  const [viewingDomain, setViewingDomain] = useState(null);
  const [domains, setDomains] = useState([
    {
      id: '1',
      name: 'zarly.store',
      isPrimary: true,
      status: 'connected',
      type: 'online-store',
      addedDate: 'Oct 26, 2025',
      dnsRecords: [
        { type: 'A', name: '@', current: '23.227.38.65', required: '23.227.38.65' },
        { type: 'CNAME', name: 'www', current: 'shops.myshopify.com', required: 'shops.myshopify.com' }
      ]
    },
    {
      id: '2',
      name: 'www.zarly.store',
      isPrimary: false,
      status: 'connected',
      type: 'online-store',
      addedDate: 'Oct 26, 2025',
      dnsRecords: [
        { type: 'CNAME', name: 'www', current: 'shops.myshopify.com', required: 'shops.myshopify.com' }
      ]
    },
    {
      id: '4',
      name: 'account.zarly.store',
      isPrimary: true,
      status: 'connected',
      type: 'customer-account',
      addedDate: 'Oct 26, 2025',
      dnsRecords: [
        { type: 'CNAME', name: 'account', current: 'shops.myshopify.com', required: 'shops.myshopify.com' }
      ]
    }
  ]);
  const [formData, setFormData] = useState({
    storeName: 'ZARLY',
    email: 'farazahmedph001@gmail.com',
    phone: '03113222786',
    billingAddress: "Khairpur Mir's, Khairpur 66020, Pakistan",
    currency: 'SAR',
    backupRegion: 'Saudi Arabia',
    unitSystem: 'Metric system',
    defaultWeight: 'Kilogram (kg)',
    timeZone: '(GMT+03:00) Riyadh',
    orderPrefix: '#',
    orderSuffix: ''
  });

  const settingsSections = [
    { id: 'general', label: 'General', icon: '⚙️' },
    { id: 'payments', label: 'Payments', icon: '💰' },
    { id: 'checkout', label: 'Checkout', icon: '🛒' },
    { id: 'domains', label: 'Domains', icon: '🌐' },
    { id: 'events', label: 'Customer events', icon: '🎯' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'metafields', label: 'Metafields and metaobjects', icon: '📝' },
    { id: 'languages', label: 'Languages', icon: '🌍' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddDomain = () => {
    if (!domainInput.trim()) return;
    
    const newDomain = {
      id: Date.now().toString(),
      name: domainInput.trim(),
      isPrimary: false,
      status: 'needs-setup',
      type: 'online-store',
      addedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      dnsRecords: [
        { type: 'A', name: '@', current: '0.0.0.0', required: '23.227.38.65' },
        { type: 'CNAME', name: 'www', current: 'Not configured', required: 'shops.myshopify.com' }
      ]
    };
    
    setDomains(prev => [...prev, newDomain]);
    setDomainInput('');
    setShowConnectDomainModal(false);
    
    // Automatically open the domain view
    setTimeout(() => {
      setViewingDomain(newDomain);
    }, 100);
  };

  const handleDeleteDomain = (domainId) => {
    if (confirm('Are you sure you want to delete this domain?')) {
      setDomains(prev => prev.filter(d => d.id !== domainId));
      if (viewingDomain?.id === domainId) {
        setViewingDomain(null);
      }
    }
  };

  const handleMakePrimary = (domainId, type) => {
    setDomains(prev => prev.map(d => ({
      ...d,
      isPrimary: d.type === type ? d.id === domainId : d.isPrimary
    })));
  };

  const handleUpdateDNS = (domainId) => {
    setDomains(prev => prev.map(d => {
      if (d.id === domainId) {
        return {
          ...d,
          status: 'connected',
          dnsRecords: d.dnsRecords.map(record => ({
            ...record,
            current: record.required
          }))
        };
      }
      return d;
    }));
  };

  const renderGeneralSettings = () => (
    <div className="settings-content">
      <div className="settings-section">
        <h2 className="section-title">Store details</h2>
        
        <div className="store-info-card">
          <div className="store-info-row">
            <div className="store-icon-wrapper">
              <div className="store-icon">
                <span className="store-initial">{formData.storeName.charAt(0)}</span>
              </div>
            </div>
            <div className="store-info-details">
              <div className="store-name">{formData.storeName}</div>
              <div className="store-contact">
                {formData.email} • {formData.phone}
              </div>
            </div>
          </div>
          
          <div className="store-address">
            <div className="address-icon">📍</div>
            <div>
              <div className="address-label">Billing address</div>
              <div className="address-value">{formData.billingAddress}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h2 className="section-title">Store defaults</h2>
        
        <div className="form-card">
          <div className="form-group">
            <label className="form-label">Currency display</label>
            <div className="form-row">
              <div className="form-field">
                <div className="help-text">
                  To manage the currencies customers see, go to <a href="#" className="settings-link">Markets</a>
                </div>
                <div className="display-value-row">
                  <span className="display-value">{formData.currency === 'SAR' ? 'Saudi Riyal (SAR)' : formData.currency}</span>
                  <button className="more-options-btn">⋯</button>
                </div>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Backup Region</label>
            <select 
              className="form-select"
              value={formData.backupRegion}
              onChange={(e) => handleInputChange('backupRegion', e.target.value)}
            >
              <option>Saudi Arabia</option>
              <option>United Arab Emirates</option>
              <option>Pakistan</option>
              <option>United States</option>
              <option>United Kingdom</option>
            </select>
            <div className="help-text">
              Determines settings for customers outside of your markets
            </div>
          </div>

          <div className="form-row-double">
            <div className="form-group">
              <label className="form-label">Unit system</label>
              <select 
                className="form-select"
                value={formData.unitSystem}
                onChange={(e) => handleInputChange('unitSystem', e.target.value)}
              >
                <option>Metric system</option>
                <option>Imperial system</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Default weight unit</label>
              <select 
                className="form-select"
                value={formData.defaultWeight}
                onChange={(e) => handleInputChange('defaultWeight', e.target.value)}
              >
                <option>Kilogram (kg)</option>
                <option>Gram (g)</option>
                <option>Pound (lb)</option>
                <option>Ounce (oz)</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Time zone</label>
            <select 
              className="form-select"
              value={formData.timeZone}
              onChange={(e) => handleInputChange('timeZone', e.target.value)}
            >
              <option>(GMT+03:00) Riyadh</option>
              <option>(GMT+04:00) Dubai</option>
              <option>(GMT+05:00) Karachi</option>
              <option>(GMT+00:00) London</option>
              <option>(GMT-05:00) New York</option>
            </select>
            <div className="help-text">
              Sets the time for when orders and analytics are recorded
            </div>
          </div>

          <div className="help-text">
            To change your user level time zone and language visit your <a href="#" className="settings-link">account settings</a>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h2 className="section-title">Order ID</h2>
        <div className="form-card">
          <div className="help-text-block">
            Shown on the order page, customer pages, and customer order notifications to identify order
          </div>
          
          <div className="form-row-double">
            <div className="form-group">
              <label className="form-label">Prefix</label>
              <input 
                type="text" 
                className="form-input"
                value={formData.orderPrefix}
                onChange={(e) => handleInputChange('orderPrefix', e.target.value)}
                placeholder="#"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Suffix</label>
              <input 
                type="text" 
                className="form-input"
                value={formData.orderSuffix}
                onChange={(e) => handleInputChange('orderSuffix', e.target.value)}
                placeholder=""
              />
            </div>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h2 className="section-title">Store contact information</h2>
        <div className="form-card">
          <div className="help-text-block">
            Your customers will see this email on receipts and use it to contact you. 
            This email is used for store notifications and order confirmations.
          </div>
          
          <div className="form-group">
            <label className="form-label">Store contact email</label>
            <input 
              type="email" 
              className="form-input"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Sender email</label>
            <div className="display-value">{formData.email}</div>
            <div className="help-text">
              Used as the "from" address for all emails sent from your store
            </div>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h2 className="section-title">Standards and formats</h2>
        <div className="form-card">
          <div className="help-text-block">
            Used to calculate product prices, shipping weights, and order times
          </div>
          
          <div className="settings-info-row">
            <div className="info-label-col">Time zone</div>
            <div className="info-value-col">{formData.timeZone}</div>
          </div>

          <div className="settings-info-row">
            <div className="info-label-col">Unit system</div>
            <div className="info-value-col">{formData.unitSystem}</div>
          </div>

          <div className="settings-info-row">
            <div className="info-label-col">Default weight unit</div>
            <div className="info-value-col">{formData.defaultWeight}</div>
          </div>
        </div>
      </div>

      <div className="settings-actions">
        <button className="btn-secondary">Cancel</button>
        <button className="btn-primary">Save</button>
      </div>
    </div>
  );

  const renderPaymentsSettings = () => (
    <div className="settings-content">
      <div className="settings-section">
        <h2 className="section-title">Payment providers</h2>
        <div className="form-card">
          <div className="help-text-block">
            Connect your payment provider to start accepting payments from customers. Choose from various payment gateways that work in your region.
          </div>
          <button className="btn-primary" onClick={() => alert('Payment provider setup: Connect Stripe, PayPal, or other payment providers')}>
            Add payment provider
          </button>
        </div>
      </div>

      <div className="settings-section">
        <h2 className="section-title">Supported payment methods</h2>
        <div className="form-card">
          <div className="help-text-block">
            Add payment methods for your customers. Once you connect a payment provider, you can enable credit cards, digital wallets, and other payment options.
          </div>
          {/* Payment methods will appear here after provider setup */}
        </div>
      </div>

      <div className="settings-section">
        <h2 className="section-title">Payment capture method</h2>
        <div className="form-card">
          <div className="help-text-block">
            Payments are authorized when an order is placed. Select how to <a href="#" className="settings-link">capture payments</a>:
          </div>
          
          <div className="radio-group">
            <label className="radio-label">
              <input 
                type="radio" 
                name="payment-capture" 
                value="automatic-checkout"
                checked={paymentCapture === 'automatic-checkout'}
                onChange={(e) => setPaymentCapture(e.target.value)}
              />
              <div className="radio-content">
                <div className="radio-title">Automatically at checkout</div>
                <div className="radio-description">Capture payment when an order is placed</div>
              </div>
            </label>

            <label className="radio-label">
              <input 
                type="radio" 
                name="payment-capture" 
                value="automatic-fulfilled"
                checked={paymentCapture === 'automatic-fulfilled'}
                onChange={(e) => setPaymentCapture(e.target.value)}
              />
              <div className="radio-content">
                <div className="radio-title">Automatically when the entire order is fulfilled</div>
                <div className="radio-description">Authorize payment at checkout and capture once the entire order is fulfilled</div>
              </div>
            </label>

            <label className="radio-label">
              <input 
                type="radio" 
                name="payment-capture" 
                value="manual"
                checked={paymentCapture === 'manual'}
                onChange={(e) => setPaymentCapture(e.target.value)}
              />
              <div className="radio-content">
                <div className="radio-title">Manually</div>
                <div className="radio-description">Authorize payment at checkout and capture manually</div>
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h2 className="section-title">Manual payment methods</h2>
        <div className="form-card">
          <div className="help-text-block">
            Payments made outside your online store. Orders paid manually must be approved before being fulfilled
          </div>
          
          <div className="payment-method-item">
            <div className="payment-method-content">
              <div className="payment-method-name">Cash on Delivery (COD)</div>
            </div>
            <button className="btn-text">Edit</button>
          </div>

          <button className="btn-outline-icon">
            <span className="btn-icon">⊕</span> Manual payment method
          </button>
        </div>
      </div>

      <div className="settings-actions">
        <button className="btn-secondary">Cancel</button>
        <button className="btn-primary">Save</button>
      </div>
    </div>
  );

  const renderCheckoutSettings = () => (
    <div className="settings-content">
      <div className="settings-section">
        <h2 className="section-title">Checkout Configuration</h2>
        <div className="form-card">
          <div className="help-text-block">
            Customize your checkout experience and customer account settings
          </div>
          
          <div className="config-card">
            <div className="config-header">
              <div className="config-info">
                <div className="config-title">ZARLY Checkout <span className="badge-live">Active</span></div>
                <div className="config-meta">Configure your checkout experience</div>
              </div>
              <div className="config-actions">
                <button className="btn-primary" onClick={() => alert('Checkout customization: Configure branding, fields, and options')}>
                  Customize checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h2 className="section-title">Customer contact method</h2>
        <div className="form-card">
          <div className="help-text-block">
            The contact method customers enter at checkout will receive order and shipping <a href="#" className="settings-link">notifications</a>
          </div>
          
          <div className="radio-group">
            <label className="radio-label">
              <input 
                type="radio" 
                name="contact-method" 
                value="phone-email"
                checked={contactMethod === 'phone-email'}
                onChange={(e) => setContactMethod(e.target.value)}
              />
              <div className="radio-content">
                <div className="radio-title">Phone number or email</div>
                <div className="radio-description">An <a href="#" className="settings-link">SMS App</a> is required to send SMS updates</div>
              </div>
            </label>

            <label className="radio-label">
              <input 
                type="radio" 
                name="contact-method" 
                value="email"
                checked={contactMethod === 'email'}
                onChange={(e) => setContactMethod(e.target.value)}
              />
              <div className="radio-content">
                <div className="radio-title">Email</div>
              </div>
            </label>
          </div>

          <div className="checkbox-group">
            <label className="checkbox-label">
              <input type="checkbox" defaultChecked />
              <div className="checkbox-content">
                <div className="checkbox-title">Show a link for customers to track their order with <a href="#" className="settings-link">Shop</a></div>
                <div className="checkbox-description">Customers will be able to download the app from the order status page</div>
              </div>
            </label>

            <label className="checkbox-label">
              <input type="checkbox" />
              <div className="checkbox-content">
                <div className="checkbox-title">Require customers to sign in to their account before checkout</div>
                <div className="checkbox-description">Customers can only use email when sign-in is required</div>
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h2 className="section-title">Customer information</h2>
        <div className="form-card">
          <div className="form-group">
            <label className="form-label">Full name</label>
            <div className="radio-group-compact">
              <label className="radio-label-compact">
                <input 
                  type="radio" 
                  name="full-name" 
                  value="last-only"
                  checked={fullNameOption === 'last-only'}
                  onChange={(e) => setFullNameOption(e.target.value)}
                />
                <span>Only require last name</span>
              </label>
              <label className="radio-label-compact">
                <input 
                  type="radio" 
                  name="full-name" 
                  value="first-last"
                  checked={fullNameOption === 'first-last'}
                  onChange={(e) => setFullNameOption(e.target.value)}
                />
                <span>Require first and last name</span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Company name</label>
            <div className="radio-group-compact">
              <label className="radio-label-compact">
                <input 
                  type="radio" 
                  name="company-name" 
                  value="dont-include"
                  checked={companyNameOption === 'dont-include'}
                  onChange={(e) => setCompanyNameOption(e.target.value)}
                />
                <span>Don't include <span className="badge-recommended">Recommended</span></span>
              </label>
              <label className="radio-label-compact">
                <input 
                  type="radio" 
                  name="company-name" 
                  value="optional"
                  checked={companyNameOption === 'optional'}
                  onChange={(e) => setCompanyNameOption(e.target.value)}
                />
                <span>Optional</span>
              </label>
              <label className="radio-label-compact">
                <input 
                  type="radio" 
                  name="company-name" 
                  value="required"
                  checked={companyNameOption === 'required'}
                  onChange={(e) => setCompanyNameOption(e.target.value)}
                />
                <span>Required</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="settings-actions">
        <button className="btn-secondary">Cancel</button>
        <button className="btn-primary">Save</button>
      </div>
    </div>
  );

  const renderDomainDetailView = (domain) => (
    <div className="settings-content">
      <div className="domain-detail-header">
        <button className="back-button" onClick={() => setViewingDomain(null)}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="domain-detail-title">
          <h2 className="domain-name-large">🌐 {domain.name}</h2>
          {domain.status === 'needs-setup' && (
            <span className="badge-warning">Needs setup</span>
          )}
          {domain.status === 'connected' && (
            <span className="badge-connected">Connected</span>
          )}
        </div>
        <div className="domain-detail-actions">
          <button className="btn-secondary">Domain settings ▾</button>
        </div>
      </div>

      {domain.status === 'needs-setup' && (
        <div className="alert-banner alert-info">
          <div className="alert-icon">ℹ️</div>
          <div className="alert-content">
            <div className="alert-title">Need help connecting your domain?</div>
            <button className="alert-button" onClick={() => window.open('https://help.shopify.com/en/manual/domains', '_blank')}>
              View setup guide
            </button>
          </div>
        </div>
      )}

      <div className="settings-section">
        <h2 className="section-title">
          {domain.status === 'needs-setup' ? '⚠️ DNS records are not pointing to Shopify' : '✓ DNS records verified'}
        </h2>
        <div className="form-card">
          {domain.dnsRecords.length > 0 ? (
            <>
              <div className="help-text-block">
                {domain.status === 'needs-setup' ? (
                  <>
                    Log in to your domain provider and open <a href="#" className="settings-link">DNS management</a> for {domain.name}
                  </>
                ) : (
                  'Your DNS records are correctly configured and pointing to Shopify.'
                )}
              </div>

              <div className="dns-records-table">
                <div className="table-header">
                  <div className="table-cell" style={{ flex: '0 0 80px' }}>Type</div>
                  <div className="table-cell" style={{ flex: '0 0 120px' }}>Name</div>
                  <div className="table-cell" style={{ flex: 1 }}>Current values</div>
                  <div className="table-cell" style={{ flex: 1 }}>Update to</div>
                </div>

                {domain.dnsRecords.map((record, index) => (
                  <div key={index} className="table-row">
                    <div className="table-cell" style={{ flex: '0 0 80px' }}>
                      <span className="dns-type-badge">{record.type}</span>
                    </div>
                    <div className="table-cell" style={{ flex: '0 0 120px' }}>
                      <code className="dns-code">{record.name}</code>
                    </div>
                    <div className="table-cell" style={{ flex: 1 }}>
                      <code className="dns-code">{record.current}</code>
                    </div>
                    <div className="table-cell" style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {record.current !== record.required && <span style={{ color: '#6D7175' }}>→</span>}
                        <code className="dns-code">{record.required}</code>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {domain.status === 'needs-setup' && (
                <button className="btn-primary" style={{ marginTop: '16px' }} onClick={() => handleUpdateDNS(domain.id)}>
                  I updated DNS records
                </button>
              )}
            </>
          ) : (
            <div className="help-text-block">
              This is a Shopify-managed domain. No DNS configuration required.
            </div>
          )}
        </div>
      </div>

      <div className="settings-section">
        <h2 className="section-title">Target and type</h2>
        <div className="form-card">
          <div className="domain-target-item">
            <div className="domain-target-icon">🎯</div>
            <div className="domain-target-content">
              <div className="domain-target-label">Target</div>
              <div className="domain-target-value">
                {domain.type === 'online-store' ? 'Online Store' : 'Customer Account'}
              </div>
            </div>
          </div>

          <div className="domain-target-item">
            <div className="domain-target-icon">🔀</div>
            <div className="domain-target-content">
              <div className="domain-target-label">Domain type</div>
              <div className="domain-target-value">Redirects to zarly.store</div>
            </div>
            <button className="btn-text">Change domain type</button>
          </div>

          <div className="help-text">
            Any change you make to this domain could impact how people find your store. <a href="#" className="settings-link">Learn more.</a>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h2 className="section-title">Manage domain</h2>
        <div className="form-card">
          {!domain.isPrimary && (
            <button 
              className="btn-outline" 
              style={{ marginBottom: '12px' }}
              onClick={() => handleMakePrimary(domain.id, domain.type)}
            >
              Make this the primary domain
            </button>
          )}
          <button className="btn-danger" onClick={() => handleDeleteDomain(domain.id)}>
            Delete domain
          </button>
        </div>
      </div>
    </div>
  );

  const renderDomainsSettings = () => {
    if (viewingDomain) {
      const domain = domains.find(d => d.id === viewingDomain.id) || viewingDomain;
      return renderDomainDetailView(domain);
    }

    const onlineStoreDomains = domains.filter(d => d.type === 'online-store');
    const customerAccountDomains = domains.filter(d => d.type === 'customer-account');

    return (
      <div className="settings-content">
        <div className="settings-section">
          <div className="section-header-with-actions">
            <h2 className="section-title">Domains</h2>
            <div className="section-actions">
              <button className="btn-secondary" onClick={() => setShowConnectDomainModal(true)}>
                Connect existing
              </button>
            </div>
          </div>
          
          <div className="form-card">
            <div className="domains-table">
              <div className="table-header">
                <div className="table-cell">Domain</div>
                <div className="table-cell">Status</div>
                <div className="table-cell"></div>
              </div>
              
              {onlineStoreDomains.length > 0 && (
                <div className="table-section">
                  <div className="table-section-title">Online Store</div>
                  
                  {onlineStoreDomains.map((domain) => (
                    <div key={domain.id} className="table-row">
                      <div className="table-cell">
                        <div className="domain-info">
                          <span className="domain-icon">🌐</span>
                          <div>
                            <div className="domain-name">
                              {domain.name} 
                              {domain.isPrimary && <span className="badge-primary">Primary</span>}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="table-cell">
                        {domain.status === 'connected' && <span className="badge-connected">Connected</span>}
                        {domain.status === 'needs-setup' && <span className="badge-warning">Needs setup</span>}
                      </div>
                      <div className="table-cell">
                        <button className="btn-text" onClick={() => setViewingDomain(domain)}>View</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {customerAccountDomains.length > 0 && (
                <div className="table-section">
                  <div className="table-section-title">Customer Account</div>
                  
                  {customerAccountDomains.map((domain) => (
                    <div key={domain.id} className="table-row">
                      <div className="table-cell">
                        <div className="domain-info">
                          <span className="domain-icon">🌐</span>
                          <div>
                            <div className="domain-name">
                              {domain.name} 
                              {domain.isPrimary && <span className="badge-primary">Primary</span>}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="table-cell">
                        {domain.status === 'connected' && <span className="badge-connected">Connected</span>}
                        {domain.status === 'needs-setup' && <span className="badge-warning">Needs setup</span>}
                      </div>
                      <div className="table-cell">
                        <button className="btn-text" onClick={() => setViewingDomain(domain)}>View</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="help-text" style={{ marginTop: '16px' }}>
              <a href="#" className="settings-link">Learn more about domains</a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCustomerEventsSettings = () => (
    <div className="settings-content">
      <div className="settings-section">
        <div className="section-header-with-actions">
          <h2 className="section-title">Pixels</h2>
          <div className="section-actions">
            <button className="btn-secondary">Explore pixel apps</button>
            <button className="btn-primary">Add custom pixel</button>
          </div>
        </div>
        
        <div className="form-card">
          <div className="help-text-block">
            Enable third-party services to securely collect and use customer event data from your store
          </div>

          <div className="tabs-container">
            <div className="tabs">
              <button className="tab active">All</button>
              <button className="tab">App pixels</button>
              <button className="tab">Custom pixels</button>
            </div>
            <div className="tabs-actions">
              <button className="btn-icon-only">🔍</button>
              <button className="btn-icon-only">⚙️</button>
            </div>
          </div>

          <div className="empty-state-centered" style={{ padding: '40px 24px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
            <h3 className="empty-state-title">No customer event pixels yet</h3>
            <div className="help-text-block" style={{ textAlign: 'center', maxWidth: '500px', margin: '0 auto 24px' }}>
              Connect third-party services to track customer events and improve your marketing campaigns.
            </div>
            <button className="btn-primary" onClick={() => alert('Add pixel: Connect tracking pixels from Facebook, Google Analytics, TikTok, etc.')}>
              Add custom pixel
            </button>
          </div>

          <div className="help-text" style={{ marginTop: '16px' }}>
            This list only shows <a href="#" className="settings-link">pixels</a> that use the applicable Shopify APIs, the supported pixel integration.
          </div>

          <div style={{ marginTop: '16px' }}>
            <a href="#" className="settings-link">Learn more about pixels</a>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsSettings = () => (
    <div className="settings-content">
      <div className="settings-section">
        <h2 className="section-title">Sender email</h2>
        <div className="form-card">
          <div className="help-text-block">
            The email your store uses to send emails to your customers
          </div>
          
          <div className="form-group">
            <input 
              type="email" 
              className="form-input"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </div>

          <div className="help-text">
            This email address will be used to send order confirmations, shipping updates, and other notifications to your customers.
          </div>
        </div>
      </div>

      <div className="settings-section">
        <div className="form-card">
          <div className="notification-items">
            <button className="notification-item">
              <div className="notification-icon">👤</div>
              <div className="notification-content">
                <div className="notification-title">Customer notifications</div>
                <div className="notification-description">Notify customers about order and account events</div>
              </div>
              <div className="notification-arrow">›</div>
            </button>

            <button className="notification-item">
              <div className="notification-icon">👥</div>
              <div className="notification-content">
                <div className="notification-title">Staff notifications</div>
                <div className="notification-description">Notify staff members about new order events</div>
              </div>
              <div className="notification-arrow">›</div>
            </button>

            <button className="notification-item">
              <div className="notification-icon">📦</div>
              <div className="notification-content">
                <div className="notification-title">Fulfillment request notification</div>
                <div className="notification-description">Notify your fulfillment service provider when you mark an order as fulfilled</div>
              </div>
              <div className="notification-arrow">›</div>
            </button>

            <button className="notification-item">
              <div className="notification-icon">{ '<>' }</div>
              <div className="notification-content">
                <div className="notification-title">Webhooks</div>
                <div className="notification-description">Send XML or JSON notifications about store events to a URL</div>
              </div>
              <div className="notification-arrow">›</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMetafieldsSettings = () => (
    <div className="settings-content">
      <div className="settings-section">
        <h2 className="section-title">Metafield definitions</h2>
        <div className="form-card">
          <div className="help-text-block">
            Add a custom piece of data to a specific part of your store.
          </div>

            <div className="metafield-list">
            {[
              { icon: '🏷️', name: 'Products', count: 0 },
              { icon: '🔀', name: 'Variants', count: 0 },
              { icon: '📂', name: 'Collections', count: 0 },
              { icon: '👤', name: 'Customers', count: 0 },
              { icon: '📦', name: 'Orders', count: 0 },
              { icon: '📝', name: 'Draft orders', count: 0 },
              { icon: '📍', name: 'Locations', count: 0 },
              { icon: '📄', name: 'Pages', count: 0 },
              { icon: '✏️', name: 'Blogs', count: 0 },
              { icon: '📰', name: 'Blog posts', count: 0 },
              { icon: '🌍', name: 'Markets', count: 0 },
              { icon: '🏪', name: 'Shop', count: 0 }
            ].map((item, index) => (
              <button 
                key={index} 
                className="metafield-item"
                onClick={() => alert(`Configure metafields for ${item.name}`)}
              >
                <div className="metafield-icon">{item.icon}</div>
                <div className="metafield-content">
                  <div className="metafield-name">{item.name}</div>
                </div>
                <div className="metafield-count">{item.count}</div>
                <div className="metafield-arrow">›</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h2 className="section-title">Define your first metaobject</h2>
        <div className="form-card">
          <div className="empty-state">
            <div className="empty-state-content">
              <div className="help-text-block">
                Metaobjects allow you to group fields and connect them to different parts of your store. Use them to create custom content or data structures.
              </div>
              <button 
                className="btn-primary" 
                style={{ marginTop: '16px' }}
                onClick={() => alert('Create metaobject: Define custom data structures for your store')}
              >
                Add definition
              </button>
            </div>
            <div className="empty-state-image">
              <div style={{ width: '120px', height: '120px', background: '#F6F6F7', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                📦
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLanguagesSettings = () => (
    <div className="settings-content">
      <div className="settings-section">
        <div className="form-card">
          <div className="empty-state-centered">
            <div className="language-illustration">
              <div style={{ width: '120px', height: '120px', background: '#F6F6F7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', margin: '0 auto 24px' }}>
                🌐
              </div>
            </div>
            <h3 className="empty-state-title">Speak your customers' language</h3>
            <div className="help-text-block" style={{ textAlign: 'center', maxWidth: '500px', margin: '0 auto 24px' }}>
              Adding translations to your store improves cross-border conversion by an average of 13%. It's free and takes minutes.
            </div>
            <button 
              className="btn-primary"
              onClick={() => alert('Add language: Choose languages to translate your store content')}
            >
              Add a language
            </button>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h2 className="section-title">Languages</h2>
        <div className="form-card">
          <div className="languages-table">
            <div className="table-header">
              <div className="table-cell">Language</div>
              <div className="table-cell">Status</div>
              <div className="table-cell">Domains</div>
              <div className="table-cell"></div>
            </div>

            <div className="table-row">
              <div className="table-cell">
                <div>
                  <div className="language-name">English</div>
                  <div className="language-meta">Default</div>
                </div>
              </div>
              <div className="table-cell">
                <span className="badge-published">Published</span>
              </div>
              <div className="table-cell">
                <button className="btn-text-small">2 domains ˅</button>
              </div>
              <div className="table-cell">
                <button className="btn-secondary-small">Adapt</button>
                <button className="btn-icon-only">⋯</button>
              </div>
            </div>
          </div>

            <div style={{ marginTop: '24px', padding: '16px', background: '#F6F6F7', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', background: 'white', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              🔤
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, marginBottom: '4px' }}>Translation App</div>
              <div style={{ fontSize: '14px', color: '#6D7175' }}>⭐⭐⭐⭐⭐</div>
              <div style={{ fontSize: '13px', color: '#6D7175' }}>Translate your store and cater to global audiences</div>
            </div>
            <button 
              className="btn-secondary"
              onClick={() => alert('Install translation app to add multi-language support')}
            >
              Install
            </button>
          </div>

          <div className="help-text" style={{ marginTop: '16px' }}>
            Learn more about <a href="#" className="settings-link">languages</a>. To change your account language, <a href="#" className="settings-link">manage account</a>.
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeSection) {
      case 'general':
        return renderGeneralSettings();
      case 'payments':
        return renderPaymentsSettings();
      case 'checkout':
        return renderCheckoutSettings();
      case 'domains':
        return renderDomainsSettings();
      case 'events':
        return renderCustomerEventsSettings();
      case 'notifications':
        return renderNotificationsSettings();
      case 'metafields':
        return renderMetafieldsSettings();
      case 'languages':
        return renderLanguagesSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="settings-container">
      {/* Settings Sidebar */}
      <div className={`settings-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="settings-sidebar-header">
          <div className="settings-store-badge">
            <div className="settings-store-icon">ZA</div>
            {!sidebarCollapsed && (
              <div className="settings-store-info">
                <div className="settings-store-name">ZARLY</div>
                <div className="settings-store-url">zarly.store</div>
              </div>
            )}
          </div>
          <button 
            className="sidebar-toggle-btn"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              {sidebarCollapsed ? (
                <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              ) : (
                <path d="M13 4L7 10L13 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              )}
            </svg>
          </button>
        </div>

        {!sidebarCollapsed && (
          <div className="settings-search">
            <span className="settings-search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Search" 
              className="settings-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}

        <nav className="settings-nav">
          {settingsSections.map(section => (
            <button
              key={section.id}
              className={`settings-nav-item ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
              title={sidebarCollapsed ? section.label : ''}
            >
              <span className="settings-nav-icon">{section.icon}</span>
              {!sidebarCollapsed && <span className="settings-nav-label">{section.label}</span>}
            </button>
          ))}
        </nav>

        <div className="settings-sidebar-footer">
          <div className="settings-user-info">
            <div className="settings-user-avatar" title={sidebarCollapsed ? "MUHAMMAD FARAZ" : ""}>MF</div>
            {!sidebarCollapsed && (
              <div className="settings-user-details">
                <div className="settings-user-name">MUHAMMAD FARAZ</div>
                <div className="settings-user-email">farazahmedph001@gmail.com</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Settings Content */}
      <div className="settings-main">
        <div className="settings-header">
          <h1 className="settings-page-title">
            <span className="settings-title-icon">⚙️</span>
            {settingsSections.find(s => s.id === activeSection)?.label || 'General'}
          </h1>
        </div>

        {renderContent()}
      </div>

      {/* Connect Existing Domain Modal */}
      {showConnectDomainModal && (
        <div className="modal-overlay" onClick={() => setShowConnectDomainModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Connect existing domain</h3>
              <button className="modal-close" onClick={() => setShowConnectDomainModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Domain</label>
                <input 
                  type="text" 
                  className="form-input"
                  placeholder="example.com, shop.example.com"
                  value={domainInput}
                  onChange={(e) => setDomainInput(e.target.value)}
                  autoFocus
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowConnectDomainModal(false)}>Cancel</button>
              <button 
                className="btn-primary" 
                onClick={handleAddDomain}
                disabled={!domainInput.trim()}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;

