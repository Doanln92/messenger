webpackJsonp([0],{129:function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=n(0),i=n.n(s),c=n(133),l=n(139),u=(n(49),n(25),n(48)),m=(n(131),function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}()),f=function(e){function t(e){a(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.emit=function(e,t){u.a.socket().emit(e,t)},n.ioEventListener=function(){var e=u.a.socket();e.on("check-auth-chat-success",function(e){var t=e.access_token;u.a.set({user:e,access_token:t}),n.setState({user:e}),n.emit("joined")}),e.on("check-auth-chat-fail",function(e){n.go("/login")})},n.toggleHideMember=function(){var e=!n.state.hideMember;n.setState({hideMember:e})},n.toggleShowMember=function(){var e=!n.state.showMember;n.setState({showMember:e})},n.go=function(e){n.props.history.push(e)},n.state={user:{name:"",email:"",username:""},showMember:!1,hideMember:!1},n}return o(t,e),m(t,[{key:"render",value:function(){var e=(this.props.messages,this.state.user),t="messages-form"+(this.state.showMember?" show-member":"")+(this.state.hideMember?" hide-member":""),n={toggleHideMember:this.toggleHideMember,toggleShowMember:this.toggleShowMember,go:this.go};return i.a.createElement("div",{className:t},i.a.createElement(c.a,{events:n}),i.a.createElement(l.a,{user:e,events:n}))}},{key:"componentDidMount",value:function(){if(this.ioEventListener(),u.a.checkLogin()){var e=u.a.user;this.setState({user:e}),this.emit("joined")}else u.a.access_token?this.emit("verify-account",{data:{access_token:u.a.access_token},success:"check-auth-chat-success",fail:"check-auth-chat-fail"}):this.go("/login")}}]),t}(s.Component);t.default=f},131:function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var s=n(0),i=n.n(s),c=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),l=function(e){function t(e){a(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.go=function(e){n.props.history.push(e)},n.state={nav:[{link:"/",text:"Home",active:"home"},{link:"/messages",text:"Ph\xf2ng chat",active:"messages"},{link:"/profile",text:"Profile",active:"profile"},{link:"/logout",text:"[ Tho\xe1t ]",active:"logout"}]},n}return o(t,e),c(t,[{key:"render",value:function(){var e=this.props.active;e||(e="home");var t=this.state.nav.map(function(t,n){var a="nav-link"+(t.active==e?" active":"");return i.a.createElement("a",{className:a,href:t.link,key:n},t.text)});return i.a.createElement("header",{className:"masthead"},i.a.createElement("div",{className:"inner"},i.a.createElement("nav",{className:"nav nav-masthead justify-content-center"},t)))}}]),t}(s.Component);t.a=l},133:function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var s=n(0),i=n.n(s),c=n(134),l=n(137),u=n(138),m=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),f=function(e){function t(e){a(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={status:200},n}return o(t,e),m(t,[{key:"render",value:function(){var e=this.props.events;return i.a.createElement("div",{className:"chat-frame"},i.a.createElement(u.a,{events:e}),i.a.createElement(c.a,{events:e}),i.a.createElement(l.a,{events:e}))}}]),t}(s.Component);t.a=f},134:function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var s=n(0),i=n.n(s),c=n(48),l=n(135),u=n(136),m=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),f=function(e){function t(e){a(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.register=function(e,t){l.a.add(e,t)},n.emit=function(e,t){c.a.socket().emit(e,t)},n.ioEventListener=function(){var e=c.a.socket();e.on("update-message-list",function(e){n.setState({messages:e}),setTimeout(function(){n.scrollDown()},500)}),e.on("send-new-message",function(e){var t=n.state.messages;if(t.length){var a=t[t.length-1];a.email===e.email?(e.messages.map(function(e){a.messages.push(e)}),t[t.length-1]=a):t.push(e)}else t.push(e);n.setState({messages:t}),setTimeout(function(){n.scrollDown()},200)}),e.on("check-auth-message-success",function(e){var t=e.access_token;c.a.set({user:e,access_token:t}),n.setState({user:e})}),e.on("check-auth-message-fail",function(e){}),e.on("someone-are-writing",function(e){var t=n.state.user;if(e.length)if(e.map(function(n,a){n.email==t.email&&e.splice(a,1)}),e.length){var a="",r=e.pop(),o=e.length;a=o>0?r.name+" v\xe0 "+o+" ng\u01b0\u1eddi n\u1eefa \u0111ang vi\u1ebft tin nh\u1eafn...":r.name+" \u0111ang vi\u1ebft tin nh\u1eafn...",n.setState({alertMessage:a});var s=c.a.getTimeoutID("showAlert");s&&clearTimeout(s),s=setTimeout(function(){n.setState({alertMessage:null});var e=c.a.getTimeoutID("showAlert");e&&(clearTimeout(e),c.a.removeTimeoutID("showAlert"))},1e4),c.a.addTimeoutID("showAlert",s)}else n.setState({alertMessage:null});else n.setState({alertMessage:null})}),e.on("show-alert",function(e){n.setState({alertMessage:e});var t=c.a.getTimeoutID("showAlert");t&&clearTimeout(t),t=setTimeout(function(){n.setState({alertMessage:null});var e=c.a.getTimeoutID("showAlert");e&&(clearTimeout(e),c.a.removeTimeoutID("showAlert"))},3e3),c.a.addTimeoutID("showAlert",t)}),e.on("show-popup",function(e){n.setState({popupMessage:e});var t=c.a.getTimeoutID("showPopup");t&&clearTimeout(t),t=setTimeout(function(){n.setState({popupMessage:null});var e=c.a.getTimeoutID("showPopup");e&&(clearTimeout(e),c.a.removeTimeoutID("showPopup"))},3e3),setTimeout(function(){n.setState({popupMessage:null})},3e3),c.a.addTimeoutID("showAlert",t)})},n.viewImage=function(e){l.a.get("viewImage")(e)},n.scrollDown=function(){document.getElementById("message-story-alert")&&document.getElementById("message-story-alert").scrollIntoView()},n.state={status:200,user:{},messages:[],alertMessage:null,popupMessage:null},n}return o(t,e),m(t,[{key:"render",value:function(){var e=this,t=this.state.messages,n=this.state.user,a=t.map(function(t,a){var r="message-item"+(n&&n.email&&t.email===n.email?" my-message":""),o=t.messages,s=o.map(function(t,n){var a=void 0;if("text"===t.type){var r=t.content.split("\n").map(function(e,t){return i.a.createElement("div",{key:t},e)});a=i.a.createElement("div",{className:"p"},r)}else if("image"===t.type){var o={1:12,2:6,3:4,4:3},s=t.images.length,c=12;c=o[s]?o[s]:3;var l=t.images.map(function(t,n){return i.a.createElement("div",{className:"img ml-0 mr-0 pl-1 pr-1 mb-1 mt-1 col-"+c,key:n},i.a.createElement("img",{src:t,alt:t,onClick:function(t){e.viewImage(t.target.getAttribute("src"))},onLoad:e.scrollDown}))});a=i.a.createElement("div",{className:"image row ml-0 mr-0 pl-0 pr-0"},l)}return i.a.createElement("div",{className:"message-content-item",key:n},a)});return i.a.createElement("div",{className:r,key:a},i.a.createElement("div",{className:"avatar"},i.a.createElement("img",{src:t.avatar,alt:"member"})),i.a.createElement("div",{className:"name-message-content"},i.a.createElement("h3",{className:"name"},t.name),i.a.createElement("div",{className:"message"},s)))}),r=this.state.alertMessage,o=this.state.popupMessage,s=o?"fade-down":"fade-up",c="popup-alert "+s;return i.a.createElement("div",{className:"chat-story",id:"message-story"},i.a.createElement("div",{className:"messages"},a),i.a.createElement("div",{className:"message-alert",id:"message-story-alert"},r),i.a.createElement(u.a,{registerAction:this.register}),i.a.createElement("div",{className:c},i.a.createElement("div",{className:"popup-box"},o)))}},{key:"componentDidMount",value:function(){if(this.ioEventListener(),this.emit("get-message-list"),c.a.checkLogin()){var e=c.a.user;this.setState({user:e}),this.emit("joined")}else c.a.access_token&&this.emit("verify-account",{data:{access_token:c.a.access_token},success:"check-auth-message-success",fail:"check-auth-message-fail"})}}]),t}(s.Component);t.a=f},135:function(e,t,n){"use strict";var a={actions:{},add:function(e,t){this.actions[e]=t},get:function(e){return"undefined"!==typeof this.actions[e]?this.actions[e]:function(e){console.log(e)}}};t.a=a},136:function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var s=n(0),i=n.n(s),c=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),l=function(e){function t(e){a(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.viewImage=function(e){n.setState({imagePreview:e,showLightBox:!0})},n.close=function(){n.setState({showLightBox:!1})},n.state={showLightBox:!1,imagePreview:""},n}return o(t,e),c(t,[{key:"render",value:function(){var e="light-box-image"+(this.state.showLightBox?" show":""),t=this.state.imagePreview,n=t?i.a.createElement("img",{src:t}):"";return i.a.createElement("div",{className:e},i.a.createElement("div",{className:"relative light-box-body"},i.a.createElement("div",{className:"overlay",onClick:this.close}),i.a.createElement("div",{className:"buttons"},i.a.createElement("span",{onClick:this.close},i.a.createElement("i",{className:"fa fa-close"}))),i.a.createElement("div",{className:"image-preview"},n)))}},{key:"componentWillMount",value:function(){this.props.registerAction("viewImage",this.viewImage)}}]),t}(s.Component);t.a=l},137:function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var s=n(0),i=n.n(s),c=n(25),l=n(48),u=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),m=function(e){function t(e){a(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.inputDidUpdate=function(e){var t=e.target,a=(t.name,t.value);n.setState({message:a}),a.length?n.writing():n.stop()},n.chooseImage=function(e){var t=e.target;if(window.File&&window.FileList&&window.FileReader){var a,r;!function(){var e=t.files,o=0;e.length&&function(){var t=n.state.images;for(c.a.set("file_upload_number",e.length),a=0;a<e.length;a++){var s=e[a];0==s.type.indexOf("image")&&(r=new FileReader,r.onload=function(e){var a=e.target.result;t.push(a),n.setState({images:t}),o++,n.prepareSendImages(o)},r.readAsDataURL(s))}}()}()}else alert("tr\xecnh duy\u1ec7t kh\xf4ng h\u1ed5 tr\u1ecd upload file")},n.prepareSendImages=function(e){var t=parseInt(c.a.get("file_upload_number"));isNaN(t)||t!==e||n.sendImages()},n.checkEnter=function(e){var t=e.target,a=(t.name,t.value);if(13==e.keyCode&&!e.shiftKey)return n.send(e);n.setState({message:a})},n.emit=function(e,t){l.a.socket().emit(e,t)},n.ioEventListener=function(){var e=l.a.socket();e.on("send-message-success",function(e){n.setState({message:""}),n.stop()}),e.on("send-message-error",function(e){}),e.on("need-verify-before-send",function(){l.a.access_token?n.emit("verify-account",{data:{access_token:l.a.access_token},success:"verify-success-and-resend",fail:"need-login-to-send"}):n.go("/login")}),e.on("verify-success-and-resend",function(){n.send()}),e.on("need-login-to-send",function(){n.go("/login")})},n.send=function(){var e=n.state.message;if(e.length){var t=e.split("\n"),a=!1,r=[];t.map(function(e){e.length?(a=!0,r.push(e)):a&&r.push(e)});for(var o=r.length-1;o>=0;o--){if(r[o].length)break;r.pop()}var s={type:"text",content:r.join("\n")};r.length&&n.emit("send-message",{message:s})}},n.sendImages=function(){if(n.state.isSend)return!1;var e=n.state.images;e.length&&(l.a.request("upload-images","POST",{access_token:l.a.user.access_token,images:e},function(e){e.status?n.emit("send-message",{access_token:l.a.access_token,message:{type:"image",images:e.images}}):e.errors&&alert(e.errors.join(", \n")),n.setState({isSend:!1})}),n.setState({images:[],isSend:!0}))},n.writing=function(){var e="writing",t=l.a.getTimeoutID(e);t&&clearTimeout(t),n.emit("writing"),t=setTimeout(function(){n.stop();var t=l.a.getTimeoutID(e);t&&(clearTimeout(t),l.a.removeTimeoutID(e))},15e3),l.a.addTimeoutID(e,t)},n.stop=function(){n.emit("stop-writing")},n.go=function(e){n.props.events.go(e)},n.state={message:"",messages:[],image:"",images:[],isSend:!1},n}return o(t,e),u(t,[{key:"render",value:function(){var e=this.state.message;return i.a.createElement("div",{className:"chat-input"},i.a.createElement("div",{className:"relative"},i.a.createElement("div",{className:"input-group"},i.a.createElement("textarea",{name:"message",id:"message-input",className:"form-control message-input",placeholder:"Vi\u1ebft g\xec \u0111\xf3...",onKeyUp:this.inputDidUpdate,onChange:this.inputDidUpdate,onKeyDown:this.checkEnter,value:e,"data-val":e}),i.a.createElement("button",{type:"button",className:"btn btn-primary btn-send",onClick:this.send},i.a.createElement("i",{className:"fa fa-send"})," G\u1eedi")),i.a.createElement("div",{className:"media-items"},i.a.createElement("div",{className:"image relative"},i.a.createElement("i",{className:"fa fa-picture-o"}),i.a.createElement("input",{type:"file",name:"images",className:"absolute media-image t-0 r-0 b-0 l-0",multiple:"true",accept:"image/png,image/gif,image/jpeg",onChange:this.chooseImage})))))}},{key:"componentDidMount",value:function(){this.ioEventListener(),document.getElementById("message-input")&&document.getElementById("message-input").focus()}}]),t}(s.Component);t.a=m},138:function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var s=n(0),i=n.n(s),c=n(48),l=n(25),u=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),m=function(e){function t(e){a(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.toggleShowMember=function(){n.props.events.toggleShowMember()},n.toggleHideMember=function(){n.props.events.toggleHideMember()},n.emit=function(e,t){c.a.socket().emit(e,t)},n.ioEventListener=function(){c.a.socket().on("check-profile-account-fail",function(e){n.go("/login")})},n.selectTheme=function(e){var t=e.target.getAttribute("data-theme");n.changeTheme(t)},n.changeTheme=function(e){l.a.set("app_theme",e),n.setState({theme:e}),n.emit("change-theme",e)},n.state={theme:"dark"},n}return o(t,e),u(t,[{key:"render",value:function(){var e=this.state.theme,t=l.a.get("app_theme");return t&&(e=t),i.a.createElement("nav",{className:"chat-nav text-right clearfix"},i.a.createElement("h3",{className:"app-name mr-auto float-left pt-1 pb-0 mb-0"},"Doanln"),i.a.createElement("button",{className:"btn btn-default btn-gradient","data-theme":"gradient",onClick:this.selectTheme},"Gradient"),i.a.createElement("button",{className:"btn btn-light","data-theme":"light",onClick:this.selectTheme},"Light"),i.a.createElement("button",{className:"btn btn-dark","data-theme":"dark",onClick:this.selectTheme},"Dark"),i.a.createElement("button",{className:"btn btn-"+e+" show-member",onClick:this.toggleShowMember},i.a.createElement("i",{className:"fa fa-bars"})),i.a.createElement("button",{className:"btn btn-"+e+" hide-member",onClick:this.toggleHideMember},i.a.createElement("i",{className:"fa fa-bars"})))}},{key:"componentDidMount",value:function(){this.ioEventListener()}}]),t}(s.Component);t.a=m},139:function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var s=n(0),i=n.n(s),c=n(48),l=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),u=function(e){function t(e){a(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.emit=function(e,t){c.a.socket().emit(e,t)},n.ioEventListener=function(){var e=c.a.socket();e.on("update-user-list",function(e){n.setState({users:e})}),e.on("online-checked-success",function(e){var t=e.access_token;c.a.set({user:e,access_token:t}),n.setState({user:e})}),e.on("online-checked-fail",function(e){})},n.state={status:200,users:[],user:{}},n}return o(t,e),l(t,[{key:"render",value:function(){var e=this.state.user,t=this.state.users,n=t.length?t.map(function(t,n){return t.email==e.email?"":i.a.createElement("div",{className:"member",key:n},i.a.createElement("div",{className:"avatar"},i.a.createElement("img",{src:t.avatar,alt:t.name})),i.a.createElement("div",{className:"name"},i.a.createElement("h3",null,i.a.createElement("a",{href:"#"},t.name))))}):null;return i.a.createElement("div",{className:"chat-sidebar"},i.a.createElement("div",{className:"list-wrap"},i.a.createElement("div",{className:"profile"},i.a.createElement("div",{className:"member"},i.a.createElement("div",{className:"avatar"},i.a.createElement("a",{href:"/profile"},i.a.createElement("img",{src:e.avatar,alt:e.name}))),i.a.createElement("div",{className:"name"},i.a.createElement("h3",null,i.a.createElement("a",{href:"/profile"},e.name)),i.a.createElement("p",null,i.a.createElement("span",null,"Online")," ",i.a.createElement("a",{href:"/logout"},"Tho\xe1t"))))),i.a.createElement("div",{className:"list-member"},i.a.createElement("div",{className:"list-header"},i.a.createElement("h3",null,"\u0110ang online")),i.a.createElement("div",{className:"list-body"},n))))}},{key:"componentDidMount",value:function(){if(this.ioEventListener(),this.emit("get-user-list"),c.a.checkLogin()){var e=c.a.user;this.setState({user:e}),this.emit("joined")}else c.a.access_token&&this.emit("verify-account",{data:{access_token:c.a.access_token},success:"online-checked-success",fail:"online-checked-fail"})}}]),t}(s.Component);t.a=u}});
//# sourceMappingURL=0.2e36f695.chunk.js.map