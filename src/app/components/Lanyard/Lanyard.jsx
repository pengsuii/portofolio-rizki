
'use client';
import { Environment, Lightformer, useGLTF, useTexture } from '@react-three/drei';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import { useEffect, useRef, useState } from 'react';

const cardGLB = '/assets/lanyard/card.glb';
const lanyard = '/assets/lanyard/lanyard.png';

import * as THREE from 'three';
import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

export default function Lanyard({ position = [0, 0, 30], gravity = [0, -40, 0], fov = 20, transparent = true }) {
  return (
    <div className="lanyard-wrapper" style={{ pointerEvents: 'auto', width: '100%', height: '100%', position: 'relative', zIndex: 1 }}>
      <Canvas
        camera={{ position: position, fov: fov }}
        gl={{ alpha: transparent }}
        dpr={[1, 2]}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1);
          const canvas = gl.domElement;
          canvas.style.pointerEvents = 'auto';
          canvas.style.touchAction = 'none';
          canvas.style.position = 'relative';
          canvas.style.zIndex = '1';
          canvas.style.width = '100%';
          canvas.style.height = '100%';
        }}
        style={{ pointerEvents: 'auto', touchAction: 'none', width: '100%', height: '100%', display: 'block' }}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={1 / 60} interpolate>
          <Band xOffset={0} delay={0} />
          <Band xOffset={-4} delay={0.3} rotationOffset={0.5} />
          <Band xOffset={4} delay={0.6} rotationOffset={-0.3} />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer
            intensity={1}
            color="gray-100"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={8}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}
