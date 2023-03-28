import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";

function PostsExcerpt({ post }) {
  return (
    <article>
      <h2>{post.title}</h2>
      <p className="excerpt">{post.content.substring(0, 14)}...</p>
      <p className="postCredit">
        <Link to={`post/${post.id}`}>View Post</Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date}></TimeAgo>
      </p>
    </article>
  );
}

export default PostsExcerpt;
