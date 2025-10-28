import { Link } from "react-router-dom"
import logo from '../assets/logo_transparent.svg'

const Navbar = () => {
    return (
    <nav className="flex items-center justify-between p-6 bg-navy text-white shadow-md">
      {/* Logo Section */}
      <div>
        <Link to="/" className="flex items-center">
          <img src={logo} alt="WasteShark Logo" className="h-10 w-10 mr-3" />
          <span className="text-xl font-bold">WasteShark</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex justify-center space-x-6">
        <div className="hover:bg-royal/100 px-3 py-2 rounded-md transition">
          <Link to="/" className="nav-item">Home</Link>
        </div>
        <div className="hover:bg-royal/100 px-3 py-2 rounded-md transition">
          <Link to="/login" className="nav-item">Login</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
