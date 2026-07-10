import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiMenuAlt2, HiBell, HiSearch } from 'react-icons/hi'

export default function Navbar({ onMenuToggle }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onMenuToggle}
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700"
            >
              <HiMenuAlt2 className="w-6 h-6" />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                FlowDash
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <HiSearch className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none w-48 placeholder-gray-400"
              />
            </div>

            <button className="relative p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
              <HiBell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            <div className="relative">
              <button
                onClick={() => setDropdownOpen((o) => !o)}
                className="flex text-sm rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              >
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  alt="user"
                />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 dark:bg-gray-700 dark:border-gray-600 z-50">
                  <div className="px-4 py-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Neil Sims</p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">neil@flowdash.com</p>
                  </div>
                  <ul className="py-1 border-t border-gray-100 dark:border-gray-600">
                    <li>
                      <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600">
                        Settings
                      </Link>
                    </li>
                    <li>
                      <Link to="/sign-in" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600">
                        Sign out
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
