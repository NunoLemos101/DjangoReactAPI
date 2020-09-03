import React , {useState , useEffect} from 'react'
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { apiMyProfile } from './api_requests'
import { getCookie } from '../backend/lookup'

export function ProfileSettingsForm(props) {
    const [profileData , setProfileData] = useState([])   
    const inputUsernameRef = React.createRef()
    const inputBiographyRef = React.createRef()
    const inputFirstNameRef = React.createRef()
    const inputLastNameRef = React.createRef()
    const inputEmailAddressRef = React.createRef()
    const inputImageRef = React.createRef()
    const modalRef = React.useRef(null)
    const [startTrueInput , setStartTrueInput] = useState(true)
    const [startFalseInput , setStartFalseInput] = useState(false)
    const [inputProfileStatus , setInputProfileStatus] = useState(null)
    const [image , setImage] = useState()
    const formData = new FormData



    const handleEditSubmit = (event) => {
        event.preventDefault()
        const handleProfileLookupAfterSubmit = (response , status) => {
            if (status === 200) {
                const tempData = [...props.profile].concat(response)
                setProfileData(tempData) 
            }
        }
        if (image !== null && image !== undefined) {
            formData.append('image' , image)
        }
        const csrftoken = getCookie('csrftoken')  
        formData.append('username' , inputUsernameRef.current.value)
        formData.append('biography' , inputBiographyRef.current.value)
        formData.append('first_name' , inputFirstNameRef.current.value)
        formData.append('last_name' , inputLastNameRef.current.value)
        formData.append('email_address' , inputEmailAddressRef.current.value)
        formData.append('isprivate' , inputProfileStatus)
        console.log(image)
        fetch("http://127.0.0.1:8000/api/myprofile/settings/" , {
            method : "POST",
            headers : {
        
                'X-CSRFToken': csrftoken
            },
            body : formData
        })
        .then(() => {
            apiMyProfile("GET" , handleProfileLookupAfterSubmit)
            modalRef.current.click()
        })
        .catch(error => console.log(error))
    }
    
    useEffect(() => {
        const handleProfileLookup = (response , status) => {
            if (status === 200 || 201) {
                const tempData = [...props.profile].concat(response)
                setProfileData(tempData)
                
            }
        }
        apiMyProfile("GET" , handleProfileLookup)
    } , [])  

    const startTruehandleChange = (event) => {
        setStartTrueInput(event.target.checked)
        setStartFalseInput(event.target.checked)
        setInputProfileStatus(event.target.checked)
        console.log(event.target.checked)
    }

    const startFalseHandleChange = (event) => {
        setStartFalseInput(event.target.checked)
        setStartTrueInput(event.target.checked)
        setInputProfileStatus(event.target.checked)
        console.log(event.target.checked)
    }

    console.log(profileData)
    return <React.Fragment>{profileData.map((item , index) => {
        return <div key={index} className="content-section">
                <div className="media">
                    <img className="rounded-circle account-img" src={item.image}></img>
                    
                    <div className="media-body">
                    <h2 className="account-heading article-title">{item.user.username}</h2>
                    <span>
                        <a href="#" style={{display : "inline"}} className="article-title"><strong>{item.user.followers_count}</strong> Followers</a>
                        <span style={{opacity : "0"}}>...</span>
                        <a href="#" style={{display : "inline"}} className="article-title"><strong>{item.user.following_count}</strong> Following</a>
                        <p className="text-secondary">{item.user.first_name} {item.user.last_name}</p>
                    </span>
                    </div>
                </div>
                <form method="POST" encType="multipart/form-data">
                    <fieldset className="form-group">
                    <legend className="border-bottom mb-4">Profile Info</legend>
                    <div className="form-group">
                            <label className="requiredField">Username</label>
                            <span className="asteriskField">*</span>
                            <input ref={inputUsernameRef} type="text" defaultValue={item.user.username} maxLength="20" className="textinput textInput form-control"></input>
                            <small className="form-text text-muted">Required. 20 characters or fewer. Letters, digits and @/./+/-/_ only.</small>
                            <small className="form-text text-muted">You can change your username only twice every 14 days.</small>         
                        </div>
                        <div className="form-group">
                            <label className="requiredField">Biography</label>
                            <textarea ref={inputBiographyRef} type="text" defaultValue={item.biography} maxLength="150" className="textinput textInput form-control"></textarea>
                            <small className="form-text text-muted">Not Required. 150 characters or fewer.</small>
                        </div>
                        <div className="form-group">
                            <label className="requiredField">First Name</label>
                            <input ref={inputFirstNameRef} type="text" defaultValue={item.user.first_name} maxLength="20" className="textinput textInput form-control"></input>
                            <small className="form-text text-muted">Not required. 20 characters or fewer. Letters only.</small>                              
                        </div>
                        <div className="form-group">
                            <label className="requiredField">Last Name</label>
                            <input ref={inputLastNameRef} type="text" defaultValue={item.user.last_name} maxLength="20" className="textinput textInput form-control"></input>
                            <small className="form-text text-muted">Not required. 20 characters or fewer. Letters only.</small>                              
                        </div> 
                        <div className="form-group">
                            <label className="requiredField">Email<span className="asteriskField">*</span></label>
                            <input ref={inputEmailAddressRef} type="email" defaultValue={item.user.email_address} className="emailinput form-control"></input>
                        </div>
                        <div className="form-group">
                            <input ref={inputImageRef} onChange={(event) => setImage(event.target.files[0])} type="file"></input>
                        </div>
                        
                            { item.isPrivate ? <FormControlLabel
                               control={<Switch id="switch" checked={startTrueInput} onChange={startTruehandleChange} name="checkedPrivate" />}
                               label="Private"/> : <FormControlLabel
                               control={<Switch id="switch" checked={startFalseInput} onChange={startFalseHandleChange} name="checkedPrivate" />}
                               label="Private"/>}
                        

                    </fieldset>
                    <div className="form-group">
                        <button className="btn btn-outline-success" onClick={handleEditSubmit}>Update</button>
                        <a ref={modalRef} href="#myModal"  data-toggle="modal" className="d-none"></a>
                    </div>
                </form>
           </div>
    
    })}
    </React.Fragment>
}
