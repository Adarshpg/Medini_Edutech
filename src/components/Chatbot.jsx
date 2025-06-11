
import axios from "axios"
import { useState, useRef, useEffect } from "react"
import { MessageSquare, Send, X, Loader2, Bell } from "lucide-react"

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! I'm your AI Assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [hasNewMessage, setHasNewMessage] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const buttonRef = useRef(null)

  // Backend API URL
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/chat"

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Focus input when chat is opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Add ripple effect on button click
  useEffect(() => {
    const handleRipple = (e) => {
      const button = buttonRef.current
      if (!button) return

      const ripple = document.createElement("span")
      ripple.classList.add("ripple")
      button.appendChild(ripple)

      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      ripple.style.left = `${x}px`
      ripple.style.top = `${y}px`

      setTimeout(() => {
        ripple.remove()
      }, 600)
    }

    const button = buttonRef.current
    if (button) {
      button.addEventListener("click", handleRipple)
    }

    return () => {
      if (button) {
        button.removeEventListener("click", handleRipple)
      }
    }
  }, [])

  // Simulate new message notification
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setHasNewMessage(true)
      }, 10000) // Show notification after 10 seconds if chat is closed

      return () => clearTimeout(timer)
    } else {
      setHasNewMessage(false)
    }
  }, [isOpen, messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setHasNewMessage(false)
  }

  const handleInputChange = (e) => {
    setInputMessage(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!inputMessage.trim()) return

    // Add user message to chat
    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      // Send message to backend
      const response = await axios.post(API_URL, {
        message: inputMessage,
      })

      // Add bot response to chat
      const botMessage = {
        id: messages.length + 2,
        text: response.data.message,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error generating response:", error)

      // Add error message with more specific information
      const errorMessage = {
        id: messages.length + 2,
        text: `I'm sorry, I couldn't process your request: ${error.response?.data?.message || error.message}`,
        sender: "bot",
        timestamp: new Date(),
        isError: true,
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // Format timestamp
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat toggle button with advanced animations */}
      <div className="relative">
        <span
          className={`absolute inset-0 rounded-full ${isOpen ? "opacity-0" : "animate-ping"} bg-customBlue opacity-75`}
        ></span>



        {/* Button with floating animation */}
        <div className={`${isOpen ? "" : "animate-float"}`}>
          <button
            ref={buttonRef}
            onClick={toggleChat}
            className={`relative flex items-center justify-center w-16 h-16 rounded-full shadow-lg transition-all duration-500 transform overflow-hidden ${
              isOpen
                ? "bg-gradient-to-r from-red-500 to-red-600 rotate-90"
                : "bg-gradient-to-r from-customBlue to-customBlue/90 scale-100 hover:scale-110"
            }`}
            aria-label={isOpen ? "Close chat" : "Open chat"}
          >
            <div className={`transition-all duration-500 ${isOpen ? "rotate-180" : ""}`}>
              {isOpen ? (
                <X className="w-7 h-7 text-white" />
              ) : (
                <MessageSquare className="w-7 h-7 text-white animate-pulse" />
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Chat window with entrance animation */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 sm:w-96 rounded-lg shadow-xl overflow-hidden bg-white border border-gray-200 animate-slideIn">
          {/* Chat header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3 animate-pulse">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-medium">AI Assistant</h3>
                <p className="text-xs text-white/80">Powered by Gemini AI</p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-messageIn`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                      : message.isError
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === "user" ? "text-white/70" : "text-gray-500"}`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-messageIn">
                <div className="rounded-lg p-3 bg-gray-100">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                    <p className="text-sm text-gray-800">Thinking...</p>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat input */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200">
            <div className="flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className="flex-1 py-2 px-3 rounded-l-lg focus:outline-none bg-gray-100 text-gray-900 border-gray-300 placeholder-gray-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                className={`py-2 px-4 rounded-r-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 ${
                  isLoading || !inputMessage.trim() ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading || !inputMessage.trim()}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* CSS for custom animations */}
      <style jsx>{`
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        .ripple {
          position: absolute;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s linear;
          width: 100px;
          height: 100px;
          margin-top: -50px;
          margin-left: -50px;
        }
        
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
        
        @keyframes messageIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-messageIn {
          animation: messageIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default ChatBot

