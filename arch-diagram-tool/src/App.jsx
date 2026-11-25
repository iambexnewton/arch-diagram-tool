import { useCallback, useState, useRef } from "react";
import ReactFlow, { Background, Controls, addEdge, useNodesState, useEdgesState, ReactFlowProvider, useReactFlow } from "reactflow";
import Toolbar from "./components/Toolbar.jsx";
import { nodeTypes } from "./components/nodes/index.js"
import DeletableEdge from "./components/edges/DeleteableEdge.jsx";
import Sidebar from "./components/Sidebar.jsx";
import { palletteItems } from "./components/palette.js";
import { exportToPng, exportToSvg } from "./utils/exportImage.js"
import { exportMarkdown } from "./utils/exportMarkdown.js";

import { templates, arrow } from "./templates/index.js";


const edgeTypes = { deletable: DeletableEdge }

const initialNodes = []

// let idCounter = 0;

function Canvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [theme, setTheme] = useState("");
  const wrapperRef = useRef(null);
  const { screenToFlowPosition, fitView } = useReactFlow();

  const loadTemplate = (templateId) => {
    const t = templates.find((tpl) => tpl.id === templateId);

    if (!t) return;

    if (nodes.length > 0 && !window.confirm("Replace the current canvas? Unsaved changes will be lost.")) return;
    setNodes(structuredClone(t.nodes))
    setEdges(structuredClone(t.edges))
    setTimeout(()=> fitView({padding: 0.2}), 50)
  }

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, type: "deletable", markerEnd: arrow }, eds)),
    [setEdges]
  )

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, [])

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
      id: `n-${(crypto.randomUUID())}`,
      type,
      position,
      data: { label }
    }
    setNodes((nodes) => nodes.concat(newNode))
  }, [screenToFlowPosition, setNodes])




  return (
    <div
      className={theme}
      style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column", background: "var(--canvas-bg)" }}
    >
      <Toolbar
        title="Onboarding"
        subtitle="v1.2.0 - Active"
        theme={theme}
        onThemeChange={setTheme}
        onLoadTemplate={loadTemplate}
        onExportPng={() => exportToPng(nodes)}
        onExportSvg={() => exportToSvg(nodes)}
        onExportMarkdown={() => exportMarkdown(nodes, edges, "Architecture")}
      />

      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        <Sidebar />

        <div ref={wrapperRef} style={{ flex: 1, position: "relative", background: "var(--canvas-bg)" }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onDragOver={onDragOver}
            onDrop={onDrop}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
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