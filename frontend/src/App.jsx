import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux'
import { store } from './store'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ProblemsPage from './pages/ProblemsPage'
import ProblemPage from './pages/ProblemPage'
import Admin from './pages/Admin'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/problems' element={<ProblemsPage />} />
            <Route path='/problem/:id' element={<ProblemPage />} />
            <Route path='/admin' element={<Admin />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </Provider>
  )
}

export default App
