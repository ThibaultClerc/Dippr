import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from "../Navbar";
import Home from '../../pages/Home'
import Signup from "../../pages/Signup"
import Login from "../../pages/Login"
import Annoucement from "../../pages/Annoucement"
import Profile from "../../pages/Profile"
import PrivateRoute from "../PrivateRoute"
import Search from "../../pages/Search"
import BottomAppBar from "../../components/AppBar"
import useDeviceDetect from "../DeviceDetect"

const Layout = () => {
  const { isMobile } = useDeviceDetect();

  useEffect(() => {
  }, [isMobile])

  return (
    <Router basename="/">
      {!isMobile && <Nav/>}
      {isMobile && <BottomAppBar/>}

      <Switch> 
        <Route exact path="/announcement" component={Annoucement}/>
        <Route        exact path="/"        component={Home}   />
        <Route        exact path="/signup"  component={Signup} />
        <Route        exact path="/signin"  component={Login}  />
        <Route              path="/search/:query"  component={Search}/>
        <Route              path="/search"  component={Search}/>
        <PrivateRoute       path="/profile/:profileId" component={Profile}/>
      </Switch> 
    </Router>
  )
}

export default Layout