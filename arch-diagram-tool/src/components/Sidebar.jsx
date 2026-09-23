import { nodeTypes } from "./nodes"

const palletteItems = [
    { type: "box", label: 'box' },
]
export default function Sidebar() {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.effectAllowed = "move";

    }

    return (
        <aside
            style={{
                width: 160,
                padding: 21,
                borderRight: "1px solid #ddd",
                background: "#fff",
                display: "flex",
                flexDirection: "column",
                gap: 10
            }}>
            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>
                Components
            </div>

            {palletteItems.map((item) => (
                <div key={item.type}
                    draggable
                    onDragStart={(e) => onDragStart(e, item.type)}
                    style={{
                        background: "var(--box-fill)",
                        border: "2px solid var(--box-border)",
                        borderRadius: 8,
                        padding: "10px 12px",
                        fontSize: 13,
                        textAlign: "center",
                        color: "var(--box-text)",
                        cursor: "grab",
                        userSelect: "none",
                    }}
                >{item.label}

                </div>
            ))}
        </aside>
    )
}