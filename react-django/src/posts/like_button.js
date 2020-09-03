import React from 'react'
import { apiLikePost } from './api_requests'

export function LikeButton(props) {
    const { post , didPerformLike } = props
    const likes = post.likes ? post.likes : 0


    const handleLikeBackendEvent = (response , status) => {
        console.log(response , status)
        if ((status === 200 || status === 201) && didPerformLike) {
            didPerformLike(response , status)
        }
    }

    const handleClick = (event) => {
        event.preventDefault()
        apiLikePost(post.id , handleLikeBackendEvent)
    }
    if (post.is_liked === true) {
        return  <a className="like" onClick={handleClick}><i  style={{color : "#007bff"}} className="fa fa-thumbs-o-up black"></i></a>
    } else {
        return  <a className="like" onClick={handleClick}><i className="fa fa-thumbs-o-up black"></i></a>
    }

}