function Band({ maxSpeed = 50, minSpeed = 0, xOffset = 0, delay = 0, rotationOffset = 0 }) {
  const band = useRef(),
    fixed = useRef(),
    j1 = useRef(),
    j2 = useRef(),
    j3 = useRef(),
    card = useRef();
  const vec = new THREE.Vector3(),
    ang = new THREE.Vector3(),
    rot = new THREE.Vector3(),
    dir = new THREE.Vector3();
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 5, linearDamping: 5 };
  const { nodes, materials } = useGLTF(cardGLB);
  const texture = useTexture(lanyard);
  const { gl, clock } = useThree();
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);
  const [isSmall, setIsSmall] = useState(() => typeof window !== 'undefined' && window.innerWidth < 1024);
  const prevPos = useRef(new THREE.Vector3());
  const prevTime = useRef(0);
  const targetAngVel = useRef(new THREE.Vector3());
  const currentAngVel = useRef(new THREE.Vector3());

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1.2]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1.2]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1.2]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.5, 0]
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmall(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      
      const newPos = new THREE.Vector3(vec.x - dragged.x, vec.y - dragged.y, vec.z - dragged.z);
      const currentTime = clock.elapsedTime;
      
      // Hitung velocity dari pergerakan
      if (prevTime.current > 0) {
        const timeDelta = currentTime - prevTime.current;
        if (timeDelta > 0) {
          const velocity = new THREE.Vector3()
            .subVectors(newPos, prevPos.current)
            .divideScalar(timeDelta);
          
          const speed = velocity.length();
          if (speed > 0.01) {
            // Tambahkan rotasi berdasarkan arah gerak dengan smoothing (reduced rotation)
            const rotationSpeed = speed * 0.1;
            targetAngVel.current.set(
              -velocity.y * 0.08, 
              rotationSpeed, 
              velocity.x * 0.08
            );
          } else {
            targetAngVel.current.set(0, 0, 0);
          }
          
          currentAngVel.current.lerp(targetAngVel.current, Math.min(delta * 10, 0.3));
          card.current?.setAngvel({ 
            x: currentAngVel.current.x, 
            y: currentAngVel.current.y, 
            z: currentAngVel.current.z 
          });
        }
      }
      
      prevPos.current.copy(newPos);
      prevTime.current = currentTime;
      card.current?.setNextKinematicTranslation({ x: newPos.x, y: newPos.y, z: newPos.z });
    } else {
      prevTime.current = 0;
    }
    if (fixed.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        const lerpFactor = delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed));
        ref.current.lerped.lerp(
          ref.current.translation(),
          Math.min(lerpFactor, 0.5)
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));
      
      if (!dragged && card.current) {
        // Rotasi natural saat tidak ditarik - ALWAYS keep rotating
        ang.copy(card.current.angvel());
        rot.copy(card.current.rotation());
        const velocity = card.current.linvel();
        const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2 + velocity.z ** 2);
        
        // Konstanta untuk rotasi minimum agar kartu selalu bergerak dengan delay dan offset
        const timeWithDelay = state.clock.elapsedTime - delay;
        const minRotationY = 0.6 + rotationOffset * 0.3; // Rotasi Y minimum lebih tinggi untuk movement jelas
        
        if (speed > 0.1) {
          // Rotasi berdasarkan kecepatan gerak dengan smoothing
          targetAngVel.current.set(
            ang.x * 0.9 - velocity.y * 0.06 + Math.sin(timeWithDelay * 0.8) * 0.1, 
            ang.y * 0.9 + speed * 0.2 + minRotationY, // Tambahkan rotasi minimum 
            ang.z * 0.9 + velocity.x * 0.06 + Math.cos(timeWithDelay * 0.6) * 0.1
          );
        } else {
          // Tetap berikan rotasi minimum bahkan saat hampir diam dengan variasi per card
          targetAngVel.current.set(
            ang.x * 0.8 + Math.sin(timeWithDelay * 0.8 + rotationOffset) * 0.15, 
            minRotationY + Math.cos(timeWithDelay * 0.5 + rotationOffset * 2) * 0.2, // ALWAYS rotate dengan amplitude lebih besar
            ang.z * 0.8 + Math.sin(timeWithDelay * 1.0 + rotationOffset * 1.5) * 0.15
          );
        }
        
        currentAngVel.current.lerp(targetAngVel.current, Math.min(delta * 8, 0.25));
        card.current.setAngvel({ 
          x: currentAngVel.current.x, 
          y: currentAngVel.current.y, 
          z: currentAngVel.current.z 
        });
      }
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[xOffset, 5, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.75, 1.05, 0.01]} />
          <group
            scale={2.3}
            position={[0, -1.7, -0.05]}
            onPointerOver={(e) => {
              e.stopPropagation();
              hover(true);
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              hover(false);
            }}
            onPointerUp={e => {
              e.stopPropagation();
              if (gl && gl.domElement && gl.domElement.releasePointerCapture) {
                gl.domElement.releasePointerCapture(e.pointerId);
              }
              drag(false);
            }}
            onPointerDown={e => {
              e.stopPropagation();
              if (gl && gl.domElement && gl.domElement.setPointerCapture) {
                gl.domElement.setPointerCapture(e.pointerId);
              }
              if (card.current) {
                const currentPos = card.current.translation();
                prevPos.current.set(currentPos.x, currentPos.y, currentPos.z);
                prevTime.current = 0;
                targetAngVel.current.set(0, 0, 0);
                currentAngVel.current.set(0, 0, 0);
              }
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}
          >
            <mesh 
              geometry={nodes.card.geometry}
              onPointerOver={(e) => {
                e.stopPropagation();
                hover(true);
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                hover(false);
              }}
              onPointerUp={e => {
                e.stopPropagation();
                if (gl && gl.domElement && gl.domElement.releasePointerCapture) {
                  gl.domElement.releasePointerCapture(e.pointerId);
                }
                drag(false);
              }}
              onPointerDown={e => {
                e.stopPropagation();
                if (gl && gl.domElement && gl.domElement.setPointerCapture) {
                  gl.domElement.setPointerCapture(e.pointerId);
                }
                if (card.current) {
                  const currentPos = card.current.translation();
                  prevPos.current.set(currentPos.x, currentPos.y, currentPos.z);
                  prevTime.current = 0;
                  targetAngVel.current.set(0, 0, 0);
                  currentAngVel.current.set(0, 0, 0);
                }
                drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
              }}
            >
              <meshPhysicalMaterial
                map={materials.base.map}
                map-anisotropy={16}
                clearcoat={1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isSmall ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}
