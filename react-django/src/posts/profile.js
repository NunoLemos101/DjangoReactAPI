import React , { useEffect , useState } from 'react'
import { apiSingleProfile } from './api_requests'
import { FollowUnfollowButton } from './follow_button'

export function Profile(props) {
    const [profileItSelf , setProfileItSelf] = useState([])
    const handlePerformFollow = (newFollowUnfollow , status) => {
      if (status === 200 || status === 201) {
        const sideStepMapError = [newFollowUnfollow]
        setProfileItSelf(sideStepMapError)
        console.log("setProfileItSelf")
        
      }
    }
    useEffect(() => {
        const handleSingleProfileLookup = (response , status) => {
            if (status === 200) {
                const tempData = [...props.profile].concat(response)
                setProfileItSelf(tempData)
                
            }
        }
        
        apiSingleProfile(handleSingleProfileLookup , `${props.username}/`)
        
    } , [props.profile])
    
    return <React.Fragment>{profileItSelf.map((item, index)=> {
        return  <div key={index} className="content-section">
                  <div className="media">
                  <img className="rounded-circle account-img" src={item.image}></img>
                    <div className="media-body">
                    <h2  className="account-heading">{ item.user.username } <FollowUnfollowButton currentState={item.follow_status} didPerformFollow={handlePerformFollow} profileId={item.user.id}/> </h2>
                        <span>
                          <a style={{display:"inline"}} className="article-title" href="#" ><strong>{item.user.followers_count}</strong> followers</a>
                          <span style={{opacity:"0%"}}>...</span>
                          <a style={{display:"inline"}} className="article-title" href="#" ><strong>{item.user.following_count}</strong> following</a>
                          <p className="text-secondary">{item.user.first_name} {item.user.last_name}</p>
                        </span>
                    </div>
                  </div>
                </div>
      })}
      </React.Fragment>
    
}