import { useAppDispatch } from "../../app/hooks";
import { reactionAdded } from "./postsSlice";

const reactionEmoji = {
  thumbsUp: "👍",
  hooray: "🎉",
  heart: "❤️",
  rocket: "🚀",
  eyes: "👀",
} as const;
export type ReactionEmoji = typeof reactionEmoji;

export const ReactionButtons = ({ post }: any) => {
  const dispatch = useAppDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => (
    <button
      key={name}
      type="button"
      className="muted-button reaction-button"
      onClick={() =>
        dispatch(
          reactionAdded({
            id: post.id,
            reaction: name as keyof ReactionEmoji,
          })
        )
      }
    >
      {emoji} {post.reactions[name]}
    </button>
  ));

  return <div>{reactionButtons}</div>;
};
