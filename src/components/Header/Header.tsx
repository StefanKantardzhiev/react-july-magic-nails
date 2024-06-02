import React from 'react'
import { isAdmin } from '../middleware/auth-middleware'
const Header = () => {
  let userToParse:any|null=localStorage.getItem('user');
  let user= JSON.parse(userToParse);

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
  const scroll = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const contact = document.getElementById('contact')
    if (!contact) {
     window.location.href = '/'
    } else {
      contact.scrollIntoView({ behavior: 'smooth' })
    }
  }
  return (
    <div>
      <header className="header">
        <div className="nav_wrapper">
          <div className="logo">
            <img
              src="https://i.ibb.co/KzZStJ5/removal-ai-f86f7e63-04d9-4316-abd3-d39efc84c344-julias.png"
              alt="logo"
              id="logo"
            />
          </div>
          {
            user?.role && isAdmin(user?.role) ?
              <nav className="nav">
                <ul>
                <li>
                <span className="nav-title">
                  <a href="/">Home</a>
                </span>
                </li>
                <li>
                <span className="nav-title">
                  <a href="/services">Services</a>
                </span>
                </li>
                <li>
                <span className="nav-title">
                  <a href="/gallery">Gallery</a>
                </span>
                </li>
                <li>
                  <a href="/" onClick={logout}>Logout</a>
                </li>
              </ul>
            </nav> : <nav className="nav">
              <ul>
                <li>
                <span className="nav-title">
                  <a href="/">Home</a>
                </span>
                </li>
                <li>
                <span className="nav-title">
                  <a href="/services">Services</a>
                </span>
                </li>
                <li>
                <span className="nav-title">
                  <a href="/gallery">Gallery</a>
                </span>
                </li>
                <li>
                <span className="nav-title">
                  <span onClick={(e: any) => scroll(e)}>Contact</span>
                </span>
                </li>
              </ul>
            </nav>
          }
        </div>
      </header>
    </div>
  )
}
export default Header