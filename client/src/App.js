import { Fragment } from "react"
import { Routes,Route } from "react-router-dom"
import Header from "./components/Header"
import Home from "./components/Home"
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
      </Routes>
    </Fragment>
  )
}

export default App