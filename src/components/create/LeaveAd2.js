import React, {Component} from "react";
import {
    deleteTravel,
    getTravelByEmail, isUserAuthor,
    leaveFromTravel, startTravel, stopTravel
} from "../../api/axios";
import ErrorPopup from "./ErrorPopup";
import ValidationPopup from "./ValidationPopup";
import "./LeaveAd.css"
import ParticipantsPopup from "../recycler/history/ParticipantsPopup";
import LeadershipPopup from "../recycler/leadership/LeadershipPopup";
import UpdatePopup from "./UpdatePopup";

class LeaveAd2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUpdateClicked: false,
            isError: false,
            isSuccess: false,
            isSuccessStop: false,
            currentEmail: {},
            isParticipantsClicked: false,
            isDeletePopupClicked: false,
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
                participants: [{}],
                countOfParticipants: 0,
                comment: ""
            },
        }
        this.toggleErrorPopup = this.toggleErrorPopup.bind(this);
        this.toggleSuccessPopup = this.toggleSuccessPopup.bind(this);
        this.showParticipantsPopup = this.showParticipantsPopup.bind(this);
        this.toggleUpdatePopup = this.toggleUpdatePopup.bind(this);
        this.toggleSuccessStopPopup = this.toggleSuccessStopPopup.bind(this);
    }

    componentDidMount() {
        let currUser = JSON.parse(localStorage.getItem('user_info'))
        getTravelByEmail(currUser.email)
            .then((response) => {
                let data = response.data
                let currUserLocal = JSON.parse(localStorage.getItem('user_info'))
                this.setState({travelData: data})
                // this.setState({currentEmail: currUserLocal.email.toString()})
                // console.log(`usEm: ${this.state.currentEmail}`)
                // console.log(`usEm: ${typeof (currUserLocal.email)}`)
                console.log(`authEm: ${this.state.travelData.authorEmail}`)
                if (this.state.travelData.authorEmail === currUserLocal.email) {
                    //isUserAuthor = true
                    localStorage.setItem('is_user_author', JSON.stringify({isAuthor: true}));
                } else {
                    localStorage.setItem('is_user_author', JSON.stringify({isAuthor: false}));
                }
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
    toggleUpdatePopup = () => {
        let upd = !this.state.isUpdateClicked
        this.setState({isUpdateClicked: upd})
    }

    toggleSuccessPopup = () => {
        this.setState({isSuccess: !this.state.isSuccess})
    }
    toggleSuccessStopPopup = () => {
        this.setState({isSuccessStop: !this.state.isSuccessStop})
    }
    showParticipantsPopup = () => {
        this.setState({isParticipantsClicked: !this.state.isParticipantsClicked})
    }
    toggleDeletePopup = () => {
        this.setState({isDeletePopupClicked: !this.state.isDeletePopupClicked})
    }
    leaveTravel = () => {
        console.log("leaved")
        let currUser = JSON.parse(localStorage.getItem('user_info'))
        leaveFromTravel(currUser.email,
            this.state.travelData.id)
            .then((response) => {
                this.toggleSuccessPopup()
                //setTravelData({...travelData, response})
                // currentTravelId = 0
                // currentChatId = 0;
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
    start = () => {
        startTravel(this.state.travelData.id)
            .then((response) => {
                //this.toggleSuccessPopup()
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
    stop = () => {
        stopTravel(this.state.travelData.id)
            .then((response) => {
                this.toggleSuccessStopPopup()
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
        if (this.state.travelData.authorEmail === JSON.parse(localStorage.getItem('user_info')).email) {
            //isUserAuthor = true
            localStorage.setItem('is_user_author', JSON.stringify({isAuthor: true}));
        } else {
            localStorage.setItem('is_user_author', JSON.stringify({isAuthor: false}));
        }
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
                        {this.state.travelData.authorEmail === JSON.parse(localStorage.getItem('user_info')).email ?
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
                        {this.state.isError && <ErrorPopup
                            content={<>
                                <b>{this.state.errorData.error_description}</b>
                            </>}
                            handleClose={this.toggleErrorPopup}
                        />}
                        {this.state.isSuccess && <ValidationPopup
                            content={<>
                                {this.state.travelData.authorEmail === JSON.parse(localStorage.getItem('user_info')).email ?
                                    <b>
                                        Вы удалили поездку
                                    </b> :
                                    <b>
                                        Вы вышли из поездки
                                    </b>}
                            </>}
                            handleClose={this.toggleSuccessPopup}
                        />}
                        {this.state.isSuccessStop && <ValidationPopup
                            content={<>
                                <b>
                                    Вы завершили поездку
                                </b>
                            </>}
                            handleClose={this.toggleSuccessStopPopup}
                        />}

                    </div>
                    :
                    <div>
                        <p>Вы не участвуйте ни в одной поездке</p>
                    </div>
                }
                {this.state.travelData.authorEmail === JSON.parse(localStorage.getItem('user_info')).email ?
                    <div className="current-ad-container">
                        <button type="button" onClick={this.toggleUpdatePopup}
                                style={{backgroundColor: "#fa7514"}}>Обновить поездку
                        </button>
                        <button type="button" onClick={this.start}>
                            Начать поездку
                        </button>
                        <button type="button" onClick={this.stop}>
                            Закончить поездку
                        </button>
                        {
                            this.state.isUpdateClicked && <UpdatePopup handleClose={this.toggleUpdatePopup}/>
                        }
                    </div>
                    : null
                }
            </div>
        );
    }
}

export default LeaveAd2;