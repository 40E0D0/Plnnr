import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Header from '../components/HeaderAdvisor';
import { Send } from 'lucide-react';
import '../stylings/chatadvisor.css';  // Shared CSS for both components

const ChatAdvisor = () => {
    let navigate = useNavigate();
    
    function handleLogout() {
        sessionStorage.removeItem("token");
        navigate('/');
    }

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([
        { sender: "Bob", content: "Hi. Can we discuss here? I think it's kinda easy this way" },
        { sender: "Alice", content: "Sure, let's do it." },
    ]);
    const [isOnline, setIsOnline] = useState(true);
    const [userName, setUserName] = useState("Alice");

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

    // Mock list of students
    const students = ["Bob", "Alice", "Charlie", "Dave"];

    return (
        <div>
            <Header handleLogout={handleLogout} />
            <div className="chat-wrapper">
                {/* Left Panel: List of Students */}
                <div className="student-list">
                    <h3>Your Students</h3>
                    <ul>
                        {students.map((student, index) => (
                            <li key={index} className="student-item">
                                {student}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right Panel: Chat UI */}
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
                        <Send className="cursor-pointer hover:text-blue-800" onClick={handleSendMessage} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatAdvisor;
