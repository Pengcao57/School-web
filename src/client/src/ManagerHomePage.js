import React from 'react';
import API from './API.js';
import AppComponents from './AppComponents';

class ManagerHomePage extends React.Component{
    constructor(props){
        super(props);
        this.state={'manager':null,'bookings':null,'error':null,'lectures':null,'showLects':null, 'showBks':null}
    }

    componentDidMount(){
        API.getManagerInfo(this.props.manager).then((manager)=>{
            API.getBookings().then((bookings)=>{
                API.getLectures().then((lectures)=>{this.setState({'bookings':bookings,'manager':manager, 'lectures':lectures});
            }).catch((error)=>this.setState({'error':error}));
            }).catch((error)=>this.setState({'error':error}));
        }).catch((error)=>this.setState({error:error}));
    }
    showLectures=(bookings, lectures)=>{
        this.setState({'showLects':lectures,'showBks':bookings});
    }
    back=()=>{
        this.setState({'showLects':null,'showBks':null});
    }

    render(){
        if(this.state.error){
            return<h1>Connections problems</h1>
        }
        if(!this.state.manager){
            return <h1>LOADING</h1>
        }
       
        return <>
            <AppComponents.AppNavbar logOut={this.props.logOut}/>
            <div className="container-fluid">
                    <div className="row">
                    <div className="col-2 bg-success" id="sticky-sidebar">
                    <Aside manager={this.state.manager} />
                    </div>
                    {this.state.showBks || this.state.showLects?
                    <div className="col-10 p-0" id="main">
                    <Lecture  bookings={this.state.showBks} lectures={this.state.showLects} back={this.back}/>
                    </div>
                    :<div className="col-10 p-0" id="main">
                    <Course  bookings={this.state.bookings} lectures={this.state.lectures} showLectures={this.showLectures}/>
                    </div>}
                    </div>
                </div>           
            </>;
    }
}

class Course extends React.Component{
    constructor(props){
        super(props);

    }
    showItem= (course)=>{
        let lectures = this.props.lectures.filter(l=>l.courseDto.courseId===course);
        let bookings = this.props.bookings.filter(b=>b.courseDto.courseId===course);
        
        return <CourseItem key={course} bookings={bookings} lectures={lectures} showLectures={this.props.showLectures} />
    }
    render(){
        let courses = this.props.lectures.map(l=>l.courseDto.courseId);
        
        let courses_unique = [...new Set(courses)];
        
        return  <ul className="list-group list-group-flush">
                    <li className="list-group-item bg-light">
                    <div className="d-flex w-100 justify-content-between">
                    <div className="col-4">
                    <h4>COURSE</h4>
                    </div>
                    <div className="col-4">
                    <h4>PROFESSOR</h4>
                    </div>
                    <div className="col-2">
                    <h4>SEE DETAILS</h4>
                    </div>
                    </div>
                    </li>
                    {courses_unique.map(this.showItem)}
                </ul>
    }
}

class Lecture extends React.Component{
    constructor(props){
        super(props);
    }

    showLecture= (lecture)=>{
        let del_bookings = this.props.bookings.filter(b=>b.lectureDto.id===lecture.lectureId && b.bookingInfo === 'CANCELED_BY_STUD').length;
        let waiting_bookings = this.props.bookings.filter(b=>b.lectureDto.id===lecture.lectureId && b.bookingInfo === 'WAITING').length;
        return <LectureItem key={lecture.lectureId} lecture={lecture} del_bookings={del_bookings} waiting_bookings={waiting_bookings}/>
    }

    render(){
        return  (<>
                <h2>LECTURES FOR COURSE: {this.props.lectures[0].courseDto.name}</h2>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item bg-light" >
                    <div className="d-flex w-100 justify-content-between">
                    <div className="col-2">
                    <h4>LECTURE</h4>
                    </div>
                    <div className="col-2">
                    <h4>DATE</h4>
                    </div>
                    <div className="col-2">
                    <h4>LECTURE DELETED or REMOTE</h4>
                    </div>
                    <div className="col-2">
                    <h4>DELETED</h4>
                    </div>
                    <div className="col-2">
                    <h4>ATTENDANCE</h4>
                    </div>
                    <div className="col-2">
                    <h4>WAITING</h4>
                    </div>
                    </div>
                    </li>
                    {this.props.lectures.map(this.showLecture)}
                </ul>
                <button type="button" className="btn btn-success" onClick={(ev) => this.props.back()} >BACK</button>
                </>);
    }
}

function LectureItem (props){
    var date = new Date(props.lecture.date).toLocaleString().slice(0,-3);

    return (
        <li className="list-group-item" id = {props.lecture.lectureId}>
        <div className="d-flex w-100 justify-content-between">
            <div className="col-2">          
            <h4>Lecture: {props.lecture.numberOfLesson}</h4>
            </div>
            <div className="col-2">
            <h4>{date}</h4>
            </div>
            <div className="col-2">
            <h4>{props.lecture.deleted?'Lecture Deleted':props.lecture.remotly?'Lecture Remote':'Lecture in presence'}</h4>
            </div>
            {!props.lecture.deleted && !props.lecture.remotly?
            <>
            <div className="col-2">
            <h4>{props.del_bookings}</h4>
            </div>
            <div className="col-2">
            <h4>{props.lecture.bookedSeats}</h4>
            </div>
            <div className="col-2">
            <h4>{props.waiting_bookings}</h4>
            </div>
            </>
            :<><div className="col-6"></div></>}
        </div>
        </li>       
        )
}


function CourseItem (props){
    
    return (
        <li className="list-group-item" id = {props.lectures[0].courseDto.courseId}>
        <div className="d-flex w-100 justify-content-between">
            <div className="col-4">
            <h4>{props.lectures[0].courseDto.name}</h4>
            </div>
            <div className="col-4">
            <h4>{props.lectures[0].professorDto.name} {props.lectures[0].professorDto.surname}</h4>
            </div>
            <div className="col-2">
            <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-list-check" fill="green" xmlns="http://www.w3.org/2000/svg" onClick={(ev) => props.showLectures(props.bookings,props.lectures)}>
                <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"/>
            </svg>
            </div>
        </div>
        </li>
        
        )
}



function Aside (props){
    return (
            <div className="container-fluid">
            <h3>Manager:</h3>
            <h4>{props.manager.name} {props.manager.surname}</h4>
            <h4>{props.manager.address}</h4>
            </div>
    )

}

export default ManagerHomePage;