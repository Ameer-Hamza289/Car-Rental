import AddEventForm from '@/components/modals/AddEventForm'
import React, { useState } from 'react'
import { useGetAllEventsQuery, useGetMyEventsQuery,useDeleteEventMutation,useGetEventGuestsQuery } from '@/store/eventApi'
import {toast} from 'react-toastify'
import GuestSignUpForm from '@/components/modals/GuestSignUpForm'
import Navbar from '@/components/Navbar'

const Event = () => {

    const {data:eventsData}=useGetAllEventsQuery()
    const events=eventsData?eventsData:[]
    // const id=localStorage.getItem("org_id")
    // console.log(id);
    // const [deleteEvent]=useDeleteEventMutation()
    // const [eventId,setEventId]=useState<string>('')

    // console.log(events);
    
    // const {data:myEventsData}=useGetMyEventsQuery(id)
    // console.log(myEventsData);
    
    // const myEvents=myEventsData?myEventsData:[]

    // const {data:eventGuestsData}=useGetEventGuestsQuery(id)
    // const eventGuests=eventGuestsData?eventGuestsData:[]

    // console.log(eventGuests);
    



    // const handleAddGuest=(id:any)=>{
    //     console.log("Add guest to eventId",id);
    //     setEventId(id)
        

    // }

// const handleViewGuest=(id:any)=>{
//     console.log(id,"view guests for id",id);
//     setEventId(id)
    

// }

    // const handleDeleteEvent=(id:any)=>{
    //     console.log("delete event",id);
    //     deleteEvent(id).unwrap()
    //     .then((res)=>{
    //         console.log(res);
    //         toast.success("Event deleted successfully!")
            
            
    //     })
    //     .catch((err)=>{
    //         toast.error(err.data.error?err.data.error:err.data.message, {
    //             position: toast.POSITION.TOP_RIGHT,
    //           });
    //         console.log(err);
            
    //     })
    // }


  return (
    <>
    <Navbar/>
    <div className='py-5 text-center'>
        <div className='d-flex justify-content-between px-5 m-4 align-items-center'>
      <h1> All Events</h1>
      <button className='btn btn-primary h-75' data-bs-toggle="modal" data-bs-target="#exampleModal">Add event</button>

        </div>
      
      <div>
        {/* <h2 className='m-4'>All Events</h2> */}
        {/* {} */}
        <table className="table table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Venue</th>
          <th>Schedule</th>
          <th>Starting Time</th>
          <th>Ending Time</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
      {events.length!==0 ? events.map((event:any) => (
          <tr key={event.id}>
            <td>{event.id}</td>
            <td>{event.name}</td>
            <td>{event.venue}</td>
            {/* <td>{event.schedule}</td> */}
            <td>{new Date(event.schedule).toLocaleDateString()}</td>
            {/* <td>{new Date(`1970-01-01T${event.starting_time}:00Z`).toLocaleTimeString()}</td>
            <td>{new Date(`1970-01-01T${event.ending_time}Z`).toLocaleTimeString()}</td> */}
            <td>{event.starting_time}</td>
            <td>{event.ending_time}</td>
            <td>{event.description}</td>
          </tr>
        )):(
            <div className="text-center">
            <p>No Event</p>
          </div>
        )}
      </tbody>
    </table>



      </div>

      {/* <div>
        <h2 className='m-4'>My Events</h2>
       

        <table className="table table-bordered">
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
              <button className="btn btn-primary"  onClick={() => handleViewGuest(event.id)}>
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

      </div> */}
      
      
      <AddEventForm/>
      {/* <GuestSignUpForm id={eventId}/> */}

    </div>
    </>
  )
}

export default Event
