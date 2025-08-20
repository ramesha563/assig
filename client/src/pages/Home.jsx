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
import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Our Website</h1>
          <p>Your one-stop solution for modern web applications</p>
          <button className="btn">Get Started</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Our Features</h2>
        <div className="feature-list">
          <div className="feature-card">
            <h3>🚀 Fast</h3>
            <p>Experience blazing fast performance with optimized code.</p>
          </div>
          <div className="feature-card">
            <h3>🔒 Secure</h3>
            <p>We care about your data with top-notch security features.</p>
          </div>
          <div className="feature-card">
            <h3>⚡ Reliable</h3>
            <p>Always available with high uptime and smooth experience.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
