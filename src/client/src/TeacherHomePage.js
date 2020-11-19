import React from 'react';
import TeacherNotification from './TeacherNotification';
import API from './API.js';
import {Route,Switch,Link} from 'react-router-dom';
import AppComponents from './AppComponents';

class TeacherHomePage extends React.Component {
    constructor(props){
        super(props);
        this.state={'teacher':null,'errorTeacher':null,'students':null,'errorLectures':null,'bookings':null,'lectures':null}
        //teacher prop is the teacher username
        //teacher state is the teacher info

    }

    componentDidMount(){
       this.init();

    }
    async init(){
        const bookings= await API.getTeacherLectures(this.props.teacher);
        const teacher= await API.getTeacherInfo(this.props.teacher);
        
        const lectures=bookings.map(b=>{return {lectureId:b.lectureId,lectureNumber:b.lectureNumber,lectureDate:b.lectureDate,course:b.course.name}});
        
        let ids = [... new Set(bookings.map(b=>b.lectureId))]
        const lect_unique=lectures.filter(b=>{
            for (let i of ids){
                if(b.lectureId===i){
                    ids=ids.filter(el=>el!==i);
                    return true;
                }
            }
            return false;
        })
        this.setState({teacher:teacher,bookings:bookings,lectures:lect_unique})
    }
    showBookings=(lectureId)=>{
        const students=this.state.bookings.filter(b=>b.lectureId===lectureId);
        this.setState({students:students})
    }
    back=()=>{
        this.setState({students:null})
    }
    render(){
        if(this.state.errorTeacher||this.state.errorLectures){
            return <h2>we are sorry but an error just occurred</h2>
        }
        if(!this.state.teacher){
            return <h1>page is loading</h1>
        }
        return <Switch >
                <Route exact path="/teacherportal">
                <AppComponents.AppNavbar logOut={this.props.logOut}/>
                <div className="container-fluid">
                    <div className="row">
                    <div className="col-3 bg-success" id="sticky-sidebar">
                    <Aside teacher={this.state.teacher} />
                    </div>
                    <div className="col-9" id="main">
                    {!this.state.students?    
                    <MainPage lectures={this.state.lectures} bookings={this.state.bookings} showBookings={this.showBookings} />:
                    <StudentBookingList students={this.state.students} back={this.back}/>}
                    </div>
                    </div>
                </div>
                </Route>
                <Route exact path ="/teacherportal/notifications">
                    <TeacherNotification teacher={this.state.teacher}/>
                </Route>               
              </Switch>
        
    }
}

function Aside (props){
    return (
            <div className="container-fluid">
            <h1>teacher info:</h1>
            <h2>{props.teacher.name} {props.teacher.surname}</h2>
            <h3>{props.teacher.address}</h3>
            </div>
    )

}


class MainPage extends React.Component{

 
    constructor(props){
        super(props);

    }
    showItem= (lecture)=>{
        const num= this.props.bookings.filter(b=>b.lectureId===lecture.lectureId).length;
        return <LectureItem key={lecture.lectureId} lecture={lecture} num={num} showBookings={this.props.showBookings} />
    }

    render(){
        return  <ul className="list-group list-group-flush">
                    <li className="list-group-item bg-light">
                    <div className="d-flex w-100 justify-content-between">
                    <div className="col-3">
                    <h3>COURSE NAME</h3>
                    </div>
                    <div className="col-2">
                    <h3>LECTURE NUMBER</h3>
                    </div>
                    <div className="col-3">
                    <h3>DATE</h3>
                    </div>
                    <div className="col-3">
                    <h3># BOOKINGS</h3>
                    </div>
                    <div className="col-1">
                    <h3>SEE LIST</h3>
                    </div>
                    </div>
                    </li>
                    {this.props.lectures.map(this.showItem)}
                </ul>
    }
}


function LectureItem (props){
    
    return (
        <li className="list-group-item" id = {props.lecture.lectureId}>
        <div className="d-flex w-100 justify-content-between">
            <div className="col-3">          
            <h4>{props.lecture.course}</h4>
            </div>
            <div className="col-2">
            <h4>{props.lecture.lectureNumber}</h4>
            </div>

            <div className="col-3">
            <h4>{props.lecture.lectureDate}</h4>
            </div>
            <div className="col-3">
            <h4>{props.num }</h4>
            </div>
            <div className="col-1">
            <h4>
            <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-list-check" fill="green" xmlns="http://www.w3.org/2000/svg" onClick={(ev) => props.showBookings(props.lecture.lectureId)}>
                <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"/>
            </svg>          
            </h4>
            </div>
        </div>
        </li>       
        )
}

class StudentBookingList extends React.Component{
    constructor(props){
        super(props);
    }

    showStudent= (student)=>{
        return <StudentItem key={student.bookingId} student={student}/>
    }

    render(){
        console.log(this.props.students)
        return  <>
                <h1>STUDENT LIST FOR COURSE {this.props.students[0].course.name} LESSON NUMBER {this.props.students[0].lectureNumber}</h1>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item bg-light">
                    <div className="d-flex w-100 justify-content-between">
                    <div className="col-3">
                    <h3>STUDENT NAME</h3>
                    </div>
                    <div className="col-3">
                    <h3>STUDENT SURNAME</h3>
                    </div>
                    <div className="col-3">
                    <h3>STUDENT EMAIL</h3>
                    </div>
                    <div className="col-3">
                    <h3>BOOKING STATUS</h3>
                    </div>
                    </div>
                    </li>
                    {this.props.students.map(this.showStudent)}
                </ul>
                <button type="button" class="btn btn-success" onClick={(ev) => this.props.back()} >BACK</button>
                </>
    }
}

function StudentItem (props){
    
    return (
        <li className="list-group-item" id = {props.student.lectureId}>
        <div className="d-flex w-100 justify-content-between">
            <div className="col-3">          
            <h4>{props.student.studentName}</h4>
            </div>
            <div className="col-3">
            <h4>{props.student.studentSurname}</h4>
            </div>

            <div className="col-3">
            <h4>{props.student.studentEmail}</h4>
            </div>
            <div className="col-3">
            <h4>{props.student.bookingInfo }</h4>
            </div>
        </div>
        </li>       
        )
}


export default TeacherHomePage;