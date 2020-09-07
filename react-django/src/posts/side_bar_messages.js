import React , { useState , useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider';
import { apiGetLatestMessages } from './api_requests'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export function SideBarMessages(props) {
    const classes = useStyles();
    const [latestMessages , setLatestMessages] = useState([])

    useEffect (() => {
        const handleLatestMessagesLookup = (response , status) => {
            if (status === 200) {
                console.log(response)
                setLatestMessages(response)
            }
        }

        apiGetLatestMessages(handleLatestMessagesLookup)
    } , [])
    var i = 0
    var latest_message;
    return latestMessages.map((item , index) => {
        if (item.latest_message.last_message_from_loggedIn_user === true) {
            latest_message = `You: ${item.latest_message.text}`
        } else {
            latest_message = item.latest_message.text
        }
        return  <a key={index} className="name-link" href="#">
                        <ListItem>
                            <a href={`#`}><img className="bord" height="65" width="65" src={`http://127.0.0.1:8000${item.image}`}></img></a>
                            <ListItemText className="ml-2" primary={item.user.username} secondary={latest_message} />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </a>
                            })
}