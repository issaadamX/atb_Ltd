import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login'
import Dashboard from './pages/Dashboard'
import Portfolio from './pages/Portfolio'
import Appointments from './pages/Appointments'
import Inquiries from './pages/Inquiries'
import Content from './pages/Content'
import Settings from './pages/Settings'
import ProtectedRoute from './components/ProtectedRoute'
import AdminLayout from './components/AdminLayout'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={
          <ProtectedRoute>
            <AdminLayout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/inquiries" element={<Inquiries />} />
                <Route path="/content" element={<Content />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </AdminLayout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App
