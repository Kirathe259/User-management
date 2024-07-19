import React from 'react'
import NotFound from '../components/NotFound/NotFound'

const NotFoundPage = () => {
  return (
    <div style={{color: '#f00',
      backgroundColor: '#dfdfdf',
      height: '100vh',
      width: '100vw',
      position: 'fixed', 
      top: 0, 
      left: 0, 
      margin: 0, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' }}>
      <NotFound/>
    </div>
  )
}

export default NotFoundPage
