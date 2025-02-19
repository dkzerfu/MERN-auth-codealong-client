import { Link } from 'react-router-dom'

export default function Navbar(props) {
  return (
    <nav>
      <Link to='/'>
        <h5>user app 👋</h5>
      </Link>

      {/* if the user is logged in */}
      <Link to='/'>
        <span onClick={props.handleLogout}>log out</span>
      </Link>

      <Link to="/profile">
        profile
      </Link>

      {/* if the use is logged out */}
      <Link to="/register">
        register
      </Link>

      <Link to="/login">
        login
      </Link>
    </nav>
  )
}