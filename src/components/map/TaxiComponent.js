import React, {useEffect, useRef, useState} from "react";


const TaxiComponent = () => {
    useEffect(() => {
        const script = document.createElement('script');

        script.src = "//yastatic.net/taxi-widget/ya-taxi-widget.js";
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, [])
    return (
        <div>
            <div class="ya-taxi-widget"
                 data-size="s"
                 data-theme="normal"
                 data-title="На&nbsp;такси в&nbsp;Яндекс"
                 data-point-b="37.58814349999998,55.73384256900978"
                 data-use-location="true">
            </div>
        </div>
    );
}
export default TaxiComponent;