import React from 'react'
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';

function Home() {
  return (
    <div className="home">
      <Sidebar />
      <div className="home_container">
        <Navbar />
      </div>
    </div>
  );
}

export default Home