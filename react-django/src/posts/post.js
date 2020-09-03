import React, { useState } from 'react'
import { LikeButton } from './like_button'
import { BlueLikeDisplay } from './blue_like_display'

export function Post(props) { 
    const { post } = props
    const [likePost , setLikePost] = useState(props.post ? props.post : null)

    const handlePerformLike = (newLikePost , status) => {
        if (status === 200) {
            setLikePost(newLikePost)
        }
    }
    const userProfileUrl =  `/profile/${post.author.username}`
    const titleUrl = `/post/${post.id}`
    var isoDate = new Date(post.date_posted)
    return  <li>
                <div className="media content-section mt-3" >
                    <a href={userProfileUrl}><img className="rounded-circle article-img" src={`http://127.0.0.1:8000${post.image}`}></img></a>
                    <div className='media-body'>
                        <div className='article-metadata'>
                            <a className="mr-2" href={userProfileUrl}> { post.author.username } </a>
                            <small className="text-muted">{ isoDate.toDateString()} { isoDate.getHours()}:{isoDate.getMinutes()} </small>
                        </div>
                        <h2>    
                            <a className="article-title" href={titleUrl}> {post.title } </a>
                        </h2>
                            <p className="article-content"> {post.content } </p> 
                        <hr></hr>                            
                          <LikeButton post={likePost} didPerformLike={handlePerformLike}/>
                          <a className="like"><i style={{ marginBottom:"10px", }} className="fa fa-twitter black"></i></a>
                          <BlueLikeDisplay post={likePost} didPerformLike={handlePerformLike}/>
                    
                    </div>
                </div>
            </li>
    }