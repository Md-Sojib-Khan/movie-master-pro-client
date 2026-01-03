// Layouts/DashboardLayout.jsx
import React, { useContext, useState } from 'react';
import { Outlet, Link, NavLink } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import { 
  FaFilm, 
  FaPlusCircle, 
  FaHeart, 
  FaBars, 
  FaTimes,
  FaTachometerAlt,
  FaHome,
  FaSignOutAlt,
  FaArrowLeft
} from 'react-icons/fa';
import Navbar from '../Components/Navbar';

const DashboardLayout = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logOutUser();
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Menu items - minimum 2 items
  const menuItems = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: <FaTachometerAlt />,
      exact: true
    },
    {
      path: '/dashboard/add-movie',
      label: 'Add Movie',
      icon: <FaPlusCircle />
    },
    {
      path: '/dashboard/my-collection',
      label: 'My Collection',
      icon: <FaFilm />
    },
    {
      path: '/dashboard/my-wishlist',
      label: 'My Wishlist',
      icon: <FaHeart />
    }
  ];

  return (
    <div className="min-h-screen bg-base-100 flex">
      {/* Sidebar - Always visible on all devices */}
      <div className={`
        fixed lg:static top-0 left-0 bottom-0 w-64 bg-base-100 border-r border-base-300 
        transform transition-transform duration-300 ease-in-out z-40
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:block
      `}>
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-base-300 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg">
                <span className="text-white font-bold">M</span>
              </div>
              <span className="text-lg font-bold">MovieMaster Pro</span>
            </Link>
            
            {/* Close button for mobile */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="btn btn-ghost btn-circle lg:hidden"
            >
              <FaTimes />
            </button>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-base-300">
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="w-10 rounded-full">
                  <img 
                    src={user?.photoURL || 'https://via.placeholder.com/150'} 
                    alt={user?.displayName || 'User'} 
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{user?.displayName || 'User'}</h3>
                <p className="text-xs opacity-70 truncate">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Menu items */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="menu menu-lg space-y-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.exact}
                    className={({ isActive }) =>
                      `flex items-center gap-3 py-3 rounded-lg ${isActive ? 'bg-primary text-primary-content font-semibold' : 'hover:bg-base-200'}`
                    }
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-base-300 space-y-3">
            <Link 
              to="/" 
              className="btn btn-outline btn-block gap-2"
              onClick={() => setSidebarOpen(false)}
            >
              <FaHome />
              Back to Home
            </Link>
            
            <button 
              onClick={handleLogout}
              className="btn btn-error btn-block gap-2"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-30 bg-base-100 border-b border-base-300">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="btn btn-ghost btn-circle"
            >
              <FaBars />
            </button>
            
            <Link to="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg">
                <span className="text-white font-bold">M</span>
              </div>
              <span className="text-lg font-bold">Dashboard</span>
            </Link>
            
            <div className="w-10"></div> {/* Spacer */}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Outlet />
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-base-100 border-t border-base-300 z-30">
          <div className="flex justify-around items-center h-16">
            {menuItems.slice(0, 4).map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center w-full h-full ${isActive ? 'text-primary' : 'text-base-content'}`
                }
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-xs mt-1">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Add padding for bottom nav on mobile */}
        <div className="lg:hidden h-16"></div>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;