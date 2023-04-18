import React, {useEffect, useState} from 'react'
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import SockJsClient from 'react-stomp';
import {Client} from '@stomp/stompjs';

const SOCKET_URL = 'ws://localhost:8080/ws';

var stompClient = null;
const ChatRoom = () => {
    const [privateChats, setPrivateChats] = useState(new Map());
    const [publicChats, setPublicChats] = useState([]);
    const [tab, setTab] = useState("CHATROOM");
    const [userData, setUserData] = useState({
        username: '',
        receivername: '',
        connected: false,
        message: ''
    });
    const [chatData, setChatData] = useState({
        chatName: ''
    });
    useEffect(() => {
        console.log(userData);
    }, [userData]);

    const connect = () => {
        let Sock = new SockJS('http://localhost:8080/ws');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected = () => {
        setUserData({...userData, "connected": true});
        stompClient.subscribe('/topic/chat.create.event', onMessageReceived);
        //stompClient.subscribe('/user/'+userData.username+'/private', onPrivateMessage);
        //stompClient.subscribe('/chat/messages', onMessageReceived);
        // stompClient.subscribe('/user/'+userData.username+'/private', onPrivateMessage);
        userJoin();
    }

    /**
     * Присоединение к чату
     */
    const userJoin = () => {
        userData.message = "blabla"
        var chatId = "blabla"
        var topicCreateChat = `/app/chat.create`;
        if (userData.message && stompClient) {
            var chatMessage = {
                sender: userData.username,
                content: userData.message,
                messageType: "MESSAGE"
            };
            console.log(chatMessage);
            stompClient.send(`${topicCreateChat}`, {}, JSON.stringify(chatMessage));
            //document.querySelector('#message').value = '';
            // setUserData({...userData, "message": ""});
        }
        var topicJoinChat = `app/chat.${chatId}.join`
        stompClient.send(`${topicCreateChat}`, {}, JSON.stringify(chatMessage));
        // var chatMessage = {
        //     sender: userData.username,
        //     messageType: "JOIN"
        // };
        // var newRoomId = "1"
        // var topic = `/app/chat/${newRoomId}`;
        // stompClient.send(`${topic}/addUser`,
        //     {},
        //     JSON.stringify(chatMessage)
        // );
        // stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    }

    const onMessageReceived = (payload) => {
        var payloadData = JSON.parse(payload.body);
        switch (payloadData.status) {
            case "JOIN":
                if (!privateChats.get(payloadData.senderName)) {
                    privateChats.set(payloadData.senderName, []);
                    setPrivateChats(new Map(privateChats));
                }
                break;
            case "MESSAGE":
                publicChats.push(payloadData);
                setPublicChats([...publicChats]);
                break;
        }
    }

    const onError = (err) => {
        console.log(err);
    }

    const handleMessage = (event) => {
        const {value} = event.target;
        setUserData({...userData, "message": value});
    }
    const sendValue = () => {
        var newRoomId = "blabla";
        var topic = `/topic/chat.${newRoomId}`//`/app/chat/${newRoomId}`;
        if (userData.message && stompClient) {
            var chatMessage = {
                sender: userData.username,
                content: userData.message,
                messageType: "MESSAGE"
            };
            console.log(chatMessage);
            stompClient.send(`${topic}.send`, {}, JSON.stringify(chatMessage));
            //document.querySelector('#message').value = '';
            setUserData({...userData, "message": ""});
        }
        // event.preventDefault();
        // if (stompClient) {
        //     var chatMessage = {
        //         senderName: userData.username,
        //         message: userData.message,
        //         status: "MESSAGE"
        //     };
        //     console.log(chatMessage);
        //     stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
        //     setUserData({...userData, "message": ""});
        // }
    }
    const sendPrivateValue = () => {
        if (stompClient) {
            var chatMessage = {
                senderName: userData.username,
                receiverName: tab,
                message: userData.message,
                status: "MESSAGE"
            };

            if (userData.username !== tab) {
                privateChats.get(tab).push(chatMessage);
                setPrivateChats(new Map(privateChats));
            }
            stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
            setUserData({...userData, "message": ""});
        }
    }
    const onPrivateMessage = (payload) => {
        console.log(payload);
        var payloadData = JSON.parse(payload.body);
        if (privateChats.get(payloadData.senderName)) {
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats));
        } else {
            let list = [];
            list.push(payloadData);
            privateChats.set(payloadData.senderName, list);
            setPrivateChats(new Map(privateChats));
        }
    }

    const handleUsername = (event) => {
        const {value} = event.target;
        setUserData({...userData, "username": value});
    }
    const handleChatName = (event) => {
        const {value} = event.target;
        setChatData({...chatData, "chatName": value});
    }

    const registerUser = () => {
        connect();
    }
    return (
        <div className="container">
            {userData.connected ?
                <div className="chat-box">
                    <div className="member-list">
                        <ul>
                            <li onClick={() => {
                                setTab("CHATROOM")
                            }} className={`member ${tab === "CHATROOM" && "active"}`}>Chatroom
                            </li>
                            {[...privateChats.keys()].map((name, index) => (
                                <li onClick={() => {
                                    setTab(name)
                                }} className={`member ${tab === name && "active"}`} key={index}>{name}</li>
                            ))}
                        </ul>
                    </div>
                    {tab === "CHATROOM" && <div className="chat-content">
                        <ul className="chat-messages">
                            {publicChats.map((chat, index) => (
                                <li className={`message ${chat.senderName === userData.username && "self"}`}
                                    key={index}>
                                    {chat.senderName !== userData.username &&
                                        <div className="avatar">{chat.senderName}</div>}
                                    <div className="message-data">{chat.message}</div>
                                    {chat.senderName === userData.username &&
                                        <div className="avatar self">{chat.senderName}</div>}
                                </li>
                            ))}
                        </ul>

                        <div className="send-message">
                            <input type="text" className="input-message" placeholder="enter the message"
                                   value={userData.message} onChange={handleMessage}/>
                            <button type="button" className="send-button" onClick={sendValue}>send</button>
                        </div>
                    </div>}
                    {tab !== "CHATROOM" && <div className="chat-content">
                        <ul className="chat-messages">
                            {[...privateChats.get(tab)].map((chat, index) => (
                                <li className={`message ${chat.senderName === userData.username && "self"}`}
                                    key={index}>
                                    {chat.senderName !== userData.username &&
                                        <div className="avatar">{chat.senderName}</div>}
                                    <div className="message-data">{chat.message}</div>
                                    {chat.senderName === userData.username &&
                                        <div className="avatar self">{chat.senderName}</div>}
                                </li>
                            ))}
                        </ul>
                        <div className="send-message">
                            <input type="text" className="input-message" placeholder="enter the message"
                                   value={userData.message} onChange={handleMessage}/>
                            <button type="button" className="send-button" onClick={sendPrivateValue}>send</button>
                        </div>
                    </div>}
                </div>
                :
                <div className="register">
                    <input
                        id="user-name"
                        placeholder="Enter your name"
                        name="userName"
                        value={userData.username}
                        onChange={handleUsername}
                        margin="normal"
                    />
                    <input
                        id="chat-name"
                        placeholder="Enter your chat name"
                        name="chatName"
                        value={chatData.chatName}
                        onChange={handleChatName}
                        margin="normal"
                    />
                    <button type="button" onClick={registerUser}>
                        connect
                    </button>
                </div>}
        </div>
    )
    //----------------------------------
    // const [message, setMessage] = useState('You server message here.');
    //
    // let onConnected = () => {
    //     console.log("Connected!!")
    // }
    //
    // let onMessageReceived = (msg) => {
    //     setMessage(msg.message);
    // }
    //
    // return (
    //     <div>
    //         <SockJsClient
    //             url={SOCKET_URL}
    //             topics={['/topic/chat/1/addUser']}
    //             onConnect={onConnected}
    //             onDisconnect={console.log("Disconnected!")}
    //             onMessage={msg => onMessageReceived(msg)}
    //             debug={false}
    //         />
    //         <div>{message}</div>
    //     </div>
    // );
    // constructor() {
    //     super();
    //     this.state = {
    //         messages: 'You server message here.',
    //     };
    // };
    //
    // componentDidMount() {
    //     let currentComponent = this;
    //     let onConnected = () => {
    //         console.log("Connected!!")
    //         client.subscribe('/topic/chat/1/addUser', function (msg) {
    //             if (msg.body) {
    //                 var jsonBody = JSON.parse(msg.body);
    //                 if (jsonBody.message) {
    //                     currentComponent.setState({ messages: jsonBody.message })
    //                 }
    //             }
    //         });
    //     }
    //
    //     let onDisconnected = () => {
    //         console.log("Disconnected!!")
    //     }
    //
    //     const client = new Client({
    //         brokerURL: SOCKET_URL,
    //         reconnectDelay: 5000,
    //         heartbeatIncoming: 4000,
    //         heartbeatOutgoing: 4000,
    //         onConnect: onConnected,
    //         onDisconnect: onDisconnected
    //     });
    //
    //     client.activate();
    // };
    //
    // render() {
    //     return (
    //         <div>
    //             <div>{this.state.messages}</div>
    //         </div>
    //     );
    // }

}

export default ChatRoom
