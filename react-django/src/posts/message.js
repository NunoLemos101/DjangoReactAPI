import React , { useState , useEffect } from 'react';
import { apiGetPrivateMessages } from './api_requests'

export function Message(props) {
    const [privateMessages , setPrivateMessages] = useState([]) 

    useEffect(() => {
      const handlePrivateMessagesLookup = (response , status) => {
        if (status === 200 || status === 201) {
          setPrivateMessages(response)
          console.log(response)
        }
      }

      apiGetPrivateMessages(handlePrivateMessagesLookup , props.anotheruser)
    } , [])  

    return  <div>
            <article class="media content-section">
                    <div class="media">
                        <a href="#"><img class="rounded-circle article-img ml-4" src="http://127.0.0.1:8000/media/profile_pics/fe.jpg"></img></a><p class="mt-3">Logged in as</p><p style={{opacity : "0%"}} >..</p><a class="mt-3" href="#">admin</a>
                    </div>
            </article>     
            <div className="all-messages-overflow">

                    <div class="mesgs">
          
            <div class="incoming_msg">
              <div class="incoming_msg_img"><img style={{maxWidth : "100%"}} className="bord-2" src="http://127.0.0.1:8000/media/profile_pics/fe.jpg" alt="sunil"></img> 
           </div>
              <div class="received_msg">
                <div class="received_withd_msg">
                  <p>Test which is a new approach to have all
                    solutions</p>
                  <span class="time_date"> 11:01 AM    |    June 9</span></div>
              </div>
            </div>
            <div class="outgoing_msg">
              <div  class="sent_msg">
                <p style={{textAlign : "right"}}>Test which is a new approach to have all
                  solutions</p>
                <span class="time_date"> 11:01 AM    |    June 9</span> </div>
            </div>

            </div>
          </div>
          <div class="type_msg">
            <div class="input_msg_write">
              <input type="text" class="write_msg" placeholder="Type a message" />
              <button class="msg_send_btn" type="button"><i class="fa fa-paper-plane-o" aria-hidden="true"></i></button>
            </div>
          </div>
        </div>
                
}

