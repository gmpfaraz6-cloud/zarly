import './BlogPosts.css';

function BlogPosts() {
  return (
    <div className="blog-posts-page">
      <div className="blog-content">
        <div className="blog-empty-state">
          <div className="blog-illustration">
            <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
              <rect x="50" y="40" width="100" height="120" rx="8" fill="white" stroke="#E5E7EB" strokeWidth="2"/>
              {/* Formatting toolbar */}
              <rect x="60" y="50" width="15" height="15" rx="3" fill="#E5E7EB"/>
              <rect x="80" y="50" width="15" height="15" rx="3" fill="#E5E7EB"/>
              <rect x="100" y="50" width="15" height="15" rx="3" fill="#E5E7EB"/>
              {/* Image placeholder */}
              <rect x="60" y="75" width="40" height="35" rx="4" fill="#60A5FA"/>
              <circle cx="70" cy="90" r="5" fill="white"/>
              {/* Text lines */}
              <rect x="110" y="80" width="30" height="4" rx="2" fill="#E5E7EB"/>
              <rect x="110" y="90" width="25" height="4" rx="2" fill="#E5E7EB"/>
              <rect x="110" y="100" width="28" height="4" rx="2" fill="#E5E7EB"/>
              {/* Image placeholder 2 */}
              <rect x="60" y="120" width="40" height="35" rx="4" fill="#34D399"/>
              <circle cx="70" cy="135" r="5" fill="white"/>
              {/* More text */}
              <rect x="110" y="125" width="30" height="4" rx="2" fill="#E5E7EB"/>
              <rect x="110" y="135" width="25" height="4" rx="2" fill="#E5E7EB"/>
              <rect x="110" y="145" width="28" height="4" rx="2" fill="#E5E7EB"/>
            </svg>
          </div>

          <h2 className="blog-empty-title">Write a blog post</h2>
          <p className="blog-empty-description">
            Blog posts are a great way to build a community around your products<br />
            and your brand.
          </p>

          <div className="blog-empty-actions">
            <button className="blog-learn-btn" onClick={() => alert('Learn more: This would open documentation about creating and managing blog posts.')}>Learn more</button>
            <button className="blog-create-btn" onClick={() => alert('Create blog post: This would open a rich text editor to write and publish a new blog post.')}>Create blog post</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPosts;

