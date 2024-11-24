import * as THREE from 'three';
import { useRef, useReducer, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, MeshTransmissionMaterial, Environment, Lightformer } from '@react-three/drei';
import { CuboidCollider, BallCollider, Physics, RigidBody } from '@react-three/rapier';
import { EffectComposer, N8AO } from '@react-three/postprocessing';
import { easing } from 'maath';

const accents = ['#4060ff', '#20ffa0', '#ff4060', '#ffcc00'];
const backgroundColors = ['#051a14', '#1a0a14', '#1a1405', '#0a0c1a'];

const shuffle = (accent = 0) => [
    { color: '#444', roughness: 0.1 },
    { color: '#444', roughness: 0.75 },
    { color: '#444', roughness: 0.75 },
    { color: 'white', roughness: 0.1 },
    { color: 'white', roughness: 0.75 },
    { color: 'white', roughness: 0.1 },
    { color: accents[accent], roughness: 0.1, accent: true },
    { color: accents[accent], roughness: 0.75, accent: true },
    { color: accents[accent], roughness: 0.1, accent: true },
];

export const Scene = (props) => {
    const [accent, click] = useReducer((state) => ++state % accents.length, 0);
    const [targetBackground, setTargetBackground] = useState(new THREE.Color(backgroundColors[3])); // Docelowy kolor

    const connectors = useMemo(() => shuffle(accent), [accent]);

    // Funkcja obsługi kliknięcia
    const handleClick = () => {
        click();
        setTargetBackground(new THREE.Color(backgroundColors[accent])); // Ustaw nowy kolor docelowy
    };

    return (
        <Canvas
            onClick={handleClick} // Obsługa kliknięcia
            shadows
            dpr={[1, 1.5]}
            gl={{ antialias: false }}
            camera={{ position: [0, 0, 15], fov: 17.5, near: 1, far: 20 }}
            {...props}
        >
            {/* Animowany kolor tła */}
            <BackgroundAnimator targetBackground={targetBackground} />
            <ambientLight intensity={0.4} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <Physics gravity={[0, 0, 0]}>
                <Pointer />
                {connectors.map((props, i) => (
                    <Connector key={i} {...props} />
                ))}
                <Connector position={[10, 10, 5]}>
                    <TransparentModel accentColor={accents[accent]} />
                </Connector>
            </Physics>
            <EffectComposer disableNormalPass multisampling={8}>
                <N8AO distanceFalloff={1} aoRadius={1} intensity={4} />
            </EffectComposer>
            <DynamicEnvironment accentColor={accents[accent]} />
        </Canvas>
    );
};

// Komponent animujący kolor tła
function BackgroundAnimator({ targetBackground }) {
    const background = useRef(new THREE.Color('#000000')); // Początkowy kolor tła

    useFrame((state, delta) => {
        easing.dampC(background.current, targetBackground, 0.2, delta);
        state.gl.setClearColor(background.current);
    });

    return null; // Nie renderuje niczego
}

function DynamicEnvironment({ accentColor }) {
    const { scene } = useThree();
    const environmentRef = useRef();

    useFrame(() => {
        if (environmentRef.current) {
            environmentRef.current.intensity = 4;
        }
    });

    return (
        <Environment resolution={256} ref={environmentRef}>
            <group rotation={[-Math.PI / 3, 0, 1]}>
                <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} color={accentColor} />
                <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
                <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={2} />
                <Lightformer form="circle" intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={8} />
            </group>
        </Environment>
    );
}


function TransparentModel({ accentColor }) {
    const ref = useRef();
    const { nodes } = useGLTF('/models/c-transformed.glb');

    useFrame((state, delta) => {
        if (ref.current) {
            easing.dampC(ref.current.color, new THREE.Color(accentColor), 0.2, delta);
        }
    });

    return (
        <mesh castShadow receiveShadow scale={10} geometry={nodes.connector.geometry}>
            <MeshTransmissionMaterial
                ref={ref}
                clearcoat={1}
                thickness={0.1}
                anisotropicBlur={0.1}
                chromaticAberration={0.1}
                samples={8}
                resolution={512}
            />
        </mesh>
    );
}


function Connector({ position, children, vec = new THREE.Vector3(), scale, r = THREE.MathUtils.randFloatSpread, accent, ...props }) {
    const api = useRef()
    const pos = useMemo(() => position || [r(10), r(10), r(10)], [])
    useFrame((state, delta) => {
        delta = Math.min(0.1, delta)
        api.current?.applyImpulse(vec.copy(api.current.translation()).negate().multiplyScalar(0.2))
    })
    return (
        <RigidBody linearDamping={4} angularDamping={1} friction={0.1} position={pos} ref={api} colliders={false}>
            <CuboidCollider args={[0.38, 1.27, 0.38]} />
            <CuboidCollider args={[1.27, 0.38, 0.38]} />
            <CuboidCollider args={[0.38, 0.38, 1.27]} />
            {children ? children : <Model {...props} />}
            {accent && <pointLight intensity={4} distance={2.5} color={props.color} />}
        </RigidBody>
    )
}

function Pointer({ vec = new THREE.Vector3() }) {
    const ref = useRef()
    useFrame(({ mouse, viewport }) => {
        ref.current?.setNextKinematicTranslation(vec.set((mouse.x * viewport.width) / 2, (mouse.y * viewport.height) / 2, 0))
    })
    return (
        <RigidBody position={[0, 0, 0]} type="kinematicPosition" colliders={false} ref={ref}>
            <BallCollider args={[1]} />
        </RigidBody>
    )
}

function Model({ children, color = 'white', roughness = 0, ...props }) {
    const ref = useRef()
    const { nodes, materials } = useGLTF('/models/c-transformed.glb')
    useFrame((state, delta) => {
        easing.dampC(ref.current.material.color, color, 0.2, delta)
    })
    return (
        <mesh ref={ref} castShadow receiveShadow scale={10} geometry={nodes.connector.geometry}>
            <meshStandardMaterial metalness={0.2} roughness={roughness} map={materials.base.map} />
            {children}
        </mesh>
    )
}
