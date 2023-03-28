import { useSelector } from "react-redux"
import {selectPostById} from "./postSlice.js"
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function SinglePostPage() {
  const {postId} = useParams();
  const post = useSelector(state => selectPostById(state,postId));
  if(!post){
    return (
      <section>
        <h2>
          Post not found
        </h2>
      </section>
    )
  }
  return (
    <article>
    <h3>{post.title}</h3>
    <p>{post.content}</p>
    <p className="postCredit">
      <Link to={`/post/edit/${post.id}`}>Edit</Link>
      <PostAuthor userId={post.userId} />
      <TimeAgo timestamp={post.date}></TimeAgo>
    </p>
  </article>
  )
}

export default SinglePostPage