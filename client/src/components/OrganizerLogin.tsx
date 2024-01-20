import Link from 'next/link'
import React,{useState} from 'react'
import { useLoginMutation } from '@/store/userApi'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

const OrganizerLogin = () => {

const [email,setEmail]=useState<string>('')
const [password,setPassword]=useState<string>('')
const [login]=useLoginMutation()
const router=useRouter()


const handleSubmit=(e:any)=>{
  e.preventDefault();
  const data={
    email:email,
    password:password
  }
  console.log(data);
  
  if(!(data.email==''|| data.password=='')){
    login(data).unwrap()
    .then((res:any)=>{
      // console.log(res,"login response");
      localStorage.clear();
      localStorage.setItem("org_id",res.results[0].id)
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      router.push('/dashboard/organizer')  
    })
    .catch((err:any)=>{
      toast.error(err.data.error?err.data.error:err.data.message, {
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
            <h3 className="text-center"> Organizer Login</h3>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group ">
                <label >Email</label>
                <input type="email" 
                onChange={(e)=>setEmail(e.target.value)}
                className="form-control p-3 mt-2" id="email" placeholder="Enter your email address" required/>
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input type="password"
                onChange={(e)=>setPassword(e.target.value)}
                className="form-control p-3 mt-2" id="password" placeholder="Enter your password" required/>
              </div>
              <button type="submit" className="btn btn-primary  mt-4 " onClick={handleSubmit}>Login</button>
              <div className='mt-3'>
                <span>Don&apos;t have an account? </span>
                <Link href={"/signup"}>SignUp</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default OrganizerLogin
