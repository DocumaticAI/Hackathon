import React from 'react'
import { useHistory } from 'react-router-dom'
const Logout = ({ auth }) => {
  const history = useHistory()
  const logOut = () => {
    auth.signOut();
    history.push("/")
  }
  return auth.currentUser && (
    <button className="sign-out" onClick={() => logOut()}>Sign Out</button>
  )
}

export default Logout
