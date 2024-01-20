import React, { useState } from 'react'
import { useGuestSignUpMutation } from '@/store/userApi';
import { toast } from 'react-toastify';
    
import {useGetAllEventsQuery} from '@/store/eventApi'

interface GuestSignUpProps{
  id?:string
}

const GuestSignUpForm = (props:GuestSignUpProps) => {

  const {id}=props

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [userName, setUserName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [event, setEvent] = useState<string>('')

  const [guestSignup]=useGuestSignUpMutation();
  const {data:eventsData}=useGetAllEventsQuery()
    const events=eventsData?eventsData:[]
console.log(events);

  console.log(id);
  
 
// const events=[
//     {
//         id:'5',
//         name:"Test Event"
//     }
// ]

  const handleSubmit=(e:any)=>{
    e.preventDefault();
    const data={
        email:email,
        password:password,
        name:userName,
        event:event?event:id,
        phone:phone
    }
console.log(data);
if(data.email && data.password && data.name && (data.event||id) &&  data.phone){
  guestSignup(data).unwrap()
  .then((res)=>{
  console.log(res);
  toast.success(res.message)
  })
  .catch((err)=>{
    console.log(err);
    toast.error(err.data.error?err.data.error:err.data.message)
    
  })

}


  }

  return (
    <div className="modal" id="guestModal" tabIndex={-1} role="dialog" aria-labelledby="guestModalLabel">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Add a guest</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
                <div className="form-group ">
                  <label >Name</label>
                  <input type="text"
                    onChange={(e) => setUserName(e.target.value)}
                    className="form-control p-3 mt-2" id="username" placeholder="Enter your name" required />
                </div>
               {!id && <div className="form-group">
        <label htmlFor="event">Event</label>
        <select
          id="event"
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          className="form-control p-3 mt-2"
          required
        >
          <option value="" disabled>Select an event</option>
          {events.map((event:any) => (
            <option key={event.id} value={event.id}>
              {event.name}
            </option>
          ))}
        </select>
      </div>}
                <div className="form-group ">
                  <label >Email</label>
                  <input type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control p-3 mt-2" id="email" placeholder="Enter your email address" required />
                </div>
                <div className="form-group mt-3">
                  <label>Password</label>
                  <input type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control p-3 mt-2" id="password" placeholder="Enter your password" required />
                </div>
                <div className="form-group mt-3">
                  <label>Phone</label>
                  <input type="number"
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control p-3 mt-2" id="phone" placeholder="Enter your phone" required />
                </div>
                <div  style={{ textAlign:"center"}}>
                  <button type="submit" className="btn btn-primary  mt-4 " onClick={handleSubmit}>Add Guest</button>
                  <button type="submit" className="btn btn-danger mt-4 ms-2 " data-bs-dismiss="modal">Cancel</button>
                </div>
              </form>
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

export default GuestSignUpForm
