(this.webpackJsonpsurveyeditor=this.webpackJsonpsurveyeditor||[]).push([[0],{104:function(e,t,n){e.exports=n.p+"static/media/logo.ed79d5c5.png"},116:function(e,t){},137:function(e,t,n){},228:function(e,t,n){e.exports=n(663)},233:function(e,t,n){},662:function(e,t,n){var a={"./pwa-camera-modal-instance.entry.js":[674,5],"./pwa-camera-modal.entry.js":[675,6],"./pwa-camera.entry.js":[676,7],"./pwa-toast.entry.js":[677,8]};function r(e){if(!n.o(a,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=a[e],r=t[0];return n.e(t[1]).then((function(){return n(r)}))}r.keys=function(){return Object.keys(a)},r.id=662,e.exports=r},663:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(16),s=n.n(o),i=(n(233),n(17)),l=n(47),c=n(30),u=n(56),d=n(57),m=n(20),p=n(60),h=n(11),f=(n(137),n(184)),v=n.n(f),y=(n(241),n(242),n(29)),g=n(28),E=n(8),b=n.n(E),w=n(719),j=n(726),k=n(734),O=n(725),C=n(735),x=n(715),q=n(185),S=n.n(q),N=n(186),L=n.n(N),I=n(187),_=n.n(I),D=n(125),A=n.n(D),U=n(188),R=n.n(U);function P(e){var t=e.editor?"navbar":"navbar1";return 0===e.current?r.a.createElement("div",{className:t},r.a.createElement(x.a,{variant:"outlined",color:"primary",endIcon:r.a.createElement(S.a,null),onClick:function(){return e.goto(e.current+1)}},"Start")):e.current===e.total-2?r.a.createElement("div",{className:t},r.a.createElement(x.a,{variant:"outlined",color:"primary",startIcon:r.a.createElement(A.a,null),onClick:function(){return e.goto(e.current-1)}},"Previous"),r.a.createElement(x.a,{variant:"outlined",color:"primary",startIcon:r.a.createElement(L.a,null),onClick:function(){return e.goto(e.current+1)}},"Submit")):e.current===e.total-1?r.a.createElement("div",{className:t},r.a.createElement(x.a,{variant:"outlined",color:"primary",startIcon:r.a.createElement(_.a,null),onClick:function(){return e.goto(0)}},"Repeat survey")):r.a.createElement("div",{className:t},r.a.createElement(x.a,{variant:"outlined",color:"primary",startIcon:r.a.createElement(A.a,null),onClick:function(){return e.goto(e.current-1)}},"Previous"),r.a.createElement(x.a,{variant:"outlined",color:"primary",endIcon:r.a.createElement(R.a,null),onClick:function(){return e.goto(e.current+1)}},"Next"))}var z=n(212),T=n(732);function M(e){var t=e.children,n=e.value,a=e.index;return r.a.createElement(z.a,{component:"div",role:"tabpanel",hidden:n!==a},n===a&&r.a.createElement(T.a,{p:3},t))}var W=n(80),B=n.n(W),F=n(126),G=n(733),Y=n(741),K=n(724),H=n(737),J=n(723),Q=n(667),V=n(738),$=n(720),X=n(193),Z=n.n(X),ee=n(194),te=n.n(ee),ne=n(195),ae=n.n(ne),re=n(105),oe=n(190),se=n.n(oe),ie=n(99),le=n(196),ce=re.b.Camera,ue=re.b.Geolocation,de=Object(w.a)((function(e){return{root:{"& .MuiTextField-root":{margin:e.spacing(1),width:"100%",textAlign:"left",fontFamily:"Noto Serif SC",fontSize:"small"}}}})),me={};function pe(e){var t=Object(a.useRef)(ie.b.getInstance("/wasmassets")).current;function n(){return(n=Object(F.a)(B.a.mark((function e(t){var n;return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ue.getCurrentPosition();case 2:n=e.sent,console.log("Current",n),l(n,t);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function o(){return(o=Object(F.a)(B.a.mark((function e(){var t;return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ce.getPhoto({resultType:re.a.Uri});case 2:t=e.sent,console.log(t);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function s(t){"checkbox"===t.target.type?e.store(t.target.name,t.target.checked):e.store(t.target.name,t.target.value)}function i(t,n){"undefined"==typeof me[n]&&(me[n]=[]),t.target.checked?me[n].push(t.target.name):me[n]=me[n].filter((function(e){return e!==t.target.name})),e.store(n,me[n])}function l(t,n){e.store(n,[t.coords.latitude,t.coords.longitude])}var c=r.a.useState(!1),u=Object(g.a)(c,2),d=u[0],m=u[1],p=r.a.useState(null),h=Object(g.a)(p,2),f=h[0];h[1];function v(e){try{for(var t=e.match(/[^\s']+|'([^']*)'/g),n=!1,a=!1,r=0;t.length>=r+3;r+=4)n=y(t.slice(r,r+3)),a=0===r?n:"and"===t[r+4]?a&&n:a||n;return a}catch(o){console.log(o)}}function y(t){var n=!1;return"is"===t[1]&&""+e.answers[e.questionLookup[t[0]]]===t[2].replace(/'/g,"")&&(n=!0),"isnot"===t[1]&&""+e.answers[e.questionLookup[t[0]]]!==t[2].replace(/'/g,"")&&(n=!0),"has"===t[1]&&-1!==e.answers[e.questionLookup[t[0]]].indexOf(t[2].replace(/'/g,""))&&(n=!0),"hasnot"===t[1]&&-1===e.answers[e.questionLookup[t[0]]].indexOf(t[2].replace(/'/g,""))&&(n=!0),n}var E=de(),b=e.question.mandatory?r.a.createElement("div",{style:{color:"red"}},"*"):null,w="checkbox"===e.question.type?r.a.createElement($.a,{name:e.uid,onChange:s,color:"primary",checked:""!==e.answers[e.uid]&&e.answers[e.uid]}):null;if("undefined"!==typeof e.question.condition&&null!==e.question.condition&&""!==e.question.condition&&!v(e.question.condition))return null;var j=null;if("textbox"===e.question.type)j=r.a.createElement("form",{className:E.root},r.a.createElement(C.a,{name:e.uid,onChange:s,value:e.answers[e.uid],fullWidth:!0}));else if("textarea"===e.question.type)j=r.a.createElement("form",{className:E.root},r.a.createElement(C.a,{name:e.uid,multiline:!0,row:5,variant:"outlined",onChange:s,value:e.answers[e.uid],fullWidth:!0}));else if("select"===e.question.type){var k="undefined"!==typeof e.question.options&&null!==e.question.options,O="undefined"!==typeof e.question.conditionaloptions&&null!==e.question.conditionaloptions,q=k?e.question.options.map((function(e){return r.a.createElement(Y.a,{value:e,key:e},e)})):null,S=[];O&&e.question.conditionaloptions.forEach((function(e){v(e.condition)&&(S=S.concat(e.options.map((function(e){return r.a.createElement(Y.a,{value:e,key:e},e)}))))})),j=r.a.createElement("form",{className:E.root},r.a.createElement(G.a,{name:e.uid,autoWidth:!1,onChange:s,value:e.answers[e.uid]},q,S))}else if("radio"===e.question.type)try{var N=e.question.options.map((function(e){return"string"===typeof e?r.a.createElement(J.a,{value:e,key:e,control:r.a.createElement(H.a,{color:"primary"}),label:e}):"object"===typeof e?r.a.createElement(J.a,{value:e.value,key:e.key,control:r.a.createElement(H.a,{color:"primary"}),label:e.value}):null}));j=r.a.createElement("form",{className:E.root},r.a.createElement(K.a,{name:e.uid,onChange:s,value:e.answers[e.uid]},N))}catch(U){}else if("multiselect"===e.question.type){var L="undefined"!==typeof e.question.options&&null!==e.question.options,I="undefined"!==typeof e.question.conditionaloptions&&null!==e.question.conditionaloptions,_=L?e.question.options.map((function(t){return r.a.createElement(J.a,{control:r.a.createElement(V.a,{color:"primary",value:t,name:t,checked:-1!==e.answers[e.uid].indexOf(t),onChange:function(t){return i(t,e.uid)}}),label:t,key:t})})):null,D=[];I&&e.question.conditionaloptions.forEach((function(t){v(t.condition)&&(D=D.concat(t.options.map((function(t){return r.a.createElement(J.a,{control:r.a.createElement(V.a,{color:"primary",value:t,name:t,checked:-1!==e.answers[e.uid].indexOf(t),onChange:function(t){return i(t,e.uid)}}),label:t,key:t})}))))})),j=r.a.createElement("form",{className:E.root},r.a.createElement(Q.a,{name:e.uid,color:"primary"},D,_))}else if("geolocation"===e.question.type){var A="undefined"===typeof e.answers[e.uid]||null===e.answers[e.uid]||""===e.answers[e.uid]||e.answers[e.uid].length<2?"":"["+e.answers[e.uid][0]+", "+e.answers[e.uid][1]+"]";j=r.a.createElement("form",{className:E.root},r.a.createElement("div",{style:{padding:"10px"}},A),r.a.createElement(x.a,{variant:"outlined",color:"primary",startIcon:r.a.createElement(Z.a,null),onClick:function(){return function(e){return n.apply(this,arguments)}(e.uid)}},"Detect"))}else"image"===e.question.type?j=r.a.createElement("form",{className:E.root},d?null:r.a.createElement(x.a,{variant:"outlined",color:"primary",startIcon:r.a.createElement(te.a,null),onClick:function(){return function(){return o.apply(this,arguments)}()}},"Open Camera"),r.a.createElement("video",{id:"video",width:"64",height:"48",autoPlay:!0}),r.a.createElement("canvas",{id:"canvas",width:"64",height:"48"}),d?r.a.createElement("div",{style:{width:"50%",display:"flex",direction:"row",justifyContent:"space-between"}},r.a.createElement(x.a,{variant:"outlined",color:"primary",startIcon:r.a.createElement(ae.a,null),onClick:function(){var e=document.getElementById("canvas").getContext("2d"),t=document.getElementById("video");e.drawImage(t,0,0,64,48),t.pause(),t.src="",f.getTracks().forEach((function(e){e.stop()})),m(!1)}},"Take a picture"),r.a.createElement(x.a,{variant:"outlined",color:"primary",onClick:function(){var e=document.getElementById("video");e.pause(),e.src="",f.getTracks().forEach((function(e){e.stop()})),m(!1)},padding:"10px"},"Cancel")):null):"qrcode"===e.question.type?j=r.a.createElement("form",{className:E.root},r.a.createElement(se.a,{onError:function(e){console.error(e)},onScan:function(t){t&&(e.answers[e.uid]=t)},style:{width:"100%"}}),r.a.createElement("p",null,e.answers[e.uid])):"barcode"===e.question.type&&(j=r.a.createElement("form",{className:E.root},r.a.createElement(le.a,{decoder:t,onFindBarcode:function(e){}})));return r.a.createElement("div",{className:"question"},r.a.createElement("div",{className:"question text",style:{display:"flex",flexDirection:"row",justifyContent:"flex-start"}},e.question.text,b,"  ",w),r.a.createElement("div",{className:"question help"},e.question.help),r.a.createElement("div",{className:"question options"},j))}function he(e){var t="undefined"!==typeof e.questions&&null!==e.questions?e.questions.map((function(t,n){return null===t?null:r.a.createElement(pe,{uid:"s"+e.sectionId+"_q"+n,id:"undefined"!==typeof t.id&&null!==t.id&&""!==t.id?t.id:"s"+e.sectionId+"_q"+n,key:"Question "+n,question:t,store:e.store,answers:e.answers,questionLookup:e.questionLookup})})):[];return r.a.createElement(M,{value:e.value,index:e.index},r.a.createElement("div",{className:"surveyform"},t))}M.propTypes={children:b.a.node,index:b.a.any.isRequired,value:b.a.any.isRequired};var fe=Object(w.a)((function(e){return{root:{flexGrow:1,width:"100%",backgroundColor:"theme.palette.background.paper",top:0}}}));function ve(e){var t=fe(),n=r.a.useState(0),a=Object(g.a)(n,2),o=a[0],s=a[1],i="undefined"!==typeof e.survey.sections&&null!==e.survey.sections?e.survey.sections.map((function(e,t){return null===e?null:r.a.createElement(O.a,Object.assign({label:"undefined"!==typeof e.title?e.title:""},{id:"scrollable-auto-tab-".concat(t)},{key:"Section "+t}))})):[],l=[r.a.createElement(O.a,{label:"Home",key:"Home"})].concat(Object(y.a)(i),[r.a.createElement(O.a,{label:"Thanks",key:"Thanks"})]),c=r.a.createElement(M,{value:o,index:0},r.a.createElement("div",{className:"surveyform"},"undefined"!==typeof e.survey.logo&&null!==e.survey.logo?r.a.createElement("img",{src:e.survey.logo,alt:"survey logo"}):null,"undefined"!==typeof e.survey.title&&null!==e.survey.title?r.a.createElement("h2",null,e.survey.title):null),"undefined"!==typeof e.survey.instructions&&null!==e.survey.instructions?r.a.createElement("div",null,r.a.createElement(C.a,{id:"instructions",fullWidth:!0,margin:"normal",disabled:!0,multiline:!0,value:e.survey.instructions,variant:"filled"})):null),u=r.a.createElement(M,{value:o,index:l.length-1},r.a.createElement("div",{className:"surveyform"},"undefined"!==typeof e.survey.conclusion&&null!==e.survey.conclusion?r.a.createElement("h2",null,e.survey.conclusion):null)),d="undefined"!==typeof e.survey.sections&&null!==e.survey.sections?e.survey.sections.map((function(t,n){return null===t?null:r.a.createElement(he,{questions:t.questions,key:"Section "+n,value:o,index:n+1,store:e.store,answers:e.answers,questionLookup:e.questionLookup,sectionId:n})})):[],m=e.editor?"viewer":"viewer1";return r.a.createElement("div",null,r.a.createElement("div",{className:m},r.a.createElement("div",{className:t.root},r.a.createElement(j.a,{position:"sticky",color:"default"},r.a.createElement(k.a,{value:o,onChange:function(e,t){s(t)},indicatorColor:"primary",textColor:"primary",variant:"scrollable",scrollButtons:"auto"},l)),c,d,u)),r.a.createElement(P,{current:o,total:l.length,goto:function(e){s(e)},editor:e.editor}))}var ye=function(e){function t(e){var n;Object(l.a)(this,t),n=Object(u.a)(this,Object(d.a)(t).call(this,e));var a={},r={};return n.props.json.survey.sections.forEach((function(e,t){"undefined"!==typeof e.questions&&null!==e.questions&&e.questions.forEach((function(e,n){a["s"+t+"_q"+n]="","undefined"!==typeof e.id&&null!==e.id&&""!==e.id&&(r[e.id]="s"+t+"_q"+n)}))})),n.state=a,n.store=n.store.bind(Object(m.a)(n)),n.questionLookup=r,n}return Object(p.a)(t,e),Object(c.a)(t,[{key:"store",value:function(e,t){this.setState(Object(i.a)({},this.state,Object(h.a)({},e,t)))}},{key:"render",value:function(){return console.log(this.state),"undefined"===typeof this.props.json.survey?r.a.createElement("div",{style:{color:"red"}},"Error: ",r.a.createElement("b",null,"survey")," object is missing "):"undefined"===typeof this.props.json.survey.id?r.a.createElement("div",{style:{color:"red"}},"Error: ",r.a.createElement("b",null,"survey id")," is missing "):null===this.props.json.survey.id?r.a.createElement("div",{style:{color:"red"}},"Error: ",r.a.createElement("b",null,"survey id")," is blank "):"undefined"===typeof this.props.json.survey.version?r.a.createElement("div",{style:{color:"red"}},"Error: ",r.a.createElement("b",null,"survey version")," is missing "):null===this.props.json.survey.version?r.a.createElement("div",{style:{color:"red"}},"Error: ",r.a.createElement("b",null,"survey version")," is blank "):r.a.createElement(ve,{survey:this.props.json.survey,store:this.store,answers:this.state,questionLookup:this.questionLookup,editor:this.props.editor})}}]),t}(r.a.Component),ge=n(63),Ee=n(78),be=n(42),we=function(e){return console.log("Inside signin "+e),function(t,n){"undefined"===typeof e?(console.log("Inside undefined"),be.a.currentAuthenticatedUser().then((function(e){t({type:"AUTH_SUCCESS",data:e})})).catch((function(e){t({type:"LOGIN_FAILED",err:e})}))):(console.log("Inside else"),be.a.signIn(e.username,e.password).then((function(e){t({type:"LOGIN_SUCCESS",data:e})})).catch((function(e){t({type:"LOGIN_FAILED",err:e})})))}},je=n(203),ke=n.n(je),Oe=function(e){function t(){return Object(l.a)(this,t),Object(u.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.props.signIn()}},{key:"handleRefresh",value:function(e,t){console.log("test .....")}},{key:"render",value:function(){return console.log(this.props.user.username),!1!==this.props.editor||"undefined"!==typeof this.props.user.username&&null!==this.props.user.username&&""!==this.props.user.username?r.a.createElement("div",{style:{overflow:"scroll"}},r.a.createElement(ke.a,{onRefresh:this.handleRefresh,style:{textAlign:"center"}}),r.a.createElement("div",null,r.a.createElement("div",{className:"topbar"},r.a.createElement("div",{className:"title"},r.a.createElement("div",{style:{display:"flex",alignItems:"center",height:"50px",width:"50px"}},r.a.createElement("img",{src:"undefined"!==typeof this.props.json&&"undefined"!==typeof this.props.json.survey&&"undefined"!==typeof this.props.json.survey.logo&&null!==this.props.json.survey.logo&&""!==this.props.json.survey.logo?this.props.json.survey.logo:this.props.logo,alt:"Surveykshan",height:"40px",style:{padding:"5px",objectFit:"cover"}})),r.a.createElement("div",null,r.a.createElement("div",{style:{color:"white",fontSize:"medium",paddingLeft:"20px"}},"undefined"!==typeof this.props.json&&"undefined"!==typeof this.props.json.survey&&"undefined"!==typeof this.props.json.survey.title&&null!==this.props.json.survey.title&&""!==this.props.json.survey.title?this.props.json.survey.title:"Surveykshan"),r.a.createElement("div",{style:{color:"white",fontSize:"small",textAlign:"left",paddingLeft:"5px",paddingBottom:"5px"}})))),"undefined"!==typeof this.props.json&&null!==this.props.json&&""!==this.props.json?r.a.createElement(ye,{json:this.props.json,setNav:this.setNav,editor:this.props.editor}):"undefined"!==typeof this.props.err&&null!==this.props.err&&""!==this.props.err?r.a.createElement("div",{style:{color:"red"}},"Error: ",this.props.err.message," at line number ",this.props.err.parsedLine,"  "):null)):r.a.createElement(ge.a,{to:"/signin"})}}]),t}(r.a.Component),Ce=Object(Ee.b)((function(e){return{user:e.signIn.user}}),(function(e){return{signIn:function(){return e(we())}}}))(Oe),xe=n(206),qe=n.n(xe),Se=n(207),Ne=n.n(Se),Le=n(208),Ie=n.n(Le),_e=n(739),De=n(731),Ae=n(729),Ue=n(728),Re=n(666),Pe=n(205),ze=n.n(Pe),Te=n(727),Me=n(730);function We(e){return r.a.createElement(ze.a,{cancel:'[class*="MuiDialogContent-root"]'},r.a.createElement(Re.a,e))}var Be=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(u.a)(this,Object(d.a)(t).call(this,e))).refName=r.a.createRef(),n.process=n.process.bind(Object(m.a)(n)),n.handleKeyDown=n.handleKeyDown.bind(Object(m.a)(n)),n.handleChange=n.handleChange.bind(Object(m.a)(n)),n.handleCancel=n.handleCancel.bind(Object(m.a)(n)),n.showDialog=n.showDialog.bind(Object(m.a)(n)),n.handleSubmit=n.handleSubmit.bind(Object(m.a)(n)),n.state={open:!1,loading:!1,category:"",survey:"",selection:""},n}return Object(p.a)(t,e),Object(c.a)(t,[{key:"process",value:function(){var e=this.refName.current.editor.getValue();this.props.processYAML(e)}},{key:"handleKeyDown",value:function(e){13===e.keyCode&&this.handleSubmit()}},{key:"handleChange",value:function(e){this.setState(Object(i.a)({},this.state,Object(h.a)({},e.target.id,e.target.value)))}},{key:"handleCancel",value:function(){this.setState(Object(i.a)({},this.state,{open:!1,loading:!1,selection:""}))}},{key:"handleSubmit",value:function(){var e=this;"save"===this.state.selection?(this.setState(Object(i.a)({},this.state,{loading:!0})),be.c.put(this.state.category+"/"+this.state.survey+".yml",this.props.yaml,{contentType:"text/plain"}).catch((function(e){return console.log(e)})).then((function(t){e.setState(Object(i.a)({},e.state,{open:!1,loading:!1}))}))):(this.setState(Object(i.a)({},this.state,{loading:!0})),be.c.get(this.state.category+"/"+this.state.survey+".yml",{contentType:"text/plain"}).catch((function(e){return console.log(e)})).then((function(t){e.setState(Object(i.a)({},e.state,{open:!1,loading:!1})),e.props.processURL(t)})))}},{key:"showDialog",value:function(e){this.setState(Object(i.a)({},this.state,{open:!0,selection:e}))}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"App",style:{height:this.props.height,width:this.props.width}},r.a.createElement("div",{className:"leftpane"},r.a.createElement("div",{className:"topbar"},r.a.createElement("div",{className:"title"},r.a.createElement("div",{style:{display:"flex",alignItems:"center"}},r.a.createElement("img",{src:this.props.logo,alt:"Surveykshan",height:"40px",style:{padding:"5px"}})),r.a.createElement("div",null,r.a.createElement("div",{style:{color:"white",fontSize:"x-large",paddingLeft:"5px"}},"Surveykshan"),r.a.createElement("div",{style:{color:"white",fontSize:"small",textAlign:"left",paddingLeft:"5px",paddingBottom:"5px"}},"Create surveys in a jiffy"))),r.a.createElement("div",{style:{margin:"20px"}},r.a.createElement(x.a,{variant:"contained",startIcon:r.a.createElement(qe.a,null),style:{margin:"10px"},size:"small",onClick:function(){return e.showDialog("open")}},"Open"),r.a.createElement(x.a,{variant:"contained",startIcon:r.a.createElement(Ne.a,null),style:{margin:"10px"},size:"small",onClick:function(){return e.showDialog("save")}},"Save"),r.a.createElement(x.a,{variant:"contained",startIcon:r.a.createElement(Ie.a,null),style:{margin:"10px"},size:"small",onClick:function(){return e.showDialog("save")}},"Save As"))),r.a.createElement("div",null,r.a.createElement(v.a,{mode:"yaml",theme:"monokai",name:"ace-editor",height:"92vh",width:"50vw",fontSize:14,focus:!0,showPrintMargin:!1,editorProps:{$blockScrolling:1/0},ref:this.refName,value:this.props.yaml,wrapEnabled:!0,placeholder:"",onChange:this.process}))),r.a.createElement("div",{className:"rightpane"},r.a.createElement(Ce,Object.assign({},this.props,{editor:!0}))),r.a.createElement(_e.a,{open:this.state.open,disableBackdropClick:!0,onClose:this.handleCancel,PaperComponent:We},r.a.createElement(Ue.a,{style:{cursor:"move",borderBottom:"1px groove lightgray"},id:"draggable-dialog-title"},r.a.createElement("b",null,"Please provide the following details")),r.a.createElement(Ae.a,null,r.a.createElement(Te.a,{in:this.state.loading,unmountOnExit:!0,style:{transitionDelay:this.state.loading?"800ms":"0ms"}},r.a.createElement(Me.a,null)),r.a.createElement(C.a,{autoFocus:!0,key:"category",fullWidth:!0,id:"category",label:"Category",onChange:this.handleChange,value:this.state.category,required:!0}),r.a.createElement(C.a,Object(h.a)({key:"survey",fullWidth:!0,id:"survey",label:"Survey",onChange:this.handleChange,value:this.state.survey,required:!0,onKeyDown:this.handleKeyDown},"required",!0))),r.a.createElement(De.a,null,r.a.createElement(x.a,{className:"bbutton",onClick:this.handleCancel}," Cancel "),r.a.createElement(x.a,{className:"bbutton",onClick:this.handleSubmit,style:{color:"white",backgroundColor:"rgb(74, 119, 229)",width:"auto"}}," Done "))))}}]),t}(r.a.Component),Fe=n(89),Ge=n(104),Ye=n.n(Ge),Ke=n(209),He=n.n(Ke);var Je=Object(Ee.b)((function(e){return{user:e.signIn.user,challenge:e.signIn.user.challengeName}}),(function(e){return{signIn:function(t){return e(we(t))},getCurrentSession:function(){return e(we())}}}))((function(e){var t=r.a.useState({username:"prasad@ideafactors.com",password:"testing@123",newpassword:"",loginError:"",loading:!1}),n=Object(g.a)(t,2),a=n[0],o=n[1],s=e.getCurrentSession;function l(e){o(Object(i.a)({},a,Object(h.a)({},e.target.id,e.target.value)))}function c(){var t=be.a.completeNewPassword(e.user,a.newpassword);console.log(t)}function u(){""===a.username.trim()||""===a.password.trim()?o(Object(i.a)({},a,{loginError:"Email Address and Password cannot be blank"})):(e.signIn(a),o(Object(i.a)({},a,{loading:!0,loginError:""})))}if(r.a.useEffect((function(){s()})),r.a.useEffect((function(){be.b.listen("auth",(function(e){"signIn_failure"===e.payload.event&&o(Object(i.a)({},a,{username:"",password:"",newpassword:"",loginError:"Invalid Email Address & Password combination. ",loading:!1}))}))}),[e,a]),console.log(e.user),"undefined"!==typeof e.user.username&&null!==e.user.username)return r.a.createElement(ge.a,{to:"/preview"});var d="undefined"!==typeof e.challenge&&"NEW_PASSWORD_REQUIRED"===e.challenge,m=d?"Change Password":"Login";return r.a.createElement("div",{className:"centered"},r.a.createElement("div",null,r.a.createElement("img",{src:e.logo,alt:"Surveykshan",height:"100px"})),r.a.createElement("div",null,"Surveykshan"),r.a.createElement("div",{style:{color:"red",fontSize:"small",padding:"10px"}},a.loginError),r.a.createElement("div",{style:{padding:"50px"}},d?r.a.createElement(C.a,{fullWidth:!0,id:"newpassword",label:"New Password",type:"password",autoComplete:"new-password",onChange:l,value:a.newpassword,required:!0,onKeyDown:function(e){13===e.keyCode&&c()}}):[r.a.createElement(C.a,{autoFocus:!0,key:"username",fullWidth:!0,id:"username",label:"Email Address",type:"email",autoComplete:"username",onChange:l,value:a.username,required:!0}),r.a.createElement(C.a,{fullWidth:!0,key:"password",id:"password",label:"Password",type:"password",autoComplete:"current-password",onChange:l,value:a.password,onKeyDown:function(e){13===e.keyCode&&u()},required:!0})],r.a.createElement("div",{style:{width:"100%"}},r.a.createElement(Te.a,{in:a.loading,unmountOnExit:!0,style:{transitionDelay:a.loading?"800ms":"0ms"}},r.a.createElement(Me.a,null)))),r.a.createElement("div",{style:{paddingTop:"5px"}},r.a.createElement("div",{style:{display:"flex",flexDirection:"row"}},r.a.createElement(x.a,{variant:"outlined",onClick:function(){o(Object(i.a)({},a,{username:"",password:"",newpassword:"",loginError:"",loading:!1}))},color:"primary",style:{margin:"20px"}}," Cancel "),r.a.createElement(x.a,{variant:"contained",onClick:d?c:u,color:"primary",style:{margin:"20px"}},m))))})),Qe=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(u.a)(this,Object(d.a)(t).call(this,e))).state={yaml:"",json:"",str:"",err:"",height:window.innerHeight,width:window.innerWidth},n.handleResize=n.handleResize.bind(Object(m.a)(n)),n.processYAML=n.processYAML.bind(Object(m.a)(n)),n}return Object(p.a)(t,e),Object(c.a)(t,[{key:"processYAML",value:function(e){var t="";try{t=He.a.parse(e),this.setState({yaml:e,json:t,str:JSON.stringify(t,void 0,4),err:""})}catch(n){this.setState(Object(i.a)({},this.state,{yaml:e,err:n}))}}},{key:"processURL",value:function(e){var t=this;try{fetch(e).then((function(e){return e.text()})).then((function(e){t.processYAML(e)}))}catch(n){console.log(n)}}},{key:"componentDidMount",value:function(){var e=this;window.addEventListener("resize",this.handleResize);try{fetch("https://s3.ap-south-1.amazonaws.com/surveykshan.com/Templates/sample.yml").then((function(e){return e.text()})).then((function(t){e.processYAML(t)}))}catch(t){console.log(t)}}},{key:"handleResize",value:function(){console.log("Roload"),this.setState(Object(i.a)({},this.state,{height:window.innerHeight,width:window.innerWidth}))}},{key:"componentWillUnmount",value:function(){console.log("Unmount "),window.removeEventListener("resize",this.handleResize)}},{key:"render",value:function(){var e=this;return r.a.createElement(Fe.a,null,r.a.createElement(ge.d,null,r.a.createElement(ge.b,{exact:!0,path:"/"},r.a.createElement(ge.a,{to:"/signin"})),r.a.createElement(ge.b,{exact:!0,path:"/signin",render:function(e){return r.a.createElement(Je,Object.assign({},e,{logo:Ye.a}))}}),r.a.createElement(ge.b,{exact:!0,path:"/preview",render:function(t){return r.a.createElement(Ce,Object.assign({},t,{logo:Ye.a,height:e.state.height,width:e.state.width,processYAML:e.processYAML,yaml:e.state.yaml,json:e.state.json,err:e.state.err,editor:!1}))}}),r.a.createElement(ge.b,{path:"/editor",render:function(t){return r.a.createElement(Be,Object.assign({},t,{logo:Ye.a,height:e.state.height,width:e.state.width,processYAML:e.processYAML,processURL:e.processURL,yaml:e.state.yaml,json:e.state.json,err:e.state.err,editor:!0}))}})))}}]),t}(r.a.Component),Ve=n(70),$e={loginError:null,user:{}},Xe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:$e,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"AUTH_SUCCESS":var n=Object(i.a)({},e,{loginError:"",user:t.data});return n;case"LOGIN_SUCCESS":var a=Object(i.a)({},e,{loginError:"",user:t.data});return a;case"LOGIN_FAILED":return Object(i.a)({},e,{loginError:"Invalid Email Address & Password combination. "});default:return e}},Ze={},et=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ze,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LOGOUT_SUCCESS":return Object(i.a)({},e,{logoutError:"",user:{}});case"LOGOUT_FAILED":return console.log("Logout failed"),Object(i.a)({},e,{logoutError:"Logout failed. Please try again. "});default:return e}},tt=Object(Ve.c)({signIn:Xe,signOut:et}),nt=function(e,t){return"LOGOUT_SUCCESS"===t.type&&(e=void 0),tt(e,t)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var at=n(210),rt=(n(665),n(211)),ot={aws_project_region:"us-east-1",aws_cognito_identity_pool_id:"us-east-1:1006d6a6-988e-4147-9b6e-f91c30b1e8dc",aws_cognito_region:"us-east-1",aws_user_pools_id:"us-east-1_X9iVkLiJO",aws_user_pools_web_client_id:"vmkv14tivuv757u86hhde21de",oauth:{},aws_content_delivery_bucket:"surveykshan.com-dev",aws_content_delivery_bucket_region:"us-east-1",aws_content_delivery_url:"https://dny8vau49u78p.cloudfront.net"};be.d.configure(ot);var st=Object(Ve.d)(nt,Object(Ve.a)(at.a));s.a.render(r.a.createElement(Ee.a,{store:st},r.a.createElement(Qe,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})),Object(rt.a)(window)}},[[228,1,2]]]);
//# sourceMappingURL=main.2ab0d9ff.chunk.js.map