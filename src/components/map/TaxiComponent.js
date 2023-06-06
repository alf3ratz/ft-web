import React, {useEffect, useState} from "react";
import Cookies from "universal-cookie";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import TabsContainer from "../tabs/TabsContainer";
import LoginPage from "../login/LoginPage";
import {isUserAuthor} from "../../api/axios";


const cookies = new Cookies()
const TaxiComponent = () => {
    const [isExit, setIsExit] = useState(false);
    const [url, setUrl] = useState("")
    const [placeFrom, setPlaceFrom] = useState("")
    const [placeTo, setPlaceTo] = useState("")
    useEffect(() => {
        const script = document.createElement('script');

        script.src = "//yastatic.net/taxi-widget/ya-taxi-widget.js";
        script.async = true;
        document.body.appendChild(script);
        let startLat = JSON.parse(localStorage.getItem('coords_from')).startLat
        let startLon = JSON.parse(localStorage.getItem('coords_from')).startLon
        let stopLat = JSON.parse(localStorage.getItem('coords_to')).stopLat
        let stopLon = JSON.parse(localStorage.getItem('coords_to')).stopLon
        setPlaceFrom(`${startLon},${startLat}`)
        setPlaceTo(`${stopLon},${stopLat}`)
        console.log(`sheesh: ${stopLon}`)
        setUrl(`https://3.redirect.appmetrica.yandex.com/route?start-lat=${startLat}&amp;start-lon=${startLon}&amp;end-lat=${stopLat}&amp;end-lon=${stopLon}&amp;ref=widget&amp;appmetrica_tracking_id=1178268795219780156&amp;utm_source=widget`)
        return () => {
            document.body.removeChild(script);
        }
    }, [])
    const exit = () => {
        localStorage.setItem('user_info', null);
        setIsExit(true);
        window.location.reload()
    }
    return (
        <div>
            {JSON.parse(localStorage.getItem('is_user_author')).isAuthor === true &&
                <div className="ya-taxi-widget"
                     data-size="s"
                     data-theme="normal"
                     data-title="На&nbsp;такси в&nbsp;Яндекс"
                     data-point-a={placeFrom}
                     data-point-b={placeTo}
                    //data-proxy-url={url}
                     data-use-location="false">
                </div>
            }
            <button onClick={exit}>Выйти</button>
            {
                isExit &&
                <LoginPage/>
                // <BrowserRouter>
                //     <Routes>
                //         <Route exact path='/' element={<LoginPage/>}></Route>
                //     </Routes>
                // data-point-a=""
                // data-point-b="37.58814349999998,55.73384256900978"
                // </BrowserRouter>
            }
        </div>
    );
}
export default TaxiComponent;