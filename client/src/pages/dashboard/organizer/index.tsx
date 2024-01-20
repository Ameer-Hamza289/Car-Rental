import Navbar from '@/components/Navbar'
import AddOrganizerForm from '@/components/modals/AddOrganizerForm'
import GuestSignUpForm from '@/components/modals/GuestSignUpForm'
import { useGetAllRSVPQuery } from '@/store/userApi'
import Link from 'next/link'
import React from 'react'

const Dashboard = () => {

const {data:rsvpsData}=useGetAllRSVPQuery()
// console.log(rsvpsData);
const rsvps=rsvpsData?rsvpsData:[]


  return (
    <div>
      <Navbar/>

      <div className='d-flex justify-content-between align-items-center px-3'>
     <h1>Organizer Dashboard</h1> 
     <div className='' >
      <button type="button" className="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#guestModal">
  Add Guest
</button>

<Link href={'/signup'}>
<button type="button" style={{ margin:5}} className="btn btn-primary" >
  Add Organizer
</button>
</Link>

     </div>
      </div>
      <div className='m-4'>
        <h3 className='m-2'>RSVPS</h3>

        <div>
        {rsvps.length!==0 && (
      <>
<table className="table table-bordered text-center">
      <thead>
        <tr>
          <th>ID</th>
          <th>Event ID</th>
          <th>Guest Id</th>
          <th>Status</th>
          <th>Comment</th> 
           {/* <th>Action</th> */}
        </tr>
      </thead>
      <tbody>
        {rsvps.map((rsvp:any) => (
          <tr key={rsvp.id}>
            <td>{rsvp.id}</td>
            <td>{rsvp.ev_id}</td>
            <td>{rsvp.gu_id}</td>
            <td>{rsvp.rsvp_status}</td>
            <td>{rsvp.comments?rsvp.comments:'-'}</td>
            {/* <td>
            <button className="btn btn-danger" onClick={() => handleDeleteGuest(guest.id)}>
                Delete Guest
              </button>
            </td> */}
          </tr>
        ))}
      </tbody>
    </table>
    </>

    )}
        </div>
      </div>

      <GuestSignUpForm/>
    </div>
  )
}

export default Dashboard
