import { ShapeOverlays } from "./waveAnimation"

let overlay;
let scrollY;
let interval;
const imageWrapper = document.getElementById("projectImageSlider");

const projectData = {
    wit: {
        title: "Wentworth Institute of Technology",
        year: 2016,
        images: [
            "assets/wit/wit.png",
            "assets/wit/wit2.png",
            "assets/wit/wit3.png",
        ],
        description:
            "This project was a full scale website re-design for the Wentworth Institute of Technology located in Boston, MA. This re-design involved working with members of the university to understand their goals and vision for the future of the school, as well as incorporating the existing branding and accessibility efforts.",
        description2:
            "Due to the scale of this project, I tried to create as many reusable components as possible to help speed up development and keep the user experience consistent. The designs had a number of similar components with slight differences, which made creating shared components a bit challenging. To solve this, I created various generic components with the common design elements that the other varying components could inherit from and extend.",
        technology: "HTML, CSS, Javascript, Drupal, PHP",
        link: "https://wit.edu/",
        role:
            "Converting designs into front-end templates and integrating them in the Drupal CMS.",
    },
    bbk: {
        title: "BBK Law",
        year: 2016,
        images: [
            "assets/bbk/bbk1.png",
            "assets/bbk/bbk2.png",
            "assets/bbk/bbk3.png",
        ],
        description:
            "This project involved creating a new front-end for Best, Best, and Krieger Attorneys and implementing it in the Kentico content management system. The focus of this project was creating a content-rich website that architects information in a manner that allowed users to easily find a lawyer for their needs.",
        description2:
            "This project went very smoothly right up until the deadline when the client announced that certain pages needed to be compliant with a few strict accessibility standards. Fortunately, most of this was built into the front-end templates from the start. After a brief accessibility audit and a few days of development, everything was ready to go.",
        technology: "HTML, CSS, Javascript, Kentico, C#",
        link: "https://www.bbklaw.com/",
        role:
            "Converting designs into front-end templates and integrating them in the Kentico CMS.",
    },
    devsamples: {
        title: "DevSamples",
        year: 2019,
        images: [
            "assets/devsamples/devsamples1.png",
            "assets/devsamples/devsamples2.png",
            "assets/devsamples/devsamples3.png",
        ],
        description:
            "Devsamples.com is a side project that I created to provide common code samples to other developers. I was working with React Native a lot during the creation of this project, and wanted a opportunity to switch back to web development to explore some of the latest web technologies and methodologies like React hooks, code splitting, service workers, etc.",
        description2:
            "This site is built in NextJS due to the SEO requirements, and also has a custom ExpressJS server to serve up static files like sitemaps, robots.txt, etc. The front-end is built in React, and makes use of the SanityIO CMS to provide the content for the site. One particular challenge was formatting and styling the code samples, which required a third party library and a few customizations to match the theme of the website.",
        technology:
            "HTML, CSS, Typescript, NextJS, ExpressJS, SanityIO, ScrollMagic",
        link: "https://www.devsamples.com/",
        role: "Design and Full-stack development of the entire site.",
    },
    arc: {
        title: "Arc Advisory Group",
        year: 2016,
        images: [
            "assets/arc/arc1.png",
            "assets/arc/arc2.png",
            "assets/arc/arc3.png",
        ],
        description:
            "The website for Arc Advisory Group was rebuilt from the ground up for this project. This rebuild involved consolidating all of the different services that Arc offered into a smaller number of easy to navigate pages. These pages were created with subtle yet fun interactions and animations, while also being generic enough to be easily extended and repurposed to include any type of content.",
        description2:
            "This client wanted a a very customizable CMS dashboard to allow them to build their own pages with existing components/widgets. This made for some interesting challenges, as we had to plan for and defend against a myriad of possibilities. To future-proof the front-end of this site, I set up a number of styles to enforce things like maximum heights/widths, overflow rules, margins/paddings etc. with the goal of preventing any content changes from breaking the layout of the site.",
        technology: "HTML, CSS, Javascript, Drupal, PHP",
        link: "https://www.arcweb.com/",
        role:
            "Converting designs into front-end templates and integrating them in the Drupal CMS.",
    },
    transitTracker: {
        backgroundZoom: "contain",
        title: "Transit Tracker",
        year: 2018,
        images: [
            "assets/transit-tracker/tracker1.jpg",
            "assets/transit-tracker/tracker2.jpg",
            "assets/transit-tracker/tracker3.jpg",
        ],
        description:
            "The MBTA Tracker Tracker project was a cross-platform React Native application to help users gain better insight into the status and location of MBTA vehicles. It was my first experience using React Native and was created to help gain familiarity with the framework.",
        description2:
            "The API provided by the MBTA was very easy to work with and provided a large array of data about the various vehicles, stops, and predictions. The nature of public transportation makes predicting arrival times and delays very difficult. To help improve this, I used a combination of data points including space between vehicles, vehicle speed, and direction to generate more informed predictions.",
        technology: "React Native, iOS, Android",
        link:
            "https://apps.apple.com/us/app/mbta-transit-tracker/id1419205434/",
        role:
            "Design, development, and deployment of the entire application.",
    },
    collaborationVisualizer: {
        title: "Github Collaboration Visualizer",
        year: 2019,
        images: [
            "assets/collaboration-visualizer/collaboration-visualizer1.png",
            "assets/collaboration-visualizer/collaboration-visualizer2.png",
            "assets/collaboration-visualizer/collaboration-visualizer3.png",
        ],
        description:
            "This project was inspired by the contribution graph on a Github user's profile. At the time, I was looking for an opportunity to get more experience with the ThreeJS library, and saw this as a great opportunity to create a more interactive version of this graph.",
        description2:
            "Using Github's API, a user can input the username of a Github account and view all of the commits that were made. This allows for a great view of a user's commitment activity and contributions over time.",
        technology: "HTML, CSS, Javascript, ThreeJS",
        link: "https://sconway.github.io/collaboration-visualizer/",
        role:
            "Design, development, and deployment of the entire application.",
    },
    covidTracker: {
        title: "COVID19 Tracker and Visualizer",
        year: 2020,
        images: [
            "assets/covid-tracker/covid-tracker-country.png",
            "assets/covid-tracker/covid-tracker-home.png",
            "assets/covid-tracker/covid-tracker-hover.png"
        ],
        description:
            "2024 Edit: The data for this visualization is no longer available. The COVID19 tracker project was built to help me gain experience with the Svelte Javascript framework, as well as to provide a means for seeing how many cases of the novel corona virus different countries were facing.",
        description2:
            "This project overlays an interactive map of the world's countries on a three dimensional globe, and displays data about each country as it is hovered over. The data is provided by an API that aggregates virus information from various trusted sources.",
        technology: "HTML, CSS, Javascript, SvelteJS, ThreeJS, D3JS",
        link: "https://sconway.github.io/covid-tracker/",
        role:
            "Development, deployment, and partial design.",
    },
    "3dPortfolio": {
        title: "3D Portfolio",
        year: 2024,
        images: [
            "assets/portfolio/portfolio1.png",
            "assets/portfolio/portfolio2.png",
            "assets/portfolio/portfolio3.png",
        ],
        description:
            "The initial portfolio that I created was a simple static site built with plain HTML, CSS, and Javascript. I had been playing around with WebGL at the time, and thought that a 3D version of this portfolio would be a fun project.",
        description2:
            "Aside from a few lines of HTML and CSS, the portfolio is built entirely with Javascript. Not the most accessible approach to building a website, but having all of the project source code consolodated to one file made for a surprisingly pleasant development experience.",
        technology: "HTML, CSS, Javascript, ThreeJS",
        link: "https://sconway.github.io/scrollable-3d-portfolio/dist/",
        role:
            "Design, development, and deployment of the entire application.",
    },
    tourDirector: {
        backgroundZoom: "contain",
        title: "EF Tour Director",
        year: 2019,
        images: [
            "assets/td/td1.jpg",
            "assets/td/td2.jpg",
            "assets/td/td3.jpg",
        ],
        description:
            "EF Tour Director is an application that I worked on with two other teammates as part of my current job. This application helps leaders of international and domestic tour groups manage their tours, and stay up to date with dynamic itineraries.",
        description2:
            "This React Navigation app is optimized for both iOS and Android devices, and makes use of various offline-first technologies.",
        technology:
            "React Native, iOS, Android, Typescript, AWS Appsync, AWS Amplify",
        link: "https://apps.apple.com/us/app/tour-director/id1459686277",
        role: "Development and deployment of application.",
    },
    traveller: {
        backgroundZoom: "contain",
        title: "EF Traveller",
        year: 2019,
        images: [
            "assets/traveller/traveller1.jpg",
            "assets/traveller/traveller2.jpg",
            "assets/traveller/traveller3.jpg",
        ],
        description:
            "EF Traveler is an application that I worked on with two other teammates as part of my current job. This application helps travellers on our domestic and international tours stay up to date with changing itinerary items.",
        description2:
            "This React Navigation app is optimized for both iOS and Android devices, and makes use of some custom authentication/autorization solutions.",
        technology: "React Native, iOS, Android, Typescript",
        link: "https://apps.apple.com/us/app/ef-traveler/id1458652828",
        role: "Development and deployment of application.",
    },
    worldTweets: {
        title: "World Tweets",
        year: 2016,
        images: [
            "assets/world-tweets/world-tweets1.png",
            "assets/world-tweets/world-tweets2.png",
            "assets/world-tweets/world-tweets3.png",
        ],
        description:
            "After learning about Twitter's API, I was looking for a project that would be a good use case for it, and this seemed like the perfect candidate. This project listens for any incoming tweets with geo data, and plots them on a 3D globe for users to interact with.",
        description2:
            "This web application uses an ExpressJS server to create a web socket connection with the client and then listens to incoming tweets from the Twitter API. These tweets are then piped to the client side application and shown on an interactive globe. This application is hosted on the free tier of Heroku, so it may take a minute for the server to boot up.",
        technology:
            "NodeJS, ExpressJS, SocketIO, HTML, CSS, Javascript, ThreeJS",
        link: "http://world-tweets.herokuapp.com/",
        role: "Design and development of entire application.",
    },
    fatherPeyton: {
        title: "HCFM Father Peyton",
        year: 2015,
        images: [
            "assets/fp/fp1.png",
            "assets/fp/fp2.png",
            "assets/fp/fp3.png",
            "assets/fp/fp4.png",
        ],
        description:
            "This project was created to honor the late priest Father Patrick Peyton of Holy Cross Family Ministries. The website functions as a biography for Father Peyton, showing all of the key moments of his career and his service to the world.",
        description2:
            "The website consists of a number of customizable pages, structured as chapters of a book, that show the progression and achievements of Father Peyton throughout his lifetime.",
        technology: "HTML, CSS, Javascript, Drupal, PHP",
        link: "https://www.fatherpeyton.org/",
        role:
            "Converting designs into front-end templates and integrating them in the Drupal CMS.",
    },
    "3dSnake": {
        title: "3D Game of Snake",
        year: 2019,
        images: [
            "assets/snake/snake1.png",
            "assets/snake/snake2.png",
            "assets/snake/snake3.png",
            "assets/snake/snake4.png",
        ],
        description:
            "This game is a 3-Dimensional take on the popular game 'Snake', and adds an extra layer of difficulty, while also giving the player some more room to move.",
        description2:
            "One of the big challenges with this game was allowing the user to stay spatially oriented while they moved along the z-axis. To work around this, I added mouse controls that would allow the user to change the game view and their perspective.",
        technology: "HTML, CSS, Javascript, ThreeJS",
        link: "https://sconway.github.io/3d-snake/",
        role: "Design and development of entire application.",
    },
    tree: {
        title: "Fractal Tree Animation",
        year: 2016,
        images: [
            "assets/tree/tree2.png",
            "assets/tree/tree1.png",
            "assets/tree/tree3.png",
        ],
        description:
            "This page was created as a fun project to experiment with creating fractals in the D3 Javascript Library.",
        description2:
            "Once the main fractal animation was completed, I thought that this could make a great loading animation or full screen takeover. To accomplish this, I treated every branch of the fractal tree as a panel that could cover the screen, and animated the panels into place.",
        technology: "HTML, CSS, Javascript, D3JS",
        link: "https://sconway.github.io/loading-tree",
        role: "Design and development of entire application.",
    },
};

