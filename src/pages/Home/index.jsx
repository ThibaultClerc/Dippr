import React from 'react';
import VisitorHome from './VisitorHome';
import UserHome from './UserHome';

import { useSelector } from 'react-redux';

const Home = () => {

  const user = useSelector(state => state.user.user)

  return (
    <>
    {user !== undefined && user.length === 0  ?
      <VisitorHome/>
    : <UserHome/>
    }
    </>
  )
}

export default Home
