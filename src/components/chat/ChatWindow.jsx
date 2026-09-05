import { useEffect, useRef } from "react";
import Banner from "./Banner";
import MessageBubble from "../chat/messages/MessageBubble";
import ThinkingIndicator from "./ThinkingIndicator";

export default function ChatWindow({
  messages,
  isLoading,
  showSources,
  onCommand,
}) {
  const bottomRef = useRef(null);
  const hasMessages = messages.length > 0;
  const lastMessage = messages[messages.length - 1];
  const assistantAlreadyRendered = lastMessage?.role === "assistant";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isLoading]);

  if (!hasMessages) {
    return (
      <div className="flex-1 overflow-y-auto bg-bg px-4 md:px-6">
        <Banner onCommand={onCommand} />
      </div>
    );
  }

  return (
    <section
      className="flex-1 overflow-y-auto bg-bg px-4 md:px-6 scroll-smooth"
      aria-live="polite"
    >
      <div className="max-w-3xl py-6 mx-auto space-y-5">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            showSources={showSources}
          />
        ))}
        {isLoading && !assistantAlreadyRendered && <ThinkingIndicator />}
        <div ref={bottomRef} />
      </div>
    </section>
  );
}
