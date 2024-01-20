import { useAddCommentMutation } from '@/store/invitationApi';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const AddComment = ({ev_id,invitationId}:{ev_id:string,invitationId:string}) => {
    const [comment, setComment] = useState('');
    const gu_id=localStorage.getItem("gu_id")
    const [addComment]=useAddCommentMutation()

    
  const handleCommentChange = (e:any) => {
    setComment(e.target.value);
  };


  const handleAddComment=()=>{
    console.log(ev_id);
    
    addComment({comment,ev_id,gu_id}).unwrap()
    .then((res)=>{
        toast.success(res.message)
    })
    .catch((err)=>{
        console.log(err);
        toast.error(err.data.error?err.data.error:err.data.message)
        
    })
  }

  return (
    <div className="modal p-3" id="commentModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">Add Comment</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
        <div>
      <label className='fw-semibold'>Enter your comment:</label>
      <br />
      <input
        type="text"
        multiple
        id="comment"
        name="comment"
        value={comment}
        className='w-100 p-2 my-3'
        style={{ borderRadius:"5px"}}
        onChange={handleCommentChange}
      />
      <div className='d-flex justify-content-center gap-3'>
        <button className='btn btn-primary' onClick={handleAddComment}>Comment</button>
        <button className='btn btn-danger' data-bs-dismiss="modal">Cancel</button>
      </div>
    </div>
        </div>
       
      </div>
    </div>
  </div>
  )
}

export default AddComment
