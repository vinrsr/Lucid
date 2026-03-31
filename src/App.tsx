import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Float, Stats, StatsGl } from '@react-three/drei'
import { Tumbler } from './components/Tumbler'

function Scene({ isDisassembled }: { isDisassembled: boolean }) {
  return (
    <>
      <Environment preset="city" />
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Tumbler scale={[7, 7, 7]} rotation={[0, 0, Math.PI / 2]} isDisassembled={isDisassembled} />
      </Float>
    </>
  )
}

function App() {
  const [isDisassembled, setIsDisassembled] = useState(false)

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {/* 3D Canvas Background */}
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} style={{ position: 'absolute', top: 0, left: 0 }}>
        <color attach="background" args={['#0a0a0a']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />

        <Scene isDisassembled={isDisassembled} />

        {/* Performance Monitors */}
        <Stats className="stats-panel" />
        <StatsGl className="stats-gl-panel" />

        <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} makeDefault />
      </Canvas>

      {/* HTML Overlay */}
      <div className="overlay">
        <div className="header-container">
          <div className="logo">LUCID</div>
          <p className="slogan">Hydration Meets Style.</p>
        </div>
        <button 
          className="disassemble-btn" 
          onClick={() => setIsDisassembled(!isDisassembled)}
        >
          {isDisassembled ? 'ASSEMBLE' : 'DISASSEMBLE'}
        </button>
      </div>
    </div>
  )
}

export default App
