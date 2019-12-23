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
            "description2": "",
            "technology": "Drupal, HTML, CSS, Javascript",
            "link": "https://wit.edu/"
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
            "description2": "",
            "technology": "HTML, CSS, Javascript, Kentico",
            "link": "https://www.bbklaw.com/"
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
            "link": "https://www.devsamples.com/"
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
            "link": "https://www.arcweb.com/"
        },
        "transitTracker": {
            "title": "Transit Tracker",
            "year": 2018,
            "images": [
                "build/assets/transit-tracker/transit1.png",
                "build/assets/transit-tracker/transit2.png",
                "build/assets/transit-tracker/transit3.png",
            ],
            "description": "The MBTA Tracker Tracker project was a cross-platform React Native application to help users gain better insight into the status and location of MBTA vehicles. It was my first experience using React Native and was created to help gain familiarity with the framework.",
            "description2": "",
            "technology": "React Native, iOS, Android",
            "link": "https://www.arcweb.com/"
        },
        "worldTweets": {
            "title": "World Tweets",
            "year": 2016,
            "images": [
                "build/assets/arc/arc1.png",
                "build/assets/arc/arc2.png",
                "build/assets/arc/arc3.png",
            ],
            "description": "The website for Arc Advisory Group was rebuilt from the ground up for this project. This rebuild involved consolidating all of the different services that Arc offered into a smaller number of easy to navigate pages. These pages were created with subtle yet fun interactions and animations, while also being generic enough to be easily extended and repurposed to include any type of content.",
            "description2": "",
            "technology": "HTML, CSS, Javascript, Kentico",
            "link": "http://world-tweets.herokuapp.com/"
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