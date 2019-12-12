(function () {
    let overlay;
    let scrollY;

    const projectData = {
        "wit": {
            "title": "Wentworth Institute of Technology",
            "year": 2016,
            "imagePath": "build/assets/wit.png",
            "description": "This project was a full scale re-design of the Wentworth Institute of Technology located in Boston, MA. This re-design involved working with members of the university to understand their goals and vision for the future of the school, as well as incorporating the existing branding and accessibility efforts.",
            "technology": "Drupal, HTML, CSS, Javascript"
        }
    };

    function addListeners() {
        document.querySelectorAll(".project").forEach(project => {
            project.addEventListener("click", handleProjectClick);
        });
        document.getElementById("projectClose").addEventListener("click", handleProjectCloseClick);
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
        const projectTitle = document.getElementById("projectTitle");
        const projectDescription = document.getElementById("projectDescription");
        const projectImage = document.getElementById("projectImage");
        const projectYear = document.getElementById("projectYear");
        const projectTechnologies = document.getElementById("projectTechnologies");

        toggleAnimations();

        if (selectedProject) {
            projectTitle.innerHTML = selectedProject.title;
            projectDescription.innerHTML = selectedProject.description;
            projectImage.src = selectedProject.imagePath;
            projectYear.innerHTML = selectedProject.year;
            projectTechnologies.innerHTML = selectedProject.technology;
        }
    }

    function handleProjectCloseClick(e) {
        overlay.toggle();
        document.getElementById("projects").classList.remove("active", "animating");
        document.body.style.position = '';
        window.scrollTo(0, scrollY);
    }

    addListeners();
})();