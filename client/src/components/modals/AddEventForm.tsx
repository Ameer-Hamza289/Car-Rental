import React, { useState } from 'react'
import {  useCreateEventMutation } from '@/store/eventApi';
import { toast } from 'react-toastify';


const AddEventForm = () => {

  const [name, setName] = useState<string>('')
  const [venue, setVenue] = useState<string>('')
  const [schedule, setSchedule] = useState<string>('')
  const [startingTime, setStartingTime] = useState<string>('')
  const [endingTime, setEndingTime] = useState<string>('')
  const [description, setDescription] = useState<string>('')
//   const [orgId, setOrgId] = useState<string>('')

  const [createEvent]= useCreateEventMutation();


  const handleSubmit=(e:any)=>{
    const id=(localStorage.getItem("org_id"))
    
    e.preventDefault();
    const data={
        name:name,
        venue:venue,
        schedule:schedule,
        starting_time:startingTime,
        ending_time:endingTime,
        description:description,
        org_id:id
    }
console.log(data);
if(id && data.name && data.schedule && data.ending_time && data.description && data.venue && data.starting_time){
  createEvent(data).unwrap()
  .then((res)=>{
  console.log(res);
  setDescription('')
  setEndingTime('')
  setStartingTime('')
  setName('')
  setVenue('')
  setSchedule('')
  toast.success(res.message)
  })
  .catch((err)=>{
    console.log(err);
    toast.error(err.data.error?err.data.error:err.data.message)
    
  })

}else{
    toast.warning("All fields are required")
}


  }

  return (
    // name, venue, schedule, starting_time, ending_time, description, org_id
    <div className="modal" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Add an Event</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body text-start">
      <form>
  <div className="form-group ">
    <label>Name</label>
    <input
      type="text"
      onChange={(e) => setName(e.target.value)}
      className="form-control p-3 mt-2"
      id="username"
      placeholder="Enter your name"
      required
    />
  </div>

  <div className="form-group">
    <label>Venue</label>
    <input
      type="text"
      onChange={(e) => setVenue(e.target.value)}
      className="form-control p-3 mt-2"
      id="venue"
      placeholder="Enter the venue"
      required
    />
  </div>

  <div className="form-group">
    <label>Schedule</label>
    <input
      type="text"
      onChange={(e) => setSchedule(e.target.value)}
      className="form-control p-3 mt-2"
      id="schedule"
      placeholder="Enter the schedule"
      required
    />
  </div>

  <div className="form-group">
    <label>Starting Time</label>
    <input
      type="text"
      onChange={(e) => setStartingTime(e.target.value)}
      className="form-control p-3 mt-2"
      id="starting_time"
      placeholder="Enter the starting time"
      required
    />
  </div>

  <div className="form-group">
    <label>Ending Time</label>
    <input
      type="text"
      onChange={(e) => setEndingTime(e.target.value)}
      className="form-control p-3 mt-2"
      id="ending_time"
      placeholder="Enter the ending time"
      required
    />
  </div>

  <div className="form-group">
    <label>Description</label>
    <textarea
      onChange={(e) => setDescription(e.target.value)}
      className="form-control p-3 mt-2"
      id="description"
      placeholder="Enter a description"
      required
    ></textarea>
  </div>

  <div style={{ textAlign: "center" }}>
    <button
      type="submit"
      className="btn btn-primary mt-4"
      onClick={handleSubmit}
    >
      Add Event
    </button>
    <button
      type="submit"
      className="btn btn-danger mt-4 ms-2"
      data-bs-dismiss="modal"
    >
      Cancel
    </button>
  </div>
</form>;

      </div>
      {/* <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" className="btn btn-primary">Add</button>
      </div> */}
    </div>
  </div>
</div>
  )
}

export default AddEventForm
