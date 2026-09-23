import { useCallback, useState } from "react";
import ReactFlow, { Background, Controls, addEdge, useNodesState, useEdgesState, ReactFlowProvider, useReactFlow } from "reactflow";
import { WorkflowHeader } from './components/WorkflowHeader.tsx'
import { nodeTypes } from "./components/nodes/index.js"
import DeletableEdge from "./components/edges/DeleteableEdge.jsx";
import Sidebar from "./components/Sidebar.jsx";



const edgeTypes = {deletable: DeletableEdge}

const initialNodes = [
  {
    id: "1",
    type: "box",
    position: { x: 100, y: 100 },
    data: { label: "APIfjgkhjkl;'lkjhgfdxcgvhjkl;fgvhbjnkml," },
    draggable: true

  },
  {
    id: "2",
    type: "box",
    position: { x: 100, y: 250 },
    data: { label: "Database" },
    draggable: true

  }
]

let idCounter = 3;

function Canvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [theme, setTheme] = useState("");
  const wrapperRef = useRef(null);
  const {screenToFlowPosition} = useReactFlow()

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({...params, type: "deletable"}, eds), [setEdges]))

const onDragOver = useCallback((event)=> {
  event.preventDefault();
  event.dataTransfer.dropEffect ="move";
})

const onDrop = useCallback((event)=>{
  event.preventDefault();
  const type = event.dataTransfer.get("application/reactflow")
  if (!type) return

  const position = screenToFlowPosition({
    x: event.clientX,
    y: event.clientY,
  })

const newNode = {
  id: `${idCounter ++}`,
  type, 
  position,
  data: {label: "new component", }
}
setNodes((nodes)=> nodes.concat(newNode))
}, [screenToFlowPosition, setNodes])



  return (
    <div 
    style={{ width: "100vw", height: "100vh", background: "var(--canvas-bg)" }}>
      <Sidebar />
      <div ref={wrapperRef}
      className={theme}
      style={{flex:1, height: "100%", background: "var(--canvas-bg)"}}>
      <WorkflowHeader
        title="Project Onboarding Pipeline"
        subtitle="v1.2.0 - Active"
        imageUrl="./assets/react.svg"
      />
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        style={{
          position: "absolute",
          zIndex: 10,
          top: 12,
          left: 12,
          padding: "6px 10px"
        }}
      >
        <option value=''>Default</option>
        <option value='theme-brand1'>Brand 1 </option>
        <option value='theme-brand2'>Brand 2 </option>
      </select>


      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        // onInit={handleInit}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodesDraggable={true}
        fitView
      />
      <Background />
      <Controls />
    </div>
    </div>
  )
}

export default function App() {
  return (
    <ReactFlowProvider>
      <Canvas />
    </ReactFlowProvider>
  )
}