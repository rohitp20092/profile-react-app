import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { RiAccountCircleFill } from "react-icons/ri";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

function ShowProfile() {
  const [state, setstate] = useState()
  const [Show, setShow] = useState()
  const Navigate = useNavigate()

  var profileData = ""
  const profile_data = useSelector(state => state)

  useEffect(() => {
  
    profileData = localStorage.getItem('profiledata')
    const newv = JSON.parse(profileData)
    setstate(newv)
  }, [])

  return (
    <>
      <div className="container mt-5">
        {profileData && <p>{state}</p>}
        <div>
          <RiAccountCircleFill size={100} style={{ display: "flex", margin: "auto" }} />
          <p className="text-center" style={{ fontWeight: "bolder" }}>{state?.tagline}</p>
        </div>
        <div>
          <h1>Basic Details</h1>
          <p>Name : {state?.firstname}{" "}{state?.lastname}</p>

          <h1>Experience</h1>
          {state?.experience && state?.experience.map((value, index) => {
            return <div style={{ margin: "10px 0px" }} key={index}>
              <h4>{index + 1}.</h4>
              <p >company : {value?.company}</p>
              <p> From-{value?.start_date} To-{value?.end_date} </p>
              <p>{value?.description}</p>
            </div>
          })}

          <h1>Skills</h1>
          {state &&   state?.skills.map((value, index) => {
            return <div key={index}>
              <p>{index + 1}.{value}</p>
            </div>
          })}
        </div>
        <Button variant="primary" onClick={(e) => Navigate('/edit-profile')} >Edit profile</Button>{' '}
      </div>
      
    </>
  )
}

export default ShowProfile
