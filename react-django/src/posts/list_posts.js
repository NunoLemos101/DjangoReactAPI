import React , { useEffect , useState } from 'react'
import { apiPostList } from './api_requests'
import { Post } from './post'

export function PostsList(props) {
    const [postsInit, setPostInit] = useState([])
    const [posts, setPosts] = useState([])
    const [nextUrl, setNextUrl] = useState(null)
    const [postsDidSet, setPostsDidSet] = useState(false)
    useEffect(()=> {
      const final = [...props.newPosts].concat(postsInit)
      if (final.length !== posts.length) {
        setPosts(final)
      }
    }, [props.newPosts, posts , postsInit])

    useEffect(() => {
      if (postsDidSet === false) {
        const handlePostListLookup = (response, status) => {
          if (status === 200) {
            setNextUrl(response.next)
            setPostInit(response.results)
            setPostsDidSet(true)
          } else {
            alert("There was an error")
          }
        }
        apiPostList(handlePostListLookup)
      }
    }, [postsInit, postsDidSet, setPostsDidSet , props.username])

    const handleLoadNext = (event) => {
      event.preventDefault();
      if (nextUrl !== null) {
        const handleLoadNextResponse = (response, status) =>{
          if (status === 200) {
            setNextUrl(response.next)
            console.log("Next" , response.next)
            const newPosts = [...posts].concat(response.results)
            setPostInit(newPosts)
            setPosts(newPosts)
          } else {
            alert("There was an error")
          }
        }
        apiPostList(handleLoadNextResponse, nextUrl)
      }
    }
    console.log(posts)

    return <React.Fragment>{posts.map((item, index)=> {
       
        return <Post post={item} key={index}/>

    })}
    {nextUrl !== null && <button onClick={handleLoadNext} className='btn btn-outline-primary'>Load next</button>}
    </React.Fragment>
  }