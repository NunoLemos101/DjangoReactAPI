(this["webpackJsonpreact-django"]=this["webpackJsonpreact-django"]||[]).push([[0],{54:function(e,t,a){e.exports=a(64)},59:function(e,t,a){},64:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(13),c=a.n(l);a(59),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var s=a(12),o=a(6);function i(e){var t=null;if(document.cookie&&""!==document.cookie)for(var a=document.cookie.split(";"),n=0;n<a.length;n++){var r=a[n].trim();if(r.substring(0,e.length+1)===e+"="){t=decodeURIComponent(r.substring(e.length+1));break}}return t}function m(e,t,a,n){var r;n&&(r=JSON.stringify(n));var l=new XMLHttpRequest,c="http://127.0.0.1:8000/api".concat(t);l.responseType="json";var s=i("csrftoken");l.open(e,c),l.setRequestHeader("Content-Type","application/json"),s&&(l.setRequestHeader("HTTP_X_REQUESTED_WITH","XMLHttpRequest"),l.setRequestHeader("X-Requested-With","XMLHttpRequest"),l.setRequestHeader("X-CSRFToken",s)),l.onload=function(){403===l.status&&(window.location.href="login/?showLoginRequired=true"),a(l.response,l.status)},l.onerror=function(e){a({message:"An error Occurred"},400)},l.send(r)}function d(e,t){var a="/posts/";null!==t&&void 0!==t&&(a=t.replace("http://127.0.0.1:8000/api","")),m("GET",a,e)}function u(e,t,a){"GET"===e?m("GET","/myprofile/settings/",t):"POST"===e&&m("POST","/myprofile/settings/",t,a)}function f(e){m("GET","/notification-count/",e)}function p(e,t){m("POST","/follow-notifications-action/",e,t)}function E(e){var t=e.post,a=e.didPerformLike,n=(t.likes&&t.likes,function(e,t){console.log(e,t),200!==t&&201!==t||!a||a(e,t)}),l=function(e){var a;e.preventDefault(),a=t.id,m("POST","/posts/like/",n,{id:a})};return!0===t.is_liked?r.a.createElement("a",{className:"like",onClick:l},r.a.createElement("i",{style:{color:"#007bff"},className:"fa fa-thumbs-o-up black"})):r.a.createElement("a",{className:"like",onClick:l},r.a.createElement("i",{className:"fa fa-thumbs-o-up black"}))}function g(e){var t=e.post,a=(e.didPerformLike,t.likes?t.likes:0);return r.a.createElement("span",{style:{paddingTop:"5px",paddingBottom:"3px"},className:"blue-background"},a," people liked this post")}function h(e){var t=e.post,a=Object(n.useState)(e.post?e.post:null),l=Object(o.a)(a,2),c=l[0],s=l[1],i=function(e,t){200===t&&s(e)},m="/profile/".concat(t.author.username),d="/post/".concat(t.id),u=new Date(t.date_posted);return r.a.createElement("li",null,r.a.createElement("div",{className:"media content-section mt-3"},r.a.createElement("a",{href:m},r.a.createElement("img",{className:"rounded-circle article-img",src:"http://127.0.0.1:8000".concat(t.image)})),r.a.createElement("div",{className:"media-body"},r.a.createElement("div",{className:"article-metadata"},r.a.createElement("a",{className:"mr-2",href:m}," ",t.author.username," "),r.a.createElement("small",{className:"text-muted"},u.toDateString()," ",u.getHours(),":",u.getMinutes()," ")),r.a.createElement("h2",null,r.a.createElement("a",{className:"article-title",href:d}," ",t.title," ")),r.a.createElement("p",{className:"article-content"}," ",t.content," "),r.a.createElement("hr",null),r.a.createElement(E,{post:c,didPerformLike:i}),r.a.createElement("a",{className:"like"},r.a.createElement("i",{style:{marginBottom:"10px"},className:"fa fa-twitter black"})),r.a.createElement(g,{post:c,didPerformLike:i}))))}function b(e){var t=Object(n.useState)([]),a=Object(o.a)(t,2),l=a[0],c=a[1],i=Object(n.useState)([]),m=Object(o.a)(i,2),u=m[0],f=m[1],p=Object(n.useState)(null),E=Object(o.a)(p,2),g=E[0],b=E[1],N=Object(n.useState)(!1),y=Object(o.a)(N,2),v=y[0],x=y[1];Object(n.useEffect)((function(){var t=Object(s.a)(e.newPosts).concat(l);t.length!==u.length&&f(t)}),[e.newPosts,u,l]),Object(n.useEffect)((function(){if(!1===v){d((function(e,t){200===t?(b(e.next),c(e.results),x(!0)):alert("There was an error")}))}}),[l,v,x,e.username]);return console.log(u),r.a.createElement(r.a.Fragment,null,u.map((function(e,t){return r.a.createElement(h,{post:e,key:t})})),null!==g&&r.a.createElement("button",{onClick:function(e){if(e.preventDefault(),null!==g){d((function(e,t){if(200===t){b(e.next),console.log("Next",e.next);var a=Object(s.a)(u).concat(e.results);c(a),f(a)}else alert("There was an error")}),g)}},className:"btn btn-outline-primary"},"Load next"))}function N(e){var t=e.currentState,a=e.profileId,n=e.didPerformFollow,l=function(e,t){201!==t&&200!==t||!n||n(e,t)},c=function(e){e.preventDefault(),function(e,t){m("POST","/profile-follow/",t,{receiver_id:e})}(a,l)};return"sent"===t?r.a.createElement("span",{style:{cursor:"pointer"},onClick:c,className:"following-button ml-3"},"Follow request sent"):"not_sent"===t?r.a.createElement("span",{style:{cursor:"pointer"},onClick:c,className:"follow-button ml-3"},"Follow"):"following"===t?r.a.createElement("span",{style:{cursor:"pointer"},onClick:c,className:"following-button ml-3"},"Following"):"is_owner"===t?r.a.createElement("a",{href:"/my-profile/settings/",style:{cursor:"pointer"},className:"following-button ml-3"},"Settings"):void 0}function y(e){var t=Object(n.useState)([]),a=Object(o.a)(t,2),l=a[0],c=a[1],i=function(e,t){200!==t&&201!==t||(c([e]),console.log("setProfileItSelf"))};return Object(n.useEffect)((function(){var t,a;t=function(t,a){if(200===a){var n=Object(s.a)(e.profile).concat(t);c(n)}},a="".concat(e.username,"/"),m("GET","/profile/".concat(a),t)}),[e.profile]),r.a.createElement(r.a.Fragment,null,l.map((function(e,t){return r.a.createElement("div",{key:t,className:"content-section"},r.a.createElement("div",{className:"media"},r.a.createElement("img",{className:"rounded-circle account-img",src:e.image}),r.a.createElement("div",{className:"media-body"},r.a.createElement("h2",{className:"account-heading"},e.user.username," ",r.a.createElement(N,{currentState:e.follow_status,didPerformFollow:i,profileId:e.user.id})," "),r.a.createElement("span",null,r.a.createElement("a",{style:{display:"inline"},className:"article-title",href:"#"},r.a.createElement("strong",null,e.user.followers_count)," followers"),r.a.createElement("span",{style:{opacity:"0%"}},"..."),r.a.createElement("a",{style:{display:"inline"},className:"article-title",href:"#"},r.a.createElement("strong",null,e.user.following_count)," following"),r.a.createElement("p",{className:"text-secondary"},e.user.first_name," ",e.user.last_name)))))})))}var v=a(106),x=a(97);function w(e){var t=Object(n.useState)([]),a=Object(o.a)(t,2),l=a[0],c=a[1],m=r.a.createRef(),d=r.a.createRef(),f=r.a.createRef(),p=r.a.createRef(),E=r.a.createRef(),g=r.a.createRef(),h=r.a.useRef(null),b=Object(n.useState)(!0),N=Object(o.a)(b,2),y=N[0],w=N[1],k=Object(n.useState)(!1),O=Object(o.a)(k,2),j=O[0],_=O[1],S=Object(n.useState)(null),P=Object(o.a)(S,2),T=P[0],D=P[1],L=Object(n.useState)(),C=Object(o.a)(L,2),R=C[0],F=C[1],B=new FormData,I=function(t){t.preventDefault();var a=function(t,a){if(200===a){var n=Object(s.a)(e.profile).concat(t);c(n)}};null!==R&&void 0!==R&&B.append("image",R);var n=i("csrftoken");B.append("username",m.current.value),B.append("biography",d.current.value),B.append("first_name",f.current.value),B.append("last_name",p.current.value),B.append("email_address",E.current.value),B.append("isprivate",T),console.log(R),fetch("http://127.0.0.1:8000/api/myprofile/settings/",{method:"POST",headers:{"X-CSRFToken":n},body:B}).then((function(){u("GET",a),h.current.click()})).catch((function(e){return console.log(e)}))};Object(n.useEffect)((function(){u("GET",(function(t,a){var n=Object(s.a)(e.profile).concat(t);c(n)}))}),[]);var q=function(e){w(e.target.checked),_(e.target.checked),D(e.target.checked),console.log(e.target.checked)},M=function(e){_(e.target.checked),w(e.target.checked),D(e.target.checked),console.log(e.target.checked)};return console.log(l),r.a.createElement(r.a.Fragment,null,l.map((function(e,t){return r.a.createElement("div",{key:t,className:"content-section"},r.a.createElement("div",{className:"media"},r.a.createElement("img",{className:"rounded-circle account-img",src:e.image}),r.a.createElement("div",{className:"media-body"},r.a.createElement("h2",{className:"account-heading article-title"},e.user.username),r.a.createElement("span",null,r.a.createElement("a",{href:"#",style:{display:"inline"},className:"article-title"},r.a.createElement("strong",null,e.user.followers_count)," Followers"),r.a.createElement("span",{style:{opacity:"0"}},"..."),r.a.createElement("a",{href:"#",style:{display:"inline"},className:"article-title"},r.a.createElement("strong",null,e.user.following_count)," Following"),r.a.createElement("p",{className:"text-secondary"},e.user.first_name," ",e.user.last_name)))),r.a.createElement("form",{method:"POST",encType:"multipart/form-data"},r.a.createElement("fieldset",{className:"form-group"},r.a.createElement("legend",{className:"border-bottom mb-4"},"Profile Info"),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{className:"requiredField"},"Username"),r.a.createElement("span",{className:"asteriskField"},"*"),r.a.createElement("input",{ref:m,type:"text",defaultValue:e.user.username,maxLength:"20",className:"textinput textInput form-control"}),r.a.createElement("small",{className:"form-text text-muted"},"Required. 20 characters or fewer. Letters, digits and @/./+/-/_ only."),r.a.createElement("small",{className:"form-text text-muted"},"You can change your username only twice every 14 days.")),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{className:"requiredField"},"Biography"),r.a.createElement("textarea",{ref:d,type:"text",defaultValue:e.biography,maxLength:"150",className:"textinput textInput form-control"}),r.a.createElement("small",{className:"form-text text-muted"},"Not Required. 150 characters or fewer.")),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{className:"requiredField"},"First Name"),r.a.createElement("input",{ref:f,type:"text",defaultValue:e.user.first_name,maxLength:"20",className:"textinput textInput form-control"}),r.a.createElement("small",{className:"form-text text-muted"},"Not required. 20 characters or fewer. Letters only.")),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{className:"requiredField"},"Last Name"),r.a.createElement("input",{ref:p,type:"text",defaultValue:e.user.last_name,maxLength:"20",className:"textinput textInput form-control"}),r.a.createElement("small",{className:"form-text text-muted"},"Not required. 20 characters or fewer. Letters only.")),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{className:"requiredField"},"Email",r.a.createElement("span",{className:"asteriskField"},"*")),r.a.createElement("input",{ref:E,type:"email",defaultValue:e.user.email_address,className:"emailinput form-control"})),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{ref:g,onChange:function(e){return F(e.target.files[0])},type:"file"})),e.isPrivate?r.a.createElement(x.a,{control:r.a.createElement(v.a,{id:"switch",checked:y,onChange:q,name:"checkedPrivate"}),label:"Private"}):r.a.createElement(x.a,{control:r.a.createElement(v.a,{id:"switch",checked:j,onChange:M,name:"checkedPrivate"}),label:"Private"})),r.a.createElement("div",{className:"form-group"},r.a.createElement("button",{className:"btn btn-outline-success",onClick:I},"Update"),r.a.createElement("a",{ref:h,href:"#myModal","data-toggle":"modal",className:"d-none"}))))})))}function k(e){return r.a.createElement("form",{id:"search_bar_form",style:{textAlign:"right"},className:"blue-background-search"},r.a.createElement("a",{type:"button","data-toggle":"modal","data-target":"#exampleModal",className:"fa fa-plus-circle plus-hover"}),r.a.createElement("a",{type:"button",style:{marginLeft:"15px"},className:"fa fa-search search_icon"}),r.a.createElement("input",{id:"search_bar_input",className:"search-bar",type:"search",placeholder:" Search...","aria-label":"Search"}))}function O(e){var t=e.didPost,a=new Date,l=r.a.createRef(),c=r.a.createRef(),s=Object(n.useState)(null),i=Object(o.a)(s,2),d=i[0],u=i[1],f=Object(n.useState)(null),p=Object(o.a)(f,2),E=p[0],g=p[1],h=Object(n.useState)(null),b=Object(o.a)(h,2),N=b[0],y=b[1],v=function(e,a){201===a?(t(e),y("success"),g("Post created successfully!"),u("alert alert-success")):400===a&&(y("error"),g("The form is wrong. Please make sure there is no camps empty."),u("alert alert-danger"))};return r.a.createElement(r.a.Fragment,null," ",N&&r.a.createElement(j,{alertType:N,alertMessage:E,alertClassName:d}),r.a.createElement("form",{onSubmit:function(e){e.preventDefault();var t,a={title:l.current.value,content:c.current.value};m("POST","/posts/create/",v,{title:(t=a).title,content:t.content}),""!==l.current.value&&""!==c.current.value&&(l.current.value=null,c.current.value=null)},className:"media content-section mt-3"},r.a.createElement("a",{href:"#"},r.a.createElement("img",{className:"rounded-circle article-img",src:"http://127.0.0.1:8000".concat(e.imageurl)})),r.a.createElement("div",{className:"media-body"},r.a.createElement("div",{className:"article-metadata"},r.a.createElement("a",{className:"mr-2",href:"http://127.0.0.1:8000/profile/".concat(e.username)},e.username),r.a.createElement("small",{className:"text-muted"},a.toDateString()," ",a.getHours(),":",a.getMinutes())),r.a.createElement("h2",null,r.a.createElement("input",{ref:l,style:{fontSize:"30px",height:"39px",color:"#444444",fontWeight:600},className:"form-control",type:"text"})),r.a.createElement("textarea",{ref:c,style:{height:"89px"},className:"form-control"}),r.a.createElement("hr",null),r.a.createElement("a",{className:"like"},r.a.createElement("i",{style:{marginBottom:"15px"},className:"fa fa-thumbs-o-up black"})),r.a.createElement("a",{className:"like"},r.a.createElement("i",{className:"fa fa-twitter black"})),r.a.createElement("span",{style:{paddingTop:"5px",paddingBottom:"3px"},className:"blue-background"},"X people liked this post"),r.a.createElement("button",{type:"submit",style:{paddingTop:"3px",paddingBottom:"3px",float:"right",cursor:"pointer",marginTop:"5px",color:"white"},className:"btn btn-primary"},"Post"))))}function j(e){e.alertType;var t=e.alertMessage,a=e.alertClassName;return r.a.createElement("div",{className:a,style:{marginTop:"15px"},role:"alert"},t)}var _=a(98),S=a(31),P=a.n(S);function T(e){var t=Object(n.useState)([]),a=Object(o.a)(t,2),l=a[0],c=a[1];return setInterval((function(){f((function(e,t){200===t&&(console.log(e.notifications),c(e.notifications))}))}),1e4),Object(n.useEffect)((function(){f((function(e,t){200===t&&(console.log(e.notifications),c(e.notifications))}))}),[]),!0===e.isowner||"True"===e.isowner?r.a.createElement("div",{className:"content-section"},r.a.createElement("h3",null,"My Sidebar"),r.a.createElement("p",{className:"text-muted"},"You can put any information here you'd like."),r.a.createElement("ul",{className:"list-group"},r.a.createElement("a",{href:"/profile/".concat(e.username),style:{textDecoration:"None"},className:"list-group-item sidebar-selected"},"View Profile"),r.a.createElement("a",{href:"/my-profile/settings/",style:{textDecoration:"None"},className:"list-group-item sidebar-item"},"Edit Profile"),r.a.createElement("a",{href:"/",style:{textDecoration:"None"},className:"list-group-item sidebar-item"},"Change Password")),r.a.createElement("br",null)):!1===e.isowner||"False"===e.isowner?r.a.createElement("div",{className:"content-section"},r.a.createElement("h3",null,"My Sidebar"),r.a.createElement("p",{className:"text-muted"},"You can put any information here you'd like."),r.a.createElement("ul",{className:"list-group"},r.a.createElement("a",{href:"/my-profile/settings/",style:{textDecoration:"None"},className:"list-group-item sidebar-item"},"Profile setttings"),r.a.createElement("a",{href:"/",style:{textDecoration:"None"},className:"list-group-item sidebar-item"},"Latest Posts"),r.a.createElement("a",{href:"/notifications",style:{textDecoration:"None"},className:"list-group-item sidebar-item"},"Notifications",r.a.createElement("span",{className:"ml-2"},r.a.createElement(_.a,{badgeContent:l.toString(),color:"secondary"},r.a.createElement(P.a,{style:{color:"black"}})))),r.a.createElement("a",{href:"/messages",style:{textDecoration:"None"},className:"list-group-item sidebar-item"},"Messages")),r.a.createElement("br",null)):"profile-settings"===e.view?r.a.createElement("div",{className:"content-section"},r.a.createElement("h3",null,"My Sidebar"),r.a.createElement("p",{className:"text-muted"},"You can put any information here you'd like."),r.a.createElement("ul",{className:"list-group"},"viewmyprofile"==e.selected?r.a.createElement("a",{href:"/profile/".concat(e.username),style:{textDecoration:"None"},className:"list-group-item sidebar-selected"},"View Profile"):r.a.createElement("a",{href:"/profile/".concat(e.username),style:{textDecoration:"None"},className:"list-group-item sidebar-item"},"View Profile"),"editprofile"==e.selected?r.a.createElement("a",{href:"/my-profile/settings/",style:{textDecoration:"None"},className:"list-group-item sidebar-selected"},"Edit Profile"):r.a.createElement("a",{href:"/my-profile/settings/",style:{textDecoration:"None"},className:"list-group-item sidebar-item"},"Edit Profile"),"changePassword"==e.selected?r.a.createElement("a",{href:"/",style:{textDecoration:"None"},className:"list-group-item sidebar-selected"},"Change Password"):r.a.createElement("a",{href:"/",style:{textDecoration:"None"},className:"list-group-item sidebar-item"},"Change Password")),r.a.createElement("br",null)):"home"===e.view?r.a.createElement("div",{className:"content-section"},r.a.createElement("h3",null,"My Sidebar"),r.a.createElement("p",{className:"text-muted"},"You can put any information here you'd like."),r.a.createElement("ul",{className:"list-group"},"profile"==e.selected?r.a.createElement("a",{href:"/my-profile/settings/",style:{textDecoration:"None"},className:"list-group-item sidebar-selected"},"Profile setttings"):r.a.createElement("a",{href:"/my-profile/settings/",style:{textDecoration:"None"},className:"list-group-item sidebar-item"},"Profile setttings"),"latestPosts"==e.selected?r.a.createElement("a",{href:"/",style:{textDecoration:"None"},className:"list-group-item sidebar-selected"},"Latest Posts"):r.a.createElement("a",{href:"/",style:{textDecoration:"None"},className:"list-group-item sidebar-item"},"Latest Posts"),"notifications"==e.selected?r.a.createElement("a",{href:"/notifications",style:{textDecoration:"None"},className:"list-group-item sidebar-selected"},"Notifications"):r.a.createElement("a",{href:"/notifications",style:{textDecoration:"None"},className:"list-group-item sidebar-item"},"Notifications",r.a.createElement("span",{className:"ml-2"},r.a.createElement(_.a,{badgeContent:l.toString(),color:"secondary"},r.a.createElement(P.a,{style:{color:"black"}})))),"messages"==e.selected?r.a.createElement("a",{href:"/messages",style:{textDecoration:"None"},className:"list-group-item sidebar-selected"},"Messages"):r.a.createElement("a",{href:"/messages",style:{textDecoration:"None"},className:"list-group-item sidebar-item"},"Messages")),r.a.createElement("br",null)):void 0}var D=a(43),L=a(99),C=a(107),R=a(105),F=a(100),B=a(25),I=a(104),q=a(101);function M(e){var t=e.children,a=e.value,n=e.index,l=Object(D.a)(e,["children","value","index"]);return r.a.createElement("div",Object.assign({role:"tabpanel",hidden:a!==n,id:"simple-tabpanel-".concat(n),"aria-labelledby":"simple-tab-".concat(n)},l),a===n&&r.a.createElement(I.a,{p:3},r.a.createElement(B.a,null,t)))}function G(e){return{id:"simple-tab-".concat(e),"aria-controls":"simple-tabpanel-".concat(e)}}var H=Object(L.a)((function(e){return{root:{flexGrow:1,backgroundColor:e.palette.background.paper}}}));function V(){var e=H(),t=r.a.useState(0),a=Object(o.a)(t,2),l=a[0],c=a[1],s=Object(n.useState)([]),i=Object(o.a)(s,2),d=i[0],u=i[1],f=Object(n.useState)([]),E=Object(o.a)(f,2),g=(E[0],E[1]),h=Object(n.useState)([]),b=Object(o.a)(h,2),N=b[0],y=b[1],v=Object(n.useState)(null),x=Object(o.a)(v,2),w=x[0],k=x[1],O=function(e,t){c(t)},j=function(e,t){t.preventDefault();console.log(e),p((function(e,t){201!==t&&200!==t||(k(e),console.log(e))}),{id:e,action:"deny"}),k([])},_=function(e,t){t.preventDefault();p((function(e,t){201!==t&&200!==t||(k(e),console.log(e))}),{id:e,action:"accept"}),k([])};Object(n.useEffect)((function(){m("GET","/follow-notifications-data/",(function(e,t){200===t&&(u(e),console.log(e),y(e))})),function(e){m("GET","/like-notifications-data/",e)}((function(e,t){200===t&&(g(e),console.log(e),y((function(t){return t.concat(e)})))})),console.log(d)}),[w]),console.log(N);var S=0;return N.sort((function(e,t){return-e.timestamp.localeCompare(t.timestamp)})),N.map((function(t,a){var n;return S+=1,"follow"===t.notification_type?n=!0===t.follow_request.accepted?"follow-accepted":"follow":"like"===t.notification_type&&(n="like"),r.a.createElement("div",{key:a,className:e.root},S<2?r.a.createElement(C.a,{style:{backgroundColor:"#007bff"},position:"static"},r.a.createElement(R.a,{value:l,onChange:O,"aria-label":"simple tabs example"},r.a.createElement("span",{className:"mt-2 mr-1"}),r.a.createElement(F.a,Object.assign({label:"Follow Notifications "},G(0))),r.a.createElement(F.a,Object.assign({label:"Like Notifications"},G(1))))):void 0,"follow"===n&&r.a.createElement(M,{style:{borderLeft:"1px solid #dddddd",borderRight:"1px solid #dddddd",borderBottom:"1px solid #dddddd"},value:l,index:0},r.a.createElement("a",{href:"/profile/".concat(t.sender.username)},r.a.createElement("img",{className:"bord",height:"50",width:"50",src:"http://127.0.0.1:8000".concat(t.sender_image)})),r.a.createElement("span",{className:"ml-1"},r.a.createElement("strong",null,r.a.createElement("a",{className:"name-link",href:"/profile/".concat(t.sender.username)},t.sender.username))," wants to follow you."),r.a.createElement("span",{style:{float:"right"}},r.a.createElement(q.a,{variant:"contained",onClick:function(e){return _(t.id,e)},color:"primary"},"Accept"),r.a.createElement(q.a,{style:{marginLeft:"10px"},onClick:function(e){return j(t.id,e)},variant:"contained",color:"secondary"},"Deny"))),"follow-accepted"===n&&r.a.createElement(M,{style:{borderLeft:"1px solid #dddddd",borderRight:"1px solid #dddddd",borderBottom:"1px solid #dddddd"},value:l,index:0},r.a.createElement("a",{href:"/profile/".concat(t.sender.username)},r.a.createElement("img",{className:"bord",height:"50",width:"50",src:"http://127.0.0.1:8000".concat(t.sender_image)})),r.a.createElement("span",{className:"ml-1"},r.a.createElement("strong",null,r.a.createElement("a",{className:"name-link",href:"/profile/".concat(t.sender.username)},t.sender.username))," is now following you."),r.a.createElement("span",{style:{float:"right"}})),"like"===n&&r.a.createElement(M,{style:{borderLeft:"1px solid #dddddd",borderRight:"1px solid #dddddd",borderBottom:"1px solid #dddddd"},value:l,index:0},r.a.createElement("a",{href:"/profile/".concat(t.sender.username)},r.a.createElement("img",{className:"bord",height:"50",width:"50",src:"http://127.0.0.1:8000".concat(t.sender_image)})),r.a.createElement("span",{className:"ml-1"},r.a.createElement("strong",null,r.a.createElement("a",{className:"name-link",href:"/profile/".concat(t.sender.username)},t.sender.username))," Liked ",r.a.createElement("a",{href:"/post/".concat(t.post.id)},"this")," post from you."),r.a.createElement("span",{style:{float:"right"}})),"follow"===n&&r.a.createElement(M,{style:{borderLeft:"1px solid #dddddd",borderRight:"1px solid #dddddd",borderBottom:"1px solid #dddddd"},value:l,index:1},r.a.createElement("a",{href:"/profile/".concat(t.sender.username)},r.a.createElement("img",{className:"bord",height:"50",width:"50",src:"http://127.0.0.1:8000".concat(t.sender_image)})),r.a.createElement("span",{className:"ml-1"},r.a.createElement("strong",null,r.a.createElement("a",{className:"name-link",href:"/profile/".concat(t.sender.username)},t.sender.username))," wants to follow you."),r.a.createElement("span",{style:{float:"right"}},r.a.createElement(q.a,{variant:"contained",onClick:function(e){return _(t.id,e)},color:"primary"},"Accept"),r.a.createElement(q.a,{style:{marginLeft:"10px"},onClick:function(e){return j(t.id,e)},variant:"contained",color:"secondary"},"Deny"))),"follow-accepted"===n&&r.a.createElement(M,{style:{borderLeft:"1px solid #dddddd",borderRight:"1px solid #dddddd",borderBottom:"1px solid #dddddd"},value:l,index:1},r.a.createElement("a",{href:"/profile/".concat(t.sender.username)},r.a.createElement("img",{className:"bord",height:"50",width:"50",src:"http://127.0.0.1:8000".concat(t.sender_image)})),r.a.createElement("span",{className:"ml-1"},r.a.createElement("strong",null,r.a.createElement("a",{className:"name-link",href:"/profile/".concat(t.sender.username)},t.sender.username))," is now following you."),r.a.createElement("span",{style:{float:"right"}})),"like"===n?r.a.createElement(M,{style:{borderLeft:"1px solid #dddddd",borderRight:"1px solid #dddddd",borderBottom:"1px solid #dddddd"},value:l,index:2},r.a.createElement("a",{href:"/profile/".concat(t.sender.username)},r.a.createElement("img",{className:"bord",height:"50",width:"50",src:"http://127.0.0.1:8000".concat(t.sender_image)})),r.a.createElement("span",{className:"ml-1"},r.a.createElement("strong",null,r.a.createElement("a",{className:"name-link",href:"/profile/".concat(t.sender.username)},t.sender.username))," Liked ",r.a.createElement("a",{href:"/post/".concat(t.post.id)},"this")," post from you."),r.a.createElement("span",{style:{float:"right"}})):void 0)}))}var X=a(42),A=a.n(X);function W(e){return r.a.createElement("div",{className:"all-messages-overflow"},r.a.createElement(A.a,{style:{fontSize:"300px"},className:"align-logo"}))}var Y=a(108),J=a(102),U=a(103),z=Object(L.a)((function(e){return{root:{width:"100%",maxWidth:360,backgroundColor:e.palette.background.paper}}}));function Q(e){z();var t=Object(n.useState)([]),a=Object(o.a)(t,2),l=a[0],c=a[1];Object(n.useEffect)((function(){m("GET","/latest-messages/",(function(e,t){200===t&&(console.log(e),c(e))}))}),[]);var s;return l.map((function(e,t){return s=!0===e.latest_message.last_message_from_loggedIn_user?"You: ".concat(e.latest_message.text):e.latest_message.text,r.a.createElement("a",{key:t,className:"name-link",href:"#"},r.a.createElement(Y.a,null,r.a.createElement("a",{href:"#"},r.a.createElement("img",{className:"bord",height:"65",width:"65",src:"http://127.0.0.1:8000".concat(e.image)})),r.a.createElement(J.a,{className:"ml-2",primary:e.user.username,secondary:s})),r.a.createElement(U.a,{variant:"inset",component:"li"}))}))}function $(e){return r.a.createElement("div",null,r.a.createElement("article",{class:"media content-section"},r.a.createElement("div",{class:"media"},r.a.createElement("a",{href:"#"},r.a.createElement("img",{class:"rounded-circle article-img ml-4",src:"http://127.0.0.1:8000/media/profile_pics/fe.jpg"})),r.a.createElement("p",{class:"mt-3"},"Logged in as"),r.a.createElement("p",{style:{opacity:"0%"}},".."),r.a.createElement("a",{class:"mt-3",href:"#"},"admin"))),r.a.createElement("div",{className:"all-messages-overflow"},r.a.createElement("div",{class:"mesgs"},r.a.createElement("div",{class:"incoming_msg"},r.a.createElement("div",{class:"incoming_msg_img"},r.a.createElement("img",{style:{maxWidth:"100%"},className:"bord-2",src:"http://127.0.0.1:8000/media/profile_pics/fe.jpg",alt:"sunil"})),r.a.createElement("div",{class:"received_msg"},r.a.createElement("div",{class:"received_withd_msg"},r.a.createElement("p",null,"Test which is a new approach to have all solutions"),r.a.createElement("span",{class:"time_date"}," 11:01 AM    |    June 9")))),r.a.createElement("div",{class:"outgoing_msg"},r.a.createElement("div",{class:"sent_msg"},r.a.createElement("p",{style:{textAlign:"right"}},"Test which is a new approach to have all solutions"),r.a.createElement("span",{class:"time_date"}," 11:01 AM    |    June 9")," ")))),r.a.createElement("div",{class:"type_msg"},r.a.createElement("div",{class:"input_msg_write"},r.a.createElement("input",{type:"text",class:"write_msg",placeholder:"Type a message"}),r.a.createElement("button",{class:"msg_send_btn",type:"button"},r.a.createElement("i",{class:"fa fa-paper-plane-o","aria-hidden":"true"})))))}var K=r.a.createElement,Z=document.getElementById("posts-react"),ee=document.getElementById("profile-react"),te=document.getElementById("sidebar-react"),ae=document.getElementById("search-nav-bar-react"),ne=document.getElementById("profile-settings-react");[[Z,function(e){var t=Object(n.useState)([]),a=Object(o.a)(t,2),l=a[0],c=a[1];return r.a.createElement(r.a.Fragment,null,e.username&&r.a.createElement(O,Object.assign({didPost:function(e){var t=Object(s.a)(l);t.unshift(e),c(t)}},e)),r.a.createElement("div",{className:e.className},r.a.createElement(b,Object.assign({newPosts:l},e))))}],[ee,function(e){var t=Object(n.useState)([]),a=Object(o.a)(t,2),l=a[0];return a[1],r.a.createElement(y,Object.assign({profile:l},e))}],[document.getElementById("notifications-react"),function(e){return r.a.createElement(V,null)}],[ae,function(e){return r.a.createElement(k,null)}],[te,function(e){return r.a.createElement(T,e)}],[ne,function(e){var t=Object(n.useState)([]),a=Object(o.a)(t,2),l=a[0];return a[1],r.a.createElement(w,Object.assign({profile:l},e))}],[document.getElementById("message-react"),function(e){return r.a.createElement($,null)}],[document.getElementById("all-messages-react"),function(e){return r.a.createElement(W,null)}],[document.getElementById("sidebar-messages-react"),function(e){return r.a.createElement(Q,null)}]].map((function(e){console.log(e[0]),e[0]&&c.a.render(K(e[1],e[0].dataset),e[0])})),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[54,1,2]]]);
//# sourceMappingURL=main.be1895fb.chunk.js.map