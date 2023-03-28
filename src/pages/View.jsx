import "../index.css";

import React, {
  useState,
  useEffect,
} from "react";
import {
  Canvas,
  extend,
} from "@react-three/fiber";
import {
  useGLTF,
  PointerLockControls,
} from "@react-three/drei";
import {
  VRButton,
  XR,
  Controllers,
  Hands,
} from "@react-three/xr";

import * as THREE from "three";

import { Loader } from "../components/Loader/Loader";
import { Gallery } from "../components/Gallery/Gallery";
import { CrossHair } from "../components/CrossHair/CrossHair";
import { Paint } from "../components/Paint/Paint";

export const View = () => {

  const [loading, setLoading] = useState(true);

  const gallery = useGLTF(`./assets/modeles/vr_gallery/scene.gltf`);
  const laNuitEtoilee = useGLTF(`./assets/textures/LaNuitEtoilee.glb`);
  const soleilLevant = useGLTF(`./assets/textures/soleilLevant.glb`);
  const boulevardMontmartre = useGLTF(
    `./assets/textures/boulevardMontmartre.glb`
  );
  const coucherdesoleilEragny = useGLTF(
    `./assets/textures/coucherdesoleilEragny.glb`
  );
  const jardinMontmartre = useGLTF(`./assets/textures/jardinMontmartre.glb`);
  const pontNeuf = useGLTF(`./assets/textures/pontNeuf.glb`);
  //play le son
  useEffect(() => {
    const audioambiance = new Audio("../assets/sounds/ambiance.mp3");
    window.addEventListener("click", () => {
      audioambiance.play();
      audioambiance.volume = 0.08;
      audioambiance.loop = true;
    });

    return () => {
      window.removeEventListener("click", () => {
        audioambiance.play();
        audioambiance.volume = 0.08;
        audioambiance.loop = true;
      });
    };

  }, []);

  useEffect(() => {
    if (
      gallery &&
      laNuitEtoilee &&
      soleilLevant &&
      boulevardMontmartre &&
      coucherdesoleilEragny &&
      jardinMontmartre &&
      pontNeuf
    ) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [boulevardMontmartre, coucherdesoleilEragny, gallery, jardinMontmartre, laNuitEtoilee, pontNeuf, soleilLevant]);

  extend({ PointerLockControls });

  return (
    <>
      <Loader loading={loading} />
      <CrossHair />
      <VRButton />
      <Canvas
        gl={{ antialias: true }}
        camera={{ position: [0, 1.5, 0], fov: 70, rotation: [0, 0, 0] }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
      >
        <PointerLockControls
          position={[0, 1.5, 0]}
          rotation={[0, 0, 0]}
          speed={0.05}
          onLock={() => console.log("locked")}
          onUnlock={() => console.log("unlocked")}
        />
        <XR
          frameRate={72 | 90 | 120}
          sessionInit={{
            optionalFeatures: ["local-floor", "bounded-floor"],
            requiredFeatures: ["hit-test"],
          }}
        >
          <Hands />
          <boxGeometry />
          <directionalLight castShadow position={[1, 2, 3]} intensity={0.5} />
          <ambientLight intensity={0.5} />

          <Gallery modele={gallery} modele2={gallery} />

          <Paint
            name="soleilLevant"
            basePosition={{ x: -4.8, y: 1.5, z: 2 }}
            baseRotation={{ x: 0, y: -4.7, z: 0 }}
            hoverPosition={{ x: -4.2, y: 1.5, z: 2 }}
            clickPosition={{ x: -3, y: 1.5, z: 2 }}
            clickRotation={{ x: 0, y: -4.2, z: 0 }}
            baseScale={1.93}
            paint={soleilLevant}
          />

          <Paint
            name="pontNeuf"
            basePosition={{ x: -4.8, y: 1.5, z: -2 }}
            baseRotation={{ x: 0, y: -4.7, z: 0 }}
            hoverPosition={{ x: -4.2, y: 1.5, z: -2 }}
            clickPosition={{ x: -3, y: 1.5, z: -2 }}
            clickRotation={{ x: 0, y: -5.2, z: 0 }}
            baseScale={1}
            paint={pontNeuf}
          />

          <Paint
            name="jardinMontmartre"
            basePosition={{ x: -2, y: 1.5, z: -4.8 }}
            baseRotation={{ x: 0, y: 0, z: 0 }}
            hoverPosition={{ x: -2, y: 1.5, z: -4.2 }}
            clickPosition={{ x: -2, y: 1.5, z: -3 }}
            clickRotation={{ x: 0, y: 0.5, z: 0 }}
            baseScale={1.28}
            paint={jardinMontmartre}
          />

          <Paint
            name="coucherDeSoleilEragny"
            basePosition={{ x: 2, y: 1.5, z: -4.8 }}
            baseRotation={{ x: 0, y: 0, z: 0 }}
            hoverPosition={{ x: 2, y: 1.5, z: -4.2 }}
            clickPosition={{ x: 2, y: 1.5, z: -3 }}
            clickRotation={{ x: 0, y: -0.5, z: 0 }}
            baseScale={1}
            paint={coucherdesoleilEragny}
          />

          <Paint
            name="boulevardMontmartre"
            basePosition={{ x: 4.8, y: 1.5, z: -2 }}
            baseRotation={{ x: 0, y: 4.7, z: 0 }}
            hoverPosition={{ x: 4.2, y: 1.5, z: -2 }}
            clickPosition={{ x: 3, y: 1.5, z: -2 }}
            clickRotation={{ x: 0, y: 5.2, z: 0 }}
            baseScale={1.55}
            paint={boulevardMontmartre}
          />

          <Paint
            name="LaNuitEtoilee"
            basePosition={{ x: 4.8, y: 1.5, z: 2 }}
            baseRotation={{ x: 0, y: 4.7, z: 0 }}
            hoverPosition={{ x: 4.2, y: 1.5, z: 2 }}
            clickPosition={{ x: 3, y: 1.5, z: 2 }}
            clickRotation={{ x: 0, y: 4.2, z: 0 }}
            baseScale={0.5}
            paint={laNuitEtoilee}
          />

          <Controllers rayMaterial={{ color: "black" }} />
        </XR>
      </Canvas>
    </>
  );
};
