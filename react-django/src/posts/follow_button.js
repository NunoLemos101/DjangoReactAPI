import React from 'react'
import { apiFollowRequest } from './api_requests'

export function FollowUnfollowButton(props) {
    const { currentState , profileId ,didPerformFollow } = props

    const handleFollowUnfollowBackendEvent = (response , status) => {
        if ((status === 201 || status === 200) && didPerformFollow) {
            didPerformFollow(response , status)
        }
    }

    const handleFollowClick = (event) => {
        event.preventDefault()
        apiFollowRequest(profileId , handleFollowUnfollowBackendEvent)
        
    }

    if (currentState === "sent") {
        return <span style={{cursor : "pointer"}} onClick={handleFollowClick} className="following-button ml-3">Follow request sent</span>
    } else if (currentState === "not_sent") {
        return <span style={{cursor : "pointer"}} onClick={handleFollowClick} className="follow-button ml-3">Follow</span>
    } else if (currentState === "following") {
        return <span style={{cursor : "pointer"}} onClick={handleFollowClick} className="following-button ml-3">Following</span>
    } else if (currentState === "is_owner") {
        return <a href="/my-profile/settings/" style={{cursor : "pointer"}} className="following-button ml-3">Settings</a>
    }
}