import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updatePost } from "./postSlice";
import { selectAllUsers } from "../users/userSlice";
import { selectPostById } from "./postSlice";
import { useNavigate, useParams } from "react-router-dom";

const EditPostForm = () => {
const {postId} = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const post = useSelector(state => selectPostById(state,postId));
    
  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.content);
  const [userId, setUserId] = useState(post?.userId);
  const [RequestStatus,setRequestStatus] = useState('idle');

  const users = useSelector(selectAllUsers);

  if(!post){
      return (
          <section>
            <h2>
              Post not found
            </h2>
          </section>
        )
  }
  const onTitleChange = e => setTitle(e.target.value);
  const onContentChange = e => setContent(e.target.value);
  const onUserChange = e => setUserId(e.target.value);

  const canSave = [title,content,userId].every(Boolean) && RequestStatus === 'idle';

  const onSubmitForm = (e) => {
    e.preventDefault();
    
    if(canSave){
      try{
        setRequestStatus("pending");
        dispatch(updatePost({id:post.id,title,content,userId})).unwrap();
        setContent("");
        setTitle("");
        setUserId("");
        navigate(`/post/${post.id}`);
      }
      catch(err){
        console.error("Failed to save post",err);
      }
      finally{
        setRequestStatus('idle');
      }
    }


  };

  const userOptions = users.map(user => (
    <option value={user.id} key={user.id}>
        {user.name}
    </option>
  ))


  return (
    <section>
        <h2>Edit Post</h2>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          placeholder="title"
          onChange={onTitleChange}
          value={title}
        />
        <select value={userId} defaultValue={userId} onChange={onUserChange}>
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

export default EditPostForm;
