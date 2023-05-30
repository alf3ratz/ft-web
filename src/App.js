import React from "react";
import "./App.css"
import TabsContainer from "./components/tabs/TabsContainer";
import {initializeApp} from "firebase/app";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./components/login/LoginPage";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBFB0u0xBN24pllH4tW_IVgxEpPja6_YBk",
    authDomain: "ftapp-386322.firebaseapp.com",
    projectId: "ftapp-386322",
    storageBucket: "ftapp-386322.appspot.com",
    messagingSenderId: "749984903264",
    appId: "1:749984903264:web:10deba3272b34723b4d305",
    measurementId: "G-9E588EFNMQ"
};

// Initialize Firebase
initializeApp(firebaseConfig);

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
        <BrowserRouter>
            <Routes>
                <Route path="/ft-web" element={<TabsContainer/>} />
                <Route path="/login" element={<LoginPage/>} />
            </Routes>
            {/*<TabsContainer/>*/}
        </BrowserRouter>
    );
}

export default App;
