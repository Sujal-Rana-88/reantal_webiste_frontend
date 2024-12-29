import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dropdownRef = useRef(null);
  const sidebarRef = useRef(null);
  const sidebarToggleRef = useRef(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const name = localStorage.getItem("user_name");
  const email = localStorage.getItem("email");
  const [home, setHome] = useState(false);
  const [about, setAbout] = useState(false);
  const [services, setServices] = useState(false);
  const [contact, setContact] = useState(false);

  const handleSidebarItemClick = (itemName) => {
    console.log(`Clicked ${itemName}`);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
    if (sidebarOpen) setSidebarOpen(false); // Close sidebar if open
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
    if (dropdownOpen) setDropdownOpen(false);
  };

  const path = useLocation();

  useEffect(() => {
    if (path.pathname === "/home") {
      setHome(true);
      setAbout(false);
      setServices(false);
      setContact(false);
    } else if (path.pathname === "/about") {
      setHome(false);
      setAbout(true);
      setServices(false);
      setContact(false);
    } else if (path.pathname === "/services") {
      setHome(false);
      setAbout(false);
      setServices(true);
      setContact(false);
    } else if (path.pathname === "/contact") {
      setHome(false);
      setAbout(false);
      setServices(false);
      setContact(true);
    }

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
  }, []);

  // const confirmLogout = () => {
  //   setShowLogoutModal(false);
  //   localStorage.removeItem("isAuthenticated");
  //   localStorage.removeItem("user_name");
  //   localStorage.removeItem("email");
  //   localStorage.removeItem("token");
  
  //   // Replace the current route with the homepage
  //   navigate("/", { replace: true });
  // };
  const handleClick = () => {
    navigate("/profile");
  };

  return (
    <>
      <nav className="flex items-center justify-between fixed top-0 left-0  w-full bg-white shadow-md z-50 px-4 py-2">
        <div className="flex items-center space-x-4">
          <a href="/home" className="flex items-center space-x-3">
            <img src={logo} alt="Logo" className="h-12" />
            <span className="text-2xl font-semibold text-gray-800">
              Horizan Games
            </span>
          </a>
        </div>

        <div className="flex items-center space-x-4">
          {/* Sidebar Toggle */}
          <button
            ref={sidebarToggleRef}
            onClick={toggleSidebar}
            className="inline-flex items-center justify-center p-2 text-gray-500 rounded-lg focus:outline-none md:hidden"
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

          {/* Links for larger screens */}
          <ul className="hidden md:flex md:space-x-8">
            <li className={home ? "border-b-2 border-blue-700" : ""}>
              <Link
                className="block py-2 px-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                to="/home"
              >
                Home
              </Link>
            </li>
            <li className={about ? "border-b-2 border-blue-700" : ""}>
              <Link
                className="block py-2 px-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                to="/about"
              >
                About
              </Link>
            </li>
            <li className={services ? "border-b-2 border-blue-700" : ""}>
              <Link
                className="block py-2 px-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                to="/services"
              >
                Services
              </Link>
            </li>
            {/* <li>
              <Link
                className="block py-2 px-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                to="/pricing"
              >
                Pricing
              </Link>
            </li> */}
            <li className={contact ? "border-b-2 border-blue-700" : ""}>
              <Link
                className="block py-2 px-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 "
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
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
              alt="User"
              className="w-8 h-8 rounded-full"
            />
            
          </button>
        </div>
      </nav>

      {/* Sidebar for smaller screens */}
      {sidebarOpen && (
  <div
    ref={sidebarRef}
    className="fixed right-0 mt-14 w-48 bg-white shadow-lg z-50 top-0"
  >
    <ul className="py-2">
      <li>
        <Link
          to="/home"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Home
        </Link>
      </li>
      <li>
        <a
          href="/about"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          About us
        </a>
      </li>
      <li>
        <a
          href="/services"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Services
        </a>
      </li>
      <li>
        <a
          href="/contact"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Contact
        </a>
      </li>
    </ul>
  </div>
)}

      
    </>
  );
};

export default Navbar;