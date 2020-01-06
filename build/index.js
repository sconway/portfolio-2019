
const ease={exponentialIn:t=>0==t?t:Math.pow(2,10*(t-1)),exponentialOut:t=>1==t?t:1-Math.pow(2,-10*t),exponentialInOut:t=>0==t||1==t?t:t<.5?.5*Math.pow(2,20*t-10):-.5*Math.pow(2,10-20*t)+1,sineOut:t=>{return Math.sin(1.5707963267948966*t)},circularInOut:t=>t<.5?.5*(1-Math.sqrt(1-4*t*t)):.5*(Math.sqrt((3-2*t)*(2*t-1))+1),cubicIn:t=>t*t*t,cubicOut:t=>{const a=t-1;return a*a*a+1},cubicInOut:t=>t<.5?4*t*t*t:.5*Math.pow(2*t-2,3)+1,quadraticOut:t=>-t*(t-2),quarticOut:t=>Math.pow(t-1,3)*(1-t)+1};
!function(){let e,n,t,i,o,r,a,c,l,d,s,w=window.innerWidth,g=[],u=0,m=200,p=100,f=new THREE.Vector2,h=1600,E=h/2,y={showDots:!0,showLines:!0,minDistance:250,limitConnections:!1,maxConnections:20,particleCount:500},T=new ScrollMagic.Controller;function v(e,n,t,i){const o=TweenMax.to(e,1,{x:n,y:t,opacity:0,rotation:i});new ScrollMagic.Scene({triggerElement:"#waveTrigger",offset:window.innerHeight/2+350,duration:600}).setTween(o).addTo(T)}function B(e,n,t,i){new ScrollMagic.Scene({triggerElement:e,offset:n}).setClassToggle(t,i).addTo(T)}function H(){const e=new IntersectionObserver(S,{threshold:.5}),n=document.getElementById("intro");e.observe(n)}function S(e,n){e[0].isIntersecting?M():o.setAnimationLoop(null)}function x(e){f.x=e.clientX/window.innerWidth*2-1,f.y=-e.clientY/window.innerHeight*2+1}function M(){w>=768?o.setAnimationLoop(()=>{W(),C()}):(W(),C())}function R(){o.setAnimationLoop(null)}function W(){let e=0,n=0,t=0;for(let e=0;e<p;e++)g[e].numConnections=0;for(let i=0;i<p;i++){let o=g[i];if(d[3*i]+=o.velocity.x,d[3*i+1]+=o.velocity.y,d[3*i+2]+=o.velocity.z,(d[3*i+1]<-E||d[3*i+1]>E)&&(o.velocity.y=-o.velocity.y),(d[3*i]<-E||d[3*i]>E)&&(o.velocity.x=-o.velocity.x),(d[3*i+2]<-E||d[3*i+2]>E)&&(o.velocity.z=-o.velocity.z),!(y.limitConnections&&o.numConnections>=y.maxConnections))for(let c=i+1;c<p;c++){let l=g[c];if(y.limitConnections&&l.numConnections>=y.maxConnections)continue;let s=d[3*i]-d[3*c],w=d[3*i+1]-d[3*c+1],u=d[3*i+2]-d[3*c+2],m=Math.sqrt(s*s+w*w+u*u);if(m<y.minDistance){o.numConnections++,l.numConnections++;let s=1-m/y.minDistance;r[e++]=d[3*i],r[e++]=d[3*i+1],r[e++]=d[3*i+2],r[e++]=d[3*c],r[e++]=d[3*c+1],r[e++]=d[3*c+2],a[n++]=s,a[n++]=s,a[n++]=s,a[n++]=s,a[n++]=s,a[n++]=s,t++}}}s.geometry.setDrawRange(0,2*t),s.geometry.attributes.position.needsUpdate=!0,s.geometry.attributes.color.needsUpdate=!0,l.geometry.attributes.position.needsUpdate=!0,u++}function C(){e.rotation.y+=w<900?.001:f.x/200,o.render(i,t)}var P,b,A,L,D=(P=function(){document.querySelector(".intro canvas").remove(),T=T.destroy(!0),T=new ScrollMagic.Controller,w=window.innerWidth,u=0,e=null,n=null,controls=null,g=[],t=null,i=null,o=null,r=null,a=null,c=null,l=null,d=null,s=null,f=new THREE.Vector2,U(),H()},b=250,function(){var e=this,n=arguments,t=function(){L=null,A||P.apply(e,n)},i=A&&!L;clearTimeout(L),L=setTimeout(t,b),i&&P.apply(e,n)});function I(){return w>1200?600:w>900?400:w>600?420:w>330?250:200}function z(e,n,t){new ScrollMagic.Scene({triggerElement:"#graphTrigger",duration:t,offset:n}).setTween(e).addTo(T)}function q(e,n){let t={var:0};const i=document.getElementById(n);return TweenMax.to(t,5,{var:e,onUpdate:function(){i.innerHTML=Math.ceil(t.var)}})}function j(e,n){return TweenMax.to(e,1,{rotationX:140,width:n})}function G(e){return TweenMax.to(e,1,{opacity:1})}function U(){TweenMax.to("#introImage",.5,{ease:Linear.easeNone,rotation:40,repeat:5,yoyo:!0}),function(){const e=TweenMax.to("#introImage",1,{x:-window.innerWidth,opacity:0});new ScrollMagic.Scene({triggerElement:"#waveTrigger",offset:window.innerHeight/2+200,duration:400}).setTween(e).addTo(T)}(),function(){const e=TweenMax.to("#introHeading",1,{x:window.innerWidth});new ScrollMagic.Scene({triggerElement:"#waveTrigger",offset:window.innerHeight/2,duration:400}).setTween(e).addTo(T)}(),v("#headingString1",-window.innerWidth,-500,-100),v("#headingString2",-window.innerWidth,-1e3,-80),v("#headingString3",window.innerWidth,-1e3,80),v("#headingString4",window.innerWidth,-500,120),v("#headingString5",-window.innerWidth,300,100),v("#headingString6",window.innerWidth,500,180),v("#headingString7",window.innerWidth,800,-180),B("#graphTrigger",20,"#familiarTechnologies","active"),B("#projects",0,".project","active"),new ScrollMagic.Scene({triggerElement:"#waveTrigger",offset:window.innerHeight/2,duration:1e3}).setPin("#introContent").addTo(T),(t=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,4e3)).position.z=1750,i=new THREE.Scene,e=new THREE.Group,i.add(e),window.addEventListener("mousemove",x,!1),window.addEventListener("resize",D,!1),window.addEventListener("blur",R,!1),n=document.getElementById("intro"),(o=new THREE.WebGLRenderer({antialias:!0})).setPixelRatio(window.devicePixelRatio),o.setSize(window.innerWidth,window.innerHeight),o.setClearColor(1184274),o.gammaInput=!0,o.gammaOutput=!0,n.appendChild(o.domElement),function(){let n=m*m;r=new Float32Array(3*n),a=new Float32Array(3*n);let t=new THREE.PointsMaterial({color:4180643,size:3,blending:THREE.AdditiveBlending,transparent:!0,sizeAttenuation:!1});c=new THREE.BufferGeometry,d=new Float32Array(3*m);for(let e=0;e<m;e++){let n=Math.random()*h-h/2,t=Math.random()*h-h/2,i=Math.random()*h-h/2;d[3*e]=n,d[3*e+1]=t,d[3*e+2]=i,g.push({velocity:new THREE.Vector3(2*Math.random()-1,2*Math.random()-1,2*Math.random()-1),numConnections:0})}c.setDrawRange(0,p),c.addAttribute("position",new THREE.BufferAttribute(d,3).setDynamic(!0)),l=new THREE.Points(c,t),e.add(l)}(),function(){let n=new THREE.BufferGeometry;n.addAttribute("position",new THREE.BufferAttribute(r,3).setDynamic(!0)),n.addAttribute("color",new THREE.BufferAttribute(a,3).setDynamic(!0)),n.computeBoundingSphere(),n.setDrawRange(0,0);let t=new THREE.LineBasicMaterial({vertexColors:THREE.VertexColors,blending:THREE.AdditiveBlending,transparent:!0});s=new THREE.LineSegments(n,t),e.add(s)}(),M(),z(j("#htmlBar",.8*I()),0,200),z(q(80,"htmlPercentage"),0,200),z(G("#htmlBarWrapper"),-20,100),z(j("#cssBar",.9*I()),50,200),z(q(90,"cssPercentage"),50,200),z(G("#cssBarWrapper"),30,100),z(j("#jsBar",.9*I()),100,200),z(q(90,"jsPercentage"),100,200),z(G("#jsBarWrapper"),80,100),z(j("#reactBar",.95*I()),140,200),z(q(95,"reactPercentage"),140,200),z(G("#reactBarWrapper"),120,100),z(j("#rnBar",.9*I()),180,200),z(q(90,"rnPercentage"),180,200),z(G("#rnBarWrapper"),160,100),z(j("#nodeBar",.6*I()),210,200),z(q(60,"nodePercentage"),210,200),z(G("#nodeBarWrapper"),190,100),z(j("#nextBar",.7*I()),240,200),z(q(70,"nextPercentage"),240,200),z(G("#nextBarWrapper"),220,100),z(j("#graphqlBar",.6*I()),270,200),z(q(60,"graphqlPercentage"),270,200),z(G("#graphqlBarWrapper"),240,100),z(j("#typescriptBar",.7*I()),300,200),z(q(70,"typescriptPercentage"),300,200),z(G("#typescriptBarWrapper"),280,100),window.devicePixelRatio<2&&(document.querySelector(".intro canvas").style.opacity=.5)}window.addEventListener("load",(function(){document.getElementById("loadingScreen").classList.add("active"),U(),H()}),!1)}();
!function(){let e,t,i;const o=document.getElementById("projectImageSlider"),a={wit:{title:"Wentworth Institute of Technology",year:2016,images:["build/assets/wit/wit.png","build/assets/wit/wit2.png","build/assets/wit/wit3.png"],description:"This project was a full scale website re-design for the Wentworth Institute of Technology located in Boston, MA. This re-design involved working with members of the university to understand their goals and vision for the future of the school, as well as incorporating the existing branding and accessibility efforts.",description2:"Due to the scale of this project, I tried to create as many reusable components as possible to help speed up development and keep the user experience consistent. The designs had a number of similar components with slight differences, which made creating shared components a bit challenging. To solve this, I created various generic components with the common design elements that the other varying components could inherit from and extend.",technology:"HTML, CSS, Javascript, Drupal, PHP",link:"https://wit.edu/",role:"Converting designs into front-end templates and integrating them in the Drupal CMS."},bbk:{title:"BBK Law",year:2016,images:["build/assets/bbk/bbk1.png","build/assets/bbk/bbk2.png","build/assets/bbk/bbk3.png"],description:"This project involved creating a new front-end for Best, Best, and Krieger Attorneys and implementing it in the Kentico content management system. The focus of this project was creating a content-rich website that architects information in a manner that allowed users to easily find a lawyer for their needs.",description2:"This project went very smoothly right up until the deadline when the client announced that certain pages needed to be compliant with a few strict accessibility standards. Fortunately, most of this was built into the front-end templates from the start. After a brief accessibility audit and a few days of development, everything was ready to go.",technology:"HTML, CSS, Javascript, Kentico, C#",link:"https://www.bbklaw.com/",role:"Converting designs into front-end templates and integrating them in the Kentico CMS."},devsamples:{title:"DevSamples",year:2019,images:["build/assets/devsamples/devsamples1.png","build/assets/devsamples/devsamples2.png","build/assets/devsamples/devsamples3.png"],description:"Devsamples.com is a side project that I created to provide common code samples to other developers. I was working with React Native a lot during the creation of this project, and wanted a opportunity to switch back to web development to explore some of the latest web technologies and methodologies like React hooks, code splitting, service workers, etc.",description2:"This site is built in NextJS due to the SEO requirements, and also has a custom ExpressJS server to serve up static files like sitemaps, robots.txt, etc. The front-end is built in React, and makes use of the SanityIO CMS to provide the content for the site. One particular challenge was formatting and styling the code samples, which required a third party library and a few customizations to match the theme of the website.",technology:"HTML, CSS, Typescript, NextJS, ExpressJS, SanityIO, ScrollMagic",link:"https://www.devsamples.com/",role:"Design and Full-stack development of the entire site."},arc:{title:"Arc Advisory Group",year:2016,images:["build/assets/arc/arc1.png","build/assets/arc/arc2.png","build/assets/arc/arc3.png"],description:"The website for Arc Advisory Group was rebuilt from the ground up for this project. This rebuild involved consolidating all of the different services that Arc offered into a smaller number of easy to navigate pages. These pages were created with subtle yet fun interactions and animations, while also being generic enough to be easily extended and repurposed to include any type of content.",description2:"This client wanted a a very customizable CMS dashboard to allow them to build their own pages with existing components/widgets. This made for some interesting challenges, as we had to plan for and defend against a myriad of possibilities. To future-proof the front-end of this site, I set up a number of styles to enforce things like maximum heights/widths, overflow rules, margins/paddings etc. with the goal of preventing any content changes from breaking the layout of the site.",technology:"HTML, CSS, Javascript, Drupal, PHP",link:"https://www.arcweb.com/",role:"Converting designs into front-end templates and integrating them in the Drupal CMS."},transitTracker:{backgroundZoom:"contain",title:"Transit Tracker",year:2018,images:["build/assets/transit-tracker/tracker1.jpg","build/assets/transit-tracker/tracker2.jpg","build/assets/transit-tracker/tracker3.jpg"],description:"The MBTA Tracker Tracker project was a cross-platform React Native application to help users gain better insight into the status and location of MBTA vehicles. It was my first experience using React Native and was created to help gain familiarity with the framework.",description2:"The API provided by the MBTA was very easy to work with and provided a large array of data about the various vehicles, stops, and predictions. The nature of public transportation makes predicting arrival times and delays very difficult. To help improve this, I used a combination of data points including space between vehicles, vehicle speed, and direction to generate more informed predictions.",technology:"React Native, iOS, Android",link:"https://apps.apple.com/us/app/mbta-transit-tracker/id1419205434/",role:"Design, development, and deployment of the entire application."},collaborationVisualizer:{title:"Github Collaboration Visualizer",year:2019,images:["build/assets/collaboration-visualizer/collaboration-visualizer1.png","build/assets/collaboration-visualizer/collaboration-visualizer2.png","build/assets/collaboration-visualizer/collaboration-visualizer3.png"],description:"This project was inspired by the contribution graph on a Github user's profile. At the time, I was looking for an opportunity to get more experience with the ThreeJS library, and saw this as a great opportunity to create a more interactive version of this graph.",description2:"Using Github's API, a user can input the username of a Github account and view all of the commits that were made. This allows for a great view of a user's commitment activity and contributions over time.",technology:"HTML, CSS, Javascript, ThreeJS",link:"https://sconway.github.io/collaboration-visualizer/",role:"Design, development, and deployment of the entire application."},"3dPortfolio":{title:"3D Portfolio",year:2017,images:["build/assets/portfolio/portfolio1.png","build/assets/portfolio/portfolio2.png","build/assets/portfolio/portfolio3.png"],description:"The initial portfolio that I created was a simple static site built with plain HTML, CSS, and Javascript. I had been playing around with WebGL at the time, and thought that a 3D version of this portfolio would be a fun project.",description2:"Aside from a few lines of HTML and CSS, the portfolio is built entirely with Javascript. Not the most accessible approach to building a website, but having all of the project source code consolodated to one file made for a surprisingly pleasant development experience.",technology:"HTML, CSS, Javascript, ThreeJS",link:"http://sconway.github.io/three-js/portfolio/dist/",role:"Design, development, and deployment of the entire application."},tourDirector:{backgroundZoom:"contain",title:"EF Tour Director",year:2019,images:["build/assets/td/td1.jpg","build/assets/td/td2.jpg","build/assets/td/td3.jpg"],description:"EF Tour Director is an application that I worked on with two other teammates as part of my current job. This application helps leaders of international and domestic tour groups manage their tours, and stay up to date with dynamic itineraries.",description2:"This React Navigation app is optimized for both iOS and Android devices, and makes use of various offline-first technologies.",technology:"React Native, iOS, Android, Typescript, AWS Appsync, AWS Amplify",link:"https://apps.apple.com/us/app/tour-director/id1459686277",role:"Development and deployment of application."},traveller:{backgroundZoom:"contain",title:"EF Traveller",year:2019,images:["build/assets/traveller/traveller1.jpg","build/assets/traveller/traveller2.jpg","build/assets/traveller/traveller3.jpg"],description:"EF Traveler is an application that I worked on with two other teammates as part of my current job. This application helps travellers on our domestic and international tours stay up to date with changing itinerary items.",description2:"This React Navigation app is optimized for both iOS and Android devices, and makes use of some custom authentication/autorization solutions.",technology:"React Native, iOS, Android, Typescript",link:"https://apps.apple.com/us/app/ef-traveler/id1458652828",role:"Development and deployment of application."},worldTweets:{title:"World Tweets",year:2016,images:["build/assets/world-tweets/world-tweets1.png","build/assets/world-tweets/world-tweets2.png","build/assets/world-tweets/world-tweets3.png"],description:"After learning about Twitter's API, I was looking for a project that would be a good use case for it, and this seemed like the perfect candidate. This project listens for any incoming tweets with geo data, and plots them on a 3D globe for users to interact with.",description2:"This web application uses an ExpressJS server to create a web socket connection with the client and then listens to incoming tweets from the Twitter API. These tweets are then piped to the client side application and shown on an interactive globe. This application is hosted on the free tier of Heroku, so it may take a minute for the server to boot up.",technology:"NodeJS, ExpressJS, SocketIO, HTML, CSS, Javascript, ThreeJS",link:"http://world-tweets.herokuapp.com/",role:"Design and development of entire application."},ticTacReact:{title:"Tic Tac React",year:2016,images:["build/assets/tic-tac-toe/tic-tac-toe1.png","build/assets/tic-tac-toe/tic-tac-toe2.png","build/assets/tic-tac-toe/tic-tac-toe3.png"],description:"This project is a web based version of the timeless game, Tic Tac Toe. It was built at a time when I was first starting to work with the ReactJS framework, as well as NodeJS and websockets, and this project seemed like a great opportunity to combine these technologies.",description2:"The Node server opens a websocket connection with the connected client, and waits for another player to connect. When another client connects, the two clients are paired up and are able to play against each other in real time. This application is hosted on the free tier of Heroku, so it may take a minute for the server to boot up.",technology:"HTML, CSS, Javascript, React, NodeJS, SocketIO",link:"http://tic-tac-react.herokuapp.com/",role:"Design and development of entire application."},fatherPeyton:{title:"HCFM Father Peyton",year:2015,images:["build/assets/fp/fp1.png","build/assets/fp/fp2.png","build/assets/fp/fp3.png","build/assets/fp/fp4.png"],description:"This project was created to honor the late priest Father Patrick Peyton of Holy Cross Family Ministries. The website functions as a biography for Father Peyton, showing all of the key moments of his career and his service to the world.",description2:"The website consists of a number of customizable pages, structured as chapters of a book, that show the progression and achievements of Father Peyton throughout his lifetime.",technology:"HTML, CSS, Javascript, Drupal, PHP",link:"https://www.fatherpeyton.org/",role:"Converting designs into front-end templates and integrating them in the Drupal CMS."},"3dSnake":{title:"3D Game of Snake",year:2019,images:["build/assets/snake/snake1.png","build/assets/snake/snake2.png","build/assets/snake/snake3.png","build/assets/snake/snake4.png"],description:"This game is a 3-Dimensional take on the popular game 'Snake', and adds an extra layer of difficulty, while also giving the player some more room to move.",description2:"One of the big challenges with this game was allowing the user to stay spatially oriented while they moved along the z-axis. To work around this, I added mouse controls that would allow the user to change the game view and their perspective.",technology:"HTML, CSS, Javascript, ThreeJS",link:"https://sconway.github.io/3d-snake/",role:"Design and development of entire application."},tree:{title:"Fractal Tree Animation",year:2016,images:["build/assets/tree/tree2.png","build/assets/tree/tree1.png","build/assets/tree/tree3.png"],description:"This page was created as a fun project to experiment with creating fractals in the D3 Javascript Library.",description2:"Once the main fractal animation was completed, I thought that this could make a great loading animation or full screen takeover. To accomplish this, I treated every branch of the fractal tree as a panel that could cover the screen, and animated the panels into place.",technology:"HTML, CSS, Javascript, D3JS",link:"https://sconway.github.io/loading-tree",role:"Design and development of entire application."}};function s(s){const n=a[s.target.offsetParent.id],r=document.getElementById("projectTitle"),l=document.getElementById("projectDescription"),c=document.getElementById("projectDescription2"),d=document.getElementById("projectRole"),p=document.getElementById("projectYear"),h=document.getElementById("projectTechnologies"),g=document.getElementById("projectLink");!function(){const i=document.querySelector(".shape-overlays");e=new ShapeOverlays(i),t=window.pageYOffset,e.toggle(),document.getElementById("projects").classList.add("animating"),setTimeout(()=>{document.body.style.position="fixed",document.getElementById("projects").classList.add("active")},800)}(),n&&(function(e){for(let t=0;t<e.length;t++){const i=document.createElement("img");i.classList.add("hidden"),i.src=e[t],o.appendChild(i)}}(n.images),function(e,t){for(let i=0;i<e.length;i++){const a=document.createElement("div");a.classList.add("project__details__image"),a.style.backgroundImage=`url(${e[i]})`,a.style.backgroundSize=t||"100%",o.appendChild(a)}}(n.images,n.backgroundZoom),r.innerHTML=n.title,l.innerHTML=n.description,c.innerHTML=n.description2,p.innerHTML=n.year,d.innerHTML=n.role,h.innerHTML=n.technology,g.href=n.link,function(){const e=document.querySelectorAll(".project__details__image");let t=0;e[0].classList.add("active"),i=setInterval(()=>{t++,e[(t-1)%e.length].classList.remove("active"),e[t%e.length].classList.add("active")},4e3)}())}function n(a){e.toggle(),clearInterval(i),function(e){for(;e.hasChildNodes();)e.removeChild(e.lastChild)}(o),document.getElementById("projects").classList.remove("active","animating"),document.body.style.position="",window.scrollTo(0,t)}document.querySelectorAll(".project").forEach(e=>{e.addEventListener("click",s)}),document.getElementById("projectClose").addEventListener("click",n)}();
class ShapeOverlays{constructor(t){this.elm=t,this.path=t.querySelectorAll("path"),this.numPoints=85,this.duration=300,this.delayPointsArray=[],this.delayPointsMax=300,this.delayPerPath=150,this.timeStart=Date.now(),this.isOpened=!1,this.isAnimating=!1}toggle(){this.isAnimating=!0;for(var t=0;t<this.numPoints;t++)this.delayPointsArray[t]=Math.random()*this.delayPointsMax;!1===this.isOpened?this.open():this.close()}open(){this.isOpened=!0,this.elm.classList.add("is-opened"),this.timeStart=Date.now(),this.renderLoop()}close(){this.isOpened=!1,this.elm.classList.remove("is-opened"),this.timeStart=Date.now(),this.renderLoop()}updatePath(t){const i=[];for(var s=0;s<this.numPoints;s++)i[s]=100*(1-ease.cubicInOut(Math.min(Math.max(t-this.delayPointsArray[s],0)/this.duration,1)));let e="";e+=this.isOpened?`M 0 0 H ${i[0]}`:`M ${i[0]} 0`;for(s=0;s<this.numPoints-1;s++){const t=(s+1)/(this.numPoints-1)*100,h=t-1/(this.numPoints-1)*100/2;e+=`C ${i[s]} ${h} ${i[s+1]} ${h} ${i[s+1]} ${t} `}return e+=this.isOpened?"H 100 V 0":"H 0 V 0"}render(){if(this.isOpened)for(var t=0;t<this.path.length;t++)this.path[t].setAttribute("d",this.updatePath(Date.now()-(this.timeStart+this.delayPerPath*t)));else for(t=0;t<this.path.length;t++)this.path[t].setAttribute("d",this.updatePath(Date.now()-(this.timeStart+this.delayPerPath*(this.path.length-t-1))))}renderLoop(){this.render(),Date.now()-this.timeStart<this.duration+this.delayPerPath*(this.path.length-1)+this.delayPointsMax?requestAnimationFrame(()=>{this.renderLoop()}):this.isAnimating=!1}}