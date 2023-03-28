import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  selectAllPosts,
  getPostsError,
  getPostsStatus,
  fetchPosts,
} from "./postSlice";
import PostsExcerpt from "./PostsExcerpt";

const PostList = () => {
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

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
