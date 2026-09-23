import { useCallback, useState } from "react";
import ReactFlow, { Background, Controls, addEdge, useNodesState, useEdgesState, ReactFlowProvider } from "reactflow";
import { WorkflowHeader } from './components/WorkflowHeader.tsx'
import { nodeTypes } from "./components/nodes/index.js"


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
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];
function Canvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [theme, setTheme] = useState("");

  const handleInit = useCallback(() => {
    setEdges(initialEdges)
  }, [setEdges])

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)), [setEdges])

  return (
    <div 
    className={theme}
    style={{ width: "100vw", height: "100vh", background: "var(--canvas-bg)" }}>
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
        onInit={handleInit}
        nodeTypes={nodeTypes}
        nodesDraggable={true}
        fitView
      />
      <Background />
      <Controls />

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