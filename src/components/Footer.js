import { Link, animateScroll as scroll } from 'react-scroll'

function Footer({footer_1, footer_2, footer_3}) {


  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="side1">
            <div className="row">
              <div className="col-md-3">
                <h1 className="logo">Why StyledByMo</h1>
                <p className="footer-text">
                  {footer_1 || 'Loading...'}
        
                </p>
              </div>
              <div className="col-md-3">
                <p className="footer-title">Navigation</p>
                <ul>
                  <li>
                  <Link   
                         spy={true}
                         smooth={true}
                         duration={1000}
                         to="headerbg"
                  > Home </Link>
                  </li>
                  <li>
                  <Link to="services" spy={true} smooth={true} duration={1000} > Services </Link>
                  </li>
                  <li>
                  <Link to="about-scroll" spy={true} smooth={true} duration={1000}>About Us  </Link>
                  </li>
                  <li>
                  <Link to="contact" spy={true} smooth={true} duration={1000}> Contact  </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="side2">
            <div className="row">
              <div className="col-md-3">
                <p className="footer-title">Contact Us</p>
                <ul>
                  <li>
                    <Link to="#" >{footer_2 || 'Loading...'}</Link>
                  </li>
                  <li>
                    <Link to="#" >{footer_2 || 'Loading...'}</Link>
                  </li>
                  <li>
                    <Link to="#" >{footer_3 || 'Loading...'}</Link>
                  </li>
                  <li>
                    <Link to="#" >+(234) 901 122 0326</Link>
                  </li>
                </ul>
              </div>
              <div className="col-md-3">
                <p className="footer-title">Follow Us On Social Media</p>
                <ul>
                  <li>
                    <a target="_blank" rel="noreferrer" href="#" >Facebook</a>
                  </li>
                  <li>
                    <a target="_blank" rel="noreferrer" href="#" >LinkedIn</a>
                  </li>
                  <li>
                    <a target="_blank" rel="noreferrer" href="#">Instagram</a>
                  </li>
                  <li>
                    <a target="_blank" rel="noreferrer" href="#">Twitter</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button onClick={() => scroll.scrollToTop(2500)} src="" className="gotop"><i className="fas fa-level-up-alt"></i></button>

    </footer>
  );
}
export default Footer;
