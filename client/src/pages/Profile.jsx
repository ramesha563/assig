
// //client/src/pages/profile.jsx

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FaUser, FaIdBadge, FaCog } from "react-icons/fa";
// import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import "./Profile.css";

// // ✅ Import backendURL
// import { backendURL } from "../App";

// const Profile = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [updated, setUpdated] = useState({ name: "", email: "", number: "", age: "", image: null });
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [isEditing, setIsEditing] = useState(false);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await axios.get(`${backendURL}api/auth/profile`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setUser(res.data);
//         localStorage.setItem("user", JSON.stringify(res.data));
//         setUpdated({
//           name: res.data.name || "",
//           email: res.data.email || "",
//           number: res.data.number || "",
//           age: res.data.age?.toString() || "",
//           image: null,
//         });
//       } catch (err) {
//         console.error("Fetch error:", err);
//         toast.error("Please login again.");
//       }
//     };
//     fetchProfile();
//   }, [token]);

//   const handleChange = (e) => {
//     if (e.target.name === "image") {
//       setUpdated({ ...updated, image: e.target.files[0] });
//     } else {
//       setUpdated({ ...updated, [e.target.name]: e.target.value });
//     }
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("name", updated.name);
//     formData.append("email", updated.email);
//     formData.append("number", updated.number);
//     formData.append("age", updated.age);
//     if (updated.image) {
//       formData.append("image", updated.image);
//     }
//     try {
//       const res = await axios.put(`${backendURL}/api/auth/update`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       toast.success("Profile updated!");
//       setUser(res.data);
//       localStorage.setItem("user", JSON.stringify(res.data));
//       window.dispatchEvent(new Event("userChanged"));
//       setIsEditing(false);
//     } catch (err) {
//       console.error("Update error:", err);
//       toast.error("Update failed.");
//     }
//   };

//   const handleLogout = () => {
//     const confirmed = window.confirm("Are you sure you want to logout?");
//     if (!confirmed) return;

//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     toast.success("Logout successful!");
//     setTimeout(() => {
//       navigate("/login");
//     }, 1900);
//   };

//   if (!user) return <p>Loading profile...</p>;

//   return (
//     <div className="profile-dashboard">
//       <ToastContainer position="top-right" autoClose={1000} />

//       <div className="sidebar">
//         <ul>
//           <li className={activeTab === "dashboard" ? "active" : ""} onClick={() => setActiveTab("dashboard")}> <FaUser /><span>Dashboard</span> </li>
//           <li className={activeTab === "profile" ? "active" : ""} onClick={() => setActiveTab("profile")}> <FaIdBadge /><span>Profile</span> </li>
//           <li className={activeTab === "settings" ? "active" : ""} onClick={() => setActiveTab("settings")}> <FaCog /><span>Settings</span> </li>
//         </ul>
//       </div>

//       <div className="main-content">
//         {activeTab === "dashboard" && <h2>Welcome, {user.name}!</h2>}

//         {activeTab === "profile" && (
//           <div className="profile-card">
//             <img
//               src={user?.image ? user.image : "/default-avatar.png"}
//               alt="Profile"
//             />

//             {!isEditing ? (
//               <>
//                 <p><strong>Name:</strong> {user.name}</p>
//                 <p><strong>Email:</strong> {user.email}</p>
//                 <p><strong>Number:</strong> {user.number}</p>
//                 <p><strong>Age:</strong> {user.age}</p>
//                 <button className="edit-btn" onClick={() => setIsEditing(true)}>
//                   Edit
//                 </button>
//               </>
//             ) : (
//               <>
//                 <h3>Edit Profile</h3>
//                 <form onSubmit={handleUpdate} encType="multipart/form-data">
//                   <input
//                     type="text"
//                     name="name"
//                     value={updated.name}
//                     onChange={handleChange}
//                     placeholder="Name"
//                   />
//                   <input
//                     type="email"
//                     name="email"
//                     value={updated.email}
//                     onChange={handleChange}
//                     placeholder="Email"
//                   />
//                   <input
//                     type="text"
//                     name="number"
//                     value={updated.number}
//                     onChange={handleChange}
//                     placeholder="Phone Number"
//                   />
//                   <input
//                     type="number"
//                     name="age"
//                     value={updated.age}
//                     onChange={handleChange}
//                     placeholder="Age"
//                   />
//                   <input
//                     type="file"
//                     name="image"
//                     accept="image/*"
//                     onChange={handleChange}
//                   />
//                   <button type="submit">Save</button>
//                 </form>
//               </>
//             )}

//             <button className="logout-btn" onClick={handleLogout}>
//               Logout
//             </button>
//           </div>
//         )}

//         {activeTab === "settings" && (
//           <div className="profile-card">
//             <h3>Settings</h3>
//             <p>Theme: Light/Dark (Coming soon...)</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaIdBadge, FaCog } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./Profile.css";
import { backendURL } from "../App";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [updated, setUpdated] = useState({
    name: "", email: "", number: "", age: "", image: null,
  });
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isEditing, setIsEditing] = useState(false);

  const token = localStorage.getItem("token");

  // 🔄 Fetch user profile
  useEffect(() => {
    if (!token) {
      toast.error("Please login first.");
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = res.data.user || res.data; // depends on backend shape

        setUser(userData);
        setUpdated({
          name: userData.name || "",
          email: userData.email || "",
          number: userData.number || "",
          age: userData.age?.toString() || "",
          image: null,
        });
        localStorage.setItem("user", JSON.stringify(userData));
      } catch (err) {
        console.error("Fetch error:", err);
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
    };

    fetchProfile();
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setUpdated({ ...updated, image: files[0] });
    } else {
      setUpdated({ ...updated, [name]: value });
    }
  };

  // 🔄 Update profile
  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", updated.name);
    formData.append("email", updated.email);
    formData.append("number", updated.number);
    formData.append("age", updated.age);
    if (updated.image) formData.append("image", updated.image);

    try {
      const res = await axios.put(`${backendURL}/api/auth/update`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const updatedUser = res.data.user || res.data;
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success("Profile updated!");
      setIsEditing(false);
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Update failed.");
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.success("Logout successful!");
      setTimeout(() => navigate("/login"), 1500);
    }
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="profile-dashboard">
      <ToastContainer position="top-right" autoClose={1000} />
      <div className="sidebar">
        <ul>
          <li className={activeTab === "dashboard" ? "active" : ""} onClick={() => setActiveTab("dashboard")}>
            <FaUser /><span>Dashboard</span>
          </li>
          <li className={activeTab === "profile" ? "active" : ""} onClick={() => setActiveTab("profile")}>
            <FaIdBadge /><span>Profile</span>
          </li>
          <li className={activeTab === "settings" ? "active" : ""} onClick={() => setActiveTab("settings")}>
            <FaCog /><span>Settings</span>
          </li>
        </ul>
      </div>

      <div className="main-content">
        {activeTab === "dashboard" && <h2>Welcome, {user.name}!</h2>}

        {activeTab === "profile" && (
          <div className="profile-card">
            <img src={user.image || "/default-avatar.png"} alt="Profile" />
            {!isEditing ? (
              <>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Number:</strong> {user.number}</p>
                <p><strong>Age:</strong> {user.age}</p>
                <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
              </>
            ) : (
              <>
                <h3>Edit Profile</h3>
                <form onSubmit={handleUpdate} encType="multipart/form-data">
                  <input type="text" name="name" value={updated.name} onChange={handleChange} placeholder="Name" />
                  <input type="email" name="email" value={updated.email} onChange={handleChange} placeholder="Email" />
                  <input type="text" name="number" value={updated.number} onChange={handleChange} placeholder="Phone Number" />
                  <input type="number" name="age" value={updated.age} onChange={handleChange} placeholder="Age" />
                  <input type="file" name="image" accept="image/*" onChange={handleChange} />
                  <button type="submit">Save</button>
                </form>
              </>
            )}

            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="profile-card">
            <h3>Settings</h3>
            <p>Theme: Light/Dark (Coming soon...)</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
