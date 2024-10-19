import React from 'react';
import About from '../components/About';
import Services from '../components/Services';
import Contact from '../components/Contact';

function Main({ services_1, image_path_1, services_2, image_path_2, services_3, image_path_3, services_4, image_path_4, services_5, image_path_5, services_6, image_path_6, about }) {
  return (
    <main>
      <Services services_1={services_1} image_path_1={image_path_1} services_2={services_2} image_path_2={image_path_2} services_3={services_3} image_path_3={image_path_3} services_4={services_4} image_path_4={image_path_4} services_5={services_5} image_path_5={image_path_5} services_6={services_6} image_path_6={image_path_6}/>
      <About about={about} />
      <Contact />
    </main>
  );
}

export default Main;
