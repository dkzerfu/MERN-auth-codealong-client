import {useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'

export default function Profile(props) {
  console.log(props.currentUser)
  // make some state for the data from the server
  const [message, setMessage] = useState('')
  // useEffect to get the data from the server
  useEffect(() => {
    const secretMessage = async function () {
      try{
        // get our jwt from local storage
        const token = localStorage.getItem('jwtToken')
        // make some auth headers
        const authHeaders = {
          'Authorization': token
        }
        // GET /auth-locked with the auth header
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/auth-locked`, authHeaders)
        // set the message in state with the data from the backend
        setMessage(response.data.msg)
      
      }catch(error){

        //props.handleLogout()
      }
    }
    secretMessage()
  })
  // redirect to login if auth faild


  return (
    <div>
     <h4> hello {props.currentUser.name}</h4>
     <h5>your email is {props.currentUser.email}</h5>

     {/* <p>your secter message is: {message}</p> */}
    </div>
  )
}