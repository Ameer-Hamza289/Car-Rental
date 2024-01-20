import { useChangeStatusMutation } from '@/store/invitationApi';
import React, {  useState } from 'react'
import { toast } from 'react-toastify';

const ChangeStatus = ({invitationId,ev_id}:{invitationId:string,ev_id:string}) => {
    const [selectedOption, setSelectedOption] = useState('Pending');
    const [changeStatus]=useChangeStatusMutation()
    const gu_id=localStorage.getItem("gu_id")
    const handleOptionChange = (e:any) => {
      setSelectedOption(e.target.value);
    };
  const handleStatusChange=()=>{
    console.log(selectedOption);
    
    changeStatus({id:invitationId,gu_id,status:selectedOption,ev_id}).unwrap()
    .then((res)=>{
        toast.success(res.message)
    })
    .catch((err)=>{
        console.log(err);
        toast.error(err.data.error?err.data.error:err.data.message)
        
    })
  }

  return (
    <div className="modal p-3" id="statusModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">Change your status</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body d-flex flex-column g-3">
      <h3>Select an option:</h3>
      
      <label>
        <input
          type="radio"
          value="Pending"
          checked={selectedOption === 'Pending'}
          onChange={handleOptionChange}
        />
        Pending
      </label>

      <label>
        <input
          type="radio"
          value="Accepted"
          checked={selectedOption === 'Accepted'}
          onChange={handleOptionChange}
        />
        Accepted
      </label>

      <label>
        <input
          type="radio"
          value="Declined"
          checked={selectedOption === 'Declined'}
          onChange={handleOptionChange}
        />
        Declined
      </label>

      <div>
        <p className='fw-semibold'>Selected Option: <span className='fw-bold'>{selectedOption}</span></p>
      </div>

      <div className='d-flex gap-4 justify-content-center m-4'>
        <button className='btn btn-primary' onClick={handleStatusChange}>Submit</button>{' '}
        <button className='btn btn-danger' data-bs-dismiss="modal">Cancel</button>
      </div>
    </div>
       
      </div>
    </div>
  </div>
  )
}

export default ChangeStatus
