import {Component} from "react";
import {Map, YMaps} from '@pbe/react-yandex-maps';

class MapComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>
            <YMaps>
                <div>My awesome application with maps!</div>
                <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} />
            </YMaps>

        </div>)
    }
}
export default MapComponent;