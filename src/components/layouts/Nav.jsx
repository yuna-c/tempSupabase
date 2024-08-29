import { useAuth } from '../../context/AuthContext'

import { useNavigate, NavLink, Link } from 'react-router-dom'

const Nav = () => {
  const { user, signOut } = useAuth()
  let navigate = useNavigate()
  const handleSignout = async () => {
    await signOut()
    navigate('/')
  }

  console.log('Current User:', user) // 사용자 상태 확인용 로그

  return (
    <>
      {/* <!-- Navigation--> */}
      <nav className="navbar navbar-expand-lg navbar-light" id="mainNav">
        <div className="container px-4 px-lg-5">
          <NavLink className="navbar-brand" href="index.html">
            Start Bootstrap
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            Menu
            <i className="fas fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ms-auto py-4 py-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link px-lg-3 py-3 py-lg-4" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link px-lg-3 py-3 py-lg-4" to="/">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link px-lg-3 py-3 py-lg-4" to="/">
                  Sample Post
                </NavLink>
              </li>
              <li className="nav-item">
                <Link />
                <NavLink className="nav-link px-lg-3 py-3 py-lg-4" to="/">
                  Contact
                </NavLink>
              </li>

              {user ? (
                <li className="nav-item">
                  <NavLink className="nav-link px-lg-3 py-3 py-lg-4" to="/" onClick={handleSignout}>
                    Sign out
                  </NavLink>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link px-lg-3 py-3 py-lg-4" to="/login">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
export default Nav
