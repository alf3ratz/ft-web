import React from "react";
import {Tab, Tabs, TabList, TabPanel} from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./TabsContainer.css";
import {QueryClient, QueryClientProvider} from 'react-query'
import Recycler from "../recycler/Recycler";
import HistoryRecycler from "../recycler/history/HistoryRecycler";
import CreateAd from "../create/CreateAd";
import LeaveAd from "../create/LeaveAd";
import ChatPage from "../chat/ChatPage";
import LeaveAd2 from "../create/LeaveAd2";
import MapComponent from "../map/MapComponent";
import {MapContainer} from "../map/MapContainer";
import TaxiComponent from "../map/TaxiComponent";

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
                <Tab className="tab">Такси</Tab>
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
            <TabPanel>
                {/*<script src="https://yastatic.net/taxi-widget/ya-taxi-widget.js"></script>*/}
                {/*<div className="ya-taxi-widget" data-ref="https%3A%2F%2Fftweb.herokuapp.com%2F"*/}
                {/*     data-proxy-url="https://{app}.redirect.appmetrica.yandex.com/route?start-lat={start-lat}&amp;start-lon={start-lon}&amp;end-lat={end-lat}&amp;end-lon={end-lon}&amp;tariffClass={tariff}&amp;ref={ref}&amp;appmetrica_tracking_id={redirect}&amp;lang={lang}"*/}
                {/*     data-tariff="econom" data-app="3" data-lang="ru" data-redirect="1178268795219780156"*/}
                {/*     data-description="" data-size="s" data-theme="action" data-title="Вызвать такси"*/}
                {/*     data-use-location="true" data-point-a="" data-point-b="37.213223,55.673824"></div>*/}
                {/*<script src="https://api-maps.yandex.ru/2.1/?apikey=68f9761c-c819-449f-a972-5d58f3518124&lang=ru_RU"*/}
                {/*        type="text/javascript">*/}
                {/*</script>*/}
                {/*<MapComponent/>*/}
                <TaxiComponent/>
            </TabPanel>
        </Tabs>
    );
};

export default TabsContainer;