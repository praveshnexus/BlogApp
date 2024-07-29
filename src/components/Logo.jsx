import React from 'react';
import image from "../assest/logo1.png"

function Logo({width = '100px'}) {
  return (
    <div>
      <img src={image} alt="logo" width={width} />
    </div>
  )
}

export default Logo