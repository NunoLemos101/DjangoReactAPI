import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import { apiGetFollowNotificationData , apiGetLikeNotificationData , apiFollowRequestAction } from './api_requests'


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export function Notifications() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [followNotificationsData , setFollowNotificationsData] = useState([])
  const [likeNotificationsData , setLikeNotificationsData] = useState([])
  const [allNotificationsData , setAllNotificationsData] = useState([])
  const [action , setAction] = useState(null)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const denyFollowNotification = (id , event) => {
    event.preventDefault()
    const handleActionLookup = (response , status) => {
      if (status === 201 || status === 200) {
        setAction(response)
        console.log(response)
      }
    }
    console.log(id)
    const data = {id : id , action : 'deny'}
    apiFollowRequestAction(handleActionLookup , data)
    setAction([])
  }

  const acceptFollowNotification = (id , event) => {
    event.preventDefault()
    const handleActionLookup = (response , status) => {
      if (status === 201 || status === 200) {
        setAction(response)
        console.log(response)
      }
    }

    const data = {id : id , action : 'accept'}
    apiFollowRequestAction(handleActionLookup , data)
    setAction([])
  }

  useEffect(() => {
    const handleFollowNotificationLookup = (response , status) => {   
      if (status === 200) {
        setFollowNotificationsData(response)
        console.log(response)
        setAllNotificationsData(response)
      }
    }

    const handleLikeNotificationLookup = (response , status) => {
      if (status === 200) {
        setLikeNotificationsData(response)
        console.log(response)
        setAllNotificationsData(allNotificationsData => allNotificationsData.concat(response))
  
      }
    }

    apiGetFollowNotificationData(handleFollowNotificationLookup)
    apiGetLikeNotificationData(handleLikeNotificationLookup)
    console.log(followNotificationsData)
  } , [action])
  
  console.log(allNotificationsData)
  var i = 0
  allNotificationsData.sort((a, b) => -a.timestamp.localeCompare(b.timestamp))

  return allNotificationsData.map((item , index) => {
    i = i + 1
    var notification;
    if (item.notification_type === 'follow') {
      if (item.follow_request.accepted === true) {
        notification = 'follow-accepted'
      } else {
        notification = 'follow'
      }
    } else if (item.notification_type === 'like') {
      notification = 'like'
      }
    return (
      <div  key={index} className={classes.root}>
      { i < 2 ? <AppBar style={{backgroundColor : "#007bff"}} position="static">
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <span className={"mt-2 mr-1"}>
          {  /*  Notification Number => <Badge badgeContent={5} color="secondary"></Badge> */} 
              </span>
            <Tab label="Follow Notifications " {...a11yProps(0)} />

            <Tab label="Like Notifications" {...a11yProps(1)} />
          </Tabs>
        </AppBar> : undefined}

      {/* Main Tab */}

      { notification === 'follow' && 
      <TabPanel style={{borderLeft: "1px solid #dddddd" , borderRight: "1px solid #dddddd" , borderBottom: "1px solid #dddddd"}} value={value} index={0}>
        <a href={`/profile/${item.sender.username}`}><img className="bord" height="50" width="50" src={`http://127.0.0.1:8000${item.sender_image}`}></img></a>
          <span className="ml-1"><strong><a className="name-link" href={`/profile/${item.sender.username}`}>{item.sender.username}</a></strong> wants to follow you.</span>
          <span style={{float : "right"}}>
              <Button variant="contained" onClick={(event) => acceptFollowNotification(item.id , event)} color="primary">Accept</Button>
               <Button style={{marginLeft : "10px"}} onClick={(event) => denyFollowNotification(item.id , event)} variant="contained" color="secondary">Deny</Button>
          </span>
        </TabPanel>
        } 
        
        { notification === 'follow-accepted' && 
          <TabPanel  style={{borderLeft: "1px solid #dddddd" , borderRight: "1px solid #dddddd" , borderBottom: "1px solid #dddddd"}} value={value} index={0}>
          <a href={`/profile/${item.sender.username}`}><img className="bord" height="50" width="50" src={`http://127.0.0.1:8000${item.sender_image}`}></img></a>          
          <span className="ml-1"><strong><a className="name-link" href={`/profile/${item.sender.username}`}>{item.sender.username}</a></strong> is now following you.</span>
          <span style={{float : "right"}}>
          </span>          
          </TabPanel>
          }

        { notification === 'like' && 
          <TabPanel  style={{borderLeft: "1px solid #dddddd" , borderRight: "1px solid #dddddd" , borderBottom: "1px solid #dddddd"}} value={value} index={0}>
          <a href={`/profile/${item.sender.username}`}><img className="bord" height="50" width="50" src={`http://127.0.0.1:8000${item.sender_image}`}></img></a>          
          <span className="ml-1"><strong><a className="name-link" href={`/profile/${item.sender.username}`}>{item.sender.username}</a></strong> Liked <a href={`/post/${item.post.id}`}>this</a> post from you.</span>
          <span style={{float : "right"}}>
          </span>          
          </TabPanel>
        }

      {/* Follow Tab */}

      { notification === 'follow' && 
      <TabPanel style={{borderLeft: "1px solid #dddddd" , borderRight: "1px solid #dddddd" , borderBottom: "1px solid #dddddd"}} value={value} index={1}>
          <a href={`/profile/${item.sender.username}`}><img className="bord" height="50" width="50" src={`http://127.0.0.1:8000${item.sender_image}`}></img></a>
              <span className="ml-1"><strong><a className="name-link" href={`/profile/${item.sender.username}`}>{item.sender.username}</a></strong> wants to follow you.</span>
              <span style={{float : "right"}}>
                  <Button variant="contained" onClick={(event) => acceptFollowNotification(item.id , event)} color="primary">Accept</Button>
                  <Button style={{marginLeft : "10px"}} onClick={(event) => denyFollowNotification(item.id , event)} variant="contained" color="secondary">Deny</Button>
              </span>
      </TabPanel>
      } 
        
        { notification === 'follow-accepted' && 
        <TabPanel  style={{borderLeft: "1px solid #dddddd" , borderRight: "1px solid #dddddd" , borderBottom: "1px solid #dddddd"}} value={value} index={1}>
          <a href={`/profile/${item.sender.username}`}><img className="bord" height="50" width="50" src={`http://127.0.0.1:8000${item.sender_image}`}></img></a>
          <span className="ml-1"><strong><a className="name-link" href={`/profile/${item.sender.username}`}>{item.sender.username}</a></strong> is now following you.</span>
          <span style={{float : "right"}}>
          </span>          
        </TabPanel>
        }

     
      {/* Like Tab */}

          { notification === 'like' ? 
          <TabPanel  style={{borderLeft: "1px solid #dddddd" , borderRight: "1px solid #dddddd" , borderBottom: "1px solid #dddddd"}} value={value} index={2}>
          <a href={`/profile/${item.sender.username}`}><img className="bord" height="50" width="50" src={`http://127.0.0.1:8000${item.sender_image}`}></img></a>
          <span className="ml-1"><strong><a className="name-link" href={`/profile/${item.sender.username}`}>{item.sender.username}</a></strong> Liked <a href={`/post/${item.post.id}`}>this</a> post from you.</span>
          <span style={{float : "right"}}>
          </span>          
          </TabPanel> : undefined}
      </div>
    );
  })
}