import React, {Component, useEffect, useState} from 'react';

import {Input, PageHeader, List, Layout, Menu, Button} from 'antd';
import {UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons';
import {getMessagesByChat, getTravelByEmail, sendMessageToChat, userEmail} from "../../api/axios";
import ErrorPopup from "../create/ErrorPopup";
// import './chat-page.styles.css';

const {Search} = Input;
const {Header, Sider, Content} = Layout;

const ChatPage = () => {
    const [isChatReceived, setChatReceived] = useState(false)
    const [chatId, setChatId] = useState(0);
    const [message, setMessage] = useState("")
    const [isInputDisabled, setInputDisabled] = useState(false);
    const [messagesData, setMessagesData] = useState([{}]);
    const [errorData, setErrorData] = useState({
        error: "",
        error_description: "",
    });
    const [isError, setIsError] = useState(false);
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         currentMessage: '',
    //         messages: [],
    //         collapsed: false,
    //         users: [],
    //         userTo: null,
    //     };
    // }
    const toggleErrorPopup = () => {
        setIsError(!isError);
    }
    // useEffect(() => {
    //     setInterval(yourFunction, 300000); // The function will be called
    // },[]);
    useEffect(() => {
        if (!isChatReceived) {
            getTravelByEmail(userEmail).then((response) => {
                setChatId(response.data.chatId)
            }).catch(function (error) {
                if (error.response) {
                    let jsonString = JSON.stringify(error.response.data)
                    let errorObj = JSON.parse(jsonString)
                    setErrorData({...errorData, ...errorObj})
                    toggleErrorPopup()
                    setInputDisabled(true)
                }
            }).finally(() => {
                if (chatId !== 0) {
                    console.log(chatId)
                    getAllMessages(chatId);
                }
                setChatReceived(true);
            });
        }
    });
    const handleMessageChange = (event) => {
        const {value} = event.target;
        setMessage(value);
    }
    const handleMessageSend = (event) => {
        sendMessage()
        setMessage("")
    }
    // const handleSearchable = (event) =>{
    //     if(isError){
    //
    //     }
    // }

    const sendMessage = () => {
        sendMessageToChat(chatId, userEmail, message).then((response) => {
            }
        ).finally(() => {
            getAllMessages()
        })
    }
    const getAllMessages = () => {
        let result
        getMessagesByChat(chatId).then((response) => {
                result = response.data
                console.log(response.data)
            }
        ).finally(() => {
            setMessagesData(result)
        })
    }


    return (
        <div>

            <div className='chat-page'>
                <Layout className='messages-layout'>
                    <Layout className='site-layout'>
                        <List
                            className='messages-div'
                            itemLayout='horizontal'
                            dataSource={messagesData}
                            renderItem={item => (
                                <List.Item
                                    className={
                                        item.sender === userEmail ? 'message-ours' : 'message-other'
                                    }
                                    background={item.sender === userEmail ? '#fff' : '#64a7ff'}
                                >
                                    <List.Item.Meta
                                        title={
                                            <>
                                                {' '}
                                                {item.sender} <UserOutlined/>{' '}
                                            </>
                                        }
                                        description={item.message}
                                    />
                                </List.Item>
                            )}
                        />
                        {/*</Content>*/}
                    </Layout>
                </Layout>
                <div className='form'>
                    <Search
                        className='chat-input'
                        placeholder='Введите сообщение'
                        allowClear
                        value={message}
                        enterButton='Submit'
                        size='large'
                        name='currentMessage'
                        onChange={handleMessageChange}
                        onSearch={handleMessageSend}
                        disabled={isInputDisabled}
                    />
                </div>
                {isError && <ErrorPopup
                    content={<>
                        <b>{errorData.error_description}</b>
                    </>}
                    handleClose={toggleErrorPopup}
                />}
            </div>
        </div>
    );
}

// const mapDispatchToProps = dispatch => {
//     return {
//         setCurrentUser: user => {
//             dispatch(setCurrentUser(user));
//         },
//     };
// };
//
// const mapStateToProps = createStructuredSelector({
//     currentUser: selectCurrentUser,
// });
export default ChatPage;
//export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatPage));