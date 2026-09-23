import { useCallback, useEffect, useRef } from "react";
import { Handle, Position, useReactFlow } from 'reactflow';
import '@xyflow/react/dist/style.css';



export default function BoxNode({ id, data, selected }) {
    const { setNodes, deleteElements } = useReactFlow();
    const text = data.label ?? 'new box comp';
    const ref = useRef(null)

    useEffect(() => {
        if (ref.current && document.activeElement !== ref.current) {
            ref.current.innerText = text
        }
    }, [text])


    const handleDelete = useCallback((e) => {
        e?.stopPropagation?.()
        deleteElements({ nodes: [{ id }] }, [id, deleteElements])
    })
    const handleInput = useCallback(
        (e) => {
            const value = e.target.innerText
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
            width: 'fit-content',
            maxWidth: 320
        }}>
            {selected && (
                <button className="nodrag"
                    onClick={handleDelete}
                    title="Delete"
                    style={{
                        position: "absolute",
                        top: -12,
                        right: -12,
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        border: "1px solid var(--box-border)",
                        background: "white",
                        cursor: "pointer"
                    }}

                >
                    &#128465;
                </button>
            )}
            <Handle type="target"
                position={Position.Top}
            />
            <div
                ref={ref}
                contentEditable
                suppressContentEditableWarning
                onInput={handleInput}
                value={text}

                style={{
                    width: "100%",
                    border: "none",
                    background: "transparent",
                    color: "var(--box-text)",
                    fontFamily: "inherit",
                    fontSize: 14,
                    textAlign: "center",
                    outline: "none",
                    whiteSpace: 'pre-wrap',
                    wordBreak: "break-word",
                    minWidth: 20
                }} />
            <Handle type="source"
                position={Position.Bottom}
            />
        </div>

    )
}
