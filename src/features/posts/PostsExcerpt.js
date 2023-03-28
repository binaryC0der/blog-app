import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";

function PostsExcerpt({ post }) {
  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 14)}...</p>
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date}></TimeAgo>
      </p>
    </article>
  );
}

export default PostsExcerpt;
