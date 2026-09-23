import { useCallback } from "react";
import { Handle, Position, useReactFlow } from 'reactflow';
//  import { Handle, Position, useReactFlow } from '@xyflow/react';
  import '@xyflow/react/dist/style.css';



export default function BoxNode({ id, data }) {
    const { setNodes } = useReactFlow();
    const text = data.label ?? 'new box comp';

    const handleChange = useCallback(
        (e) => {
            const value = e.target.value;
            setNodes((nodes) =>
                nodes.map((node) =>
                    node.id === id ? { ...node, data: { ...node.data, label: value } } : node
                )
            )
        }, [id, setNodes]
    );

    return (
        <div style={{
            background: "var(--box-fill)",
            border: "2px solid var(--box-border)",
            borderRadius: 8,
            padding: "10px 14px",
            minWidth: 140,
        }}>

            <Handle type="target"
                position={Position.Top}
            />
            <input
                value={text}
                onChange={handleChange}
                style={{
                    width: "100%",
                    border: "none",
                    background: "transparent",
                    color: "var(--box-text)",
                    fontFamily: "inherit",
                    fontSize: 14,
                    textAlign: "center",
                    outline: "none"
                }} />
                    <Handle type="source"
                position={Position.Bottom}
            />
        </div>

    )
}
