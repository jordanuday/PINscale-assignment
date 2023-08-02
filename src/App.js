import {Route, Routes} from 'react-router-dom'

import Login from './components/Login'
import ControlPanel from './components/ControlPanel'
import ProtectedRoute from './components/ProtectedRoute'
import Transactions from './components/Transactions' 
import ViewProfile from './components/ViewProfile'
import './App.css'

const App = () => (
  <>
    <Routes>
      <Route exact path="/" element={<ProtectedRoute element={<ControlPanel />} />} />
      <Route exact path="/profile" element={<ProtectedRoute element={<ViewProfile />} />} />
      <Route exact path="/transactions" element={<ProtectedRoute element={<Transactions />} />} />
      <Route exact path="/login" element={ <Login/> } />
    </Routes>
  </>
)

export default App