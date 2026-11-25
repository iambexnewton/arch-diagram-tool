import { useCallback, useEffect, useRef } from "react";
import { Handle, Position, useReactFlow } from 'reactflow';
import '@xyflow/react/dist/style.css';


export default function DatabaseNode({ id, data, selected }) {
    const { setNodes, deleteElements } = useReactFlow();
    const text = data.label ?? 'new box comp';
    const ref = useRef(null)

    useEffect(() => {
        if (ref.current && document.activeElement !== ref.current) {
            ref.current.innerText = text
        }
    }, [text])

    const handleChange = useCallback(
        (e) => {
            const value = e.target.value
            setNodes((nodes) =>
                nodes.map((node) =>
                    node.id === id ? { ...node, data: { ...node.data, label: value } } : node
                )
            )
        }, [id, setNodes]
    );

    const handleDelete = useCallback((e) => {
        e?.stopPropagation?.()
        deleteElements({ nodes: [{ id }] })
    }, [id, deleteElements])

    return (
        <>
        {/* <div style={{ border: "solid red", display: "flex", flexDirection: "column" }}> */}
            <div style={{
                position: "absolute",
                top: 12,
                left: 0,
                zIndex: 0,
                background: "var(--box-fill)",
                border: "solid var(--border-width-s) var(--box-border)",
                borderRadius: "var(--border-radius-xs)",
                width: "100%",
                height: 22,
                boxSizing: "border-box"
            }} />
            <div style={{
                position: "absolute",
                top: 6,
                left: 0,
                zIndex: 1,
                background: "var(--box-fill)",
                border: "solid var(--border-width-s) var(--box-border)",
                borderRadius: "var(--border-radius-xs)",
                width: "100%",
                height: 22,
                boxSizing: "border-box"
            }} />
            <div style={{
                position: "relative",
                zIndex: 2,
                background: "var(--box-fill)",
                border: "solid var(--border-width-s) var(--box-border)",
                borderRadius: "var(--border-radius-xs)",
                paddingInline: 14,
                width: "fit-content",
                minWidth: 50,
                maxWidth: 80
            }}>
                {selected && (
                    <button
                        onClick={handleDelete}
                        title="Delete"
                        className="nodrag"
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
                <input
                    ref={ref}
                    contentEditable
                    suppressContentEditableWarning
                    // onInput={handleInput}
                    onChange={handleChange}
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
                        minWidth: 20,
                        cursor: "text",
                    }}
                />
                <Handle type="source"
                    position={Position.Bottom}
                />
            </div>

        {/* </div> */}
           
        </>
    )
}
