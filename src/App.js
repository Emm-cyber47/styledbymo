import React, { useState, useEffect } from 'react';
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import axios from "axios";

const App = () => {
  const [content, setContent] = useState({
    hero_header: '',
    services_1: '',
    services_2: '',
    services_3: '',
    owner: '',
    about: '',
    footer_1: '',
    footer_2: '',
    footer_3: ''
  });

  // Fetch content from the PHP backend on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost/PHP-BACKEND/getContent.php'); // Using relative URL
        console.log(response.data); // Check the response structure
        
        // Assuming response data has the expected structure
        setContent(response.data);
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div>
      <Navbar />
      <Header title={content.hero_header || 'Loading...'} />
      <Main 
        services_1={content.services_1 || 'Loading...'} 
        services_2={content.services_2 || 'Loading...'} 
        services_3={content.services_3 || 'Loading...'} 
        about={content.about || 'Loading...'}  
        owner={content.owner || 'Loading...'}  
      />
      <Footer 
        footer_1={content.footer_1 || 'Loading...'} 
        footer_2={content.footer_2 || 'Loading...'} 
        footer_3={content.footer_3 || 'Loading...'} 
      />
    </div>
  );
};

export default App;
