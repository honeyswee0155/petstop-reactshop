import { useState, useRef, useEffect } from 'react';
import '../styles/chatbot.css';

// eslint-disable-next-line no-unused-vars
const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hi! I'm PetStop's AI Advisor. Ask me about grooming, hotel stays, or pet products!", isUser: false }
  ]);
  const [input, setInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = { text: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate bot typing
    setTimeout(() => {
      setIsTyping(false);
      const reply = getBotReply(input);
      setMessages(prev => [...prev, { text: reply, isUser: false }]);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const getBotReply = (message) => {
    const lower = message.toLowerCase();
    
    if (lower.includes("groom")) {
      return "We offer full grooming services for dogs, cats, and small animals! Prices start at $25 for basic baths.";
    } else if (lower.includes("hotel") || lower.includes("board")) {
      return "Our Pet Hotel features climate-controlled rooms, daily walks, and 24/7 care. Rates start at $30/night.";
    } else if (lower.includes("open") || lower.includes("hour")) {
      return "We're open Mon-Fri 10:30AM-7:30PM, Sat 9AM-6PM, Sun 10AM-4PM. Closed on major holidays.";
    } else if (lower.includes("product") || lower.includes("shop")) {
      return "Check out our online shop for premium pet foods, toys, and accessories! Free delivery for orders over $50.";
    } else if (lower.includes("hi") || lower.includes("hello")) {
      return "Hello again! How else can I help you today?";
    } else {
      return "I'm still learning! For now, I can answer questions about grooming, boarding, and our products.";
    }
  };

  return (
    <div className={`chatbot-container ${isMinimized ? 'minimized' : ''}`}>
      <div 
        className="chatbot-header"
        onClick={() => setIsMinimized(!isMinimized)}
      >
        <span>🐾 Pet Advisor</span>
        <span className="chatbot-toggle-icon">
          {isMinimized ? '➕' : '➖'}
        </span>
      </div>
      
      {!isMinimized && (
        <>
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div 
                key={i} 
                className={`chatbot-message ${msg.isUser ? 'user' : 'bot'}`}
              >
                {msg.text}
              </div>
            ))}
            
            {isTyping && (
              <div className="chatbot-message bot">
                <div className="chatbot-typing">
                  <div className="chatbot-typing-dot"></div>
                  <div className="chatbot-typing-dot"></div>
                  <div className="chatbot-typing-dot"></div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chatbot-input-container">
            <input
              type="text"
              className="chatbot-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your question..."
            />
            <button 
              className="chatbot-send-btn"
              onClick={handleSend}
              disabled={!input.trim()}
            >
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
};
export default Chatbot;

