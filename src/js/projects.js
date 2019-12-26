(function () {
    let overlay;
    let scrollY;
    let interval;

    const projectData = {
        "wit": {
            "title": "Wentworth Institute of Technology",
            "year": 2016,
            "images": [
                "build/assets/wit/wit.png",
                "build/assets/wit/wit2.png",
                "build/assets/wit/wit3.png",
            ],
            "description": "This project was a full scale re-design of the Wentworth Institute of Technology located in Boston, MA. This re-design involved working with members of the university to understand their goals and vision for the future of the school, as well as incorporating the existing branding and accessibility efforts.",
            "description2": "Due to the scale of this project, I tried to create as many reusable components as possible to help speed up development and keep the user experience consistent. The designs had a number of similar components with slight differences, which made creating shared components a bit challenging. To solve this, I created various generic components with the common design elements that the other varying components could inherit from and extend.",
            "technology": "Drupal, HTML, CSS, Javascript",
            "link": "https://wit.edu/",
            "role": "Converting designs into front-end templates and integrating them in the Drupal CMS."
        },
        "bbk": {
            "title": "BBK Law",
            "year": 2016,
            "images": [
                "build/assets/bbk/bbk1.png",
                "build/assets/bbk/bbk2.png",
                "build/assets/bbk/bbk3.png",
            ],
            "description": "This project involved creating a new front-end for Best, Best, and Krieger Attorneys and implementing it in the Kentico content management system. The focus of this project was creating a content-rich website that architected information in a manner that allowed users to easily find a lawyer for their needs.",
            "description2": "This project went very smoothly right up until the deadline when the client announced that certain pages needed to be compliant with a few strict accessibilituy standards. Fortunately, most of this was built into the front-end templates from the start. After a brief accessibility audit and a few days of development, everything was ready to go.",
            "technology": "HTML, CSS, Javascript, Kentico",
            "link": "https://www.bbklaw.com/",
            "role": "Converting designs into front-end templates and integrating them in the Kentico CMS."
        },
        "devsamples": {
            "title": "DevSamples",
            "year": 2019,
            "images": [
                "build/assets/devsamples/devsamples1.png",
                "build/assets/devsamples/devsamples2.png",
                "build/assets/devsamples/devsamples3.png",
            ],
            "description": "Devsamples.com is a side project that I created to provide common code samples to other developers. I was working with React Native a lot during the creation of this project, and wanted a opportunity to explore some of the latest web technologies and methodologies like React hooks, code splitting, service workers, etc.",
            "description2": "",
            "technology": "HTML, CSS, Javascript, NextJS, ExpressJS",
            "link": "https://www.devsamples.com/",
            "role": "Design and Full-stack development of the entire site."
        },
        "arc": {
            "title": "Arc Advisory Group",
            "year": 2016,
            "images": [
                "build/assets/arc/arc1.png",
                "build/assets/arc/arc2.png",
                "build/assets/arc/arc3.png",
            ],
            "description": "The website for Arc Advisory Group was rebuilt from the ground up for this project. This rebuild involved consolidating all of the different services that Arc offered into a smaller number of easy to navigate pages. These pages were created with subtle yet fun interactions and animations, while also being generic enough to be easily extended and repurposed to include any type of content.",
            "description2": "",
            "technology": "HTML, CSS, Javascript, Kentico",
            "link": "https://www.arcweb.com/",
            "role": "Converting designs into front-end templates and integrating them in the Kentico CMS."
        },
        "transitTracker": {
            "title": "Transit Tracker",
            "year": 2018,
            "images": [
                "build/assets/transit-tracker/tracker1.jpg",
                "build/assets/transit-tracker/tracker2.jpg",
                "build/assets/transit-tracker/tracker3.jpg",
            ],
            "description": "The MBTA Tracker Tracker project was a cross-platform React Native application to help users gain better insight into the status and location of MBTA vehicles. It was my first experience using React Native and was created to help gain familiarity with the framework.",
            "description2": "",
            "technology": "React Native, iOS, Android",
            "link": "https://apps.apple.com/us/app/mbta-transit-tracker/id1419205434/",
            "role": "Design, development, and deployment of the entire application."
        },
        "collaborationVisualizer": {
            "title": "Github Collaboration Visualizer",
            "year": 2019,
            "images": [
                "build/assets/collaboration-visualizer/collaboration-visualizer1.png",
                "build/assets/collaboration-visualizer/collaboration-visualizer2.png",
                "build/assets/collaboration-visualizer/collaboration-visualizer3.png",
            ],
            "description": "This project was inspired by the contribution graph on a Github user's profile. At the time, I was looking for an opportunity to get more experience with the ThreeJS library, and saw this as a great opportunity to create a more interactive version of this graph.",
            "description2": "Using Github's API, a user can input the username of a Github account and view all of the commits that were made. This allows for a great view of a user's commitment activity contributions over time.",
            "technology": "HTML, CSS, Javascript, ThreeJS",
            "link": "https://sconway.github.io/collaboration-visualizer/",
            "role": "Design, development, and deployment of the entire application."
        },
        "3dPortfolio": {
            "title": "Github Collaboration Visualizer",
            "year": 2017,
            "images": [
                "build/assets/collaboration-visualizer/collaboration-visualizer1.png",
                "build/assets/collaboration-visualizer/collaboration-visualizer2.png",
                "build/assets/collaboration-visualizer/collaboration-visualizer3.png",
            ],
            "description": "The initial portfolio that I created was a simple static site build with plain HTML, CSS, and Javascript. I had been playing around with WebGL at the time, and thought that a 3D version of this portfolio would be a fun project.",
            "description2": "Aside from a few lines of HTML and CSS, the portfolio is built entirely with Javascript. Not the most accessible approach to building a website, but having all of the project source code consolodated to one file made for a surprisingly pleasant development experience.",
            "technology": "HTML, CSS, Javascript, ThreeJS",
            "link": "http://sconway.github.io/three-js/portfolio/dist/",
            "role": "Design, development, and deployment of the entire application."
        },
        "tourDirector": {
            "title": "EF Tour Director",
            "year": 2019,
            "images": [
                "build/assets/collaboration-visualizer/collaboration-visualizer1.png",
                "build/assets/collaboration-visualizer/collaboration-visualizer2.png",
                "build/assets/collaboration-visualizer/collaboration-visualizer3.png",
            ],
            "description": "EF Tour Director is an application that I worked on with two other teammates as part of my current job. This application helps leaders of international and domestic tour groups manage their tours, and stay up to date with dynamic itineraries.",
            "description2": "This React Navigation app is optimized for both iOS and Android devices, and makes use of various offline-first technologies.",
            "technology": "React Native, iOS, Android, AWS Appsync, AWS Amplify",
            "link": "https://apps.apple.com/us/app/tour-director/id1459686277",
            "role": "Development and deployment of application."
        },
        "traveler": {
            "title": "EF Traveller",
            "year": 2019,
            "images": [
                "build/assets/traveller/traveller1.png",
                "build/assets/traveller/traveller2.png",
                "build/assets/traveller/traveller3.png",
            ],
            "description": "EF Traveler is an application that I worked on with two other teammates as part of my current job. This application helps travellers on our domestic and international tours stay up to date with changing itinerary items.",
            "description2": "This React Navigation app is optimized for both iOS and Android devices, and makes use of some custom authentication/autorization solutions.",
            "technology": "React Native, iOS, Android",
            "link": "https://apps.apple.com/us/app/ef-traveler/id1458652828",
            "role": "Development and deployment of application."
        },
        "worldTweets": {
            "title": "World Tweets",
            "year": 2016,
            "images": [
                "build/assets/world-tweets/world-tweets1.png",
                "build/assets/world-tweets/world-tweets2.png",
                "build/assets/world-tweets/world-tweets3.png",
            ],
            "description": "After learning about Twitter's API, I was looking for a project that would be a good use case for it, and this seemed like the perfect candidate. This project listens for any incoming tweets with geo data, and plots them on a 3D globe for users to interact with.",
            "description2": "This web application uses an ExpressJS server to create a web socket connection with the client and then listens to incoming tweets from the Twitter API. These tweets are then piped to the client side application and shown on an interactive globe.",
            "technology": "NodeJS, ExpressJS, SocketIO, HTML, CSS, Javascript, ThreeJS",
            "link": "http://world-tweets.herokuapp.com/",
            "role": "Design and development of entire application."
        },
        "ticTacReact": {
            "title": "Tic Tac React",
            "year": 2016,
            "images": [
                "build/assets/arc/arc1.png",
                "build/assets/arc/arc2.png",
                "build/assets/arc/arc3.png",
            ],
            "description": "This project is a web based version of the timeless game, Tic Tac Toe. It was built at a time when I was first starting to work with the ReactJS framework, as well as NodeJS and websockets, and this project seemed like a great opportunity to combine these technologies.",
            "description2": "The Node server opens a websocket connection with the connected client, and waits for another player to connect. When another client connects, the two clients are paired up and are able to play against each other in real time.",
            "technology": "HTML, CSS, Javascript, React, NodeJS, SocketIO",
            "link": "http://tic-tac-react.herokuapp.com/",
            "role": "Design and development of entire application."
        },
        "fatherPeyton": {
            "title": "HCFM Father Peyton",
            "year": 2015,
            "images": [
                "build/assets/fp/fp1.png",
                "build/assets/fp/fp2.png",
                "build/assets/fp/fp3.png",
                "build/assets/fp/fp4.png",
            ],
            "description": "This project Was created to honor the late priest Father Patrick Peyton of Holy Cross Family Ministeries. The website functions as a biography for Father Peyton, showing all of the key moments of his career and his service to the world.",
            "description2": "The website consists of a number of customizable pages, structured as chapters of a book, that show the progression and acheivements of Father Peyton throughout his lifetime.",
            "technology": "HTML, CSS, Javascript, Drupal",
            "link": "https://www.fatherpeyton.org/",
            "role": "Converting designs into front-end templates and integrating them in the Drupal CMS."
        },
        "3dSnake": {
            "title": "HCFM Father Peyton",
            "year": 2015,
            "images": [
                "build/assets/fp/fp1.png",
                "build/assets/fp/fp2.png",
                "build/assets/fp/fp3.png",
                "build/assets/fp/fp4.png",
            ],
            "description": "This project Was created to honor the late priest Father Patrick Peyton of Holy Cross Family Ministeries. The website functions as a biography for Father Peyton, showing all of the key moments of his career and his service to the world.",
            "description2": "The website consists of a number of customizable pages, structured as chapters of a book, that show the progression and acheivements of Father Peyton throughout his lifetime.",
            "technology": "HTML, CSS, Javascript, Drupal",
            "link": "https://www.fatherpeyton.org/",
            "role": "Converting designs into front-end templates and integrating them in the Drupal CMS."
        },
    };

    function addListeners() {
        document.querySelectorAll(".project").forEach(project => {
            project.addEventListener("click", handleProjectClick);
        });
        document.getElementById("projectClose").addEventListener("click", handleProjectCloseClick);
    }

    function buildImageSlider(images) {
        const imageWrapper = document.getElementById("projectImageSlider");

        for (let i = 0; i < images.length; i++) {
            const image = document.createElement("div");

            image.classList.add("project__details__image");
            image.style.backgroundImage = `url(${images[i]})`;

            imageWrapper.appendChild(image);
        }
    }

    function removeImages() {
        const images = document.querySelectorAll(".project__details__image");
        const imageWrapper = document.getElementById("projectImageSlider");

        for (let i = 0; i < images.length; i++) {
            imageWrapper.removeChild(images[i]);
        }
    }

    function animateSlider() {
        const images = document.querySelectorAll(".project__details__image");
        let iterations = 0;

        images[0].classList.add("active");

        interval = setInterval(() => {
            iterations++;
            images[(iterations - 1) % images.length].classList.remove("active");
            images[iterations % images.length].classList.add("active");
        }, 4000);

    }

    function toggleAnimations() {
        const elmOverlay = document.querySelector('.shape-overlays');
        overlay = new ShapeOverlays(elmOverlay);
        scrollY = window.pageYOffset;

        overlay.toggle();
        document.getElementById("projects").classList.add("animating");

        setTimeout(() => {
            document.body.style.position = 'fixed';
            document.getElementById("projects").classList.add("active");
        }, 800);
    }

    function handleProjectClick(e) {
        const selectedProject = projectData[e.target.offsetParent.id];
        console.log("selected project", e)
        const projectTitle = document.getElementById("projectTitle");
        const projectDescription = document.getElementById("projectDescription");
        const projectImage = document.getElementById("projectImage");
        const projectYear = document.getElementById("projectYear");
        const projectTechnologies = document.getElementById("projectTechnologies");

        toggleAnimations();

        if (selectedProject) {
            buildImageSlider(selectedProject.images);

            projectTitle.innerHTML = selectedProject.title;
            projectDescription.innerHTML = selectedProject.description;
            // projectImage.src = selectedProject.imagePath;
            projectYear.innerHTML = selectedProject.year;
            projectTechnologies.innerHTML = selectedProject.technology;

            animateSlider();
        }
    }

    function handleProjectCloseClick(e) {
        overlay.toggle();
        clearInterval(interval);
        removeImages();
        document.getElementById("projects").classList.remove("active", "animating");
        document.body.style.position = '';
        window.scrollTo(0, scrollY);
    }

    addListeners();
})();