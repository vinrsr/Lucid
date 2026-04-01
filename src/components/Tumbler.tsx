import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import type { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    tumbler_rubber: THREE.Mesh
    tumbler_body_stainless: THREE.Mesh
    tumbler_body: THREE.Mesh
    tumbler_lid: THREE.Mesh
    tumbler_lid_glass: THREE.Mesh
    tumbler_lid_stainless: THREE.Mesh
    tumbler_lid_rubber: THREE.Mesh
    tumbler_lid_black_obj: THREE.Mesh
    tumbler_lid_black_obj_1: THREE.Mesh
    tumbler_lid_icon: THREE.Mesh
    tumbler_lid_number: THREE.Mesh
    tumbler_body_filter_obj: THREE.Mesh
    tumbler_body_filter_obj_1: THREE.Mesh
  }
  materials: {
    material_rubber: THREE.MeshStandardMaterial
    material_body_stainless: THREE.MeshStandardMaterial
    material_body: THREE.MeshStandardMaterial
    material_lid: THREE.MeshStandardMaterial
    material_lid_glass: THREE.MeshPhysicalMaterial
    material_lid_stainless: THREE.MeshStandardMaterial
    material_lid_rubber: THREE.MeshStandardMaterial
    material_lid_black: THREE.MeshStandardMaterial
    material_lid_black_1: THREE.MeshStandardMaterial
    material_lid_icon: THREE.MeshStandardMaterial
    material_lid_number: THREE.MeshStandardMaterial
    material_body_filter: THREE.MeshStandardMaterial
    material_body_filter_1: THREE.MeshStandardMaterial
  }
}

export function Tumbler(props: any) {
  const { nodes, materials } = useGLTF('/tumbler.glb') as unknown as GLTFResult

  const rubberRef = useRef<THREE.Group>(null!)
  const bodyRef = useRef<THREE.Group>(null!)
  const filterRef = useRef<THREE.Group>(null!)
  const lidRef = useRef<THREE.Group>(null!)
  const glassRef = useRef<THREE.Group>(null!)
  const topRef = useRef<THREE.Group>(null!)

  useFrame((_state, delta) => {
    // Determine target positions based on isDisassembled prop
    // We move them along their local Y axis
    const tRubber = props.isDisassembled ? -0.15 : 0;
    const tBody = props.isDisassembled ? 0 : 0;
    const tFilter = props.isDisassembled ? 0.15 : 0;
    const tLid = props.isDisassembled ? 0.3 : 0;
    const tGlass = props.isDisassembled ? 0.45 : 0;
    const tTop = props.isDisassembled ? 0.6 : 0;

    // Smoothly interpolate positions
    if (rubberRef.current) rubberRef.current.position.y = THREE.MathUtils.damp(rubberRef.current.position.y, tRubber, 6, delta);
    if (bodyRef.current) bodyRef.current.position.y = THREE.MathUtils.damp(bodyRef.current.position.y, tBody, 6, delta);
    if (filterRef.current) filterRef.current.position.y = THREE.MathUtils.damp(filterRef.current.position.y, tFilter, 6, delta);
    if (lidRef.current) lidRef.current.position.y = THREE.MathUtils.damp(lidRef.current.position.y, tLid, 6, delta);
    if (glassRef.current) glassRef.current.position.y = THREE.MathUtils.damp(glassRef.current.position.y, tGlass, 6, delta);
    if (topRef.current) topRef.current.position.y = THREE.MathUtils.damp(topRef.current.position.y, tTop, 6, delta);
  })

  return (
    <group {...props} dispose={null}>
      <group ref={rubberRef}>
        <mesh geometry={nodes.tumbler_rubber.geometry} material={materials.material_rubber} />
      </group>
      
      <group ref={bodyRef}>
        <mesh geometry={nodes.tumbler_body_stainless.geometry} material={materials.material_body_stainless} />
        <mesh geometry={nodes.tumbler_body.geometry} material={materials.material_body} />
      </group>

      <group ref={filterRef}>
        <mesh geometry={nodes.tumbler_body_filter_obj.geometry} material={materials.material_body_filter} />
        <mesh geometry={nodes.tumbler_body_filter_obj_1.geometry} material={materials.material_body_filter_1} />
      </group>

      <group ref={lidRef}>
        <mesh geometry={nodes.tumbler_lid.geometry} material={materials.material_lid} position={[0, -0.001, 0]} />
        <mesh geometry={nodes.tumbler_lid_stainless.geometry} material={materials.material_lid_stainless} position={[0, -0.001, 0]} />
        <mesh geometry={nodes.tumbler_lid_rubber.geometry} material={materials.material_lid_rubber} position={[0, -0.001, 0]} />
        <group position={[0, -0.001, 0]}>
          <mesh geometry={nodes.tumbler_lid_black_obj.geometry} material={materials.material_lid_black} />
          <mesh geometry={nodes.tumbler_lid_black_obj_1.geometry} material={materials.material_lid_black_1} />
        </group>
      </group>

      <group ref={glassRef}>
        <mesh geometry={nodes.tumbler_lid_glass.geometry} material={materials.material_lid_glass} position={[0, -0.001, 0]} />
      </group>

      <group ref={topRef}>
        <mesh geometry={nodes.tumbler_lid_icon.geometry} material={materials.material_lid_icon} position={[0, -0.001, 0]} />
        <mesh geometry={nodes.tumbler_lid_number.geometry} material={materials.material_lid_number} position={[0, -0.001, 0]} />
      </group>
    </group>
  )
}

useGLTF.preload('/tumbler.glb')

export default Tumbler
