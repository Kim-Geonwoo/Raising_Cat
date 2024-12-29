import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const Cat = () => {
    const containerRef = useRef(null);
    let camera, scene, renderer, controls, clock, mixer;

    useEffect(() => {
        clock = new THREE.Clock();

        const container = containerRef.current;

        camera = new THREE.PerspectiveCamera(45, 600 / 600, 0.25, 20);
        camera.position.set(0, 0.4, 0.7);

        scene = new THREE.Scene();

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(0, 1, 0).normalize();
        scene.add(directionalLight);

        const loader = new GLTFLoader().setPath('/models/');
        loader.load('cat.glb', function (gltf) {
            const model = gltf.scene;

            scene.add(model);

            render();
        });

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setAnimationLoop(render);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(600, 600);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1;
        renderer.setClearColor(0x000000, 0); // 배경을 투명하게 설정
        container.appendChild(renderer.domElement);

        controls = new OrbitControls(camera, renderer.domElement);
        controls.autoRotate = true;
        controls.autoRotateSpeed = -0.75;
        controls.enableDamping = true;
        controls.minDistance = 0.5;
        controls.maxDistance = 1;
        controls.target.set(0, 0.1, 0);
        controls.update();

        window.addEventListener('resize', onWindowResize);

        return () => {
            window.removeEventListener('resize', onWindowResize);
            container.removeChild(renderer.domElement);
        };
    }, []);

    const onWindowResize = () => {
        camera.aspect = 600 / 600;
        camera.updateProjectionMatrix();

        renderer.setSize(600, 600);
    };

    const render = () => {
        if (mixer) mixer.update(clock.getDelta());

        controls.update();

        renderer.render(scene, camera);
    };

    return <div ref={containerRef} />;
};

export default Cat;
