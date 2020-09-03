import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { PostsComponent, ProfileComponent , SearchNavBarComponent , ProfileSettingsComponent , SideBarComponent , NotificationsComponent} from './posts/components'

const renderReactComponent = React.createElement
const homeElement = document.getElementById("posts-react")
const profileElement = document.getElementById("profile-react")
const sideBarElement = document.getElementById('sidebar-react')
const searchNavBarElement = document.getElementById("search-nav-bar-react")
const profileSettingsElement = document.getElementById("profile-settings-react")
const notificationsElement = document.getElementById('notifications-react')

const componentsList = [
  [homeElement , PostsComponent] , 
  [profileElement , ProfileComponent] , 
  [notificationsElement , NotificationsComponent] ,
  [searchNavBarElement , SearchNavBarComponent] , 
  [sideBarElement , SideBarComponent] ,
  [profileSettingsElement , ProfileSettingsComponent]
]

componentsList.map(item => {
  console.log(item[0])
  if (item[0]) {
    ReactDOM.render(renderReactComponent(item[1] , item[0].dataset) , item[0])
  }
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
