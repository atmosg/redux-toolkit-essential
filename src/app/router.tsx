import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { AddPostForm } from "../features/posts/AddPostForm";
import { EditPostForm } from "../features/posts/EditPostForm";
import { PostList } from "../features/posts/PostList";
import { SinglePostPage } from "../features/posts/SinglePostPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: [<AddPostForm />, <PostList />],
      },
      {
        path: "/posts/:postId",
        element: [<SinglePostPage />],
      },
      {
        path: "/editPost/:postId",
        element: [<EditPostForm />],
      },
    ],
  },
]);
