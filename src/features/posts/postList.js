import { useSelector} from "react-redux";

import {
  selectAllPosts,
  getPostsError,
  getPostsStatus,

} from "./postSlice";
import PostsExcerpt from "./PostsExcerpt";

const PostList = () => {

  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  let renderedPosts;
  if (postsStatus === 'loading') {
    renderedPosts = <p>Loading...</p>;
  } else if (postsStatus === 'succeeded') {
    renderedPosts = posts.map((post) => (
      <PostsExcerpt post={post} key={post.id} />
    ));
  } else if (postsStatus === 'failed') {
    renderedPosts = <p>{error}</p>;
  }

  return (
    <section>
      <div>{renderedPosts}</div>
    </section>
  );
};

export default PostList;
