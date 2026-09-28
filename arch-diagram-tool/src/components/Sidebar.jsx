import { nodeTypes } from "./nodes/index.js"

export const palletteItems = [
    { type: "box", label: 'Box' },
    { type: "diamond", label: 'Diamond' },
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
                        display: "flex",
                        justifyContent: "center",
                        cursor: "grab",
                        userSelect: "none",
                    }}
                >
                    {item.type === 'diamond' ?
                        <div style={{ position: "relative", width: 100, height: 100 }}>
                            <div style={{
                                position: "absolute",
                                inset: 0,
                                background: "var(--diamond-border)",
                                clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",

                            }} />
                            <div style={{
                                position: "absolute",
                                inset: 3,
                                background: "var(--diamond-fill)",
                                clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",


                            }}>
                                <span style={{ fontSize: 11, textAlign: "center", color: "var(--diamond-text)",}}>   {item.label}</span>
                            </div>

                        </div>
                        : <div style={{
                            width: "100%",
                            background: `var(--${item.type}-fill)`,
                            border: ` 2px solid var(--${item.type}-border)`,
                            borderRadius: 8,
                            padding: "10px 12px",
                            fontSize: 13,
                            textAlign: "center",
                            color: "var(--box-text)",

                        }}>
                            {item.label}
                        </div>
                    }

                </div>
            ))}
        </aside>
    )
}