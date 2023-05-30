import React, {useEffect, useState} from "react";
import Cookies from "universal-cookie";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import TabsContainer from "../tabs/TabsContainer";
import LoginPage from "../login/LoginPage";


const cookies = new Cookies()
const TaxiComponent = () => {
    const [isExit, setIsExit] = useState(false);
    useEffect(() => {
        const script = document.createElement('script');

        script.src = "//yastatic.net/taxi-widget/ya-taxi-widget.js";
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, [])
    const exit = () => {
        cookies.set('isAuth', false, {path: '/'})
        console.log('logged out!')
        setIsExit(true);
    }
    return (
        <div>
            <div class="ya-taxi-widget"
                 data-size="s"
                 data-theme="normal"
                 data-title="На&nbsp;такси в&nbsp;Яндекс"
                 data-point-b="37.58814349999998,55.73384256900978"
                 data-use-location="true">
            </div>
            <button onClick={exit}>Выйти</button>
            {
                isExit &&
                <LoginPage/>
                // <BrowserRouter>
                //     <Routes>
                //         <Route exact path='/' element={<LoginPage/>}></Route>
                //     </Routes>
                // </BrowserRouter>
            }
        </div>
    );
}
export default TaxiComponent;