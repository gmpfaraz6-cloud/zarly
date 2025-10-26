import './Metaobjects.css';

function Metaobjects() {
  return (
    <div className="metaobjects-page">
      <div className="metaobjects-content">
        <div className="metaobjects-empty">
          <h2 className="empty-title">Create custom data for your store</h2>
          <p className="empty-description">
            Add and manage custom data that extends what you can do with Shopify.
          </p>
          <button className="create-definition-btn" onClick={() => alert('Add definition: This would open a form to create a custom data structure (metaobject definition) for your store.')}>Add definition</button>
        </div>
      </div>
    </div>
  );
}

export default Metaobjects;

