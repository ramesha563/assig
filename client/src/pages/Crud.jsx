

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Crud.css';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { FaHeading, FaAlignLeft, FaTag, FaEdit, FaTrash } from 'react-icons/fa';
// import { Link, useNavigate } from 'react-router-dom';

// const Crud = () => {
//   const [posts, setPosts] = useState([]);
//   const [formData, setFormData] = useState({ title: '', content: '', category: '' });
//   const [editingId, setEditingId] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [authMessage, setAuthMessage] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     setIsLoggedIn(!!token);
//     fetchPosts();
//   }, []);

//   const fetchPosts = async () => {
//     try {
//       const res = await axios.get('http://localhost:5050/api/posts');
//       setPosts(res.data);
//     } catch (err) {
//       toast.error('Failed to fetch posts');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');

//     if (!token) {
//       setAuthMessage('⚠️ You must login to add or update posts.');
//       return;
//     }

//     try {
//       const config = {
//         headers: { Authorization: `Bearer ${token}` },
//       };

//       if (editingId) {
//         await axios.put(`http://localhost:5050/api/posts/${editingId}`, formData, config);
//         toast.success('Post updated successfully');
//       } else {
//         await axios.post('http://localhost:5050/api/posts', formData, config);
//         toast.success('Post added successfully');
//       }

//       setFormData({ title: '', content: '', category: '' });
//       setEditingId(null);
//       setAuthMessage('');
//       fetchPosts();
//     } catch (err) {
//       toast.error('Submit failed');
//     }
//   };

//   const handleEdit = (post) => {
//     setFormData({ title: post.title, content: post.content, category: post.category });
//     setEditingId(post._id);
//     setAuthMessage('');
//   };

//   const handleDelete = async (id) => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       setAuthMessage('⚠️ You must login to delete posts.');
//       return;
//     }

//     try {
//       await axios.delete(`http://localhost:5050/api/posts/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success('Post deleted');
//       setAuthMessage('');
//       fetchPosts();
//     } catch (err) {
//       toast.error('Delete failed');
//     }
//   };

//   return (
//     <div className="crud-container">
//       <ToastContainer position="top-right" autoClose={3000} />

//       <form onSubmit={handleSubmit} className="crud-form">
//         <img src="/post.gif" alt="post Animation" className="post-gif" />

//         {authMessage && (
//           <div className="auth-warning">
//             {authMessage} <Link to="/login" className="login-link">Login</Link>
//           </div>
//         )}

//         <div className="input-group">
//           <FaHeading className="icon" />
//           <input
//             type="text"
//             placeholder="Title"
//             value={formData.title}
//             onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//             required
//           />
//         </div>

//         <div className="input-group">
//           <FaAlignLeft className="icon" />
//           <textarea
//             placeholder="Content"
//             value={formData.content}
//             onChange={(e) => setFormData({ ...formData, content: e.target.value })}
//             required
//             rows="4"
//           />
//         </div>

//         <div className="input-group">
//           <FaTag className="icon" />
//           <input
//             type="text"
//             placeholder="Category"
//             value={formData.category}
//             onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//             required
//           />
//         </div>

//         <button type="submit">
//           {editingId ? 'Update' : 'Add'}
//         </button>
//       </form>

//       <div className="posts-list">
//         {posts.map((post) => (
//           <div key={post._id} className="post-item">
//             <h3>{post.title}</h3>
//             <p>{post.content}</p>
//             <p><strong>Category:</strong> {post.category}</p>
//             {isLoggedIn && (
//               <>
//                 <button className="edit-btn" onClick={() => handleEdit(post)}>
//                   <FaEdit style={{ marginRight: '6px' }} />
//                   Edit
//                 </button>
//                 <button className="delete-btn" onClick={() => handleDelete(post._id)}>
//                   <FaTrash style={{ marginRight: '6px' }} />
//                   Delete
//                 </button>
//               </>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Crud;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Crud.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaHeading, FaAlignLeft, FaTag, FaEdit, FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { backendURL } from '../App';

// ✅ Using your environment variable
const BASE_URL = import.meta.env.VITE_API_URL;

const Crud = () => {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({ title: '', content: '', category: '' });
  const [editingId, setEditingId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMessage, setAuthMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${backendURL}api/posts`);
      setPosts(res.data);
    } catch (err) {
      toast.error('Failed to fetch posts');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      setAuthMessage('⚠️ You must login to add or update posts.');
      return;
    }

    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      if (editingId) {
        await axios.put(`${BASE_URL}api/posts/${editingId}`, formData, config);
        toast.success('Post updated successfully');
      } else {
        await axios.post(`${BASE_URL}api/posts`, formData, config);
        toast.success('Post added successfully');
      }

      setFormData({ title: '', content: '', category: '' });
      setEditingId(null);
      setAuthMessage('');
      fetchPosts();
    } catch (err) {
      toast.error('Submit failed');
    }
  };

  const handleEdit = (post) => {
    setFormData({ title: post.title, content: post.content, category: post.category });
    setEditingId(post._id);
    setAuthMessage('');
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setAuthMessage('⚠️ You must login to delete posts.');
      return;
    }

    try {
      await axios.delete(`${BASE_URL}api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Post deleted');
      setAuthMessage('');
      fetchPosts();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="crud-container">
      <ToastContainer position="top-right" autoClose={3000} />

      <form onSubmit={handleSubmit} className="crud-form">
        <img src="/post.gif" alt="post Animation" className="post-gif" />

        {authMessage && (
          <div className="auth-warning">
            {authMessage} <Link to="/login" className="login-link">Login</Link>
          </div>
        )}

        <div className="input-group">
          <FaHeading className="icon" />
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div className="input-group">
          <FaAlignLeft className="icon" />
          <textarea
            placeholder="Content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            required
            rows="4"
          />
        </div>

        <div className="input-group">
          <FaTag className="icon" />
          <input
            type="text"
            placeholder="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          />
        </div>

        <button type="submit">
          {editingId ? 'Update' : 'Add'}
        </button>
      </form>

      <div className="posts-list">
        {posts.map((post) => (
          <div key={post._id} className="post-item">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p><strong>Category:</strong> {post.category}</p>
            {isLoggedIn && (
              <>
                <button className="edit-btn" onClick={() => handleEdit(post)}>
                  <FaEdit style={{ marginRight: '6px' }} />
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(post._id)}>
                  <FaTrash style={{ marginRight: '6px' }} />
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Crud;
