import Guestlogin from '@/components/Guestlogin'
import OrganizerLogin from '@/components/OrganizerLogin'
import React, { useState } from 'react'

const Login = () => {
    const [tab,setTab]=useState<number>(1)
  return (
    <div className='text-center bg-light my-5'>
     <h1>Log In</h1>
     <div className=' d-flex justify-content-center gap-5'>
        <div className=' p-3  fw-bold fs-3' onClick={()=>setTab(1)} style={{ cursor:"pointer", color:`${tab===1?'black':'grey'}`}}>Organizer</div>
        <div className=' p-3 fw-bold fs-3' onClick={()=>setTab(2)} style={{ cursor:"pointer",color:`${tab===2?'black':'grey'}`}}>Guest</div>
     </div>
    {tab===1 && (
        <OrganizerLogin/>
    )}
    {tab===2 && (
        <Guestlogin/>
    )}

    </div>
  )
}

export default Login
