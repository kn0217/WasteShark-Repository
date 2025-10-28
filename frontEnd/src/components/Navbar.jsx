import { Link } from "react-router-dom"
import { ReactComponent as WasteSharkLogo } from '../assets/logo_transparent.svg'

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-6 bg-navy text-white shadow-md">
      {/* Logo Section */}
      <div className="flex items-center">
        <WasteSharkLogo className="h-10 w-10 mr-3" />
        <span className="text-2xl font-bold">WasteShark</span>
      </div>

      {/* Navigation Links */}
      <div className="flex-1">
        <Link to="/" className="nav-item mr-6">Home</Link>
        <Link to="/login" className="nav-item">Login</Link>
      </div> {/* Spacer to push links to the right */}
    </nav>
  )
}

export default Navbar
