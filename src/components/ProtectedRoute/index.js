import {Navigate} from 'react-router-dom'
import Cookie from 'js-cookie'

const ProtectedRoute = ({props,element}) => {
  const token = Cookie.get('user_id')
  console.log(token)
  if (token === undefined) {
    return <Navigate to="/login" />
  }
  return element 

}
export default ProtectedRoute