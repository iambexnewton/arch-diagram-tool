import { getBezierPath, EdgeLabelRenderer, BaseEdge, useReactFlow } from "reactflow";
export default function DeletableEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    selected,
    style,
    markerEnd,
}) {
    const { deleteElements } = useReactFlow();
    const [edgePath, labelX, labelY] = getBezierPath(
        {
            sourceX,
            sourceY,
            targetX,
            targetY,
            sourcePosition,
            targetPosition,
        }
    )
    const handleDelete = (e) => {
        e?.stopPropagnation?.();
        deleteElements({ edges: [{ id }] }, [id, deleteElements])
    }

    const edgeStyle= {
        stroke: "var(--box-border)",
        strokeWidth: 2,
    }

    return (
        <>
            <BaseEdge
                id={id} path={edgePath} style={edgeStyle} markerEnd={markerEnd} />
            {selected && (
                <EdgeLabelRenderer>
                    <button
                        className="nodrag nopan"
                        onClick={handleDelete}
                        title="delete"
                        style={{
                            alignItems: "center",
                            background: "white",
                            border: "1px solid var(--box-border)",
                            borderRadius: "50%",
                            cursor: "pointer",
                            display: "flex",
                            fontSize: 10,
                            height: 28,
                            justifyContent: "center",
                            lineHeight: 1,
                            pointerEvents: "all",
                            position: "absolute",
                            transform: `translate(-50%, -50%) translate(${labelX + 28}px, ${labelY - 26}px)`,
                            width: 28,
                        }}>
                        &#128465;
                    </button>
                </EdgeLabelRenderer>


            )}
        </>
    )


}
