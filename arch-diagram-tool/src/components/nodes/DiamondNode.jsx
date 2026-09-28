import { useCallback, useEffect, useRef } from "react";
import { Handle, Position, useReactFlow } from 'reactflow';
import '@xyflow/react/dist/style.css';



export default function DiamondNode({ id, data, selected }) {
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
        deleteElements({ nodes: [{ id }] }, [id, deleteElements])
    })

    return (

        <div style={{
            position: "relative", width: 130, height: 130
            // width: "100%",
            // height: "100%",
            // background: "var(--diamond-fill)",
            // border: "solid var(--border-width-s) solid var(--border-radius-xs)",

            // clipPath: "polygon(50%, 0%, 100% 50%, 50% 100%,0% 50%)",
            // display: "flex",
            // alignItems: "center",

            // padding: "10px 14px",
            // minWidth: 140,
            // width: 'fit-content',
            // maxWidth: 320
        }}>
            {selected && (
                <button className="nodrag"
                    onClick={handleDelete}
                    title="Delete"
                    style={{
                        position: "absolute",
                        top: 10,
                        right: 20,
                        zIndex: 10,
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        border: "1px solid var(--diamond-border)",
                        background: "white",
                        cursor: "pointer"
                    }}

                >
                    &#128465;
                </button>
            )}
            <div style={{
                position: "absolute",
                inset: 0,
                background: "var(--diamond-border)",
                clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                zIndex: 0

            }}/>
                <div style={{
                    position: "absolute",
                    inset: 2,
                    background: "var(--diamond-fill)",
                    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1
                }}>

                    <input
                        ref={ref}
                        contentEditable
                        suppressContentEditableWarning
                        // onInput={handleInput}
                        onChange={handleChange}
                        value={text}

                        style={{
                            width: "55%",
                            border: "none",
                            background: "transparent",
                            color: "var(--diamond-text)",
                            fontFamily: "inherit",
                            fontSize: 14,
                            textAlign: "center",
                            outline: "none",
                            whiteSpace: 'pre-wrap',
                            wordBreak: "break-word",
                            minWidth: 20,
                            cursor: text,
                        }} />
                </div>
                <Handle type="target"
                    position={Position.Top}
                style={{
                    //     background: "black",
                    //     width: 8,
                    //     height: 8,
                         zIndex: 5
                     }}
                />
         

            <Handle type="source"
                position={Position.Bottom}
                style={{
                    // background: "black",
                    // width: 8,
                    // height: 8,
                     zIndex: 5
                }}
            />
        </div>

    )
}
