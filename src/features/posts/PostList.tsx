import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { PostAuthor } from "./PostAuthor";
import { fetchPosts, Post, selectAllPosts } from "./postsSlice";
import { ReactionButtons } from "./ReactionButtons";
import { TimeAgo } from "./TimeAgo";

type props = { post: Post };
const PostExcerpt = ({ post }: props) => {
  return (
    <article className="post-excerpt">
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>

      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  );
};

export const PostList = () => {
  const posts = useAppSelector(selectAllPosts);
  const postStatus = useAppSelector((state) => state.posts.status);
  const error = useAppSelector((state) => state.posts.error);

  const dispatch = useAppDispatch();
  let content;
  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
    console.log(postStatus);
  }, [postStatus, dispatch]);

  switch (postStatus) {
    case "loading":
      content = <div>"Loading..."</div>;
      break;
    case "succeeded":
      content = posts
        .slice()
        .sort((a, b) => b.date.localeCompare(a.date))
        .map((post) => <PostExcerpt key={post.id} post={post} />);
      break;
    case "failed":
      content = <div>{error}</div>;
      break;
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  );
};
