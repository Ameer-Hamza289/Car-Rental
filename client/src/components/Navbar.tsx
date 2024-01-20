import Link from 'next/link'
import React from 'react'

const Navbar = () => {
const id=localStorage.getItem("org_id")

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid d-flex align-items-center gap-3">
  <Link className='text-decoration-none fw-bold' href={`/`}>
        {/* <li className="nav-item"> */}
          <p className="nav-link text-dark m-0 fs-3 ">Home</p>
        {/* </li> */}
            </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav d-flex align-items-center  ">
      {/* ashboard/organizer */}

      <Link className='text-decoration-none fw-semibold' href={`/dashboard/organizer`}>
        <li className="nav-item">
          <p className="nav-link text-dark m-0">Dashboard</p>
        </li>
            </Link>
      <Link className='text-decoration-none fw-semibold' href={`/event`}>
        <li className="nav-item">
          <p className="nav-link text-dark m-0">All Events</p>
        </li>
            </Link>
            <Link className='text-decoration-none fw-semibold' href={`/event/${id}`}>
        <li className="nav-item">
          <p className="nav-link text-dark m-0">My Events</p>
        </li>
            </Link>
            <Link className='text-decoration-none fw-semibold' href={`/profile/organizer/${id}`}>
        <li className="nav-item">
          <p className="nav-link text-dark m-0">My Profile</p>
        </li>
            </Link>
        {/* <li className="nav-item">
          <a className="nav-link" href="#">Pricing</a>
        </li> */}
        {/* <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown link
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li> */}
      </ul>
    </div>
  </div>
</nav>
  )
}

export default Navbar
