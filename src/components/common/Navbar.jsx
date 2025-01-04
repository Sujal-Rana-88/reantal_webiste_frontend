import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { ThemeToggle } from "../ThemeToggle";

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dropdownRef = useRef(null);
  const sidebarRef = useRef(null);
  const sidebarToggleRef = useRef(null);
  const [home, setHome] = useState(false);
  const [about, setAbout] = useState(false);
  const [services, setServices] = useState(false);
  const [contact, setContact] = useState(false);

  const path = useLocation();

  const profileUrl = localStorage.getItem('profilePicture');

  useEffect(() => {
    
    // Update active link styles based on path
    setHome(path.pathname === "/home");
    setAbout(path.pathname === "/about");
    setServices(path.pathname === "/services");
    setContact(path.pathname === "/contact");

    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !sidebarToggleRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !sidebarToggleRef.current.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [path]);

  const handleClick = () => {
    navigate("/profile");
  };

  return (
    <nav className="flex items-center justify-between fixed top-0 left-0 w-full bg-white shadow-md z-50 px-4 py-2 dark:bg-gray-800 text-black dark:text-white">
      <div className="flex items-center space-x-4">
        <a href="/home" className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="h-12" />
          <span className="text-2xl font-semibold text-gray-800 dark:text-white">
            Horizan Games
          </span>
        </a>
      </div>

      <div className="flex items-center space-x-4">
        {/* Sidebar Toggle */}
        <button
          ref={sidebarToggleRef}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="inline-flex items-center justify-center p-2 text-gray-500 rounded-lg focus:outline-none md:hidden dark:text-white"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 12h18M3 6h18M3 18h18"></path>
          </svg>
        </button>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Links for larger screens */}
        <ul className="hidden md:flex md:space-x-8">
          <li className={home ? "border-b-2 border-blue-700" : ""}>
            <Link
              className="block py-2 px-3 rounded md:p-0 hover:text-blue-700 dark:hover:text-blue-500"
              to="/home"
            >
              Home
            </Link>
          </li>
          <li className={about ? "border-b-2 border-blue-700" : ""}>
            <Link
              className="block py-2 px-3 rounded md:p-0 hover:text-blue-700 dark:hover:text-blue-500"
              to="/about"
            >
              About
            </Link>
          </li>
          <li className={services ? "border-b-2 border-blue-700" : ""}>
            <Link
              className="block py-2 px-3 rounded md:p-0 hover:text-blue-700 dark:hover:text-blue-500"
              to="/services"
            >
              Services
            </Link>
          </li>
          <li className={contact ? "border-b-2 border-blue-700" : ""}>
            <Link
              className="block py-2 px-3 rounded md:p-0 hover:text-blue-700 dark:hover:text-blue-500"
              to="/contact"
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* User Dropdown */}
        <button
          onClick={handleClick}
          className="relative flex items-center text-sm bg-gray-800 rounded-full focus:outline-none"
        >
          <img
            src={profileUrl ? profileUrl : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"}
            alt="User"
            className="w-8 h-8 rounded-full"
          />
        </button>
      </div>

      {/* Sidebar for smaller screens */}
      {sidebarOpen && (
        <div
          ref={sidebarRef}
          className="fixed right-0 mt-14 w-48 bg-white shadow-lg z-50 top-0 dark:bg-gray-800"
        >
          <ul className="py-2">
            <li>
              <Link
                to="/home"
                className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                About us
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
