// // src/pages/Home.jsx
// const Home = () => {
//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Welcome to the Home Page!</h1>
//       <p>This is a public page available to all users.</p>
//     </div>
//   );
// };

// export default Home;
import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "./Home.css";

const Home = () => {
  const { user } = useContext(AuthContext); // user login hai ya nahi

  return (
    <div className="home-container">
      <h1 className="title">Welcome to My App</h1>
      <p className="subtitle">This is your home page</p>

      {/* sirf user login hoga to CRUD ka button dikhega */}
      {user ? (
        <Link to="/crud">
          <button className="crud-btn">Go to CRUD</button>
        </Link>
      ) : (
        <p className="auth-msg">Please login to access CRUD features</p>
      )}
    </div>
  );
};

export default Home;
