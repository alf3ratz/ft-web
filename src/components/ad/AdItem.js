import React, {Component, useState} from "react";

class AdItem extends Component {
    // const [count, setCount] = useState(0)
    //
    // function increment() {
    //     setCount(count + 1)
    //     console.log("Likes: ", count)
    // }
    //
    // function decrement() {
    //     setCount(count - 1)
    //     console.log("Likes: ", count)
    // }
    render() {
        return (
            <div className='adItem'>
                <p>{this.props.item.placeFrom}</p>
                <h1>{this.props.item.placeTo}</h1>
                <h1>{this.props.item.countOfParticipants}</h1>
            </div>
            // <div>
            //     <h1>{count}</h1>
            //     <button onClick={increment}>Increment</button>
            //     <button onClick={decrement}>Decrement</button>
            // </div>
        )
            ;
    }
}

export default AdItem;