import { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, Bot, User } from "lucide-react";
import API from "../api/axios";

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi 👋 I am your AI shopping assistant. How can I help you today?",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading, open]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");

    try {
      setLoading(true);

      const response = await API.post("/ai/chat", {
        message,
      });

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: response.data.reply || "Sorry, I couldn't understand that.",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="
          fixed
          bottom-6
          right-6
          bg-zinc-900
          hover:bg-zinc-800
          text-white
          w-13
          h-13
          rounded-2xl
          shadow-xl
          flex
          items-center
          justify-center
          z-50
          transition-all
          duration-200
          hover:scale-105
          active:scale-95
          border
          border-zinc-800
        "
        aria-label="Toggle AI Chat"
      >
        {open ? <X className="w-5 h-5" /> : <Sparkles className="w-5 h-5 text-zinc-100" />}
      </button>

      {/* Chat Floating Window */}
      {open && (
        <div
          className="
            fixed
            bottom-22
            right-6
            w-80
            sm:w-96
            bg-white
            rounded-2xl
            shadow-2xl
            border
            border-zinc-200/80
            overflow-hidden
            z-50
            flex
            flex-col
            animate-in
            fade-in
            slide-in-from-bottom-4
            duration-200
          "
        >
          {/* Header */}
          <div className="bg-zinc-900 text-white p-4 flex items-center justify-between border-b border-zinc-800">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center border border-zinc-700">
                <Bot className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <h3 className="font-bold text-xs tracking-tight text-white">
                  AI Shopping Assistant
                </h3>
                <p className="text-[10px] text-zinc-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
                  Online & ready to help
                </p>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="h-80 overflow-y-auto p-4 space-y-3 bg-zinc-50/50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-2 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "bot" && (
                  <div className="w-6 h-6 rounded-md bg-zinc-900 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={
                    msg.sender === "user"
                      ? "bg-zinc-900 text-white text-xs font-medium px-3.5 py-2.5 rounded-2xl rounded-br-xs max-w-[80%] shadow-2xs leading-relaxed"
                      : "bg-white text-zinc-800 text-xs font-medium border border-zinc-200/80 px-3.5 py-2.5 rounded-2xl rounded-bl-xs max-w-[80%] shadow-2xs leading-relaxed"
                  }
                >
                  {msg.text}
                </div>

                {msg.sender === "user" && (
                  <div className="w-6 h-6 rounded-md bg-zinc-200 text-zinc-700 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-zinc-400 text-xs font-medium pl-1">
                <Bot className="w-3.5 h-3.5 animate-pulse" />
                <span>AI is thinking...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="flex items-center border-t border-zinc-200/80 p-3 gap-2 bg-white">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about products, orders..."
              className="
                flex-1
                bg-zinc-50
                border
                border-zinc-200
                rounded-xl
                px-3.5
                py-2
                text-xs
                text-zinc-900
                placeholder:text-zinc-400
                focus:outline-none
                focus:bg-white
                focus:border-zinc-400
                transition-all
              "
            />

            <button
              onClick={sendMessage}
              disabled={loading || !message.trim()}
              className="
                bg-zinc-900
                hover:bg-zinc-800
                disabled:opacity-40
                text-white
                p-2
                rounded-xl
                transition-all
                active:scale-95
              "
              aria-label="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBot;