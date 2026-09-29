import { useCallback, useState, useRef } from "react";
import ReactFlow, { Background, Controls, addEdge, useNodesState, useEdgesState, ReactFlowProvider, useReactFlow } from "reactflow";
import { WorkflowHeader } from './components/WorkflowHeader.tsx'
import { nodeTypes } from "./components/nodes/index.js"
import DeletableEdge from "./components/edges/DeleteableEdge.jsx";
import Sidebar from "./components/Sidebar.jsx";
import { palletteItems } from "./components/Sidebar.jsx";
import {exportToPng, exportToSvg} from "./utils/exportImage.js"




const edgeTypes = { deletable: DeletableEdge }

const initialNodes = []

 let idCounter = 0;

function Canvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [theme, setTheme] = useState("");
  const wrapperRef = useRef(null);
  const { screenToFlowPosition } = useReactFlow()

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, type: "deletable" }, eds), [setEdges]))

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  })

  const onDrop = useCallback((event) => {
    event.preventDefault();
    const type = event.dataTransfer.getData("application/reactflow")
    if (!type) return

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    })


    const palletteItem = palletteItems.find((item) => item.type === type)
    const label = palletteItem?.label ?? 'component'
    const newNode = {
      id: `${idCounter++}`,
      type,
      position,
      data: { label}
    }
    setNodes((nodes) => nodes.concat(newNode))
  }, [screenToFlowPosition, setNodes])



  return (
    <div
      className={theme}
      style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column", background: "var(--canvas-bg)" }}>
      <WorkflowHeader
          className={theme}
        title="Onboarding"
        subtitle="v1.2.0 - Active"

        // imageUrl="./assets/react.svg"
      />

      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        <Sidebar />

        <div ref={wrapperRef}
   
          style={{ flex: 1, height: "100%", background: "var(--canvas-bg)" }}>


          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            style={{
              position: "absolute",
              zIndex: 10,
              top: 20,
              right: 100,
              padding: "6px 12px",
            }}
          >
            <option value=''>Default Theme</option>
            <option value='theme-brand1'>Brand 1 Theme</option>
            <option value='theme-brand2'>Brand 2 Theme</option>
          </select>
          <button   style={{
              position: "absolute",
              zIndex: 10,
              top: 20,
              right: 260,
              padding: "6px 12px",
            }}
            onClick={()=> exportToSvg(nodes)}>
            export SVG
          </button>
            <button   style={{
              position: "absolute",
              zIndex: 10,
              top: 20,
              right: 380,
              padding: "6px 12px",
            }}
            onClick={()=> exportToPng(nodes)}>
            export PNG
          </button>

          <ReactFlow

          id={"react-flow_viewport"}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            // onInit={handleInit}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            nodesDraggable={true}
            onDragOver={onDragOver}
            onDrop={onDrop}
            fitView
          />
          <Background />
          <Controls />
        </div>
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