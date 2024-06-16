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
              src='https://api-july-nails.vercel.app/files/665f9af2fa31bb5a2d76c517'
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
                  <a href="/">Начало</a>
                </span>
                </li>
                <li>
                <span className="nav-title">
                  <a href="/services">Услуги</a>
                </span>
                </li>
                <li>
                <span className="nav-title">
                  <a href="/gallery">Галерия</a>
                </span>
                </li>
                <li>
                  <a href="/" onClick={logout}>Отписване</a>
                </li>
              </ul>
            </nav> : <nav className="nav">
              <ul>
                <li>
                <span className="nav-title">
                  <a href="/">Начало</a>
                </span>
                </li>
                <li>
                <span className="nav-title">
                  <a href="/services">Услуги</a>
                </span>
                </li>
                <li>
                <span className="nav-title">
                  <a href="/gallery">Галерия</a>
                </span>
                </li>
                <li>
                <span className="nav-title">
                  <span onClick={(e: any) => scroll(e)}>Контакт</span>
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