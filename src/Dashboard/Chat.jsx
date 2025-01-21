import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { Send } from 'lucide-react';
import '../stylings/chat.css';  // Assuming you create a separate CSS file for styling.

const Chat = () => {
    let navigate = useNavigate();
    
      function handleLogout() {
        sessionStorage.removeItem("token");
        navigate('/');
      }

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { sender: "Alice", content: "Sure, let's do it." },
    { sender: "Bob", content: "Hi. Can we discuss here? I think it's kinda easy this way" },
  ]);
  const [isOnline, setIsOnline] = useState(true);
  const [userName, setUserName] = useState("Bob");

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { sender: userName, content: message }]);
      setMessage("");
    }
  };

   // Handle Enter key and Shift+Enter key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        // Allow new line when Shift+Enter is pressed
        return;  // Do nothing, so a newline will be added in the input
      } else {
        // Send message on Enter without Shift
        e.preventDefault(); // Prevent the default action (new line)
        handleSendMessage(); // Call the send message function
      }
    }
  };

  return (
    <div>
        <Header handleLogout={handleLogout} />
    <div className="chat-container">
      <div className="chat-header">
        <span>{userName} is {isOnline ? "online" : "offline"}</span>
      </div>
      <div className="message-container">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-bubble ${msg.sender === userName ? "sent" : "received"}`}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <div className="input-area">
        <textarea
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown} // Add the keydown event listener here
        />
        <Send className="cursor-pointer hover:text-blue-800" onClick={handleSendMessage}/>
        
      </div>
    </div>
    </div>
  );
};

export default Chat;
