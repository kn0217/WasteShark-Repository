import { Link, useResolvedPath, useMatch} from "react-router-dom"

const Navbar = () => {
  return <nav className="navbar">
    <Link to="/" className="navbar-brand">
      WasteShark
    </Link>
    
    <Link to="/" className="nav-item">
      Home  
    </Link>

    <Link to="/login" className="nav-item">
      Login
    </Link>
  </nav>
}

export default Navbar
