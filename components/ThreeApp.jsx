"use client";
import * as THREE from "three";

import { useRef, forwardRef, Suspense, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

import { Perf } from "r3f-perf";

import {
  Clouds,
  Cloud,
  MotionPathControls,
  useMotion,
  useTexture,
  OrbitControls,
  MeshWobbleMaterial,
  Gltf,
  Float,
  Environment,
  AdaptiveEvents,
  AdaptiveDpr,
  PerformanceMonitor,
} from "@react-three/drei";
import {
  EffectComposer,
  TiltShift2,
  HueSaturation,
  DotScreen,
} from "@react-three/postprocessing";
import { useControls } from "leva";
import * as CURVES from "@/app/helpers/curves";

export default async function ThreeApp() {
  const poi = useRef();
  const motionRef = useRef();
  const { float, attachCamera, debug, path } = useControls({
    attachCamera: true,
    debug: false,
    float: true,
    path: {
      value: "Circle",
      options: ["Circle", "Rollercoaster", "Infinity", "Heart"],
    },
  });
  const Curve = CURVES[path];

  const [dpr, setDpr] = useState(2);

  return (
    <>
      <Canvas
        dpr={dpr}
        camera={{ position: [10, 15, -10], fov: 45 }}
        resize={{ debounce: { scroll: 50, resize: 100 } }}
      >
        <PerformanceMonitor
          factor={1}
          onChange={({ factor }) => setDpr(Math.floor(0.5 + 1.5 * factor, 1))}
        />

        <AdaptiveDpr pixelated />
        <AdaptiveEvents />

        <Suspense fallback={null}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          {!attachCamera && <OrbitControls />}
          <MotionPathControls
            object={attachCamera ? null : motionRef}
            focus={poi}
            debug={debug}
            damping={0.2}
            focusDamping={0.15}
          >
            <Curve />
            <Loop />
          </MotionPathControls>
          <Gltf
            visible={false}
            src="/sony_cinema_camera-transformed.glb"
            scale={0.03}
            ref={motionRef}
          />
          <Float
            floatIntensity={20}
            rotationIntensity={25}
            speed={float ? 0.2 : 0}
          >
            <Sticker position={[1, 0, 1]} scale={2} ref={poi} />
          </Float>
          <Environment preset="city" background blur={0.5} />
          <Clouds>
            <Cloud
              concentrate="outside"
              seed={1}
              segments={100}
              bounds={10}
              volume={0}
              growth={0}
              opacity={0.15}
              position={[0, 0, -10]}
              speed={0.2}
            />
          </Clouds>
          <EffectComposer disableNormalPass multisampling={4}>
            <HueSaturation saturation={-0} />
            <TiltShift2 blur={40.5} />
            <DotScreen scale={11} />
          </EffectComposer>
          <Perf position="top-left" />
        </Suspense>
      </Canvas>
    </>
  );
}

function Loop({ factor = 0.2 }) {
  const motion = useMotion();
  useFrame((state, delta) => (motion.current += Math.min(0.1, delta) * factor));
}

const Sticker = forwardRef(({ url, ...props }, ref) => {
  const [smiley, invert] = useTexture([
    "Sticjer_1024x1024@2x.png",
    "Sticjer_1024x1024@2x_invert.png",
  ]);
  return (
    <mesh ref={ref} {...props}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <MeshWobbleMaterial
        factor={4}
        speed={2}
        depthTest={false}
        transparent
        map={smiley}
        map-flipY={false}
        roughness={1}
        roughnessMap={invert}
        roughnessMap-flipY={false}
        map-anisotropy={16}
        metalness={0.8}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
});
