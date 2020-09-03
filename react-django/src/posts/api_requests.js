import { getApiJsonData } from '../backend'

export function apiPostList(callback , nextUrl) {
    let endpoint = '/posts/'
    if (nextUrl !== null && nextUrl !== undefined) {
        endpoint = nextUrl.replace("http://127.0.0.1:8000/api" , "")
    }
    getApiJsonData("GET" , endpoint , callback)
}

export function apiPostCreate(postData , callback) {
    const data = {title : postData.title , content : postData.content}
    getApiJsonData('POST' , '/posts/create/' , callback , data)
}

export function apiSingleProfile(callback , username) {
    let endpoint = `/profile/${username}`
    getApiJsonData("GET" , endpoint , callback)
}

export function apiMyProfile(method , callback , data) {
    if (method === "GET") {
        getApiJsonData("GET" , "/myprofile/settings/" , callback)
    } else if (method === "POST") {
        getApiJsonData("POST" , "/myprofile/settings/" , callback , data)
    }
}

export function apiFollowRequest(profileId , callback) {
    let endpoint = '/profile-follow/'
    const data = {receiver_id : profileId}
    getApiJsonData("POST" , endpoint , callback , data)
}

export function apiLikePost(postId , callback) {
    const data = {id : postId}
    getApiJsonData('POST' , '/posts/like/' , callback , data)
}

export function apiGetNotificationNumber(callback) {
    getApiJsonData('GET' , '/notification-count/' , callback)
}