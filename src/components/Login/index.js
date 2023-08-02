import React from 'react'
import { useState } from 'react'
import { Navigate,useNavigate } from 'react-router-dom' 
import Cookies from 'js-cookie'
import './index.css'

const Login = (props) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showSubmitError, setSubmitError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()

  const onSubmitSuccess = userId => {

    Cookies.set('user_id', userId, {
      expires: 30,
    })
    navigate('/')
  }

  const onSubmitFailure = () => {
    setSubmitError(true)
    setErrorMsg('username or password incorrect')
  }

    const submitForm = async event => {
        event.preventDefault()
        const userDetails = {email, password}
        Cookies.set('user_email', email, {
          expires: 30,
        })
        console.log(userDetails)
        const url = `https://bursting-gelding-24.hasura.app/api/rest/get-user-id`
        const options = {
          method: 'POST',
          headers : {
            'Content-Type' : 'application/json',
            'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
          },
          body: JSON.stringify(userDetails)
        }
        const response = await fetch(url, options)
        const data = await response.json()
        const result = data.get_user_id
        console.log(data)
        if (result.length !== 0) {
            console.log('success')
          onSubmitSuccess(data.get_user_id[0].id)
        } else {
          onSubmitFailure()
        }
      }


      const renderPasswordField = () => {
        return (
          <>
            <label className="input-label" htmlFor="password">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter Password"
            />
          </>
        )
      }
    
      const renderUsernameField = () => {
        return (
          <>
            <label className="input-label" htmlFor="email">
              EMAIL
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter Email"
            />
          </>
        )
      }

      const userId = Cookies.get('user_id')

      if (userId !== undefined) {
        return <Navigate to="/" />
      }

  return (
    <div className='login-container'>
    <img src='https://res.cloudinary.com/di4qjlwyr/image/upload/v1690692005/Logo_usdjsi.png' alt='website-logo' className='logo' />
    <form className="form" onSubmit={submitForm} >
       <p className="form-title">Sign in to your account</p>
        <div className="input-container">{renderUsernameField()}</div>
        <div className="input-container">{renderPasswordField()}</div>
         <button type="submit" className="submit">
        Sign in
      </button>
      {showSubmitError && <p className="error-message">*{errorMsg}</p>}
   </form>

    </div>
  )
}

export default Login