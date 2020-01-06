(function () {
    let group;
    let container;
    let deviceWidth = window.innerWidth;
    let particlesData = [];
    let camera, scene, renderer;
    let positions, colors;
    let particles;
    let pointCloud;
    let particlePositions;
    let linesMesh;
    let iterations = 0;
    let maxParticleCount = 200;
    let particleCount = 100;
    let mouse = new THREE.Vector2();
    let r = 1600;
    let rHalf = r / 2;
    let effectController = {
        showDots: true,
        showLines: true,
        minDistance: 250,
        limitConnections: false,
        maxConnections: 20,
        particleCount: 500
    };
    let controller = new ScrollMagic.Controller();

    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    function initWaveAnimation() {
        TweenMax.to("#introImage", 0.5, {
            ease: Linear.easeNone,
            rotation: 40,
            repeat: 5,
            yoyo: true
        })
    }

    function initHandMoveAnimation() {
        const slide = TweenMax.to("#introImage", 1, {
            x: -window.innerWidth,
            opacity: 0
        });

        new ScrollMagic.Scene({
            triggerElement: "#waveTrigger",
            offset: window.innerHeight / 2 + 200,
            duration: 400
        })
            .setTween(slide)
            .addTo(controller);
    }

    function initIntroPinAnimation() {
        new ScrollMagic.Scene({
            triggerElement: "#waveTrigger",
            offset: window.innerHeight / 2,
            duration: 1000
        })
            .setPin("#introContent")
            .addTo(controller);
    }

    function initHeadingAnimation() {
        const slide = TweenMax.to("#introHeading", 1, {
            x: window.innerWidth
        });

        new ScrollMagic.Scene({
            triggerElement: "#waveTrigger",
            offset: window.innerHeight / 2,
            duration: 400
        })
            .setTween(slide)
            .addTo(controller);
    }

    function addTextTween(element, x, y, rotation) {
        const charTween = TweenMax.to(element, 1, {
            x: x,
            y: y,
            opacity: 0,
            rotation: rotation
        });

        new ScrollMagic.Scene({
            triggerElement: "#waveTrigger",
            offset: window.innerHeight / 2 + 350,
            duration: 600
        })
            .setTween(charTween)
            .addTo(controller);
    }

    function initTextAnimation() {
        addTextTween("#headingString1", -window.innerWidth, -500, -100);
        addTextTween("#headingString2", -window.innerWidth, -1000, -80);
        addTextTween("#headingString3", window.innerWidth, -1000, 80);
        addTextTween("#headingString4", window.innerWidth, -500, 120);
        addTextTween("#headingString5", -window.innerWidth, 300, 100);
        addTextTween("#headingString6", window.innerWidth, 500, 180);
        addTextTween("#headingString7", window.innerWidth, 800, -180);
    }

    function addClassToggle(trigger, offset, element, className) {
        new ScrollMagic.Scene({
            triggerElement: trigger,
            offset: offset
        })
            .setClassToggle(element, className)
            .addTo(controller);
    }

    function pauseOffscreenAnimations() {
        const options = { threshold: 0.5 };
        const observer = new IntersectionObserver(handleAboutSectionOnScreen, options);
        const target = document.getElementById('intro');

        observer.observe(target);
    }

    function handleAboutSectionOnScreen(entries, observer) {
        if (entries[0].isIntersecting) {
            initRenderLoop();
        } else {
            renderer.setAnimationLoop(null)
        }
    }

    function setIntroOpacity() {
        if (window.devicePixelRatio < 2) {
            document.querySelector(".intro canvas").style.opacity = 0.5;
        }
    }

    /**
     * ========================= ThreeJS functions ==========================
     */
    function onMouseMove(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    }

    function initCamera() {
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 4000);
        camera.position.z = 1750;
    }

    function initRenderer() {
        container = document.getElementById('intro');
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x121212);
        renderer.gammaInput = true;
        renderer.gammaOutput = true;
        container.appendChild(renderer.domElement);
    }

    function initRenderLoop() {
        if (deviceWidth >= 768) {
            renderer.setAnimationLoop(() => {
                update();
                render();
            });
        } else {
            update();
            render();
        }
    }

    function handleWindowBlur() {
        renderer.setAnimationLoop(null);
    }

    function handleOrientation(event) {
        group.rotation.y += event.alpha;
    }

    function initListeners() {
        window.addEventListener('mousemove', onMouseMove, false);
        window.addEventListener('resize', resetScene, false);
        window.addEventListener("blur", handleWindowBlur, false);
        // let gyroscope = new Gyroscope({ frequency: 60 });

        // gyroscope.addEventListener('reading', e => {
        //     console.log("Angular velocity along the X-axis " + gyroscope.x);
        //     console.log("Angular velocity along the Y-axis " + gyroscope.y);
        //     console.log("Angular velocity along the Z-axis " + gyroscope.z);
        // });
        // gyroscope.start();
    }

    function init() {
        scene = new THREE.Scene();
        group = new THREE.Group();

        scene.add(group);
    }

    function initParticles() {
        let segments = maxParticleCount * maxParticleCount;
        positions = new Float32Array(segments * 3);
        colors = new Float32Array(segments * 3);
        let pMaterial = new THREE.PointsMaterial({
            color: 0x3fcaa3,
            size: 3,
            blending: THREE.AdditiveBlending,
            transparent: true,
            sizeAttenuation: false
        });
        particles = new THREE.BufferGeometry();
        particlePositions = new Float32Array(maxParticleCount * 3);

        for (let i = 0; i < maxParticleCount; i++) {
            let x = Math.random() * r - r / 2;
            let y = Math.random() * r - r / 2;
            let z = Math.random() * r - r / 2;
            particlePositions[i * 3] = x;
            particlePositions[i * 3 + 1] = y;
            particlePositions[i * 3 + 2] = z;
            // add it to the geometry
            particlesData.push({
                velocity: new THREE.Vector3(-1 + Math.random() * 2, -1 + Math.random() * 2, -1 + Math.random() * 2),
                numConnections: 0
            });
        }
        particles.setDrawRange(0, particleCount);
        particles.addAttribute('position', new THREE.BufferAttribute(particlePositions, 3).setDynamic(true));
        // create the particle system
        pointCloud = new THREE.Points(particles, pMaterial);
        group.add(pointCloud);
    }

    function initLines() {
        let geometry = new THREE.BufferGeometry();
        geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3).setDynamic(true));
        geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3).setDynamic(true));
        geometry.computeBoundingSphere();
        geometry.setDrawRange(0, 0);
        let material = new THREE.LineBasicMaterial({
            vertexColors: THREE.VertexColors,
            blending: THREE.AdditiveBlending,
            transparent: true
        });
        linesMesh = new THREE.LineSegments(geometry, material);
        group.add(linesMesh);
    }

    function update() {
        let vertexpos = 0;
        let colorpos = 0;
        let numConnected = 0;

        for (let i = 0; i < particleCount; i++)
            particlesData[i].numConnections = 0;

        for (let i = 0; i < particleCount; i++) {
            let particleData = particlesData[i];
            particlePositions[i * 3] += particleData.velocity.x;
            particlePositions[i * 3 + 1] += particleData.velocity.y;
            particlePositions[i * 3 + 2] += particleData.velocity.z;

            if (particlePositions[i * 3 + 1] < -rHalf || particlePositions[i * 3 + 1] > rHalf)
                particleData.velocity.y = -particleData.velocity.y;
            if (particlePositions[i * 3] < -rHalf || particlePositions[i * 3] > rHalf)
                particleData.velocity.x = -particleData.velocity.x;
            if (particlePositions[i * 3 + 2] < -rHalf || particlePositions[i * 3 + 2] > rHalf)
                particleData.velocity.z = -particleData.velocity.z;
            if (effectController.limitConnections && particleData.numConnections >= effectController.maxConnections)
                continue;

            // Check collision
            for (let j = i + 1; j < particleCount; j++) {
                let particleDataB = particlesData[j];

                if (effectController.limitConnections && particleDataB.numConnections >= effectController.maxConnections)
                    continue;

                let dx = particlePositions[i * 3] - particlePositions[j * 3];
                let dy = particlePositions[i * 3 + 1] - particlePositions[j * 3 + 1];
                let dz = particlePositions[i * 3 + 2] - particlePositions[j * 3 + 2];
                let dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (dist < effectController.minDistance) {
                    particleData.numConnections++;
                    particleDataB.numConnections++;
                    let alpha = 1.0 - dist / effectController.minDistance;
                    positions[vertexpos++] = particlePositions[i * 3];
                    positions[vertexpos++] = particlePositions[i * 3 + 1];
                    positions[vertexpos++] = particlePositions[i * 3 + 2];
                    positions[vertexpos++] = particlePositions[j * 3];
                    positions[vertexpos++] = particlePositions[j * 3 + 1];
                    positions[vertexpos++] = particlePositions[j * 3 + 2];
                    colors[colorpos++] = alpha;
                    colors[colorpos++] = alpha;
                    colors[colorpos++] = alpha;
                    colors[colorpos++] = alpha;
                    colors[colorpos++] = alpha;
                    colors[colorpos++] = alpha;
                    numConnected++;
                }
            }
        }

        linesMesh.geometry.setDrawRange(0, numConnected * 2);
        linesMesh.geometry.attributes.position.needsUpdate = true;
        linesMesh.geometry.attributes.color.needsUpdate = true;
        pointCloud.geometry.attributes.position.needsUpdate = true;

        iterations++;
    }

    function render() {
        group.rotation.y += (deviceWidth < 900 ? 0.001 : (mouse.x / 200));

        renderer.render(scene, camera);
    }

    var resetScene = debounce(function () {
        document.querySelector('.intro canvas').remove();

        controller = controller.destroy(true);
        controller = new ScrollMagic.Controller();
        deviceWidth = window.innerWidth;
        iterations = 0;
        group = null;
        container = null;
        controls = null;
        particlesData = [];
        camera = null;
        scene = null;
        renderer = null;
        positions = null;
        colors = null;
        particles = null;
        pointCloud = null;
        particlePositions = null;
        linesMesh = null;
        mouse = new THREE.Vector2();

        initScene();
        pauseOffscreenAnimations();
    }, 250);

    // ========================== ABOUT SECTION ==========================
    function getBarWidth() {
        if (deviceWidth > 1200) {
            return 600;
        } else if (deviceWidth > 900) {
            return 400;
        } else if (deviceWidth > 600) {
            return 420;
        } else if (deviceWidth > 330) {
            return 250;
        } else {
            return 200;
        }
    }

    function addTween(tween, offset, duration) {
        new ScrollMagic.Scene({
            triggerElement: "#graphTrigger",
            duration: duration,
            offset: offset
        })
            .setTween(tween)
            .addTo(controller);
    }

    function createCounterTween(number, element) {
        let counter = { var: 0 };
        const el = document.getElementById(element);

        return TweenMax.to(counter, 5, {
            var: number,
            onUpdate: function () {
                el.innerHTML = Math.ceil(counter.var);
            },
            // ease: Circ.easeOut
        });
    }

    function createGrowTween(item, width) {
        return TweenMax.to(item, 1, {
            rotationX: 140,
            width: width
        });
    }

    function createFadeTween(item) {
        return TweenMax.to(item, 1, { opacity: 1 })
    }

    function addGraphTweens() {
        // HTML
        addTween(createGrowTween("#htmlBar", getBarWidth() * 0.8), 0, 200);
        addTween(createCounterTween(80, "htmlPercentage"), 0, 200);
        addTween(createFadeTween("#htmlBarWrapper"), -20, 100);
        // CSS
        addTween(createGrowTween("#cssBar", getBarWidth() * 0.9), 50, 200);
        addTween(createCounterTween(90, "cssPercentage"), 50, 200);
        addTween(createFadeTween("#cssBarWrapper"), 30, 100);
        // JS
        addTween(createGrowTween("#jsBar", getBarWidth() * 0.9), 100, 200);
        addTween(createCounterTween(90, "jsPercentage"), 100, 200);
        addTween(createFadeTween("#jsBarWrapper"), 80, 100);
        // REACT
        addTween(createGrowTween("#reactBar", getBarWidth() * 0.95), 140, 200);
        addTween(createCounterTween(95, "reactPercentage"), 140, 200);
        addTween(createFadeTween("#reactBarWrapper"), 120, 100);
        // REACT NATIVE
        addTween(createGrowTween("#rnBar", getBarWidth() * 0.9), 180, 200);
        addTween(createCounterTween(90, "rnPercentage"), 180, 200);
        addTween(createFadeTween("#rnBarWrapper"), 160, 100);
        // NODE
        addTween(createGrowTween("#nodeBar", getBarWidth() * 0.6), 210, 200);
        addTween(createCounterTween(60, "nodePercentage"), 210, 200);
        addTween(createFadeTween("#nodeBarWrapper"), 190, 100);
        // NEXTJS
        addTween(createGrowTween("#nextBar", getBarWidth() * 0.7), 240, 200);
        addTween(createCounterTween(70, "nextPercentage"), 240, 200);
        addTween(createFadeTween("#nextBarWrapper"), 220, 100);
        // GRAPHQL
        addTween(createGrowTween("#graphqlBar", getBarWidth() * 0.6), 270, 200);
        addTween(createCounterTween(60, "graphqlPercentage"), 270, 200);
        addTween(createFadeTween("#graphqlBarWrapper"), 240, 100);
        // AWS
        addTween(createGrowTween("#typescriptBar", getBarWidth() * 0.7), 300, 200);
        addTween(createCounterTween(70, "typescriptPercentage"), 300, 200);
        addTween(createFadeTween("#typescriptBarWrapper"), 280, 100);
    }

    function initScene() {
        initWaveAnimation();
        initHandMoveAnimation();
        initHeadingAnimation();
        initTextAnimation();
        addClassToggle("#graphTrigger", 20, "#familiarTechnologies", "active");
        addClassToggle("#projects", 0, ".project", "active");
        initIntroPinAnimation();
        initCamera();
        init();
        initListeners();
        initRenderer();
        initParticles();
        initLines();
        initRenderLoop();
        addGraphTweens();
        setIntroOpacity();
    }

    function handleLoad() {
        const loadingScreen = document.getElementById("loadingScreen");
        loadingScreen.classList.add("active");

        initScene();
        pauseOffscreenAnimations();
    }

    window.addEventListener("load", handleLoad, false);
})();