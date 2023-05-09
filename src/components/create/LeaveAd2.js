import React, {Component} from "react";
import {
    currentChatId,
    currentTravelId,
    deleteTravel,
    getTravelByEmail,
    leaveFromTravel,
    userEmail
} from "../../api/axios";
import ErrorPopup from "./ErrorPopup";
import ValidationPopup from "./ValidationPopup";
import "./LeaveAd.css"
import ParticipantsPopup from "../recycler/history/ParticipantsPopup";
import ParticipantList from "../recycler/participants/ParticipantList";
import LeadershipPopup from "../recycler/leadership/LeadershipPopup";

class LeaveAd2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isError: false,
            isSuccess: false,
            isParticipantsClicked: false,
            isDeletePopupClicked: false,
            userEmail: userEmail,
            errorData: {
                error: "",
                error_description: "",
            },
            travelData: {
                id: 0,
                authorEmail: "",
                startTime: "",
                placeFrom: "",
                placeTo: "",
                participants:[{}],
                countOfParticipants: 0,
                comment: ""
            },
        }
        this.toggleErrorPopup = this.toggleErrorPopup.bind(this);
        this.toggleSuccessPopup = this.toggleSuccessPopup.bind(this);
        this.showParticipantsPopup = this.showParticipantsPopup.bind(this);
    }

    componentDidMount() {
        getTravelByEmail(userEmail)
            .then((response) => {
                let data = response.data
                this.setState({travelData: data})
            }).catch(function (error) {
            if (error.response) {
                let jsonString = JSON.stringify(error.response.data)
                let errorObj = JSON.parse(jsonString)
                this.setState({errorData: errorObj})
                this.toggleErrorPopup()
            }
        }.bind(this))
    }

    toggleErrorPopup = () => {
        let err = !this.state.isError
        this.setState({isError: err})
    }

    toggleSuccessPopup = () => {
        this.setState({isSuccess: !this.state.isSuccess})
    }
    showParticipantsPopup = () => {
        this.setState({isParticipantsClicked: !this.state.isParticipantsClicked})
    }
    toggleDeletePopup = () =>{
        this.setState({isDeletePopupClicked: !this.state.isDeletePopupClicked})
    }
    leaveTravel = () => {
        console.log("leaved")
        leaveFromTravel(this.state.userEmail,
            this.state.travelData.id)
            .then((response) => {
                this.toggleSuccessPopup()
                //setTravelData({...travelData, response})
                currentTravelId = 0
                currentChatId = 0;
            })
            .catch(function (error) {
                if (error.response) {
                    let jsonString = JSON.stringify(error.response.data)
                    let errorObj = JSON.parse(jsonString)
                    this.setState({errorData: errorObj})
                    this.toggleErrorPopup()
                }
            }.bind(this));
    }
    deleteTravel = () => {
        console.log("deleted")
        deleteTravel(this.state.travelData.id)
            .then((response) => {
                this.toggleSuccessPopup()
                //setTravelData({...travelData, response})
            })
            .catch(function (error) {
                if (error.response) {
                    let jsonString = JSON.stringify(error.response.data)
                    let errorObj = JSON.parse(jsonString)
                    this.setState({errorData: errorObj})
                    this.toggleErrorPopup()
                }
            }.bind(this));
    }

    render() {
        return (
            <div>
                {this.state.travelData.id !== 0 ?
                    <div className="current-ad-container">
                        <p>От кого: {this.state.travelData.authorEmail}</p>
                        <p>Адрес отправления: {this.state.travelData.placeFrom}</p>
                        <p>Адрес назначения: {this.state.travelData.placeTo}</p>
                        <p>Количество попутчиков: {this.state.travelData.countOfParticipants}</p>
                        <p>Дополнительная информация: {this.state.travelData.comment}</p>
                        <button type="button" className="button-participants-leavead"
                                onClick={this.showParticipantsPopup}>
                            Попутчики
                        </button>
                        {/*<ParticipantList participants={this.state.travelData.participants}/>*/}
                        {/*{*/}
                        {/*    this.state.travelData.participants === undefined ?*/}
                        {/*        <p>Попутчики отсутствуют</p>*/}
                        {/*        :*/}
                        {/*        <div><ParticipantList participants={this.state.travelData.participants}/></div>*/}
                        {/*}*/}
                        {this.state.travelData.authorEmail === this.state.userEmail ?
                            <button type="button" className="button-leave" onClick={this.toggleDeletePopup}>
                                Удалить поездку
                            </button>
                            :
                            <button type="button" className="button-leave" onClick={this.leaveTravel}>
                                Выйти из поездки
                            </button>
                        }
                        {this.state.isParticipantsClicked && <ParticipantsPopup
                            participants={this.state.travelData.participants}
                            handleClose={this.showParticipantsPopup}
                        />}
                        {this.state.isDeletePopupClicked && <LeadershipPopup
                            travelData={this.state.travelData}
                            handleClose={this.toggleDeletePopup}
                        />}
                        {/*<div className="leave-ad-background-container">*/}
                        {/*    {this.state.travelData.authorEmail === userEmail ?*/}
                        {/*        <button type="button" className="button-leave" onClick={this.state.deleteTravel}>*/}
                        {/*            Удалить поездку*/}
                        {/*        </button>*/}
                        {/*        :*/}
                        {/*        <button type="button" className="button-leave" onClick={this.state.leaveTravel}>*/}
                        {/*            Выйти из поездки*/}
                        {/*        </button>*/}
                        {/*    }*/}
                        {/*</div>*/}

                        {this.state.isError && <ErrorPopup
                            content={<>
                                <b>{this.state.errorData.error_description}</b>
                            </>}
                            handleClose={this.toggleErrorPopup}
                        />}
                        {this.state.isSuccess && <ValidationPopup
                            content={<>
                                {this.state.travelData.authorEmail === userEmail ?
                                    <b>
                                        Вы удалили поездку
                                    </b> :
                                    <b>
                                        Вы вышли из поездки
                                    </b>}
                            </>}
                            handleClose={this.toggleSuccessPopup}
                        />}
                    </div>
                    :
                    <div>
                        <p>Вы не участвуйте ни в одной поездке</p>
                    </div>
                }
            </div>
        );
    }
}

export default LeaveAd2;