import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Profile from './components/Profile'
import Register from './components/Register'
import Welcome from './components/Welcome'
import './App.css';

function App() {
  // user data will be in state when the user is logged in 
  const [currentUser, setCurrentUser] = useState(null)

  // useEffect if the user navigates away from the site and comes back

  // deletes the jwt from local storage when the user wants to log out
  const handleLogout = () => {
    console.log('log user out')
  }

  return (
    <Router>
      <header>
        <Navbar currentUser={ currentUser } handleLogout={ handleLogout } />
      </header>

      <div className="App">
        <Switch>
          <Route exact path="/" component={ Welcome } />

          <Route 
            path='/register'
            render={ (props) => <Register {...props} currentUser={ currentUser } setCurrentUser={ setCurrentUser} /> } 
          />

          <Route 
            path='/login'
            render={ (props) => <Login {...props} currentUser={ currentUser } setCurrentUser={ setCurrentUser} /> } 
          />

          <Route 
            path='/profile'
            render={ (props) => <Profile {...props} currentUser={ currentUser } setCurrentUser={ setCurrentUser} /> } 
          />

        </Switch>
      </div>
    </Router>
  );
}

export default App;
