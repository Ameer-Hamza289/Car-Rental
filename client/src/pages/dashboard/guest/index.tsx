import React, { useState } from 'react'
import {useGetAllInvitationsQuery} from '@/store/invitationApi'
import ChangeStatus from '@/components/modals/ChangeStatus';
import AddComment from '@/components/modals/AddComment';
import { useRouter } from 'next/router';

const GuestDashboard = () => {
const gu_id=localStorage.getItem("gu_id")
console.log(gu_id);

  const{data:guestInvitationsData}=useGetAllInvitationsQuery(gu_id)
const guestInvitations=guestInvitationsData?guestInvitationsData:[]

console.log(guestInvitations);
// const {data:SingleEvent}=useGetEventByIdQuery(guse)

const [invitationId,setInvitationId]=useState('')
const [eventId,setEventId]=useState('')

const router=useRouter()


  return (
    <div className='p-4'>
      <div className='d-flex justify-content-between'>
     <h1 className='fw-bold' > Guest Dashboard</h1>
        {/* <button className='btn btn-primary' onClick={()=>router.push(`/profile/guest/${gu_id}`)}>Update my profile</button> */}
      </div>

     <div>
     {/* "id":3,"ev_id":5,"gu_id":11,"validupto":null,"status":"Pending" */}
      {guestInvitations.length!==0?(<h3 className='mt-5'> All Invitations</h3>):<h3 className='mt-5'>No Invitations Yet</h3>}
      <div>
      {guestInvitations.length!==0 && (
      <>
<table className="table table-bordered text-center">
      <thead>
        <tr>
          <th>ID</th>
          <th>Event ID</th>
          <th>Guest Id</th>
          <th>Status</th>
          <th>Valid upto</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {guestInvitations.map((invite:any) => (
          <tr key={invite.id}>
            <td>{invite.id}</td>
            <td>{invite.ev_id}</td>
            <td>{invite.gu_id}</td>
            <td>{invite.status}</td>
            <td>{invite.validupto}</td>
            <td><button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#statusModal" onClick={()=>{
              setEventId(invite.ev_id)
              setInvitationId(invite.id)}}>Change Status</button>
            {' '}
            <button className='btn btn-info'
            onClick={()=>{
              setEventId(invite.ev_id)
              setInvitationId(invite.id)}}
            data-bs-toggle="modal" data-bs-target="#commentModal">Comment</button></td>
            
          </tr>
         
        ))}
      </tbody>
    </table>
    </>

    )}
      </div>
     </div>
     <ChangeStatus invitationId={invitationId} ev_id={eventId}/>
     <AddComment ev_id={eventId} invitationId={invitationId}/>
    </div>
  )
}

export default GuestDashboard
