import React , {useEffect , useState} from 'react'
import { apiPostCreate } from './api_requests'

export function PostForm(props) {
    const {didPost} = props
    const isoDate = new Date()
    const inputTitleRef = React.createRef()
    const inputContentRef = React.createRef()
    const [alertClassName , setAlertClassName] = useState(null)
    const [alertMessage , setAlertMessage] = useState(null)
    const [alertType , setAlertType] = useState(null)
    
    const handleBackendUpdate = (response , status) => {
        if (status === 201) {
            didPost(response)
            setAlertType("success")
            setAlertMessage("Post created successfully!")
            setAlertClassName("alert alert-success")
        
        } else if (status === 400) {
            setAlertType("error")
            setAlertMessage("The form is wrong. Please make sure there is no camps empty.")
            setAlertClassName("alert alert-danger")            
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        const formatedData = {title : inputTitleRef.current.value , content : inputContentRef.current.value}
        apiPostCreate(formatedData , handleBackendUpdate)
        if (inputTitleRef.current.value !== "" && inputContentRef.current.value !== "") {
            inputTitleRef.current.value = null
            inputContentRef.current.value = null
        }
    }

    return <> { alertType && <PostAlert alertType={alertType} alertMessage={alertMessage} alertClassName={alertClassName}/>}
                    
            <form onSubmit={handleSubmit} className="media content-section mt-3">
                <a href="#"><img className="rounded-circle article-img" src={`http://127.0.0.1:8000${props.imageurl}`}></img></a>
                <div className="media-body">
                    <div className="article-metadata">
                            <a className="mr-2" href={`http://127.0.0.1:8000/profile/${props.username}`}>{props.username}</a>
                            <small className="text-muted">{ isoDate.toDateString()} { isoDate.getHours()}:{isoDate.getMinutes()}</small>
                    </div>
                    <h2>
                        <input ref={inputTitleRef} style={{fontSize : "30px" , height : "39px" , color : "#444444" , fontWeight : 600}} className="form-control" type="text"></input>
                    </h2>
                        <textarea ref={inputContentRef} style={{height : "89px"}} className="form-control"></textarea>                     
                    <hr></hr>
                    <a className="like"><i style={{marginBottom : "15px"}} className="fa fa-thumbs-o-up black"></i></a>
                    <a className="like"><i className="fa fa-twitter black"></i></a>
                    <span style={{paddingTop : "5px" , paddingBottom : "3px"}} className="blue-background">X people liked this post</span>
                    <button type="submit" style={{paddingTop : "3px" , paddingBottom : "3px" , float : "right" , cursor : "pointer" , marginTop : "5px" , color : "white"}} className="btn btn-primary">Post</button>                     
                </div>
            </form>
            </>
}

function PostAlert(props) {
    const {alertType , alertMessage , alertClassName} = props
    
    return <div  className={alertClassName} style={{marginTop : "15px"}} role="alert">{alertMessage}</div>
}

