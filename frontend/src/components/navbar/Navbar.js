import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <Link className='navbar-brand'>LMS</Link>

      <button className='navbar-toggler' data-toggle="collapse" data-target="#menu"><span className='navbar-toggler-icon'></span></button>

      <div className="collapse navbar-collapse" id='menu'>
        <ul className="navbar-nav">
          {/* admin link */}
          <li className="nav-item"><Link to="/admin" className='nav-link'>ADMIN</Link></li>

          {/* user-teacher */}
          <li className="nav-item"><Link to="/user/subjects" className='nav-link'>teacher-subject</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar