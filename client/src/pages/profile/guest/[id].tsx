import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router';
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { useGetGuestProfileQuery,  useUpdateGuestMutation } from '@/store/userApi';
import { toast } from 'react-toastify';

interface MyProfileProps {
    id: string
}


const Profile = ({ id }: MyProfileProps) => {

    console.log(id, "My Profile");
    const { data: guestData, refetch } = useGetGuestProfileQuery(id)
    const [updateGuest] = useUpdateGuestMutation()
    useEffect(() => {
        refetch()
    }, [id])
    // const {data:organizerData}=useGetOrganizerProfileQuery(id)

    console.log(guestData, "organizer");

    const router = useRouter()
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [mode, setMode] = useState('Add');



    console.log(mode);

    useEffect(()=>{
setEmail(guestData.email)
setPassword(guestData.password)
setPhone(guestData.phone)
setFullName(guestData.name)
    },[guestData])


    const handleUpdateProfile = (e: any) => {
        e.preventDefault();
        // alert("updated")
        updateGuest({ name: fullName, password, phone, id }).unwrap()
        .then((res) => {
                console.log('Profile updated successfully!');
                console.log(res);
                toast.success(res.message)
            })
            .catch((err)=>{
                toast.error(err.data.error?err.data.error:err.data.message|| err.error)
            })

    };

    return (
        <div className="container mt-4">
            <div className='d-flex justify-content-between'>
                <h2><span className='me-3 fw-bold' onClick={() => router.push('/dashboard/organizer')} style={{ cursor: "pointer" }}>{'<-'}</span>{mode === "Edit" ? "Update" : "My"} Profile</h2>
                <button className='btn btn-info p-2 px-4' onClick={() => setMode("Edit")}>Edit</button>
            </div>
            <form onSubmit={handleUpdateProfile} className='py-4'>
                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        disabled
                    // onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Phone</label>
                    <input
                        type="number"
                        className="form-control"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

            </form>
            <div className=' gap-3' style={{ display: `${mode === "Edit" ? "flex" : "none"}` }}>
                <button onClick={handleUpdateProfile} className="btn btn-primary">Save Changes</button>
                <button className="btn btn-danger" onClick={() => setMode("Add")}>Cancel</button>
            </div>
        </div>
    );
};


export const getServerSideProps: GetServerSideProps = async ({ params }: GetServerSidePropsContext) => {
    return {
        props: {
            id: params?.id
        }
    }
}

export default Profile
