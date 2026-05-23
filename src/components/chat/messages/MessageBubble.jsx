import { memo, useEffect } from "react";
import MessageAvatar from "./MessageAvater";
import MessageContent from "./MessageContent";
import MessageActions from "./MessageActions";
import MessageSources from "./MessageSources";
import MessageProject from "./MessageProject";
import MessageLinks from "./MessageLinks";

function MessageBubble({ message, showSources }) {
  const isUser = message.role === "user";

  return (
    <article
      className={`
        flex gap-3 items-start animate-fadeUp
        ${isUser ? "flex-row-reverse" : ""}
      `}
    >
      <MessageAvatar role={message.role} />
      <div
        className={`
          flex max-w-[85%] flex-col gap-2
          ${isUser ? "items-end" : "items-start"}
        `}
      >
        <MessageContent message={message} />

        {/* Render project cards for /projects command */}
        {!isUser && message.projects?.length > 0 && (
          <MessageProject projects={message.projects} />
        )}

        {/* Render contact links for /contact command */}
        {!isUser && message.links?.length > 0 && (
          <MessageLinks links={message.links} />
        )}

        {!isUser && !message.isStreaming && (
          <MessageActions message={message} />
        )}
        {!isUser && showSources && message.sources?.length > 0 && (
          <MessageSources sources={message.sources} />
        )}
      </div>
    </article>
  );
}

export default memo(MessageBubble);