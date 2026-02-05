import { Outlet } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar.tsx'
import { Footer } from '@/components/layout/Footer.tsx'

export function App() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
