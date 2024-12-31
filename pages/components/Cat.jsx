import React, { useRef } from 'react';
import { Canvas, useLoader, useFrame, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'three';

function Controls() {
    const { camera, gl } = useThree();
    const controlsRef = useRef();
    useFrame(() => {
        if (controlsRef.current) {
            controlsRef.current.update();
        }
    });
    React.useEffect(() => {
        controlsRef.current = new OrbitControls(camera, gl.domElement);
        controlsRef.current.enableZoom = false; // 모델 렌더링 내 마우스 휠 줌 기능 비활성화
        controlsRef.current.enableRotate = true; // 우클릭으로 모델의 위치 조정 기능 활성화
        controlsRef.current.enablePan = false; // 모델의 위치 조정 기능 비활성화
        controlsRef.current.minPolarAngle = Math.PI / 2;
        controlsRef.current.maxPolarAngle = Math.PI / 2;
        controlsRef.current.target.set(0, 0.1, 0); // 모델 렌더링 중심점 조정
    }, [camera, gl]);
    return null;
}

function Model() { // 모델 파일 로드
    const gltf = useLoader(GLTFLoader, '/models/cat.glb');
    return (
        <primitive
            object={gltf.scene}
        />
    );
}

const Cat = () => {
    return (
        <Canvas
            style={{ width: 300, height: 300 }} // 캔버스 크기 조정
            camera={{ position: [0, 1, 2], fov: 45, near: 0.25, far: 20 }} // 카메라 위치 조정 (포지션 : scale 조정, fov : 시야각, near : 가까운 물체, far : 먼 물체)
        >
            <ambientLight intensity={2} />
            <directionalLight intensity={3} position={[0, 1, 0]} /> // 조명 위치 조정
            <hemisphereLight intensity={1} />
            <Controls />
            <Model />
        </Canvas>
    );
};

export default Cat;
