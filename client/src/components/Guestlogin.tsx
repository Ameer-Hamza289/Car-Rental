import React, { useState } from 'react'
import { useGuestLoginMutation } from '@/store/userApi'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { useGetAllEventsQuery } from '@/store/eventApi'

const Guestlogin = () => {

const [email,setEmail]=useState<string>('')
const [password,setPassword]=useState<string>('')
const [login]=useGuestLoginMutation();
const router=useRouter();

const {data:eventsData}=useGetAllEventsQuery()
const events=eventsData?eventsData:[]

const handleSubmit=(e:any)=>{
e.preventDefault();
  const data={
    email:email,
    password:password
  }
  
  if(!(data.email==''|| data.password=='')){
    login(data).unwrap()
    .then((res:any)=>{
      localStorage.clear();
      localStorage.setItem("gu_id",res.results[0].id)
      
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      router.push('/dashboard/guest')  
    })
    .catch((err:any)=>{
      toast.error(err.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(err)
    })
  }

}

  return (
    <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <div className="card-header">
            <h3 className="text-center">Guest Login</h3>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group ">
                <label >Email</label>
                <input type="text"
                onChange={(e)=>setEmail(e.target.value)}
                className="form-control p-3 mt-2" id="username" placeholder="Enter your email address"/>
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input type="password" 
                onChange={(e)=>setPassword(e.target.value)}
                className="form-control p-3 mt-2" id="password" placeholder="Enter your password"/>
              </div>
              <button type="submit" className="btn btn-primary btn-block mt-4" onClick={handleSubmit}>Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Guestlogin
