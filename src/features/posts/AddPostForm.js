import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addNewPost } from "./postSlice";
import { selectAllUsers } from "../users/userSlice";
import { useNavigate } from "react-router-dom";

const AddPostForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const [addRequestStatus,setAddRequestStatus] = useState('idle');

  const users = useSelector(selectAllUsers);

  const onTitleChange = e => setTitle(e.target.value);
  const onContentChange = e => setContent(e.target.value);
  const onUserChange = e => setUserId(e.target.value);

  const canSave = [title,content,userId].every(Boolean) && addRequestStatus === 'idle';

  const onSubmitForm = (e) => {
    e.preventDefault();
    
    if(canSave){
      try{
        setAddRequestStatus("pending");
        dispatch(addNewPost({title,content,userId})).unwrap();
      }
      catch(err){
        console.error("Failed to create post",err);
      }
      finally{
        setAddRequestStatus("idle");
      }
    }

    setContent("");
    setTitle("");
    setUserId("");
    navigate("/");
  };

  const userOptions = users.map(user => (
    <option value={user.id} key={user.id}>
        {user.name}
    </option>
  ))


  return (
    <section>
        <h2>Add Post</h2>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          placeholder="title"
          onChange={onTitleChange}
          value={title}
        />
        <select value={userId} onChange={onUserChange}>
            <option value="">Select User</option>
            {userOptions}
        </select>
        <textarea
          name="content"
          id="content"
          cols="20"
          rows="5"
          placeholder="Add content here"
          value={content}
          onChange={onContentChange}
        ></textarea>
        <button type="Submit" disabled={!canSave}>Submit</button>
      </form>
    </section>
  );
}

export default AddPostForm;
