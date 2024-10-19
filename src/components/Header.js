const Header = ({title}) => {
  return (
    <header>
      <video src="./video.mp4" loop autoPlay muted></video>
      <h1>
        {title || "Loading..."}
      </h1>
      <div className="row">
        <a href="https://localhost/PHP-BACKEND/signup.php">
        <button className="btn" style={{ cursor: "pointer" }}>
          Sign Up
        </button>
        </a>
        <a href="">
        <button className="btn1" style={{ cursor: "pointer" }}>
          Log in
        </button>
        </a>
      </div>

      <div className="headerbg"></div>
    </header>
  );
}
export default Header;
