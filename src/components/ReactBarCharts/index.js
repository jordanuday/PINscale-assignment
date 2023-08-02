/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import Cookies from 'js-cookie'
import { useState,useEffect } from 'react';
import ViewLoading from '../ViewLoading'
import ViewFailure from '../ViewFailure'
import {Bar} from 'react-chartjs-2'
import {CategoryScale,Chart,LinearScale,BarElement,Legend,Title,Tooltip} from 'chart.js'; 
import './index.css'

Chart.register(CategoryScale,LinearScale,BarElement,Legend,Title,Tooltip)

const labels = ['sun','mon','tue','wed','thu','fri','sat']

const data = {
    labels,
    datasets : [
        {
            label:'debit',
            data:[100,200,300,400,500,600,700],
            backgroundColor:'#4D78FF',
            borderRadius: 10,
        },
        {
            label:'credit',
            data:[200,300,400,500,600,700,800],
            backgroundColor:'#FCAA0B',
            borderRadius: 10,
        }
    ]

}

const options ={

    plugins:{
        legend:{
            position:'top'
        },
        title:{
            display:true,
            text:'$4,790 Debited & $7,260 Credited in this Week'
        }
    }
}

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const ReactBarChart = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
    useEffect(() => {
        getLastWeekCreditDebit()
      }, []
    )

    const getLastWeekCreditDebit = async () => {
        setApiStatus(apiStatusConstants.inProgress)
        const userId = Cookies.get('user_id')
        const apiUrl = `https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-7-days`
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
        //   const updatedData = getFormattedData(fetchedData.users[0])
          console.log(fetchedData)
        //   console.log(updatedData)
        //   setProfileData(updatedData)
          setApiStatus(apiStatusConstants.success)
        } else {
          setApiStatus(apiStatusConstants.failure)
        }
      }

      const renderProfile = () =>{

        return (
            <div className='chart'>
                <Bar data={data} options={options} />
            </div>
        )
      }

    
      const renderProfileData = () => {
        switch (apiStatus) {
          case apiStatusConstants.success:
            return renderProfile()
          case apiStatusConstants.failure:
            return ViewFailure()
          case apiStatusConstants.inProgress:
            return ViewLoading()
          default:
            return null
        }
      }

  return (
    <div className='main-container-chart'>
        <h1 className='accounts-head-charts'>Debit & Credit Overview</h1>
        {renderProfileData()}
    </div>
  )
}

export default ReactBarChart