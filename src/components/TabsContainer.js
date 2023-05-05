import React from "react";
import {Tab, Tabs, TabList, TabPanel} from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./TabsContainer.css";
import {QueryClient, QueryClientProvider} from 'react-query'
import Recycler from "./recycler/Recycler";
import HistoryRecycler from "./recycler/history/HistoryRecycler";
import CreateAd from "./create/CreateAd";
import LeaveAd from "./create/LeaveAd";
import ChatPage from "./chat/ChatPage";
import LeaveAd2 from "./create/LeaveAd2";

const queryClient = new QueryClient()
const queryClientHistory = new QueryClient()

const TabsContainer = () => {
    return (
        <Tabs className="tabs">
            <TabList style={{display: 'flex', alignItems: 'center'}}>
                <Tab className="tab">Доступные поездки</Tab>
                <Tab className="tab">Чат поездки</Tab>
                <Tab className="tab">Создать объявление о поездке</Tab>
                <Tab className="tab">Мои поездки</Tab>
                <Tab className="tab">История поездок</Tab>
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
            <TabPanel>
                <QueryClientProvider client={queryClientHistory}>
                    <HistoryRecycler/>
                </QueryClientProvider>
            </TabPanel>
        </Tabs>
    );
};

export default TabsContainer;