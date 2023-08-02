import React from 'react'
import SideBar from '../SideBar'
import EntireTransactions from '../EntireTransactions'
import './index.css'

const Transactions = () => {
  return (
    <div className='main-container-txns'>
      <div className='header-container'><SideBar/></div>
      <div className='all-txns-container'><EntireTransactions/></div>
    </div>
  )
}

export default Transactions