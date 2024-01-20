// import Link from 'next/link'
// import React, { useState } from 'react'
// import { useSignUpMutation } from '@/store/userApi'
// import { useRouter } from 'next/router'
// import { toast } from 'react-toastify'

// const AddOrganizerForm = () => {

//   const [email, setEmail] = useState<string>('')
//   const [password, setPassword] = useState<string>('')
//   const [userName, setUserName] = useState<string>('')
//   const [phone, setPhone] = useState<string>('')
//   const [signup] = useSignUpMutation()
//   const router = useRouter()


//   const handleSubmit = (e: any) => {
//     e.preventDefault();
//     const data = {
//       name: userName,
//       email: email,
//       password: password,
//       phone: phone
//     }

//     if (!(data.email == '' || data.password == '' || data.phone == '' || data.name == '')) {
//       signup(data).unwrap()
//         .then((res: any) => {
//           toast.success(res.message, {
//             position: toast.POSITION.TOP_RIGHT,
//           });
//           router.push('/dashboard/organizer')
//         })
//         .catch((err: any) => {
//           toast.error(err.data.error, {
//             position: toast.POSITION.TOP_RIGHT,
//           });
//           console.log(err)
//         })
//     }
//   }

//   return (
//     <div className="mymodal" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="myexampleModal">
//    <div className="modal-dialog">
//    <div className="modal-content">
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="card">
//             <div className="card-header">
//               <h3 className="text-center">Add  Organizer </h3>
//             </div>
//             <div className="card-body">
//               <form>
//                 <div className="form-group ">
//                   <label >Username</label>
//                   <input type="text"
//                     onChange={(e) => setUserName(e.target.value)}
//                     className="form-control p-3 mt-2" id="email" placeholder="Enter your name" required />
//                 </div>
//                 <div className="form-group ">
//                   <label >Email</label>
//                   <input type="email"
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="form-control p-3 mt-2" id="email" placeholder="Enter your email address" required />
//                 </div>
//                 <div className="form-group mt-3">
//                   <label>Password</label>
//                   <input type="password"
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="form-control p-3 mt-2" id="password" placeholder="Enter your password" required />
//                 </div>
//                 <div className="form-group mt-3">
//                   <label>Phone</label>
//                   <input type="number"
//                     onChange={(e) => setPhone(e.target.value)}
//                     className="form-control p-3 mt-2" id="password" placeholder="Enter your phone" required />
//                 </div>
//                 <div  style={{ textAlign:"center"}}>
//                   <button type="submit" className="btn btn-primary  mt-4 " onClick={handleSubmit}>Sign up</button>
//                 </div>
//                 <div className='mt-3 text-center'>
//                   <span>Already have an account? </span>
//                   <Link href={"/login"}>Login</Link>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     </div>
//       </div>
//       </div>
//   )
// }

// export default AddOrganizerForm


import React, { useState } from 'react'
import { useGuestSignUpMutation } from '@/store/userApi';
import { toast } from 'react-toastify';


const AddOrganizerForm = () => {

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [userName, setUserName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [event, setEvent] = useState<string>('')

  const [signup]=useGuestSignUpMutation();

const events=[
    {
        id:'5',
        name:"Test Event"
    }
]

  const handleSubmit=(e:any)=>{
    e.preventDefault();
    const data={
        email:email,
        password:password,
        name:userName,
        event:event,
        phone:phone
    }
console.log(data);
if(data.email|| data.password|| data.name|| data.event|| data.phone){
  signup(data).unwrap()
  .then((res)=>{
  console.log(res);
  // toast.success(res.message)
  })
  .catch((err)=>{
    console.log(err);
    // toast.error(err.data.message)
    
  })

}


  }

  return (
    <div className="modal" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Add a guest</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
                <div className="form-group ">
                  <label >Username</label>
                  <input type="text"
                    onChange={(e) => setUserName(e.target.value)}
                    className="form-control p-3 mt-2" id="username" placeholder="Enter your name" required />
                </div>
                <div className="form-group">
        <label htmlFor="event">Event</label>
        <select
          id="event"
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          className="form-control p-3 mt-2"
          required
        >
          <option value="" disabled>Select an event</option>
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.name}
            </option>
          ))}
        </select>
      </div>
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

export default AddOrganizerForm
