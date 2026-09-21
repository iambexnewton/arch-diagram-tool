import ReactFlow, {Background, Controls} from "reactFlow";

const initialNodes =[
  {id:"1", 
    position: {x: 150, y: 150},
    data: {label:"I am a really useful box"},
    style:{
      background: "var(--box-fill)", 
      border: "2px solid var(--box-border)",
      borderRadius: 8,
      color: "var(--box-text",
      padding: 10,
    }
  }
]


export default function App() {
  return(
    <div style={{width: "110vw", height: "100vh", background: "var(--canvas-bg)"}}>
    <ReactFlow nodes={initialNodes}>
      <Background/>
      <Controls/>
    </ReactFlow>
    </div>
  )

};