import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Orders from './Orders';
import Products from './Products';
import AddProduct from './AddProduct';
import Collections from './Collections';
import Inventory from './Inventory';
import PurchaseOrders from './PurchaseOrders';
import Transfers from './Transfers';
import GiftCards from './GiftCards';
import Customers from './Customers';
import Segments from './Segments';
import Marketing from './Marketing';
import Campaigns from './Campaigns';
import Attribution from './Attribution';
import Automations from './Automations';
import Discounts from './Discounts';
import ContentFiles from './ContentFiles';
import Menus from './Menus';
import BlogPosts from './BlogPosts';
import Metaobjects from './Metaobjects';
import MarketsPage from './MarketsPage';
import Catalogs from './Catalogs';
import AnalyticsPage from './AnalyticsPage';
import Reports from './Reports';
import LiveView from './LiveView';
import Settings from './Settings';
import './Dashboard.css';

function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const [expandedItems, setExpandedItems] = useState({});
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showOnlineStoreMenu, setShowOnlineStoreMenu] = useState(false);

  const getPageTitle = () => {
    if (showAddProduct) return 'Add product';
    switch(activeNav) {
      case 'orders': return 'Orders';
      case 'drafts': return 'Drafts';
      case 'abandoned': return 'Abandoned checkouts';
      case 'products': return 'Products';
      case 'collections': return 'Collections';
      case 'inventory': return 'Inventory';
      case 'purchase-orders': return 'Purchase orders';
      case 'transfers': return 'Transfers';
      case 'gift-cards': return 'Gift cards';
      case 'customers': return 'Customers';
      case 'segments': return 'Segments';
      case 'marketing': return 'Marketing';
      case 'campaigns': return 'Campaigns';
      case 'attribution': return 'Attribution';
      case 'automations': return 'Automations';
      case 'discounts': return 'Discounts';
      case 'content': return 'Content';
      case 'files': return 'Files';
      case 'menus': return 'Menus';
      case 'blog-posts': return 'Blog posts';
      case 'metaobjects': return 'Metaobjects';
      case 'markets': return 'Markets';
      case 'catalogs': return 'Catalogs';
      case 'analytics': return 'Analytics';
      case 'reports': return 'Reports';
      case 'live-view': return 'Live View';
      case 'settings': return 'Settings';
      default: return 'Home';
    }
  };

  const getPageIcon = () => {
    if (showAddProduct) return null;
    switch(activeNav) {
      case 'orders':
      case 'drafts':
      case 'abandoned':
        return '📦';
      case 'products':
      case 'collections':
      case 'inventory':
      case 'purchase-orders':
      case 'transfers':
      case 'gift-cards':
        return '🏷️';
      case 'customers':
      case 'segments':
        return '👥';
      case 'marketing':
      case 'campaigns':
      case 'attribution':
      case 'automations':
        return '📢';
      case 'discounts':
        return '🎫';
      case 'content':
      case 'files':
      case 'menus':
      case 'blog-posts':
      case 'metaobjects':
        return '📝';
      case 'markets':
      case 'catalogs':
        return '🌍';
      case 'analytics':
      case 'reports':
      case 'live-view':
        return '📊';
      case 'settings':
        return '⚙️';
      default: return null;
    }
  };

  const handleHeaderAction = (action) => {
    switch(action) {
      case 'export':
        alert('Export data: This would download your data as a CSV or Excel file.');
        break;
      case 'import':
        alert('Import data: This would open a dialog to upload a CSV file.');
        break;
      case 'create-discount':
        alert('Create discount: This would open a form to create a new discount code.');
        break;
      case 'upload-files':
        alert('Upload files: This would open a file picker to upload images and documents.');
        break;
      case 'create-menu':
        alert('Create menu: This would open a form to create a new navigation menu.');
        break;
      case 'manage-blogs':
        alert('Manage blogs: This would show all your blog channels.');
        break;
      case 'create-market':
        alert('Create market: This would open a form to create a new market region.');
        break;
      case 'create-catalog':
        alert('Create catalog: This would open a form to create a custom product catalog.');
        break;
      case 'new-exploration':
        alert('New exploration: This would open the analytics exploration tool.');
        break;
      case 'add-customer':
        alert('Add customer: This would open a form to manually add a customer.');
        break;
      case 'import-customers':
        alert('Import customers: This would open a dialog to upload a customer CSV file.');
        break;
      case 'create-segment':
        alert('Create segment: This would open a form to create a customer segment.');
        break;
      case 'create-campaign':
        alert('Create campaign: This would open a form to create a marketing campaign.');
        break;
      case 'view-templates':
        alert('View templates: This would show all automation templates.');
        break;
      case 'add-collection':
        alert('Add collection: This would open a form to create a product collection.');
        break;
      default:
        console.log('Action:', action);
    }
  };

  const getHeaderActions = () => {
    if (showAddProduct) return null;
    
    if (activeNav === 'products') {
      return (
        <>
          <button className="header-action-btn" onClick={() => handleHeaderAction('export')}>Export</button>
          <button className="header-action-btn" onClick={() => handleHeaderAction('import')}>Import</button>
          <button className="header-action-btn">More actions</button>
          <button className="header-action-btn primary" onClick={() => setShowAddProduct(true)}>Add product</button>
        </>
      );
    }
    
    if (activeNav === 'inventory') {
      return (
        <>
          <button className="header-action-btn" onClick={() => handleHeaderAction('export')}>Export</button>
          <button className="header-action-btn" onClick={() => handleHeaderAction('import')}>Import</button>
        </>
      );
    }
    
    if (activeNav === 'collections') {
      return <button className="header-action-btn primary" onClick={() => handleHeaderAction('add-collection')}>Add collection</button>;
    }
    
    if (activeNav === 'gift-cards') {
      return <button className="header-action-btn" onClick={() => handleHeaderAction('export')}>Export</button>;
    }
    
    if (activeNav === 'orders' || activeNav === 'drafts' || activeNav === 'abandoned') {
      return <button className="header-action-btn">More actions</button>;
    }
    
    if (activeNav === 'customers') {
      return (
        <>
          <button className="header-action-btn" onClick={() => handleHeaderAction('export')}>Export</button>
          <button className="header-action-btn" onClick={() => handleHeaderAction('import-customers')}>Import customers</button>
          <button className="header-action-btn primary" onClick={() => handleHeaderAction('add-customer')}>Add customer</button>
        </>
      );
    }
    
    if (activeNav === 'segments') {
      return <button className="header-action-btn primary" onClick={() => handleHeaderAction('create-segment')}>Create segment</button>;
    }
    
    if (activeNav === 'campaigns') {
      return <button className="header-action-btn primary" onClick={() => handleHeaderAction('create-campaign')}>Create campaign</button>;
    }
    
    if (activeNav === 'attribution') {
      return (
        <>
          <button className="header-action-btn" onClick={() => window.print()}>Print</button>
          <button className="header-action-btn" onClick={() => handleHeaderAction('export')}>Export</button>
        </>
      );
    }
    
    if (activeNav === 'automations') {
      return <button className="header-action-btn primary" onClick={() => handleHeaderAction('view-templates')}>View templates</button>;
    }
    
    if (activeNav === 'discounts') {
      return (
        <>
          <button className="header-action-btn" onClick={() => handleHeaderAction('export')}>Export</button>
          <button className="header-action-btn primary" onClick={() => handleHeaderAction('create-discount')}>Create discount</button>
        </>
      );
    }
    
    if (activeNav === 'files') {
      return <button className="header-action-btn primary" onClick={() => handleHeaderAction('upload-files')}>Upload files</button>;
    }
    
    if (activeNav === 'menus') {
      return <button className="header-action-btn primary" onClick={() => handleHeaderAction('create-menu')}>Create menu</button>;
    }
    
    if (activeNav === 'blog-posts') {
      return <button className="header-action-btn" onClick={() => handleHeaderAction('manage-blogs')}>Manage blogs</button>;
    }
    
    if (activeNav === 'markets') {
      return (
        <>
          <button className="header-action-btn" onClick={() => alert('Graph view: This would show a visual graph of your markets.')}>📊 Graph view</button>
          <button className="header-action-btn primary" onClick={() => handleHeaderAction('create-market')}>Create market</button>
        </>
      );
    }
    
    if (activeNav === 'catalogs') {
      return (
        <>
          <button className="header-action-btn" onClick={() => handleHeaderAction('export')}>Export</button>
          <button className="header-action-btn" onClick={() => handleHeaderAction('import')}>Import</button>
          <button className="header-action-btn primary" onClick={() => handleHeaderAction('create-catalog')}>Create catalog</button>
        </>
      );
    }
    
    if (activeNav === 'analytics') {
      return (
        <>
          <button className="header-action-btn" onClick={() => alert('Refresh: Data refreshed!')}>🔄</button>
          <button className="header-action-btn" onClick={() => alert('Search: This would open analytics search.')}>🔍</button>
          <button className="header-action-btn" onClick={() => alert('Edit: This would allow you to customize this view.')}>✏️</button>
          <button className="header-action-btn primary" onClick={() => handleHeaderAction('new-exploration')}>New exploration</button>
        </>
      );
    }
    
    if (activeNav === 'reports') {
      return <button className="header-action-btn primary" onClick={() => handleHeaderAction('new-exploration')}>New exploration</button>;
    }
    
    return null;
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { 
      id: 'orders', 
      label: 'Orders', 
      icon: '📦',
      subItems: [
        { id: 'drafts', label: 'Drafts' },
        { id: 'abandoned', label: 'Abandoned checkouts' }
      ]
    },
    { 
      id: 'products', 
      label: 'Products', 
      icon: '🏷️',
      subItems: [
        { id: 'collections', label: 'Collections' },
        { id: 'inventory', label: 'Inventory' },
        { id: 'purchase-orders', label: 'Purchase orders' },
        { id: 'transfers', label: 'Transfers' },
        { id: 'gift-cards', label: 'Gift cards' }
      ]
    },
    { 
      id: 'customers', 
      label: 'Customers', 
      icon: '👥',
      subItems: [
        { id: 'segments', label: 'Segments' }
      ]
    },
    { 
      id: 'marketing', 
      label: 'Marketing', 
      icon: '📢',
      subItems: [
        { id: 'campaigns', label: 'Campaigns' },
        { id: 'attribution', label: 'Attribution' },
        { id: 'automations', label: 'Automations' }
      ]
    },
    { id: 'discounts', label: 'Discounts', icon: '🎫' },
    { 
      id: 'content', 
      label: 'Content', 
      icon: '📝',
      subItems: [
        { id: 'metaobjects', label: 'Metaobjects' },
        { id: 'files', label: 'Files' },
        { id: 'menus', label: 'Menus' },
        { id: 'blog-posts', label: 'Blog posts' }
      ]
    },
    { 
      id: 'markets', 
      label: 'Markets', 
      icon: '🌍',
      subItems: [
        { id: 'catalogs', label: 'Catalogs' }
      ]
    },
    { 
      id: 'analytics', 
      label: 'Analytics', 
      icon: '📊',
      subItems: [
        { id: 'reports', label: 'Reports' },
        { id: 'live-view', label: 'Live View' }
      ]
    },
  ];

  const handleNavClick = (itemId) => {
    const item = navItems.find(i => i.id === itemId);
    
    if (item?.subItems) {
      // If clicking on a parent with sub-items, toggle expansion and set as active
      setActiveNav(itemId);
      setExpandedItems(prev => ({
        ...prev,
        [itemId]: !prev[itemId]
      }));
    } else {
      // Regular navigation item without sub-items
      setActiveNav(itemId);
    }
  };

  const handleSubNavClick = (parentId, subItemId) => {
    setActiveNav(subItemId);
    setExpandedItems(prev => ({
      ...prev,
      [parentId]: true
    }));
  };

  const salesChannels = [];

  const stats = [
    { 
      label: 'Sessions', 
      value: '127', 
      change: '+89%', 
      trend: 'up',
      description: 'vs. last 30 days'
    },
    { 
      label: 'Total sales', 
      value: '$2,459', 
      change: '+12.5%', 
      trend: 'up',
      description: 'vs. last 30 days'
    },
    { 
      label: 'Orders', 
      value: '42', 
      change: '+23%', 
      trend: 'up',
      description: 'vs. last 30 days'
    },
    { 
      label: 'Conversion rate', 
      value: '3.2%', 
      change: '+0.8%', 
      trend: 'up',
      description: 'vs. last 30 days'
    },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-container">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
              <rect width="30" height="30" rx="6" fill="#202223"/>
              <path d="M19 8L11 16L19 24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
            <span className="brand-name">ZARLY</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map(item => (
            <div key={item.id}>
              <button
                className={`nav-item ${activeNav === item.id ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
                {item.subItems && (
                  <span className={`expand-icon ${expandedItems[item.id] ? 'expanded' : ''}`}>
                    ›
                  </span>
                )}
              </button>
              {item.subItems && expandedItems[item.id] && (
                <div className="sub-nav">
                  {item.subItems.map(subItem => (
                    <button
                      key={subItem.id}
                      className={`sub-nav-item ${activeNav === subItem.id ? 'active' : ''}`}
                      onClick={() => handleSubNavClick(item.id, subItem.id)}
                    >
                      {subItem.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          {/* Online Store Section */}
          <div className="online-store-section">
            <button 
              className="nav-item"
              onClick={() => setShowOnlineStoreMenu(!showOnlineStoreMenu)}
            >
              <span className="nav-icon">🏪</span>
              <span className="nav-label">Online Store</span>
              <span className={`expand-icon ${showOnlineStoreMenu ? 'expanded' : ''}`}>
                ›
              </span>
            </button>
            {showOnlineStoreMenu && (
              <div className="sub-nav">
                <button
                  className="sub-nav-item"
                  onClick={() => {
                    // If on admin subdomain (admin.zarly.store), open main domain (zarly.store)
                    const hostname = window.location.hostname;
                    if (hostname.startsWith('admin.')) {
                      const storeDomain = hostname.replace('admin.', '');
                      const protocol = window.location.protocol; // http: or https:
                      window.open(`${protocol}//${storeDomain}`, '_blank');
                    } else if (hostname === 'localhost' || hostname === '127.0.0.1') {
                      // Local development - open root path
                      window.open('/', '_blank');
                    } else {
                      // On any other domain, try to open without admin prefix
                      window.open('/', '_blank');
                    }
                  }}
                >
                  View Store
                </button>
                <button
                  className="sub-nav-item"
                  onClick={() => setActiveNav('menus')}
                >
                  Menus
                </button>
                <button
                  className="sub-nav-item"
                  onClick={() => setActiveNav('blog-posts')}
                >
                  Blog posts
                </button>
              </div>
            )}
          </div>

          <button 
            className={`nav-item ${activeNav === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveNav('settings')}
          >
            <span className="nav-icon">⚙️</span>
            <span className="nav-label">Settings</span>
          </button>
          </div>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Header */}
        {activeNav !== 'settings' && (
        <header className="top-header">
          <div className="header-with-title">
            <div className="header-left-section">
              {showAddProduct && (
                <button className="back-btn-header" onClick={() => setShowAddProduct(false)}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}
              <h1 className="page-title-header">
                {getPageIcon() && <span style={{ marginRight: '8px' }}>{getPageIcon()}</span>}
                {getPageTitle()}
              </h1>
            </div>
            <div className="header-right-section">
              <div className="search-container-compact">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search"
                  className="search-input-compact"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {getHeaderActions()}
              <button className="icon-button" title="Notifications">
                <span className="notification-badge">1</span>
                🔔
              </button>
              <div className="user-menu-compact">
                <div className="user-avatar">
                  {user?.email?.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </header>
        )}

        {/* Content Area */}
        {showAddProduct ? (
          <AddProduct onClose={() => setShowAddProduct(false)} />
        ) : (activeNav === 'orders' || activeNav === 'drafts' || activeNav === 'abandoned') ? (
          <Orders type={activeNav} />
        ) : activeNav === 'products' ? (
          <Products onAddProduct={() => setShowAddProduct(true)} />
        ) : activeNav === 'collections' ? (
          <Collections />
        ) : activeNav === 'inventory' ? (
          <Inventory />
        ) : activeNav === 'purchase-orders' ? (
          <PurchaseOrders />
        ) : activeNav === 'transfers' ? (
          <Transfers />
        ) : activeNav === 'gift-cards' ? (
          <GiftCards />
        ) : activeNav === 'customers' ? (
          <Customers />
        ) : activeNav === 'segments' ? (
          <Segments />
        ) : activeNav === 'marketing' ? (
          <Marketing />
        ) : activeNav === 'campaigns' ? (
          <Campaigns />
        ) : activeNav === 'attribution' ? (
          <Attribution />
        ) : activeNav === 'automations' ? (
          <Automations />
        ) : activeNav === 'discounts' ? (
          <Discounts />
        ) : activeNav === 'content' ? (
          <ContentFiles />
        ) : activeNav === 'files' ? (
          <ContentFiles />
        ) : activeNav === 'menus' ? (
          <Menus />
        ) : activeNav === 'blog-posts' ? (
          <BlogPosts />
        ) : activeNav === 'metaobjects' ? (
          <Metaobjects />
        ) : activeNav === 'markets' ? (
          <MarketsPage />
        ) : activeNav === 'catalogs' ? (
          <Catalogs />
        ) : activeNav === 'analytics' ? (
          <AnalyticsPage />
        ) : activeNav === 'reports' ? (
          <Reports />
        ) : activeNav === 'live-view' ? (
          <LiveView />
        ) : activeNav === 'settings' ? (
          <Settings />
        ) : (
          <div className="content-area">
            {/* Filters Bar */}
            <div className="filters-bar">
              <div className="filter-group">
                <button className="filter-button">
                  📅 Last 30 days
                </button>
                <button className="filter-button">
                  📊 All channels
                </button>
              </div>
              <div className="live-visitors">
                <span className="live-dot"></span>
                <span className="live-text">15 live visitors</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-header">
                    <span className="stat-label">{stat.label}</span>
                  </div>
                  <div className="stat-content">
                    <div className="stat-value">{stat.value}</div>
                    <div className={`stat-change ${stat.trend}`}>
                      <span className="change-icon">{stat.trend === 'up' ? '↗' : '↘'}</span>
                      <span className="change-value">{stat.change}</span>
                    </div>
                  </div>
                  <div className="stat-footer">{stat.description}</div>
                </div>
              ))}
          </div>

            {/* Store Status Card */}
            <div className="status-card">
              <div className="status-header">
                <div className="status-info">
                  <h2 className="status-title">ZARLY</h2>
                  <p className="status-message">
                    Your store is open for business · 
                    <a href="#" className="status-link"> zarly.store</a>
                  </p>
                </div>
                <button className="expand-button">⌄</button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
              <h3 className="section-heading">Quick actions</h3>
              <div className="actions-grid">
                <div className="action-card">
                  <div className="action-icon">📦</div>
                  <h4 className="action-title">Add product</h4>
                  <p className="action-description">Start selling by adding your first product</p>
                </div>
                <div className="action-card">
                  <div className="action-icon">👥</div>
                  <h4 className="action-title">Add customer</h4>
                  <p className="action-description">Build your customer database</p>
                </div>
                <div className="action-card">
                  <div className="action-icon">🎨</div>
                  <h4 className="action-title">Customize theme</h4>
                  <p className="action-description">Make your store unique</p>
                </div>
                <div className="action-card">
                  <div className="action-icon">🚀</div>
                  <h4 className="action-title">Launch marketing</h4>
                  <p className="action-description">Reach more customers</p>
                </div>
              </div>
            </div>

            {/* User Info Section */}
            <div className="user-info-section">
              <h3 className="section-heading">Account information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Email</span>
                  <span className="info-value">{user?.email}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">User ID</span>
                  <span className="info-value">{user?.id?.substring(0, 16)}...</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Status</span>
                  <span className="info-badge active">Active</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Member since</span>
                  <span className="info-value">{new Date(user?.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

