import {useState} from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import {Redirect} from 'react-router-dom'
import Profile from './Profile'


export default function Register(props) {
  // some state for the controlled form
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  //
  const [message, setMessage] = useState('')
  
  //
  const handleSubmit = async e => {
    try{
      e.preventDefault()
      // post to the backend with our form submition
      const requestBody = {
        name: name,
        email: email,
        password: password
      }
       const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/register`, requestBody)
      // take the response and save it in local storage
      const {token} = response.data
      localStorage.setItem('jwtToken', token)

      // decode the jwt
      const decoded = jwt_decode(token)

      // set the current to be logged in in app.js from the jwt payload
      props.setCurrentUser(decoded)
      

    }catch(error){
      // if the response
      if(error.response.status === 400) {
        setMessage(error.response.data.msg)
      }else {
        console.log(error)
      }
    }
    
  }
  if (props.currentUser) return <Redirect to='/profile' component={Profile} currentUser={props.currentUser} />


  return (
    <div>
      <h3>Register for user App!</h3>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name-input'>Name</label>
        <input 
          id='name-input'
          type='text'
          placeholder='enter your name'
          onChange={e => setName(e.target.value)}
          value={name}
        />
        <label htmlFor='email-input'>Email</label>
        <input 
          id='email-input'
          type='text'
          placeholder='enter your email'
          onChange={e => setEmail(e.target.value)}
          value={email}
        />
        <label htmlFor='password-input'>password</label>
        <input 
          id='password-input'
          type='password'
          placeholder='enter your password'
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
        <input 
          type='submit'
          value='Register'
         /> 
      </form>
    </div>
  )
}