import { Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Ambientes from './pages/Ambientes/page'
import Historico from './pages/Historico/page'
import Dashboard from './pages/Dashboard/page'
import Reservas from './pages/Reservas/page'


function App() {


  return (
 <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<Reservas />} />
          <Route path="/ambientes" element={<Ambientes />} />
          <Route path="/historico" element={<Historico />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
        </Routes>
      </div>
    </div>

  )
}

export default App
