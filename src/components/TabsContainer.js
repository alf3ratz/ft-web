import React from "react";
import {Tab, Tabs, TabList, TabPanel} from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./TabsContainer.css";
import {QueryClient, QueryClientProvider} from 'react-query'
import Recycler from "./Recycler";

const queryClient = new QueryClient()

const TabsContainer = () => {
    return (
        <Tabs className="tabs">
            <TabList>
                <Tab className="tab">Доступные поездки</Tab>
                <Tab className="tab">Чат поездки</Tab>
                <Tab className="tab">Создать объявление о поездке</Tab>
            </TabList>

            <TabPanel>
                <QueryClientProvider client={queryClient}>
                    <Recycler/>
                </QueryClientProvider>
            </TabPanel>
            <TabPanel>
                <p>
                    Тут пока пусто :(
                </p>
            </TabPanel>
            <TabPanel>
                <p>
                    И тут пока пусто :(
                </p>
            </TabPanel>
        </Tabs>
    );
};

export default TabsContainer;