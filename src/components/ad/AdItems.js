import React, {Component} from "react";
import AdItem from "./AdItem";

class AdItems extends Component {
    render() {
        return (
            <main>
                {
                    this.props.items.map(
                        el => {
                            <AdItem key={el.id} item={el}/>
                        }
                    )
                }
            </main>
        )
            ;
    }
}

export default AdItems;