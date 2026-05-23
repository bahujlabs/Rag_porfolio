import CopyButton from "./CopyButton";

export default function MessageActions({ message }) {
  return (
    <div className="flex w-full items-center gap-2 px-1">
      <CopyButton text={message.content} />

      <span className="ml-auto text-[10px] text-text3">
        {formatTime(message.createdAt)}
      </span>
    </div>
  );
}

function formatTime(date) {
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}