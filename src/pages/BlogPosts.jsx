import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getBlogPosts, getStore } from '../lib/supabase-queries';
import './BlogPosts.css';

function BlogPosts() {
  const { user } = useAuth();
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [store, setStore] = useState(null);

  useEffect(() => {
    if (user) {
      loadStoreAndBlogPosts();
    }
  }, [user]);

  const loadStoreAndBlogPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      const storeData = await getStore(user.id);
      if (!storeData) {
        setError('No store found');
        setLoading(false);
        return;
      }
      setStore(storeData);

      const blogPostsData = await getBlogPosts(storeData.id);
      setBlogPosts(blogPostsData || []);
    } catch (err) {
      console.error('Error loading blog posts:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="blogposts-page">
        <div className="blogposts-loading">
          <div className="loading-spinner"></div>
          <p>Loading blog posts...</p>
        </div>
      </div>
    );
  }

  if (error || blogPosts.length === 0) {
    return (
      <div className="blogposts-page">
        <div className="blogposts-content">
          <div className="blogposts-empty-state">
            <div className="empty-state-icon">📝</div>
            <h2 className="empty-state-title">Write blog posts for your store</h2>
            <p className="empty-state-description">
              Blogs help you build community, improve SEO, and share your brand story
            </p>
            <button className="empty-state-button">Create blog post</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blogposts-page">
      <div className="blogposts-content">
        <div className="blogposts-table-section">
          <div className="table-header">
            <h2>Blog posts ({blogPosts.length})</h2>
            <button className="btn-primary">Create blog post</button>
          </div>

          <div className="blogposts-table-wrapper">
            <table className="blogposts-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Author</th>
                  <th>Published date</th>
                </tr>
              </thead>
              <tbody>
                {blogPosts.map((post) => (
                  <tr key={post.id}>
                    <td className="post-title">{post.title}</td>
                    <td>
                      <span className={`status-badge ${post.status}`}>
                        {post.status}
                      </span>
                    </td>
                    <td>{post.author || '—'}</td>
                    <td>{post.published_at ? new Date(post.published_at).toLocaleDateString() : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPosts;
