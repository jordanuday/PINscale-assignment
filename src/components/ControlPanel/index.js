import React from 'react'
import { useState,useEffect } from 'react'
import Cookies from 'js-cookie'
import Sidebar from '../SideBar'
import ThreeLastTransactions from '../ThreeLastTransactions'
import ReactBarChart from '../ReactBarCharts'
import './index.css'

const ControlPanel = () => {

  const [credit, setCredit] = useState(0)
  const [debit, setDebit] = useState(0)
  const [creditAdmin, setCreditAdmin] = useState(0)
  const [debitAdmin, setDebitAdmin] = useState(0)

  useEffect(() => {
    getCreditDebitTotal()
    getCreditDebitTotalAdmin()
  }, []
  )

  const getCreditDebitTotal = async() =>{
    const userId = Cookies.get('user_id')
    const apiUrl = `https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals`
    const options = {
      headers: {
        'Content-Type' : 'application/json',
        'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
        'x-hasura-role' : 'user',
        'x-hasura-user-id' : userId,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    const array = fetchedData.totals_credit_debit_transactions
    // console.log(array)
    let credited=0,debited=0;
    for (let i = 0 ; i<array.length; i++){
      console.log(array[i])
        if(array[i].type==='credit'){
          credited+=array[i].sum
        } else{
          debited+=array[i].sum
        }
    }
    // console.log(credited,debited)
    
    if (response.ok) {
      setCredit(credited)
      setDebit(debited)
    } 
  }

  const getCreditDebitTotalAdmin = async() =>{
    const apiUrl = `https://bursting-gelding-24.hasura.app/api/rest/transaction-totals-admin`
    const options = {
      headers: {
        'Content-Type' : 'application/json',
        'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
        'x-hasura-role' : 'admin',
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    const array1 = fetchedData.transaction_totals_admin
    let credited=0,debited=0;
    for (let i = 0 ; i<array1.length; i++){
      console.log(array1[i])
        if(array1[i].type==='credit'){
          credited+=array1[i].sum
        } else{
          debited+=array1[i].sum
        }
    }
    // console.log(credited,debited)
    
    if (response.ok) {
      setCreditAdmin(credited)
      setDebitAdmin(debited)
    } 
  }
  const userId = Cookies.get('user_id')
  const resultCredit = (userId===3) ? creditAdmin : credit
  const resultDebit = (userId===3) ? debitAdmin : debit



  return (
    <div className='main-container'>
      <div className='header-container'><Sidebar/></div>
      <div className='dashboard-container'>
        <div className='head-container'>
          <h1 className='accounts-head'>Accounts</h1>
        </div>
        <div className='second-container'>
            <div className='credit-debit-container'>
              <div className='credit-container'>
                <div>
                  <h1 className='credit-amount-head'>${resultCredit}</h1>
                  <p className='credit-debit-para'>Credit</p>
                </div>
                  <img src='https://res.cloudinary.com/di4qjlwyr/image/upload/v1690692027/credit_b8jngd.png' alt='credit' className='credit-debit-image'/>
              </div>
              <div className='debit-container'>
                <div>
                  <h1 className='debit-amount-head'>${resultDebit}</h1>
                  <p className='credit-debit-para'>Debit</p>
                </div>
                  <img src='https://res.cloudinary.com/di4qjlwyr/image/upload/v1690692017/debit_db9dra.png' alt='credit' className='credit-debit-image'/>
              </div>
            </div>
            <div className='last-txn-container'>
              <ThreeLastTransactions/>
            </div>
            <div className='react-chart-container'>
              <ReactBarChart/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ControlPanel