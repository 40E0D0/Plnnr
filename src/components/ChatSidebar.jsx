import React, { useState, useEffect } from "react";
import { supabase } from '../auth/client';

const ChatSidebar = ({ advisorId, onSelectChat }) => {
    const [chats, setChats] = useState([]);
    console.log("ChatSidebar loaded with advisorId:", advisorId);


    useEffect(() => {
        if (!advisorId) return; // Skip if advisorId is not set

        const fetchChats = async () => {
            const { data, error } = await supabase
                .from('chats')
                //.select('id, student_id')
                .select('id, student:student_id (id, full_name)')
                .eq('advisor_id', advisorId);

            if (error) {
                console.error('Error fetching chats:', error);
            } else {
                setChats(data);
            }
        };

        fetchChats();
    }, [advisorId]);

    const startChat = async (advisorId, studentId) => {
        let { data, error } = await supabase
            .from('chats')
            .select('id')
            .eq('advisor_id', advisorId)
            .eq('student_id', studentId)
            .single();

        if (!data) {
            const { data: newChat, error: insertError } = await supabase
                .from('chats')
                .insert([{ advisor_id: advisorId, student_id: studentId }])
                .select()
                .single();

            if (insertError) {
                console.error("Error creating chat:", insertError);
                return;
            }

            onSelectChat(newChat.id);  // Calls the prop function directly
        } else {
            onSelectChat(data.id);
        }
    };

    if (!advisorId) {
        return <p>Loading chat sidebar...</p>;
    }      

    return (
        <div className="student-list">
            <ul>
                {chats.map((chat) => (
                    <li key={chat.id} onClick={() => onSelectChat(chat.id)}>
                        {chat.student?.full_name || `Student ID: ${chat.student?.id}`}
                        {/* Student ID: {chat.student_id} */}
                    </li>

                ))}
            </ul>
        </div>
    );
};

export default ChatSidebar;
