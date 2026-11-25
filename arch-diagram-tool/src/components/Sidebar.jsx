import { palletteItems } from "./palette.js"

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
                gap: 30
            }}>
            <div style={{ fontWeight: 600, fontSize: 20, alignSelf: "center", textDecoration: 'underline' }}>
                Components
            </div>
            <div style={{ fontWeight: 200, fontSize: 16, marginBottom: 4, alignSelf: "center" }}>
                Drag the components below on to the canvas
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
                                <span style={{ fontSize: 11, textAlign: "center", color: "var(--diamond-text)" }}>   {item.label}</span>
                            </div>

                        </div>

                        :
                        item.type === 'box' ? <div style={{
                            width: "100%",
                            background: `var(--${item.type}-fill)`,
                            border: `2px solid var(--${item.type}-border)`,
                            borderRadius: 8,
                            padding: "10px 12px",
                            fontSize: 13,
                            textAlign: "center",
                            color: "var(--box-text)",
                        }}>
                            {item.label}
                        </div> :

                            <div style={{ display: "flex", flexDirection: "column", width: "100%"}}>
                                {[0, 1, 2].map((i) => (
                                    <div
                                        key={i}
                                        style={{ width: "100%", 
                                            minHeight: 34, 
                                            display: "flex", 
                                            alignItems: "center", 
                                            justifyContent: "center",
                                            background: "var(--box-fill)", 
                                            border: "solid var(--border-width-s) var(--box-border)", 
                                            borderRadius: "var(--border-radius-xs)", }}
                                    >
                                        {i === 1 ? item.label : null}
                                    </div> 
                              )  )}


                            </div>

                    }

                </div>
            ))}
        </aside>
    )
}