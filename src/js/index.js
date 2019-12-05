(function () {
    let group;
    let container;
    let controls;
    let particlesData = [];
    let camera, scene, renderer;
    let positions, colors;
    let particles;
    let pointCloud;
    let particlePositions;
    let linesMesh;
    let maxParticleCount = 200;
    let particleCount = 100;
    let mouse = new THREE.Vector2();
    let r = 1200;
    let rHalf = r / 2;
    let isOnscreen = true;
    let effectController = {
        showDots: true,
        showLines: true,
        minDistance: 150,
        limitConnections: false,
        maxConnections: 20,
        particleCount: 500
    };

    const controller = new ScrollMagic.Controller();

    function initWaveAnimation() {
        const images = [
            "build/assets/wave-1.png",
            "build/assets/wave-2.png",
            "build/assets/wave-3.png",
            "build/assets/wave-4.png",
            "build/assets/wave-5.png",
            "build/assets/wave-6.png",
            "build/assets/wave-7.png",
            "build/assets/wave-8.png",
            "build/assets/wave-9.png",
            "build/assets/wave-10.png",
            "build/assets/wave-11.png",
            "build/assets/wave-12.png",
            "build/assets/wave-13.png",
        ];
        const obj = { curImg: 0 };
        TweenMax.to(obj, 0.5,
            {
                curImg: images.length - 1, // animate propery curImg to number of images
                roundProps: "curImg",	   // only integers so it can be used as an array index
                repeat: 3,				   // repeat 3 times
                immediateRender: true,	   // load first image automatically
                ease: Linear.easeNone,	   // show every image the same ammount of time
                onUpdate: function () {
                    document.getElementById("introImage")
                        .setAttribute("src", images[obj.curImg])
                }
            }
        );
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
            .addIndicators()
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

    function pauseOffscreenAnimations() {
        const options = { threshold: 0.4 };
        const observer = new IntersectionObserver(handleAboutSectionOnScreen, options);
        const target = document.getElementById('intro');

        observer.observe(target);
    }

    function handleAboutSectionOnScreen(entries, observer) {
        isOnscreen = entries[0].isIntersecting;
        if (isOnscreen) animate();
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
        renderer.gammaInput = true;
        renderer.gammaOutput = true;
        container.appendChild(renderer.domElement);
    }

    function initListeners() {
        window.addEventListener('mousemove', onMouseMove, false);
        window.addEventListener('resize', onWindowResize, false);
        window.addEventListener("load", pauseOffscreenAnimations, false);
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
            color: 0xFFFFFF,
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

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
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

        if (isOnscreen) requestAnimationFrame(animate);

        render();
    }

    function render() {
        group.rotation.y += (mouse.x / 100);

        renderer.render(scene, camera);
    }

    initWaveAnimation();
    initHandMoveAnimation();
    initHeadingAnimation();
    initTextAnimation();
    initIntroPinAnimation();
    initCamera();
    init();
    initListeners();
    initRenderer();
    initParticles();
    initLines();
    animate();
})();