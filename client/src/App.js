import { Fragment } from "react"
import { Routes,Route } from "react-router-dom"
import Followers from "./components/Followers"
import Followings from "./components/Followings"
import Header from "./components/Header"
import Home from "./components/Home"
import Profile from "./components/Profile"

import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"

const App = () => {
  return (
    <Fragment>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/@/:handle" element={<Profile/>} />
        <Route path="/followers" element={<Followers/>}/>
        <Route path="/followings" element={<Followings/>}/>
        
      </Routes>
    </Fragment>
  )
}

export default App