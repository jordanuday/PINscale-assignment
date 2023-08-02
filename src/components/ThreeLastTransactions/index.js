import React from 'react'
import Cookies from 'js-cookie'
import { useState,useEffect } from 'react';
import ViewLoading from '../ViewLoading'
import ApieceLastThreeTransaction from '../ApieceLastThreeTxn'
import ViewFailure from '../ViewFailure'
import './index.css'

const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
  }

const ThreeLastTransactions = () => {

    const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
    const [transactionData, setTransactionData] = useState([])
    

    useEffect(() => {
        getLastTransactions()
      }, [])

    const getLastTransactions = async () => {
        setApiStatus(apiStatusConstants.inProgress)
        const userId = Cookies.get('user_id')
        const apiUrl = `https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=3&offset=0`
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
       
        if (response.ok) {
            const fetchedData = await response.json()
          const updatedData = fetchedData.transactions.map(txn => ({
            id: txn.id,
            amount: txn.amount,
            category: txn.category,
            date: txn.date,
            type: txn.type,
            transactionName: txn.transaction_name,
          }))
          setTransactionData(updatedData)
          setApiStatus(apiStatusConstants.success)
        } else {
          setApiStatus(apiStatusConstants.failure)
        }
      }

      const renderLastTransactions = () =>{
        
        console.log(transactionData)
        return (
            <ul className='txns-un-list'>
                {transactionData.map(eachTxn =>(
                  <ApieceLastThreeTransaction key={eachTxn.id} eachTxn={eachTxn} getLastTransactions={getLastTransactions} />
                    ))}
            </ul>
        )

      }

    
      const renderAllTransactions = () => {
        switch (apiStatus) {
          case apiStatusConstants.success:
            return renderLastTransactions()
          case apiStatusConstants.failure:
            return ViewFailure()
          case apiStatusConstants.inProgress:
            return ViewLoading()
          default:
            return null
        }
      }
      
    

  return (
    <div>
        <h1 className='last-txn-head'>Last Transactions</h1>
        {renderAllTransactions()}
    </div>
  )
}

export default ThreeLastTransactions