import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { supabase } from '../auth/client';
import Header from '../components/HeaderAdvisor';
import { Send } from 'lucide-react';
import ChatSidebar from "../components/ChatSidebar";
import '../stylings/chatadvisor.css';  // Shared CSS for both components
import Footer from '../components/Footer';

const ChatAdvisor = ({ userId }) => {
    let navigate = useNavigate();

    function handleLogout() {
        sessionStorage.removeItem("token");
        navigate('/');
    }

    const [selectedChatId, setSelectedChatId] = useState(null);
    const [advisorId, setAdvisorId] = useState(null);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    /* const [messages, setMessages] = useState([
        { sender: "Bob", content: "Hi. Can we discuss here? I think it's kinda easy this way" },
        { sender: "Alice", content: "Sure, let's do it." },
    ]); */

    const [isOnline, setIsOnline] = useState(true);
    const [userName, setUserName] = useState("Alice");

    useEffect(() => {
        if (!selectedChatId) return;

        const fetchMessages = async () => {
            const { data, error } = await supabase
                .from('messages')
                .select('*')
                .eq('chat_id', selectedChatId)
                .order('created_at', { ascending: true });

            if (!error) setMessages(data);
        };

        fetchMessages();

        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setAdvisorId(user.id); // ← ensure this sets correctly
        };

        getUser();

        // Real-time subscription
        const subscription = supabase
            .channel(`chat-${selectedChatId}`)
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
                setMessages((prevMessages) => [...prevMessages, payload.new]);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);  // Ensures proper cleanup
        };
    }, [selectedChatId]);


    const handleSendMessage = async () => {
        if (message.trim() !== "") {
            const { error } = await supabase.from('messages').insert([
                { chat_id: selectedChatId, sender_id: userId, message }
            ]);

            /* if (error) {
                console.error("Error sending message:", error);
            } else {
                setMessage(""); // Clear input after sending
            } */

            if (!error) setMessage("");
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
    // <ChatSidebar advisorId={userId} onSelectChat={setChatId} />


    return (
        <div>
            <Header handleLogout={handleLogout} />
            {advisorId && <ChatSidebar advisorId={advisorId} onSelectChat={handleSelectChat} />}
            <div className="chat-wrapper">
                {/* Left Panel: List of Students */}
                <div className="student-list">
                    {selectedChatId ? <ChatWindow chatId={selectedChatId} userId={userId} /> : <p>Select a student to chat</p>}
                    {/* <ul>
                        {students.map((student, index) => (
                            <li key={index} className="student-item">
                                {student}
                            </li>
                        ))}
                    </ul> */}
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
                                {msg.message}
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
            <Footer />
        </div>
    );
};

export default ChatAdvisor;
