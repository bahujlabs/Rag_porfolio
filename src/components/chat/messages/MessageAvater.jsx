export default function MessageAvatar({ role }) {
  const isUser = role === "user";

  return (
    <div
      aria-label={isUser ? "You" : "Assistant"}
      className={`
        mt-0.5 flex h-8 w-8 shrink-0
        items-center justify-center rounded-full border

        ${
          isUser
            ? "border-user-border bg-user-bg text-accent"
            : "border-border2 bg-surface2 text-accent"
        }
      `}
    >
      {isUser ? <UserIcon /> : <BotIcon />}
    </div>
  );
}

import { FaUser } from "react-icons/fa";
import { FaRobot } from "react-icons/fa";

function UserIcon() {
  return <FaUser size={14} />;
}

function BotIcon() {
  return <FaRobot size={16} />;
}