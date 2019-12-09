(function () {
    const projectData = {
        "wit": {
            "title": "Wentworth Institute of Technology",
            "year": 2016,
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

    function handleProjectClick(e) {
        const selectedProject = projectData[e.target.offsetParent.id];
        const projectTitle = document.getElementById("projectTitle");

        document.getElementById("projectDetails").classList.add("active");

        if (selectedProject) {
            projectTitle.innerHTML = selectedProject.title;

        }
    }

    function handleProjectCloseClick(e) {
        // console.log("CLICK: ", e)
        document.getElementById("projectDetails").classList.remove("active");
    }

    addListeners();
})();