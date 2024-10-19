function About({ about }) {
  return (
    <>
      <div style={{ marginTop: '15rem', width: '100%', height: '10px' }} className="about-scroll"></div>

      <div className="container about">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="about-image-wrapper">
              <img alt="about" src="./img/2.jpg" className="about-image img-fluid" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="about-text">
              <h2 className="main-title about-h2">ABOUT US</h2>
              <p className="main-p">{about || 'Loading'}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;




