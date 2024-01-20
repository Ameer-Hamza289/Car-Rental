import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Car Rental System</title>
        <meta name="description" content="This is a car rental app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <main className={`${styles.main} ${inter.className}`}> */}
      <main className='text-center p-5'>
        <h1 className='fw-bold'>Welcome to Events & RSVP System</h1>
        <div className='fw-semibold pt-4 fs-4'>
          <p>Welcome to our cutting-edge Events & RSVP System  your one-stop destination for seamless event management and guest coordination. Whether you are planning a corporate conference, a social gathering, or a personal celebration, our platform is designed to simplify the entire process. From creating and promoting events to efficiently managing RSVPs, we provide a comprehensive solution that ensures your events are executed flawlessly. Join us in revolutionizing the way you plan and organize events, making every occasion memorable and stress-free. Lets transform your events into unforgettable experiences, starting right here!</p>
        </div>
        {/* <div className="d-flex gap-4 justify-content-center fs-2">
          <div className='btn btn-primary d-flex align-items-center '>
            <Link href={"/signup"} className='text-decoration-none text-white '>SignUp</Link>
          </div>
          <div className='btn btn-danger d-flex align-items-center '>
            <Link href={"/login"} className='text-decoration-none text-white '>Login</Link>
          </div>
        </div> */}
        <div className="d-flex gap-4 justify-content-center fs-2">
          <Link href={'/login'}>Login</Link>
          <Link href={'/signup'}>Sign up</Link>
        </div>

      </main>
    </>
  )
}
