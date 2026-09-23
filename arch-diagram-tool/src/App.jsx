import {useCallback} from "react";
import ReactFlow, {Background, Controls, addEdge, useNodesState, useEdgesState, ReactFlowProvider} from "reactflow";
import { WorkflowHeader } from './components/WorkflowHeader.tsx'
import {nodeTypes} from "./components/nodes/index.js"


const initialNodes =[
  {id:"1", 
    type: "box",
    position: {x: 100, y: 100},
    data: {label:"API"},
   
  }, 
    {id:"2", 
    type: "box",
    position: {x: 100, y: 250},
    data: {label:"Database"},
   
  }
]
const initialEdges =[{ id: "e1-2", source: "1", target: "2"}];
function Canvas(){
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const handleInit = useCallback(()=>{
      setEdges(initialEdges)
    }, [setEdges])

    const onConnect = useCallback(
      (params) => setEdges((eds)=> addEdge(params, eds)), [setEdges])

    return (
      <div style={{width: "100vw", height: "100vh", background: "var(--canvas-bg)"}}>
     <WorkflowHeader 
          title="Project Onboarding Pipeline" 
          subtitle="v1.2.0 - Active" 
          imageUrl="./assets/react.svg"
        />
        <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={handleInit}
        nodeTypes={nodeTypes}
        fitView
        
        />
        <Background />
        <Controls />

      </div>
    )
}

    export default function App(){
      return(
        <ReactFlowProvider>
          <Canvas/>
        </ReactFlowProvider>
      )
}