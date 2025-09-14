import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Heart, MessageCircle, Share2, MoreHorizontal, Edit, Trash2, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import CreatePostModal from '../components/CreatePostModal';
import PostCard from '../components/PostCard';
import '../styles/pages/Community.css';

const CommunityPage = () => {
  const { user, isAuthenticated } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [filter, setFilter] = useState('all'); // all, following, popular

  useEffect(() => {
    fetchPosts();
  }, [currentPage, filter]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 10,
      };

      const response = await api.getCommunityPosts(params);
      setPosts(response.posts);
      setPagination(response.pagination);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (postData) => {
    try {
      await api.createCommunityPost(postData);
      setShowCreateModal(false);
      fetchPosts(); // Refresh posts
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleLikePost = async (postId) => {
    if (!isAuthenticated) return;

    try {
      await api.likeCommunityPost(postId);
      // Update the post in the local state
      setPosts(posts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              likes: post.postLikes.some(like => like.userId === user.id) 
                ? post.likes - 1 
                : post.likes + 1,
              postLikes: post.postLikes.some(like => like.userId === user.id)
                ? post.postLikes.filter(like => like.userId !== user.id)
                : [...post.postLikes, { userId: user.id }]
            }
          : post
      ));
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await api.deleteCommunityPost(postId);
      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleLoadMore = () => {
    if (pagination && currentPage < pagination.pages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="community-page">
      {/* Hero Section */}
      <section className="community-hero">
        <div className="container">
          <motion.div
            className="community-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="community-title">Community Kitchen</h1>
            <p className="community-description">
              Share your culinary creations, discover new recipes, and connect with food lovers from around the world.
            </p>
            {isAuthenticated && (
              <button 
                className="create-post-btn"
                onClick={() => setShowCreateModal(true)}
              >
                <Plus size={20} />
                Share Your Recipe
              </button>
            )}
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="community-filters">
        <div className="container">
          <div className="filter-tabs">
            <button 
              className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Posts
            </button>
            <button 
              className={`filter-tab ${filter === 'popular' ? 'active' : ''}`}
              onClick={() => setFilter('popular')}
            >
              Popular
            </button>
            <button 
              className={`filter-tab ${filter === 'recent' ? 'active' : ''}`}
              onClick={() => setFilter('recent')}
            >
              Recent
            </button>
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <section className="community-posts">
        <div className="container">
          {loading && currentPage === 1 ? (
            <div className="loading-spinner">Loading posts...</div>
          ) : (
            <div className="posts-grid">
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <PostCard
                    post={post}
                    onLike={() => handleLikePost(post.id)}
                    onDelete={() => handleDeletePost(post.id)}
                    currentUser={user}
                    isAuthenticated={isAuthenticated}
                  />
                </motion.div>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {pagination && currentPage < pagination.pages && (
            <div className="load-more-section">
              <button 
                className="load-more-btn"
                onClick={handleLoadMore}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Load More Posts'}
              </button>
            </div>
          )}

          {posts.length === 0 && !loading && (
            <div className="no-posts">
              <User size={64} />
              <h3>No posts yet</h3>
              <p>Be the first to share your culinary creation!</p>
              {isAuthenticated && (
                <button 
                  className="create-first-post-btn"
                  onClick={() => setShowCreateModal(true)}
                >
                  Create First Post
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Create Post Modal */}
      {showCreateModal && (
        <CreatePostModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreatePost}
        />
      )}
    </div>
  );
};

export default CommunityPage;