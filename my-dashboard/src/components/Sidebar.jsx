import { NavLink } from 'react-router-dom'
import {
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiUser,
  HiLogin,
  HiViewBoards,
} from 'react-icons/hi'

const navItems = [
  { to: '/', label: 'Dashboard', icon: HiChartPie },
  { to: '/kanban', label: 'Kanban', icon: HiViewBoards },
  { to: '/inbox', label: 'Inbox', icon: HiInbox },
  { to: '/products', label: 'Products', icon: HiShoppingBag },
  { to: '/users', label: 'Users', icon: HiUser },
  { to: '/sign-in', label: 'Sign In', icon: HiLogin },
]

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="overflow-y-auto py-5 px-3 h-full">
        <ul className="space-y-2">
          {navItems.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                end
                className={({ isActive }) =>
                  `flex items-center p-2 text-base font-medium rounded-lg group transition-colors ${
                    isActive
                      ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
                      : 'text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
                  }`
                }
              >
                <Icon className="w-6 h-6 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                <span className="ml-3">{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