function addListeners() {
    document.querySelectorAll(".project").forEach((project) => {
        project.addEventListener("click", handleProjectClick);
    });
    document
        .getElementById("projectClose")
        .addEventListener("click", handleProjectCloseClick);
    document
        .getElementById("projectCloseLink")
        .addEventListener("click", handleProjectCloseClick);
}

function removeChildren(parent) {
    while (parent.hasChildNodes()) {
        parent.removeChild(parent.lastChild);
    }
}

function preLoadImages(images) {
    for (let i = 0; i < images.length; i++) {
        const image = document.createElement("img");

        image.classList.add("hidden");
        image.src = images[i];

        imageWrapper.appendChild(image);
    }
}

function buildImageSlider(images, zoom) {
    for (let i = 0; i < images.length; i++) {
        const image = document.createElement("div");

        image.classList.add("project__details__image");
        image.style.backgroundImage = `url(${images[i]})`;
        image.style.backgroundSize = zoom || "100%";

        imageWrapper.appendChild(image);
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
    const elmOverlay = document.querySelector(".shape-overlays");
    overlay = new ShapeOverlays(elmOverlay);
    scrollY = window.pageYOffset;

    overlay.toggle();
    document.getElementById("projects").classList.add("animating");

    setTimeout(() => {
        document.body.style.position = "fixed";
        document.getElementById("projects").classList.add("active");
    }, 800);
}

function handleProjectClick(e) {
    const selectedProject = projectData[e.target.offsetParent.id];
    const projectTitle = document.getElementById("projectTitle");
    const projectDescription = document.getElementById(
        "projectDescription"
    );
    const projectDescription2 = document.getElementById(
        "projectDescription2"
    );
    const projectRole = document.getElementById("projectRole");
    const projectYear = document.getElementById("projectYear");
    const projectTechnologies = document.getElementById(
        "projectTechnologies"
    );
    const projectLink = document.getElementById("projectLink");

    toggleAnimations();

    if (selectedProject) {
        preLoadImages(selectedProject.images);
        buildImageSlider(
            selectedProject.images,
            selectedProject.backgroundZoom
        );

        projectTitle.innerHTML = selectedProject.title;
        projectDescription.innerHTML = selectedProject.description;
        projectDescription2.innerHTML = selectedProject.description2;
        projectYear.innerHTML = selectedProject.year;
        projectRole.innerHTML = selectedProject.role;
        projectTechnologies.innerHTML = selectedProject.technology;
        projectLink.href = selectedProject.link;

        animateSlider();
    }
}

function handleProjectCloseClick(e) {
    overlay.toggle();
    clearInterval(interval);
    removeChildren(imageWrapper);
    document
        .getElementById("projects")
        .classList.remove("active", "animating");
    document.body.style.position = "";
    window.scrollTo(0, scrollY);
}

addListeners();
