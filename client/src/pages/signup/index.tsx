import Link from 'next/link'
import React, { useState } from 'react'
import { useSignUpMutation } from '@/store/userApi'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

const Signup = () => {

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [userName, setUserName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [signup] = useSignUpMutation()
  const router = useRouter()


  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = {
      name: userName,
      email: email,
      password: password,
      phone: phone
    }

    if (!(data.email == '' || data.password == '' || data.phone == '' || data.name == '')) {
      signup(data).unwrap()
        .then((res: any) => {
          toast.success(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          router.push('/dashboard/organizer')
        })
        .catch((err: any) => {
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
              <h3 className="text-center"> Organizer Signup</h3>
            </div>
            <div className="card-body">
              <form>
                <div className="form-group ">
                  <label >Username</label>
                  <input type="text"
                    onChange={(e) => setUserName(e.target.value)}
                    className="form-control p-3 mt-2" id="email" placeholder="Enter your name" required />
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
                    className="form-control p-3 mt-2" id="password" placeholder="Enter your phone" required />
                </div>
                <div  style={{ textAlign:"center"}}>
                  <button type="submit" className="btn btn-primary  mt-4 " onClick={handleSubmit}>Sign up</button>
                </div>
                <div className='mt-3 text-center'>
                  <span>Already have an account? </span>
                  <Link href={"/login"}>Login</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Signup
