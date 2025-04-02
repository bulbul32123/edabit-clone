import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FaSignInAlt, FaSignOutAlt, FaUser, FaCode } from 'react-icons/fa'
import { logout, reset } from '../features/auth/authSlice'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>
          <FaCode /> Edabit Clone
        </Link>
      </div>
      <ul>
        <li>
          <Link to='/problems'>
            Problems
          </Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to='/dashboard'>
                Dashboard
              </Link>
            </li>
            {user.role === 'admin' && (
              <li>
                <Link to='/admin'>
                  Admin
                </Link>
              </li>
            )}
            <li>
              <button className='btn' onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/login'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Header 