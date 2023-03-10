import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useLogout } from '../../hooks/useLogout'

const Navbar = ({userRole}) => {
  const {user} = useAuthContext()

  const {logout} = useLogout()

  const handleLogout = () => {
    logout()
  }

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <Link to="/" className='navbar-brand'>LMS</Link>

      <button className='navbar-toggler' data-toggle="collapse" data-target="#menu"><span className='navbar-toggler-icon'></span></button>

      <div className="collapse navbar-collapse" id='menu'>
        <ul className="navbar-nav">
          
          <div className="auth" style={{display:"flex"}}>
            {/* authentication links */}
            {!user && (
              <>
               <li className="nav-item"><Link to="/login" className='nav-link'>login</Link></li>
               <li className="nav-item"><Link to="/signup" className='nav-link'>Signup</Link></li>
              </>
            )}
            {user && (
              <>
              {/* admin link */}
              {userRole === 'admin' && <li className="nav-item"><Link to="/admin" className='nav-link'>ADMIN</Link></li>}

              {/* user links */}
              {userRole === 'teacher' && <li className="nav-item"><Link to="/lmsUser/teacher/subjectView" className='nav-link'>Courses</Link></li>}
              
              {userRole === 'student' && <li className="nav-item"><Link to="/lmsUser/student/subjectView" className='nav-link'>Courses</Link></li>}
              
              <span className='nav-link'>{user.email}</span>

              <li className="nav-item"><Link onClick={handleLogout} className='nav-link'>Logout</Link></li>
              </>
            )}
          </div>

        </ul>
      </div>
    </nav>
  )
}

export default Navbar