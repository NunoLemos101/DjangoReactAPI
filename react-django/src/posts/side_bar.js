import React , { useState , useEffect } from 'react'
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import { apiGetNotificationNumber } from './api_requests'


export function SideBar(props) {
    const [notificationCount , setNotificationCount] = useState([])

    setInterval(function(){ 
        const handleNotificationNumberLookup = (response , status) => {
            if (status === 200) {
                console.log(response.notifications)
                setNotificationCount(response.notifications)
            }
        }

        apiGetNotificationNumber(handleNotificationNumberLookup)
    }, 10000);

    useEffect(() => {
        const handleNotificationNumberLookup = (response , status) => {
            if (status === 200) {
                console.log(response.notifications)
                setNotificationCount(response.notifications)
            }
        }

        apiGetNotificationNumber(handleNotificationNumberLookup)

    } , [])
    

    if (props.isowner === true || props.isowner === "True") {
        return  <div className="content-section">
                    <h3>My Sidebar</h3>
                    <p className='text-muted'>You can put any information here you'd like.</p>
                    <ul className="list-group">
                    <a href={`/profile/${props.username}`} style={{textDecoration : "None"}} className="list-group-item sidebar-selected">View Profile</a>
                    <a href="/my-profile/settings/" style={{textDecoration : "None"}} className="list-group-item sidebar-item">Edit Profile</a>
                    <a href="/" style={{textDecoration : "None"}} className="list-group-item sidebar-item">Change Password</a>
                    </ul>
                    <br></br>
                </div>
    } else if (props.isowner === false || props.isowner === "False") {
        return  <div className="content-section">
            <h3>My Sidebar</h3>
            <p className='text-muted'>You can put any information here you'd like.</p>
            <ul className="list-group">
            <a href="/my-profile/settings/" style={{textDecoration : "None"}} className="list-group-item sidebar-item">Profile setttings</a>
            <a href="/" style={{textDecoration : "None"}} className="list-group-item sidebar-item">Latest Posts</a>
            <a href="/notifications" style={{textDecoration : "None"}} className="list-group-item sidebar-item">Notifications                           
            <span className={"ml-2"}>
            <Badge badgeContent={notificationCount.toString()} color="secondary">
            <MailIcon style={{color : "black"}}/>
            </Badge>
            </span></a>
            <a href="/messages" style={{textDecoration : "None"}} className="list-group-item sidebar-item">Messages</a>
            </ul>
            <br></br>
        </div>
    }
    
    if (props.view === 'profile-settings') {
        return  <div className="content-section">
                            <h3>My Sidebar</h3>
                            <p className='text-muted'>You can put any information here you'd like.</p>
                            <ul className="list-group">
                            { props.selected == 'viewmyprofile' ? <a href={`/profile/${props.username}`} style={{textDecoration : "None"}} className="list-group-item sidebar-selected">View Profile</a> : <a href={`/profile/${props.username}`} style={{textDecoration : "None"}} className="list-group-item sidebar-item">View Profile</a>}
                            { props.selected == 'editprofile' ? <a href="/my-profile/settings/" style={{textDecoration : "None"}} className="list-group-item sidebar-selected">Edit Profile</a> : <a href="/my-profile/settings/" style={{textDecoration : "None"}} className="list-group-item sidebar-item">Edit Profile</a>}   
                            { props.selected == 'changePassword' ? <a href="/" style={{textDecoration : "None"}} className="list-group-item sidebar-selected">Change Password</a> : <a href="/" style={{textDecoration : "None"}} className="list-group-item sidebar-item">Change Password</a>}
                            </ul>
                            <br></br>
                        </div> 
                            
    } else if (props.view === 'home') {


            return  <div className="content-section">
                            <h3>My Sidebar</h3>
                            <p className='text-muted'>You can put any information here you'd like.</p>
                            <ul className="list-group">
                            { props.selected == 'profile' ? <a href="/my-profile/settings/" style={{textDecoration : "None"}} className="list-group-item sidebar-selected">Profile setttings</a> : <a href="/my-profile/settings/" style={{textDecoration : "None"}} className="list-group-item sidebar-item">Profile setttings</a>}   
                            { props.selected == 'latestPosts' ? <a href="/" style={{textDecoration : "None"}} className="list-group-item sidebar-selected">Latest Posts</a> : <a href="/" style={{textDecoration : "None"}} className="list-group-item sidebar-item">Latest Posts</a>}
                            { props.selected == 'notifications' ? <a href="/notifications" style={{textDecoration : "None"}} className="list-group-item sidebar-selected">Notifications</a> : <a href="/notifications" style={{textDecoration : "None"}} className="list-group-item sidebar-item">Notifications                           
                            <span className={"ml-2"}>
                            <Badge badgeContent={notificationCount.toString()} color="secondary">
                                <MailIcon style={{color : "black"}}/>
                            </Badge>
                            </span></a>}                   
                            { props.selected == 'messages' ? <a href="/messages" style={{textDecoration : "None"}} className="list-group-item sidebar-selected">Messages</a> : <a href="/messages" style={{textDecoration : "None"}} className="list-group-item sidebar-item">Messages</a>}

                            </ul>
                            <br></br>
                        </div>
    }
           
}
