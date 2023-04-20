import React from "react";
import {QueryClient, QueryClientProvider} from 'react-query'
import ChatRoom from "./components/chat/ChatRoom";
import Recycler from "./components/recycler/Recycler";
import "./App.css"
import TabsContainer from "./components/TabsContainer";

const queryClient = new QueryClient()


// const App = () => {
//     const [value, setValue] = React.useState(2);
//
//     return (
//         <div
//             // style={{
//             //     marginLeft: "40%",
//             // }}
//         >
//             <h1>FT Web</h1>
//             <Paper square>
//                 <Tabs
//                     value={value}
//                     textColor="primary"
//                     indicatorColor="primary"
//                     onChange={(event, newValue) => {
//                         setValue(newValue);
//                     }}
//                 >
//                     <Tab label="Active TAB One">
//                         <QueryClientProvider client={queryClient}>
//                             <ChatRoom/>
//                         </QueryClientProvider>
//                     </Tab>
//                     <Tab label="Active TAB Two"/>
//                     <Tab label="Disabled TAB!" disabled/>
//                     <Tab label="Active Tab Three"/>
//                 </Tabs>
//                 <div>
//
//                 </div>
//             </Paper>
//         </div>
//     );
// };
//
// export default App;
// import Tabs from "./components/Tabs";
// import "./App.css";
//
// function App() {
//     // return (<QueryClientProvider client={queryClient}>
//     //     <ChatRoom/>
//     // </QueryClientProvider>)
//     return (
//         <div>
//             <h1>Tabs Demo</h1>
//             <Tabs>
//                 <div label="Gator">
//                     {/*See ya later, <em>Alligator</em>!*/}
//                     <QueryClientProvider client={queryClient}>
//                         <Recycler/>
//                     </QueryClientProvider>
//                 </div>
//                 <div label="Croc">
//                     After 'while, <em>Crocodile</em>!
//                 </div>
//                 <div label="Sarcosuchus">
//                     Nothing to see here, this tab is <em>extinct</em>!
//                 </div>
//             </Tabs>
//             <div>
//
//             </div>
//         </div>
//     );
// }
function App() {
    return (
        <>
            <TabsContainer/>
        </>
    );
}

export default App;
