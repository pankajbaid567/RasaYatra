import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, MoreHorizontal, Edit, Trash2, Clock } from 'lucide-react';
import api from '../services/api';

const PostCard = ({ post, onLike, onDelete, currentUser, isAuthenticated }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);

  const isLiked = post.postLikes?.some(like => like.userId === currentUser?.id) || false;
  const isOwner = currentUser?.id === post.author.id;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const handleLoadComments = async () => {
    if (!showComments) {
      try {
        setCommentsLoading(true);
        const response = await api.getPostComments(post.id);
        setComments(response.comments);
      } catch (error) {
        console.error('Error loading comments:', error);
      } finally {
        setCommentsLoading(false);
      }
    }
    setShowComments(!showComments);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !isAuthenticated) return;

    try {
      const response = await api.addCommentToPost(post.id, newComment);
      setComments([response.data.comment, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: post.title,
        text: post.content,
        url: window.location.href
      });
    } catch (error) {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <motion.div 
      className="post-card"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {/* Post Header */}
      <div className="post-header">
        <div className="post-author">
          <div className="author-avatar">
            {post.author.name.charAt(0).toUpperCase()}
          </div>
          <div className="author-info">
            <h4 className="author-name">{post.author.name}</h4>
            <span className="post-time">
              <Clock size={14} />
              {formatDate(post.createdAt)}
            </span>
          </div>
        </div>
        
        {isOwner && (
          <div className="post-menu">
            <button 
              className="menu-trigger"
              onClick={() => setShowMenu(!showMenu)}
            >
              <MoreHorizontal size={20} />
            </button>
            {showMenu && (
              <div className="menu-dropdown">
                <button className="menu-item edit">
                  <Edit size={16} />
                  Edit
                </button>
                <button 
                  className="menu-item delete"
                  onClick={() => {
                    setShowMenu(false);
                    onDelete();
                  }}
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Post Content */}
      <div className="post-content">
        <h3 className="post-title">{post.title}</h3>
        <p className="post-text">{post.content}</p>
        
        {post.image && (
          <div className="post-image">
            <img src={post.image} alt={post.title} />
          </div>
        )}

        {/* Recipe Card if included */}
        {post.recipe && (
          <div className="recipe-card">
            <h4>📝 Recipe Included</h4>
            <p><strong>Prep Time:</strong> {post.recipe.prepTime} mins</p>
            <p><strong>Cook Time:</strong> {post.recipe.cookTime} mins</p>
            <p><strong>Serves:</strong> {post.recipe.servings}</p>
          </div>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="post-tags">
            {post.tags.map((tag, index) => (
              <span key={index} className="tag">#{tag}</span>
            ))}
          </div>
        )}
      </div>

      {/* Post Actions */}
      <div className="post-actions">
        <button 
          className={`action-btn like-btn ${isLiked ? 'liked' : ''}`}
          onClick={onLike}
          disabled={!isAuthenticated}
        >
          <Heart size={20} fill={isLiked ? '#E65100' : 'none'} />
          <span>{post.likes || 0}</span>
        </button>
        
        <button 
          className="action-btn comment-btn"
          onClick={handleLoadComments}
        >
          <MessageCircle size={20} />
          <span>{post._count?.comments || 0}</span>
        </button>
        
        <button 
          className="action-btn share-btn"
          onClick={handleShare}
        >
          <Share2 size={20} />
          <span>Share</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="comments-section">
          {/* Add Comment Form */}
          {isAuthenticated && (
            <form className="add-comment-form" onSubmit={handleAddComment}>
              <input
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="comment-input"
              />
              <button 
                type="submit" 
                className="comment-submit"
                disabled={!newComment.trim()}
              >
                Post
              </button>
            </form>
          )}

          {/* Comments List */}
          {commentsLoading ? (
            <div className="comments-loading">Loading comments...</div>
          ) : (
            <div className="comments-list">
              {comments.map((comment) => (
                <div key={comment.id} className="comment">
                  <div className="comment-avatar">
                    {comment.user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="comment-content">
                    <div className="comment-header">
                      <span className="comment-author">{comment.user.name}</span>
                      <span className="comment-time">{formatDate(comment.createdAt)}</span>
                    </div>
                    <p className="comment-text">{comment.content}</p>
                  </div>
                </div>
              ))}
              {comments.length === 0 && (
                <div className="no-comments">
                  <p>No comments yet. Be the first to comment!</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default PostCard;