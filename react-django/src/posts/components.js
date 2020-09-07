import React, { useState }  from 'react'
import { PostsList } from './list_posts'
import { Profile } from './profile'
import { ProfileSettingsForm } from './profile-settings-form'
import { SearchNavBar } from './search_nav_bar'
import { PostForm } from './post_form'
import { SideBar } from './side_bar'
import { Notifications } from './notifications'
import { AllMessages } from './all_messages'
import { SideBarMessages } from './side_bar_messages'
import { Message } from './message'

export function PostsComponent(props) {
    const [newPosts , setNewPosts] = useState([])
    const handleNewPost = (newPost) => {
        let tempNewPosts = [...newPosts]
        tempNewPosts.unshift(newPost)
        setNewPosts(tempNewPosts)
        }
        
    return <>    
            { props.username &&<PostForm didPost={handleNewPost} {...props}/>}
            <div className={props.className}>
                <PostsList newPosts={newPosts} {...props} />
            </div>
        </>
}

export function ProfileComponent(props) {
    const [profile , setProfile] = useState([])
    return <Profile profile={profile} {...props}/>
}

export function ProfileSettingsComponent(props) {
    const [profile , setProfile] = useState([])
    return <ProfileSettingsForm profile={profile} {...props}/>
}

export function SearchNavBarComponent(props) {
    return <SearchNavBar/>
}

export function SideBarComponent(props) {
    return <SideBar {...props}/>
}

export function NotificationsComponent(props) {
    return <Notifications/>
}

export function MessageComponent(props) {
    return <Message/>
}

export function AllMessagesComponent(props) {
    return <AllMessages/>
}

export function SideBarMessagesComponent(props) {
    return <SideBarMessages/>
}