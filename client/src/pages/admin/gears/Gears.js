import React, { useEffect } from 'react'

const Gears = ({setSelectedLink, link}) => {
    useEffect(()=>{
        setSelectedLink(link);
    },[]);
  return (
    <div>Gears</div>
  )
}

export default Gears