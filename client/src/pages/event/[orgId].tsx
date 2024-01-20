import Navbar from '@/components/Navbar';
import GuestSignUpForm from '@/components/modals/GuestSignUpForm';
import { useDeleteEventMutation, useGetEventGuestsQuery, useGetMyEventsQuery } from '@/store/eventApi';
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import {useDeleteEventGuestMutation} from '@/store/userApi'
import AddEventForm from '@/components/modals/AddEventForm';

interface MyEventsProps {
    orgId: string
  }

const MyEvents = ({orgId}:MyEventsProps) => {
  const [eventId,setEventId]=useState<string>('')
  const [invitation,setInvitation]=useState<string>()

  // console.log(invitation);
  

    // console.log(orgId,"id");
    const [deleteEvent]=useDeleteEventMutation()
    const [deleteGuest]=useDeleteEventGuestMutation()
    const {data:myEventsData}=useGetMyEventsQuery(orgId)
    // console.log(myEventsData);
    
    const myEvents=myEventsData?myEventsData:[]

    const {data:eventGuestsData}=useGetEventGuestsQuery(eventId)
    const eventGuests=eventGuestsData?eventGuestsData:[]

    // console.log(eventGuests);

    const handleViewGuest=(id:any)=>{
      console.log(id,"view guests for id",id);
      setEventId(id)
      
  
  }

  const handleDeleteEvent=(id:any)=>{
    console.log("delete event",id);
    deleteEvent(id).unwrap()
    .then((res)=>{
        console.log(res);
        toast.success("Event deleted successfully!")
        
        
    })
    .catch((err)=>{
        toast.error(err.data.error?err.data.error:err.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        console.log(err);
        
    })
}

const handleAddGuest=(id:any)=>{
  console.log("Add guest to eventId",id);
  setEventId(id)
  

}

const handleDeleteGuest=(id:any)=>{
  deleteGuest(id).unwrap()
.then((res)=>{
  console.log(res);
  toast.success("Success!",res.message)
  
})
.catch((err)=>{
  console.log(err);
  toast.error(err.data.error?err.data.error:err.data.message|| err.error?err.error:"Error")
  
})
}

    
  return (
    <>
    <Navbar/>
    <div>
      <div className='d-flex justify-content-between align-items-center px-3'>
        <h2 className='m-4'>My Events</h2>
        <button className='btn btn-primary h-75' data-bs-toggle="modal" data-bs-target="#exampleModal">Add Event</button>
      </div>
       

        <table className="table table-bordered text-center">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Venue</th>
          <th>Schedule</th>
          <th>Starting Time</th>
          <th>Ending Time</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
      {myEvents.length==0 &&(
            <div className='text-center'>
                <h4>No Events</h4>
            </div>
        )}
        {myEvents.length!==0 && myEvents.map((event:any) => (
          <tr key={event.id}>
            <td>{event.id}</td>
            <td>{event.name}</td>
            <td>{event.venue}</td>
            <td>{new Date(event.schedule).toLocaleDateString()}</td>
            <td>{new Date(`1970-01-01T${event.starting_time}Z`).toLocaleTimeString()}</td>
            <td>{new Date(`1970-01-01T${event.ending_time}Z`).toLocaleTimeString()}</td>
            <td>{event.description}</td>
            <td>
              <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#guestModal" onClick={() => handleAddGuest(event.id)}>
                Add Guest
              </button>
              {' '}
              <button className="btn btn-primary"  onClick={() => {
                setInvitation(event.id)
                handleViewGuest(event.id)}}>
                View Guests
              </button>
              {' '}
              <button className="btn btn-danger" onClick={() => handleDeleteEvent(event.id)}>
                Delete Event
              </button>
            </td>
          </tr>
        ))}
        
      </tbody>
    </table>
    <div>
<h3 className='text-start ms-4 mb-3'>Guests for Event {eventId}</h3>
{eventGuests.length==0 && invitation && (
  <h4 className='text-center mt-4'>No guest is invited yet</h4>
)}
    {eventGuests.length!==0 && (
      <>
<table className="table table-bordered text-center">
      <thead>
        <tr>
          <th>ID</th>
          <th>Event ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {eventGuests.map((guest:any) => (
          <tr key={guest.id}>
            <td>{guest.id}</td>
            <td>{guest.ev_id}</td>
            <td>{guest.name}</td>
            <td>{guest.email}</td>
            <td>{guest.phone}</td>
            <td>
            <button className="btn btn-danger" onClick={() => handleDeleteGuest(guest.id)}>
                Delete Guest
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </>

    )}

    </div>

      </div>
      <GuestSignUpForm id={eventId}/>
      <AddEventForm/>

    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }: GetServerSidePropsContext) => {
    return {
      props: {
        orgId: params?.orgId
      }
    }
  }


export default MyEvents
