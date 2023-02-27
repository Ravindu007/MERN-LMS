import React from 'react'
import { Link } from 'react-router-dom'


import "./AdminDashboard.scss"

const AdminDashboard = () => {
  return (
    <div className='admin-dashboard'>
      <div className="row">
        <div className="col-12 dashboard-tabs">
          <Link to="/admin/teachers">
            <button className='btn btn-outline-primary'>Teacher Management</button>
          </Link>
          <Link to="/admin/students">
            <button className='btn btn-outline-success'>Student Management</button>
          </Link>
          <Link to="/admin/subject">
            <button className='btn btn-outline-danger'>Subject Management</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard