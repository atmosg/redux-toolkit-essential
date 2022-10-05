import { useAppSelector } from "../../app/hooks";

type props = { userId: string };
export const PostAuthor = ({ userId }: props) => {
  const author = useAppSelector((state) =>
    state.users.find((user) => user.id === userId)
  );

  return <span>by {author ? author.name : "Unknown author"}</span>;
};
