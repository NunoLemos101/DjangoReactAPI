import React from 'react'

export function BlueLikeDisplay(props) {
    const { post , didPerformLike } = props
    const likes = post.likes ? post.likes : 0
    return <span style={{paddingTop : "5px" , paddingBottom : "3px"}} className="blue-background">{likes} people liked this post</span>
}