import React, {Component, useEffect, useState} from 'react';
import AdItem from "./components/AdItem";
import AdItems from "./components/AdItems";
import Example1 from "./Example1";
import {QueryClient, QueryClientProvider} from 'react-query'
import ChatRoom from "./components/chat/ChatRoom";

const queryClient = new QueryClient()
//import Counter from "./components/Counter";
//import ClassCounter from "./components/ClassCounter";

// const App = () => {
//     const [users, setUsers] = useState([])
//
//     const fetchData = () => {
//         fetch("http://localhost:8080/api/travel/getAllTravels", {
//             method: "get"
//         })
//             .then(response => {
//                 return response.json()
//             })
//             .then(data => {
//                 setUsers(data)
//             })
//     }
//
//     useEffect(() => {
//         fetchData()
//     }, [])
//
//     // const [Listofcolors, setListofcolors] = useState([]);
//     // const [lastKey, setLastKey] = useState();
//     // const [isLoading, setLoading] = useState(false);
//     // const [isEmpty, setEmpty] = useState(false);
//     //
//     // //const colorRef = db.collection('users').orderBy('datetime', 'desc');
//     //
//     // useEffect(() => {
//     //     colorRef.limit(3).get().then((collections) => {
//     //         updateState(collections);
//     //     });
//     // }, []);
//     //
//     // const updateState = (collections) => {
//     //     const isCollectionEmpty = collections.size === 0;
//     //     if (!isCollectionEmpty) {
//     //         const colors = collections.docs.map((color) => color.data());
//     //         const Lastdoc = collections.docs[collections.docs.length - 1];
//     //         setListofcolors((Listofcolors) => [...Listofcolors, ...colors]);
//     //         setLastKey(Lastdoc);
//     //     } else {
//     //         setEmpty(true);
//     //     }
//     //     setLoading(false);
//     // }
//     //
//     // const fetchMorePosts = () => {
//     //     setLoading(true);
//     //     colorRef.startAfter(lastKey).limit(3).get().then((collections) => {
//     //         updateState(collections);
//     //     });
//     // }
//     //
//     // if (Listofcolors.length === 0) {
//     //     return <h1> Loading... </h1>
//     // }
//
//     return (<>
//         <button onClick={fetchData}>Fetch Users</button>
//         <div>
//             {users.length > 0 && (
//                 <ul>
//                     {users.map(user => (
//                         <li key={user.id}>{user.author}</li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//         {/*<div className="App">*/}
//         {/*    <h1> Infinite scroll in Firebase (firestore) and React.js </h1>*/}
//         {/*    <div className="wrapper">*/}
//         {/*        {Listofcolors.map((item, index) => (*/}
//         {/*            <div key={index}>*/}
//         {/*                <div className="wrapper__list">*/}
//         {/*                    <p><b> Title : </b> {item.title}</p>*/}
//         {/*                    <p><b> Description : </b>{item.description}</p>*/}
//         {/*                    <p><b> Date : </b>{item.datetime?.toDate().toLocaleDateString("en-US")}</p>*/}
//         {/*                </div>*/}
//         {/*            </div>*/}
//         {/*        ))}*/}
//         {/*        {isLoading && <h1> Loading... </h1>}*/}
//         {/*        {!isLoading && !isEmpty &&*/}
//         {/*            <button onClick={() => fetchMorePosts()} className="btn__default">More Posts</button>}*/}
//         {/*        {isEmpty && <h1> There are no more data </h1>}*/}
//         {/*    </div>*/}
//         {/*</div>*/}
//     </>)
//     // constructor(props) {
//     //     super(props);
//     //     this.state = {
//     //         items:[
//     //             {
//     //                 id:1,
//     //                 placeFrom:"blabla",
//     //                 placeTo:"blabla",
//     //                 countOfParticipants:3
//     //             }
//     //         ]
//     //     }
//     // }
//
// }
function App() {
    return (<QueryClientProvider client={queryClient}>
        <ChatRoom/>
    </QueryClientProvider>)
}

export default App;
