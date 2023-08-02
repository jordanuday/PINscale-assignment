import React from 'react'
import Cookies from 'js-cookie'
import { useState,useEffect } from 'react';
import ViewLoading from '../ViewLoading'
import SideBar from '../SideBar'
import ViewFailure from '../ViewFailure'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const ViewProfile = () => {

  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
    const [profileData, setProfileData] = useState({})
    
    const getFormattedData = data => ({
      name: data.name,
      email: data.email,
      country: data.country,
      id: data.id,
      dateOfBirth: data.date_of_birth,
      city: data.city,
      permanentAddress: data.permanent_address,
      postalCode: data.postal_code,
      presentAddress: data.present_address,
    })

    useEffect(() => {
      getProfileData()
      }, []
    )

    const getProfileData = async () => {
        setApiStatus(apiStatusConstants.inProgress)
        const userId = Cookies.get('user_id')
        const apiUrl = `https://bursting-gelding-24.hasura.app/api/rest/profile`
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
          const updatedData = getFormattedData(fetchedData.users[0])
          console.log(fetchedData)
          console.log(updatedData)
          setProfileData(updatedData)
          setApiStatus(apiStatusConstants.success)
        } else {
          setApiStatus(apiStatusConstants.failure)
        }
      }

      const renderProfile = () =>{

        const email = profileData.email ? profileData.email : 'null value'
        const dateOfBirth = profileData.dateOfBirth ? profileData.dateOfBirth : 'null value'
        const presentAddress = profileData.presentAddress ? profileData.presentAddress : 'null value'
        const permanentAddress = profileData.permanentAddress ? profileData.permanentAddress : 'null value'
        const postalCode = profileData.postalCode ? profileData.postalCode : 'null value'
        const city = profileData.city ? profileData.city : 'null value'
        const country = profileData.country ? profileData.country : 'null value'

        return (
            <div className='details-cont'>
                <img src='https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg?w=360' alt='profile'  className='profile-image' />
                <div className='profile-item-container'>
                    <div className='profile-item'>
                      <h1 className='profile-labels'>Your Name</h1>
                      <p className='profile-para'>{profileData.name}</p>
                    </div>
                    <div className='profile-item'>
                      <h1 className='profile-labels'>Email</h1>
                      <p className='profile-para'>{email}</p>
                    </div>
                    <div className='profile-item'>
                      <h1 className='profile-labels'>Date of Birth</h1>
                      <p className='profile-para'>{dateOfBirth}</p>
                    </div>
                    <div className='profile-item'>
                      <h1 className='profile-labels'>Permanent Address</h1>
                      <p className='profile-para'>{permanentAddress}</p>
                    </div>
                    <div className='profile-item'>
                      <h1 className='profile-labels'>Postal Code</h1>
                      <p className='profile-para'>{postalCode}</p>
                    </div>
                </div>
                <div className='profile-item-container'>
                  <div className='profile-item'>
                    <h1 className='profile-labels'>User Name</h1>
                    <p className='profile-para'>{profileData.name}</p>
                  </div>
                  <div className='profile-item'>
                    <h1 className='profile-labels'>Password</h1>
                    <p className='profile-para'>*********</p>
                  </div>
                  
                  <div className='profile-item'>
                    <h1 className='profile-labels'>Present Address</h1>
                    <p className='profile-para'>{presentAddress}</p>
                  </div>
                  
                  <div className='profile-item'>
                    <h1 className='profile-labels'>City</h1>
                    <p className='profile-para'>{city}</p>
                  </div>
          
                  <div className='profile-item'>
                    <h1 className='profile-labels'>Country</h1>
                    <p className='profile-para'>{country}</p>
                  </div>
                </div>
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
    <div className='main-container-profile'>
      <div className='header-container'><SideBar/></div>
      <div className='profile-container'>
      <div className='all-txns-head-container'>
        <h1 className='accounts-head'>Profile</h1>
      </div>
      <div className='profile-second-container'>{renderProfileData()}</div>
      </div>
      
    </div>
  )
}

export default ViewProfile