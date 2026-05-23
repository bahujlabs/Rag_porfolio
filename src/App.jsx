import { useState, useRef, useEffect } from "react";
import ChatWindow from "./components/chat/ChatWindow";
import InputBox from "./components/chat/InputBox";
import Sidebar from "./components/layout/Sidebar";
import ErrorBanner from "./components/layout/ErrorBanner";
import { useChat } from "./hooks/UseChat.js";

export default function App() {
  const {
    messages,
    isLoading,
    error,
    sendMessage,
    cancel,
    clear,
  } = useChat();

  const [showSources, setShowSources] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-bg text-text">

      <Sidebar
        sendMessage={sendMessage}
        isLoading={isLoading}
      />

      <main className="flex min-w-0 flex-1 flex-col bg-bg">

        <ErrorBanner error={error} />

        <ChatWindow
          messages={messages}
          isLoading={isLoading}
          showSources={showSources}
          onCommand={sendMessage}
        />

        <InputBox
          onSend={sendMessage}
          onCancel={cancel}
          onClear={clear}
          isLoading={isLoading}
          showSources={showSources}
          onToggleSources={() => setShowSources((prev) => !prev)}
        />
      </main>
    </div>
  );
}
