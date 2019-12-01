(function () {
    var container,
        camera,
        font,
        scene,
        shape,
        label1,
        percentage1,
        percentage2,
        percentage3,
        percentage4,
        percentage5,
        percentage6,
        percentage7,
        percentage8,
        percentage9,
        shape2,
        label2,
        shape3,
        label3,
        shape4,
        label4,
        shape5,
        label5,
        shape6,
        label6,
        shape7,
        label7,
        shape8,
        label8,
        shape9,
        label9,
        deviceHeight = window.innerHeight,
        deviceWidth = window.innerWidth,
        controller = new ScrollMagic.Controller(),
        renderer;

    function toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    function initRenderer() {
        container = document.getElementById("graph");
        renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        renderer.setClearColor(0xc6c6c6, 0);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(deviceWidth, deviceHeight);

        container.appendChild(renderer.domElement);
    }

    function initCamera() {
        camera = new THREE.PerspectiveCamera(
            20,
            deviceWidth / deviceHeight,
            1,
            20000
        );
        camera.position.set(200, 100, 1000);
    }

    function initScene() {
        // controls = new THREE.OrbitControls(camera, renderer.domElement);
        // controls.enablePan = false;
        raycaster = new THREE.Raycaster();
        scene = new THREE.Scene();

        var ambientLight = new THREE.AmbientLight(0x111111);
        var light = new THREE.PointLight(0xffffff);
        light.castShadow = true;
        light.position.set(20, 500, 50);
        scene.add(ambientLight);
        scene.add(light);
    }

    function createPlaneMaterial() {
        return new THREE.MeshLambertMaterial({
            color: new THREE.Color(0xa1a1a1),
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0,
            emissive: new THREE.Color(0x666666)
        });
    }

    function generateFont() {
        var loader = new THREE.FontLoader();
        loader.load('build/assets/droid-font.json', function (loadedFont) {
            font = loadedFont;
            init();
        });
    }

    function createLabel(label) {
        var labelGeometry = new THREE.TextBufferGeometry(label, {
            font: font,
            size: deviceWidth < 768 ? 8 : 10,
            height: deviceWidth < 768 ? 10 : 10
        });
        // labelGeometry.computeBoundingSphere();
        var textMaterial = new THREE.MeshPhongMaterial({
            color: new THREE.Color(0x000000),
            transparent: true,
            opacity: 0
        });

        return new THREE.Mesh(labelGeometry, textMaterial);
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

    function createGrowTween(item) {
        return TweenMax.to(item, 1, { z: 1 });
    }

    function createTranslateTween(item, newX) {
        return TweenMax.to(item, 1, { x: newX });
    }

    function createFadeTween(item) {
        return TweenMax.to(item, 1, { opacity: 1 })
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

    function initGraphTween() {
        addTween(createGrowTween(shape.scale), 0, 100);
        addTween(createTranslateTween(shape.position, deviceWidth < 768 ? 19.5 : 59), 0, 100);
        addTween(createTranslateTween(percentage1.position, deviceWidth < 768 ? 75 : 155), 0, 100);
        // addTween(createCounterTween(80, "htmlPercentage"), 0, 100);
        addTween(createFadeTween(shape.material), 0, 5);
        addTween(createFadeTween(label1.material), -10, 50);
        addTween(createFadeTween(percentage1.material), -10, 50);
        addTween(createGrowTween(shape2.scale), 60, 100);
        addTween(createTranslateTween(percentage2.position, deviceWidth < 768 ? 75 : 163), 60, 100);
        addTween(createTranslateTween(shape2.position, deviceWidth < 768 ? 22 : 64), 60, 100);
        // addTween(createCounterTween(90, "cssPercentage"), 60, 100);
        addTween(createFadeTween(shape2.material), 60, 5);
        addTween(createFadeTween(label2.material), 40, 50);
        addTween(createFadeTween(percentage2.material), 40, 50);
        addTween(createGrowTween(shape3.scale), 120, 100);
        addTween(createTranslateTween(shape3.position, deviceWidth < 768 ? 22 : 64), 120, 100);
        addTween(createTranslateTween(percentage3.position, deviceWidth < 768 ? 75 : 163), 120, 100);
        // addTween(createCounterTween(90, "jsPercentage"), 120, 100);
        addTween(createFadeTween(shape3.material), 120, 5);
        addTween(createFadeTween(label3.material), 100, 50);
        addTween(createFadeTween(percentage3.material), 100, 50);
        addTween(createGrowTween(shape4.scale), 160, 100);
        addTween(createTranslateTween(shape4.position, deviceWidth < 768 ? 24.5 : 69), 160, 100);
        addTween(createTranslateTween(percentage4.position, deviceWidth < 768 ? 78 : 171), 160, 100);
        // addTween(createCounterTween(95, "reactPercentage"), 160, 100);
        addTween(createFadeTween(shape4.material), 160, 5);
        addTween(createFadeTween(label4.material), 140, 50);
        addTween(createFadeTween(percentage4.material), 140, 50);
        addTween(createGrowTween(shape5.scale), 195, 100);
        addTween(createTranslateTween(shape5.position, deviceWidth < 768 ? 22 : 64), 195, 100);
        addTween(createTranslateTween(percentage5.position, deviceWidth < 768 ? 75 : 163), 195, 100);
        // addTween(createCounterTween(90, "rnPercentage"), 195, 100);
        addTween(createFadeTween(shape5.material), 195, 5);
        addTween(createFadeTween(label5.material), 175, 50);
        addTween(createFadeTween(percentage5.material), 175, 50);
        addTween(createGrowTween(shape6.scale), 220, 100);
        addTween(createTranslateTween(shape6.position, deviceWidth < 768 ? 7 : 34), 220, 100);
        addTween(createTranslateTween(percentage6.position, deviceWidth < 768 ? 45 : 103), 220, 100);
        // addTween(createCounterTween(60, "nodePercentage"), 220, 100);
        addTween(createFadeTween(shape6.material), 220, 5);
        addTween(createFadeTween(label6.material), 200, 50);
        addTween(createFadeTween(percentage6.material), 200, 50);
        addTween(createGrowTween(shape7.scale), 235, 100);
        addTween(createTranslateTween(shape7.position, deviceWidth < 768 ? 12 : 44), 235, 100);
        addTween(createTranslateTween(percentage7.position, deviceWidth < 768 ? 55 : 122), 235, 100);
        // addTween(createCounterTween(70, "nextPercentage"), 235, 100);
        addTween(createFadeTween(shape7.material), 235, 5);
        addTween(createFadeTween(label7.material), 215, 50);
        addTween(createFadeTween(percentage7.material), 215, 50);
        addTween(createGrowTween(shape8.scale), 250, 100);
        addTween(createTranslateTween(shape8.position, deviceWidth < 768 ? 7 : 34), 250, 100);
        addTween(createTranslateTween(percentage8.position, deviceWidth < 768 ? 48 : 103), 250, 100);
        // addTween(createCounterTween(60, "graphqlPercentage"), 250, 100);
        addTween(createFadeTween(shape8.material), 250, 5);
        addTween(createFadeTween(label8.material), 230, 50);
        addTween(createFadeTween(percentage8.material), 230, 50);
        addTween(createGrowTween(shape9.scale), 270, 100);
        addTween(createTranslateTween(shape9.position, deviceWidth < 768 ? 2 : 24), 270, 100);
        addTween(createTranslateTween(percentage9.position, deviceWidth < 768 ? 40 : 85), 270, 100);
        // addTween(createCounterTween(50, "awsPercentage"), 270, 100);
        addTween(createFadeTween(shape9.material), 270, 5);
        addTween(createFadeTween(percentage9.material), 270, 5);
        addTween(createFadeTween(label9.material), 250, 50);
    }

    function createBoxGeometry(length) {
        return deviceWidth < 768
            ? new THREE.BoxGeometry(10, 10, length)
            : new THREE.BoxGeometry(20, 20, length * 2);
    }

    function addProjectsShape() {
        // HTML
        shape = new THREE.Mesh(createBoxGeometry(85), createPlaneMaterial());
        shape.rotation.set(0.3, Math.PI / 2, 0);
        shape.position.set(deviceWidth < 768 ? -30 : -25, 150, 0);
        shape.scale.z = 0.0001;
        scene.add(shape);

        label1 = createLabel("HTML");
        label1.position.set(deviceWidth < 768 ? -98 : -130, 147, 0);
        label1.rotation.y += 0.15;
        scene.add(label1);

        percentage1 = createLabel(deviceWidth < 768 ? "" : "80%");
        percentage1.position.set(deviceWidth < 768 ? -30 : 0, 147, 0);
        // percentage1.rotation.y += 0.15;
        scene.add(percentage1);

        // SASS/CSS
        shape2 = new THREE.Mesh(createBoxGeometry(90), createPlaneMaterial());
        shape2.rotation.set(0.3, Math.PI / 2, 0);
        shape2.position.set(deviceWidth < 768 ? -30 : -25, deviceWidth < 768 ? 125 : 120, 0);
        shape2.scale.z = 0.0001;
        scene.add(shape2);

        label2 = createLabel("SASS");
        label2.position.set(deviceWidth < 768 ? -98 : -130, deviceWidth < 768 ? 122 : 115, 0);
        label2.rotation.y += 0.15;
        scene.add(label2);

        percentage2 = createLabel(deviceWidth < 768 ? "" : "90%");
        percentage2.position.set(deviceWidth < 768 ? -25 : 0, deviceWidth < 768 ? 122 : 115, 0);
        // percentage2.rotation.y += 0.15;
        scene.add(percentage2);

        // JS
        shape3 = new THREE.Mesh(createBoxGeometry(90), createPlaneMaterial());
        shape3.rotation.set(0.3, Math.PI / 2, 0);
        shape3.position.set(deviceWidth < 768 ? -30 : -25, deviceWidth < 768 ? 100 : 90, 0);
        shape3.scale.z = 0.0001;
        scene.add(shape3);

        label3 = createLabel("Javascript");
        label3.position.set(deviceWidth < 768 ? -98 : -130, deviceWidth < 768 ? 98 : 85, 0);
        label3.rotation.y += 0.15;
        scene.add(label3);

        percentage3 = createLabel(deviceWidth < 768 ? "" : "90%");
        percentage3.position.set(deviceWidth < 768 ? -25 : 0, deviceWidth < 768 ? 98 : 85, 0);
        // percentage3.rotation.y += 0.15;
        scene.add(percentage3);

        // React/Redux
        shape4 = new THREE.Mesh(createBoxGeometry(95), createPlaneMaterial());
        shape4.rotation.set(0.3, Math.PI / 2, 0);
        shape4.position.set(deviceWidth < 768 ? -30 : -25, deviceWidth < 768 ? 75 : 60, 0);
        shape4.scale.z = 0.0001;
        scene.add(shape4);

        label4 = createLabel("React/Redux");
        label4.position.set(deviceWidth < 768 ? -98 : -130, deviceWidth < 768 ? 73 : 55, 0);
        label4.rotation.y += 0.15;
        scene.add(label4);

        percentage4 = createLabel(deviceWidth < 768 ? "" : "95%");
        percentage4.position.set(deviceWidth < 768 ? -25 : 0, deviceWidth < 768 ? 73 : 55, 0);
        // percentage4.rotation.y += 0.15;
        scene.add(percentage4);

        // ReactNative
        shape5 = new THREE.Mesh(createBoxGeometry(90), createPlaneMaterial());
        shape5.rotation.set(0.3, Math.PI / 2, 0);
        shape5.position.set(deviceWidth < 768 ? -30 : -25, deviceWidth < 768 ? 50 : 30, 0);
        shape5.scale.z = 0.0001;
        scene.add(shape5);

        label5 = createLabel("React Native");
        label5.position.set(deviceWidth < 768 ? -98 : -130, deviceWidth < 768 ? 48 : 25, 0);
        label5.rotation.y += 0.15;
        scene.add(label5);

        percentage5 = createLabel(deviceWidth < 768 ? "" : "90%");
        percentage5.position.set(deviceWidth < 768 ? -25 : 0, deviceWidth < 768 ? 48 : 25, 0);
        // percentage5.rotation.y += 0.15;
        scene.add(percentage5);

        // Node/Express
        shape6 = new THREE.Mesh(createBoxGeometry(60), createPlaneMaterial());
        shape6.rotation.set(0.3, Math.PI / 2, 0);
        shape6.position.set(deviceWidth < 768 ? -30 : -25, deviceWidth < 768 ? 25 : 0, 0);
        shape6.scale.z = 0.0001;
        scene.add(shape6);

        label6 = createLabel("NodeJS");
        label6.position.set(deviceWidth < 768 ? -98 : -130, deviceWidth < 768 ? 22 : -5, 0);
        label6.rotation.y += 0.15;
        scene.add(label6);

        percentage6 = createLabel(deviceWidth < 768 ? "" : "60%");
        percentage6.position.set(deviceWidth < 768 ? -25 : 0, deviceWidth < 768 ? 22 : -5, 0);
        // percentage6.rotation.y += 0.15;
        scene.add(percentage6);

        // NextJS
        shape7 = new THREE.Mesh(createBoxGeometry(70), createPlaneMaterial());
        shape7.rotation.set(0.2, Math.PI / 2, 0);
        shape7.position.set(deviceWidth < 768 ? -30 : -25, deviceWidth < 768 ? 0 : -30, 0);
        shape7.scale.z = 0.0001;
        scene.add(shape7);

        label7 = createLabel("NextJS");
        label7.position.set(deviceWidth < 768 ? -98 : -130, deviceWidth < 768 ? -2 : -35, 0);
        label7.rotation.y += 0.15;
        scene.add(label7);

        percentage7 = createLabel(deviceWidth < 768 ? "" : "70%");
        percentage7.position.set(deviceWidth < 768 ? -25 : 0, deviceWidth < 768 ? -2 : -35, 0);
        // percentage7.rotation.y += 0.15;
        scene.add(percentage7);

        // GraphQL
        shape8 = new THREE.Mesh(createBoxGeometry(60), createPlaneMaterial());
        shape8.rotation.set(0.2, Math.PI / 2, 0);
        shape8.position.set(deviceWidth < 768 ? -30 : -25, deviceWidth < 768 ? -25 : -60, 0);
        shape8.scale.z = 0.0001;
        scene.add(shape8);

        label8 = createLabel("GraphQL");
        label8.position.set(deviceWidth < 768 ? -98 : -130, deviceWidth < 768 ? -27 : -65, 0);
        label8.rotation.y += 0.15;
        scene.add(label8);

        percentage8 = createLabel(deviceWidth < 768 ? "" : "60%");
        percentage8.position.set(deviceWidth < 768 ? -25 : 0, deviceWidth < 768 ? -27 : -65, 0);
        // percentage8.rotation.y += 0.15;
        scene.add(percentage8);

        // AWS
        shape9 = new THREE.Mesh(createBoxGeometry(50), createPlaneMaterial());
        shape9.rotation.set(0.2, Math.PI / 2, 0);
        shape9.position.set(deviceWidth < 768 ? -30 : -25, deviceWidth < 768 ? -50 : -90, 0);
        shape9.scale.z = 0.0001;
        scene.add(shape9);

        label9 = createLabel("AWS");
        label9.position.set(deviceWidth < 768 ? -98 : -130, deviceWidth < 768 ? -52 : -98, 0);
        label9.rotation.y += 0.15;
        scene.add(label9);

        percentage9 = createLabel(deviceWidth < 768 ? "" : "50%");
        percentage9.position.set(deviceWidth < 768 ? -25 : 0, deviceWidth < 768 ? -52 : -98, 0);
        // percentage9.rotation.y += 0.15;
        scene.add(percentage9);

        initGraphTween();
    }

    function initListeners() {
        window.addEventListener('resize', onWindowResize);
    }

    function onWindowResize() {
        console.log("RESIZE")
        camera.aspect = deviceWidth / deviceHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(deviceWidth, deviceHeight);
    }

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        // controls.update();
        camera.lookAt(scene.position);
    }

    function init() {
        initRenderer();
        initCamera();
        initScene();
        initListeners();
        addProjectsShape();
        animate();
    }

    generateFont();
})();