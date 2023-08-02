import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiFillHome,AiOutlineTransaction } from 'react-icons/ai';
import { MdAccountBox } from 'react-icons/md';
import { FiLogOut,FiMenu } from 'react-icons/fi';
import {AiFillCloseCircle} from 'react-icons/ai'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom' 
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import './index.css'



const SideBar = () => {

  const navigate = useNavigate()
  const [isOpen,setIsOpen] = useState(false)

  const handleMenu = () => {
    setIsOpen(!isOpen)
  }

  const onClickLogout = () => {
    Cookies.remove('user_id')
    navigate('/login')
  }

  const email = Cookies.get('user_email')
  console.log(email,'email')
  const name = email.split('@')[0]

  const ReactPopUp = () => (
    <div>
      <Popup
        modal
        trigger={
          <button type='button' className='logout-button'>
              <img src='https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg?w=360' alt='logo' className='image-prf' />
              <div className='name-mail-cont'>
                <h1 className='logout-name'>{name}</h1>
                <p className='logout-para'>{email}</p>
              </div>
              <FiLogOut className='display-logo' />
          </button>
        }
      >
        {close => (
          <>
           
              <div className="logout-popup-container">
                <h1 className='logout-head'><FiLogOut className='logout-icon' />Are you sure you want to Logout?</h1>
                <div className='buttons-cont'>
                  <button
                  type="button"
                  className="trigger-logout-button"
                  onClick={onClickLogout}
                  >Yes, Logout</button>
                  <button
                      type="button"
                      className="trigger-close-button"
                      onClick={() => close()}
                    >
                      Close
                    </button>
                </div>
              </div>
            
          </>
        )}
      </Popup>
    </div>
   )

  const renderOpenView = () => (
    <div className="open-view-container">
      <ul className="ov-nav-items">
        <Link to="/" className="mobile-nav-link">
          <li className="ov-nav-item"><AiFillHome className='react-icon'/></li>
        </Link>
        <Link to="/transactions" className="mobile-nav-link">
          <li className="ov-nav-item"><AiOutlineTransaction className='react-icon'/></li>
        </Link>
        <Link to="/profile" className="mobile-nav-link">
          <li className="ov-nav-item"><MdAccountBox className='react-icon'/></li>
        </Link>
        <button type='button' className='logout-button-op' onClick={onClickLogout}> <FiLogOut  className='react-icon' /> </button>
      </ul>
      <button type="button" onClick={handleMenu} className="close-button">
        <AiFillCloseCircle className="close-icon" />
      </button>
    </div>
  )

  const renderMobileView = () => {
    return (
      <nav className="mobile-nav-header">
        <div className="mobile-nav-menu">
          <div className="mobile-nav-menu-item">
            <Link to="/">
            <img src='https://res.cloudinary.com/di4qjlwyr/image/upload/v1690692005/Logo_usdjsi.png' alt='website-logo' className='mobile-logo' />
            </Link>
          </div>
          <div className="mobile-nav-items">
              <button
                type="button"
                className="mobile-button-nav-link"
                onClick={handleMenu}
              >
                <FiMenu className='menu-icon'/>
              </button>
          </div>
        </div>
        <div>{isOpen && renderOpenView()}</div>
      </nav>
    )
  }

  const renderDesktopView = () => (
    <div className='navbar-main-container'>
    <nav className='navbar'>
    <Link to="/"><img src='https://res.cloudinary.com/di4qjlwyr/image/upload/v1690692005/Logo_usdjsi.png' alt='website-logo' className='mobile-logo' /></Link>
    <div className='nav-container'>
        <ul className="nav-menu">
                <li className="nav-menu-item">
                <Link to="/" className="nav-link">
                <AiFillHome className='react-icon'/> Dashboard
                </Link>
                </li>

                <li className="nav-menu-item">
                <Link to="/transactions" className="nav-link">
                <AiOutlineTransaction className='react-icon'/> Transactions
                </Link>
                </li>
                <li className="nav-menu-item">
                <Link to="/profile" className="nav-link">
                <MdAccountBox className='react-icon'/> Profile
                </Link>
                </li>
                

        </ul>
        
    </div>
    </nav>
        <div className='logout-button-cont'>
          <ReactPopUp/>
        </div>
    </div>
  )

  return (
    <>
    {renderDesktopView()}
    {renderMobileView()}
    </>
    
  )
}

export default SideBar