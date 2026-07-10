import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar onMenuToggle={() => setSidebarOpen((o) => !o)} />
      {sidebarOpen && <Sidebar />}
      <main className={`pt-14 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : ''}`}>
        <div className="p-4 md:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
