import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';
import Markdown from 'react-markdown'

const ThinkingAnimation = () => {
    return (
        <div className="loader">
            {Array.from({ length: 5 }, (_, index) => (
                <div key={index} className="dot"></div>
            ))}
        </div>
    );
};


const Chatbot = () => {

    const [messages, setMessages] = useState([{ sender: 'bot', text: 'Dear Tron user, how can I help?' }]);
    const [userInput, setUserInput] = useState('');
    const [isSending, setIsSending] = useState(false);
    const chatContainerRef = useRef(null);
    const enterKeyDisabledRef = useRef(false);

    useEffect(() => {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }, [messages]);

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleSendMessage = () => {
        const trimmedMessage = userInput.trim();
        if (trimmedMessage === '') {
            appendMessage('bot', 'Please enter a message so I can properly assist you.');
            return;
        }

        appendMessage('user', trimmedMessage);
        setUserInput('');
        setIsSending(true);

        // Disable send button for 4 seconds
        enterKeyDisabledRef.current = true;
        setTimeout(() => {
            enterKeyDisabledRef.current = false;
        }, 4000);

        fetchResponse(trimmedMessage);
    };

    const fetchResponse = (query) => {
        showThinkingAnimation();

        fetch('https://tronai.io/v1/g_chat', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
            credentials: 'include',
        })
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            hideThinkingAnimation();
            typeOutMessage(data.data.answer, 'bot');
            console.log(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            hideThinkingAnimation();
            typeOutMessage('Sorry, something went wrong. Please try again.', 'bot');
        })
        .finally(() => {
            setIsSending(false);
        });
    };

    const typeOutMessage = (text, sender) => {
        const messageBox = { sender, text: <Markdown>{text}</Markdown> }; // Render Markdown
        setMessages(prevMessages => [...prevMessages, messageBox]);

        let index = 0;
        const typingInterval = setInterval(() => {
            if (index < text.length) {
                setMessages(prevMessages => {
                    const updatedMessages = [...prevMessages];
                    updatedMessages[updatedMessages.length - 1].text = (
                        <Markdown>{text.substring(0, index + 1)}</Markdown>
                    ); // Update text progressively
                    return updatedMessages;
                });
                index++;
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight; // Keep scrolling to the bottom
            } else {
                clearInterval(typingInterval); // Stop typing effect
                const timestamp = getCurrentTime(); // Set timestamp after typing
                setMessages(prevMessages => {
                    const updatedMessages = [...prevMessages];
                    updatedMessages[updatedMessages.length - 1].timestamp = timestamp; // Add timestamp
                    return updatedMessages;
                });
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight; // Final scroll to the bottom
            }
        }, 15); // Adjust typing speed here
    };

    const appendMessage = (sender, text) => {
        setMessages(prevMessages => [...prevMessages, { sender, text }]);
    };

    const showThinkingAnimation = () => {
        const thinkingMessage = { sender: 'bot', text: <ThinkingAnimation /> };
        setMessages(prevMessages => [...prevMessages, thinkingMessage]);
    };

    const hideThinkingAnimation = () => {
        setMessages(prevMessages => prevMessages.filter(msg => !(msg.text.type && msg.text.type === ThinkingAnimation)));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !enterKeyDisabledRef.current) {
            e.preventDefault(); // Prevent default behavior
            handleSendMessage();
        }
    };

    // const handleClose = () => {
    //     // Logic to handle closing the chat (e.g., hiding the component)
    // };

    return (
        <div className="chatbot-container">
            <div className="chat-container" ref={chatContainerRef} id="chatContainer">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        {msg.sender === 'user' ? (
                            <div className="message-box">{msg.text}</div>
                        ) : (
                            <>
                                <div className="title">Assistant</div>
                                <div className="message-box">{msg.text}</div>
                            </>
                        )}
                        <div className="timestamp">{msg.timestamp || getCurrentTime()}</div>
                    </div>
                ))}
            </div>

            <div className="input-container">
                <input
                    type="text"
                    id="userInput"
                    value={userInput}
                    placeholder="Currently Only Support Developers"
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress} // Use onKeyDown
                    disabled={isSending}
                />
                <button
                    className="send-button"
                    id="sendButton"
                    onClick={handleSendMessage}
                    disabled={isSending}
                >
                    Send
                </button>
            </div>       
        </div>
    );
};

const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export default Chatbot;