import React from "react"
import {Route,Switch,Redirect} from "react-router-dom"
import Home from "./core/Home"
import Navbar from "./core/Navbar"
import Login from "./auth/Login"
import SnackProvider from "./config/SnackContext"
import UserComponent from "./user/UserComponent"
import Rating from "./other/Rating"
import Referral from "./other/Referral"


const mainRouter =() => {
    return(
        <>
        <Navbar/>
        <Switch>
            <Route path="/rates" component={Rating} />
            <Route path="/referral" component={Referral} />
            <Route path="/user/:userId" component={UserComponent} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Login} />
            <Route path="/" component={Home} />
            <Route render={() => <Redirect to="/" />} /> 
        </Switch>
        </>
    )
}


export default SnackProvider(mainRouter)