import {auth, authStraight, createTravel, isLogged, userEmail} from "../../api/axios";
import React, {useEffect, useState} from "react";
import ErrorPopup from "../create/ErrorPopup";
import ValidationPopup from "../create/ValidationPopup";
import useMessage from '@rottitime/react-hook-message-event'
import Cookies from "universal-cookie";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import TabsContainer from "../tabs/TabsContainer";

//import {Redirect} from 'react-router-dom'
const cookies = new Cookies()

const LoginPage = () => {
    const [externalPopup, setExternalPopup] = useState(null);
    const [isHrefClicked, setIsHrefClicked] = useState(false)
    const [isErrorPopup, setIsErrorPopup] = useState(false);
    const [isSuccessPopup, setIsSuccessPopup] = useState(false);
    const [isSuccessLogged, setIsSuccessLogged] = useState(false);
    const [keyData, setKeyData] = useState("")
    const authorize = () => {
        setIsHrefClicked(!isHrefClicked)
        // auth()
        //     //authStraight()
        //     .then((response) => {
        //
        //     }).catch(function (error) {
        //     if (error.response) {
        //         console.log(`err: ${error.response}`)
        //     }
        // })
    }
    const successLogged = () => {
        isLogged(keyData)
            .then(data => {
                console.log(data)
                console.log(data.logged)
                // localStorage.setItem('user_info', JSON.stringify(data));
                // console.log(`saved: ${ localStorage.getItem('user_info')}`)
                if (data.logged) {
                    setIsSuccessLogged(true)
                    localStorage.setItem('user_info', JSON.stringify(data));
                    userEmail = data.email
                    //console.log(`saved: ${ localStorage.getItem('user_info')}`)
                }else{
                    toggleErrorPopup()
                }
            }).catch(function (error) {
            if (error.response) {
                console.log(`err: ${error.response}`)
            }
        }).finally(()=>{
            window.location.reload()
        })
    }
    useMessage('hello', (send, payload) => {
        //use sendMessage to post back to the sender
        send({type: 'world', success: true});
    });
    const redirect = () => {
        window.location.href = 'https://ftapp-386322.lm.r.appspot.com/oauth2/authorization/hse';
        window.location.href = 'https://localhost:3000/ft-web';
        // maybe can add spinner while loading
        return null;
    }
    // useEffect(() => {
    //     if (!externalPopup) {
    //         return;
    //     }
    //
    //     const timer = setInterval(() => {
    //         if (!externalPopup) {
    //             timer && clearInterval(timer);
    //             return;
    //         }
    //         // const currentUrl = externalPopup.location.href;
    //         // if (!currentUrl) {
    //         //     return;
    //         // }
    //         const searchParams = new URL(`https://ftapp-386322.lm.r.appspot.com/oauth2/authorization/hse`).searchParams;
    //         const code = searchParams.get('code');
    //         if (code) {
    //             externalPopup.close();
    //             console.log(`The popup URL has URL code param = ${code}`);
    //             setExternalPopup(null);
    //             timer && clearInterval(timer);
    //             // YourApi.endpoint(code).then(() => {
    //             //     // change UI to show after the code was stored
    //             // })
    //             //     .catch(() => {
    //             //         // API error
    //             //     })
    //             //     .finally(() => {
    //             //         // clear timer at the end
    //             //         setExternalPopup(null);
    //             //         timer && clearInterval(timer);
    //             //     })
    //         }
    //     }, 500)
    //     if (externalPopup.closed) {
    //         console.log(`ссылка: ${externalPopup.location.href}`)
    //         if (!externalPopup.location.href.toString().endsWith('/auth/success')) {
    //             toggleErrorPopup()
    //         } else {
    //             toggleSuccessPopup()
    //         }
    //     }
    // },
    // [externalPopup]
    // })
    useEffect(() => {
        // const timeout = setTimeout(() => {
        //     // 👇️ redirects to an external URL
        //     window.location.redirect('https://localhost:8080/oauth2/authorization/hse');
        // }, 3000);
        //
        // return () => clearTimeout(timeout);
    }, []);
    const toggleErrorPopup = () => {
        setIsErrorPopup(!isErrorPopup);
    }
    const toggleSuccessPopup = () => {
        setIsSuccessPopup(!isSuccessPopup)
    }
    // const connectClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    //     const width = 500;
    //     const height = 400;
    //     const left = window.screenX + (window.outerWidth - width) / 2;
    //     const top = window.screenY + (window.outerHeight - height) / 2.5;
    //     const title = `AUTH`;
    //     const url = `https://localhost:8080/oauth2/authorization/hse`;
    //     const popup = window.open(url, title, `width=${width},height=${height},left=${left},top=${top}`);
    //     window.
    //
    //     popup.addEventListener('message', event => {
    //
    //         if (event.origin === 'https://localhost:8080/auth/success') {//ftapp-386322.lm.r.appspot.com
    //             // The data was sent from your site.
    //             // Data sent with postMessage is stored in event.data:
    //             console.log(`sheesh: ${event.data}`);
    //         } else {
    //
    //             console.log(`sheesh: ${event.origin}`);
    //             console.log(`sheesh2:12`);
    //             // return;
    //         }
    //     });
    //     var timer = setInterval(function () {
    //         setExternalPopup(popup);
    //         if (popup.closed) {
    //             clearInterval(timer);
    //             console.log(`ссылка qwe: ${popup.location.href}`)
    //             if (!popup.location.href.endsWith('/auth/success')) {
    //                 toggleErrorPopup()
    //             } else {
    //                 toggleSuccessPopup()
    //             }
    //             alert('closed');
    //         } else {
    //
    //             console.log(`ссылка boba: ${popup.location.origin}`)
    //         }
    //     }, 1000);
    //     // if(popup.closed){
    //     //     console.log(`ссылка: ${popup.location.href}`)
    //     //     if(!popup.location.href.toString().endsWith('/auth/success')){
    //     //         toggleErrorPopup()
    //     //     }else{
    //     //         toggleSuccessPopup()
    //     //     }
    //     // }
    // }
    // const deleteCookie = () => {
    //     var cookies = document.cookie.split("; ");
    //     console.log(`ссылка: ${window.location.hostname}`)
    //     for (var c = 0; c < cookies.length; c++) {
    //         var d = window.location.hostname.split(".");
    //         while (d.length > 0) {
    //             var cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + d.join('.') + ' ;path=';
    //             var p = window.location.pathname.split('/');
    //             document.cookie = cookieBase + '/';
    //             while (p.length > 0) {
    //                 document.cookie = cookieBase + p.join('/');
    //                 p.pop();
    //             }
    //             d.shift();
    //         }
    //     }
    // }
    // const tst = () =>{
    //     const timeout = setTimeout(() => {
    //         // 👇️ redirects to an external URL
    //         window.location.href = 'https://localhost:8080/oauth2/authorization/hse';
    //     }, 2000);
    //
    //     return () => clearTimeout(timeout);
    // }
    const handleKeyData = (e) => {
        const {value} = e.target;
        setKeyData(value)
    }
    return (
        <div>
                {!isHrefClicked
                    ?
                    <div>
                        <a href='https://localhost:8080/oauth2/authorization/hse' target="_blank" onClick={authorize}>
                            Авторизация
                        </a>
                    </div>
                    :
                    <div>
                        <input
                            id="input-key"
                            placeholder="Введите код авторизации"
                            name="countOfParticipants"
                            value={keyData}
                            onChange={handleKeyData}
                            margin="normal"
                        />
                        <button onClick={successLogged}>
                            Отправить
                        </button>
                    </div>
                }

                {/*<button onClick={deleteCookie}>*/}
                {/*    Удалить куки*/}
                {/*</button>*/}
                {isErrorPopup && <ErrorPopup
                    content={<>
                        <b>Не удалось авторизоваться</b>
                    </>}
                    handleClose={toggleErrorPopup}
                />}
                {isSuccessPopup && <ValidationPopup
                    content={<>
                        <b>Вы успешно авторизовались</b>
                    </>}
                    handleClose={toggleSuccessPopup}
                />}
                {
                    isSuccessLogged &&
                    // <TabsContainer/>
                    <TabsContainer/>
                    // <Routes>
                    //     <Route path="/ft-web" component={TabsContainer} />
                    // </Routes>
                    // <Routes>
                    //     <Route exact path='/' element={<TabsContainer/>}></Route>
                    // </Routes>
                }
        </div>
    )
}
export default LoginPage;