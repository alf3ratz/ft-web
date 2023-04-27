import React from "react";
import {Tab, Tabs, TabList, TabPanel} from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./TabsContainer.css";
import {QueryClient, QueryClientProvider} from 'react-query'
import Recycler from "./recycler/Recycler";
import CreateAd from "./create/CreateAd";
import LeaveAd from "./create/LeaveAd";
import ChatPage from "./chat/ChatPage";
import LeaveAd2 from "./create/LeaveAd2";

const queryClient = new QueryClient()

const TabsContainer = () => {
    return (
        <Tabs className="tabs" >
            <TabList style={{display:'flex',alignItems:'center'}}>
                <Tab className="tab">Доступные поездки</Tab>
                <Tab className="tab">Чат поездки</Tab>
                <Tab className="tab">Создать объявление о поездке</Tab>
                <Tab className="tab">Мои поездки</Tab>
            </TabList>

            <TabPanel>
                <QueryClientProvider client={queryClient}>
                    <Recycler/>
                </QueryClientProvider>
            </TabPanel>
            <TabPanel>
                <ChatPage/>
            </TabPanel>
            <TabPanel>
                <CreateAd/>
            </TabPanel>
            <TabPanel>
                <LeaveAd2/>
            </TabPanel>
        </Tabs>
    );
};

export default TabsContainer;