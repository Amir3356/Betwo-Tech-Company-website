import { useEffect, useState } from "react";
import axios from "axios";
import { MessageCircle, X } from "lucide-react";

const nvidiaModel = import.meta.env.VITE_NVIDIA_MODEL || "nvidia/nemotron-3-content-safety";
const nvidiaInvokeUrl = "/api/nvidia/v1/chat/completions";

const defaultChatbotData = {
  title: "Betwo AI",
  model: "openai/gpt-oss-120b:free",
  initialMessages: [{ role: "assistant", content: "Hi! How can I help you today?" }],
  placeholder: "Ask about Betwo...",
  sendButtonText: "Send",
  typingText: "AI is typing...",
  openButtonAriaLabel: "Open chat",
  closeButtonAriaLabel: "Close chat",
  rateLimitMessage: "Too many requests. Please wait a moment and try again.",
  fallbackErrorMessage: "Sorry, I am having trouble connecting right now. Please try again later.",
};

export default function HeroChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [chatbotData, setChatbotData] = useState(defaultChatbotData);
  const [messages, setMessages] = useState(defaultChatbotData.initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    axios
      .get("/data/HeroChatbot.json")
      .then((response) => {
        if (!isMounted) return;

        const data = response.data || {};
        const mergedData = {
          ...defaultChatbotData,
          ...data,
          initialMessages: Array.isArray(data.initialMessages) && data.initialMessages.length > 0
            ? data.initialMessages
            : defaultChatbotData.initialMessages,
        };

        setChatbotData(mergedData);
        setMessages(mergedData.initialMessages);
      })
      .catch((error) => {
        console.error("Failed to load chatbot data:", error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const handleOpenChatbot = () => setIsOpen(true);

    window.addEventListener("betwo:open-chatbot", handleOpenChatbot);

    return () => {
      window.removeEventListener("betwo:open-chatbot", handleOpenChatbot);
    };
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    const apiMessages = newMessages.filter((message, index) => !(index === 0 && message.role === "assistant"));
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        nvidiaInvokeUrl,
        {
          model: nvidiaModel,
          messages: apiMessages,
          max_tokens: 512,
          temperature: 0.2,
          top_p: 0.7,
          stream: false,
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      const replyText = response.data?.choices?.[0]?.message?.content?.trim();
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: replyText || chatbotData.fallbackErrorMessage,
        },
      ]);
    } catch (error) {
      console.error("Chatbot error:", error);
      const isRateLimit = error?.status === 429 || error?.message?.includes("429");
      setMessages([...newMessages, { 
        role: "assistant", 
        content: isRateLimit 
          ? chatbotData.rateLimitMessage 
          : chatbotData.fallbackErrorMessage 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="w-[95vw] sm:w-80 md:w-96 max-w-[350px] mb-4 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 transition-all duration-300 transform origin-bottom-right">
          <div className="bg-linear-to-r from-blue-500 via-sky-500 to-cyan-400 p-4 text-white font-bold text-base flex items-center justify-between">
            <div className="flex items-center gap-2 text-lg">
              <span>{chatbotData.title}</span>
              <span className="flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              aria-label={chatbotData.closeButtonAriaLabel}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <div className="p-5 h-80 overflow-y-auto flex flex-col gap-4 scroll-smooth">
            {messages.map((msg, idx) => (
              <div key={idx} className={`max-w-[85%] p-3.5 rounded-2xl text-base leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-blue-500 text-white self-end rounded-br-none' : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 self-start rounded-bl-none border border-slate-200 dark:border-slate-700'}`}>
                {msg.content}
              </div>
            ))}
            {isLoading && <div className="text-slate-400 text-base italic self-start animate-pulse px-3">{chatbotData.typingText}</div>}
          </div>
          <form onSubmit={sendMessage} className="border-t border-slate-200 dark:border-slate-800 p-3 sm:p-4 flex gap-2 sm:gap-3 bg-white dark:bg-slate-900/50">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={chatbotData.placeholder} 
              className="flex-1 min-w-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base focus:outline-hidden focus:ring-2 focus:ring-blue-400 dark:text-white transition-all shadow-sm"
            />
            <button type="submit" disabled={isLoading} className="bg-slate-900 hover:bg-slate-800 dark:bg-sky-400 dark:hover:bg-sky-500 text-white dark:text-black focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:focus:ring-offset-slate-900 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-sm sm:text-base font-semibold transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap">
              {chatbotData.sendButtonText}
            </button>
          </form>
        </div>
      )}
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        aria-label={chatbotData.openButtonAriaLabel}
        className="w-14 h-14 bg-slate-900 hover:bg-slate-800 dark:bg-sky-400 dark:hover:bg-sky-500 text-white dark:text-black rounded-full flex items-center justify-center shadow-xl shadow-slate-900/30 transition-transform active:scale-95"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}
