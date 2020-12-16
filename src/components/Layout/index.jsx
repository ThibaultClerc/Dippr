import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from "../Navbar";
import Home from '../../pages/Home'
import Signup from "../../pages/Signup"
import Login from "../../pages/Login"
import Profile from "../../pages/Profile"
import EditProfile from "../../pages/EditProfile"
import PrivateRoute from "../PrivateRoute"
import Search from "../../pages/Search"
import BottomAppBar from "../../components/AppBar"
import useDeviceDetect from "../DeviceDetect"
import Swap from "../../pages/Swap"
import Dish from "../../pages/Dish"


const Layout = () => {
  const { isMobile } = useDeviceDetect();

  useEffect(() => {
  }, [isMobile])

  return (
    <Router basename="/">
      {!isMobile && <Nav/>}
      {isMobile && <BottomAppBar/>}
      <Switch> 
        <Route        exact path="/"                   component={Home}/>
        <Route        exact path="/signup"             component={Signup}/>
        <Route        exact path="/signin"             component={Login}/>
        <Route              path="/search/:query"      component={Search}/>
        <Route              path="/search"             component={Search}/>
        <PrivateRoute       path="/profile/:profileId" component={Profile}/>
        <PrivateRoute       path="/users/edit"         component={EditProfile}/>
        <PrivateRoute       path="/users/swap"         component={Swap}/>
        <PrivateRoute       path="/users/dish"         component={Dish}/>


      </Switch> 
    </Router>
  )
}

export default Layout