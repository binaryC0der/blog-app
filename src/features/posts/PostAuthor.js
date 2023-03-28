import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/userSlice'

function PostAuthor(props) {
    const {userId} = props;

    const users = useSelector(selectAllUsers);

    const postUser = users.find(user => (
        user.id === userId
    ))

    let userName;
    if(!postUser)
    userName = "Unknown"
    else userName = postUser.name;

  return (
    <span>-By {userName}</span>
  )
}

export default PostAuthor