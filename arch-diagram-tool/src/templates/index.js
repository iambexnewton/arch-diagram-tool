import { MarkerType } from "reactflow";

export const arrow = { type: MarkerType.ArrowClosed, color: "var(--box-border)" };
const edge = (id, source, target) => ({
    id, source, target, type: "deletable",
    markerEnd: arrow
})

export const templates = [

    { id: "blank", name: "blank canvas", nodes: [], edges: [] },
    {
        id: "three-tier", name: "three tier",
        nodes: [
            { id: "t1", type: "box", position: { x: 200, y: 0 }, data: { label: "browser" } },
            { id: "t2", type: "box", position: { x: 200, y: 130 }, data: { label: "api" } },
            { id: "t3", type: "database", position: { x: 200, y: 260 }, data: { label: "database" } }
        ],
        edges: [edge("te1", "t1", "t2"), edge("te2", "t2", "t3")],
    },
    {
        id: "auth-flow", name: "login ",
        nodes: [
            { id: "a1", type: "box", position: { x: 200, y: 0 }, data: { label: "login" } },
            { id: "a2", type: "diamond", position: { x: 215, y: 120 }, data: { label: "valid?" } },
            { id: "a3", type: "box", position: { x: 40, y: 300 }, data: { label: "reject" } },
            { id: "a4", type: "box", position: { x: 360, y: 300 }, data: { label: "create session" } },
        ],
        edges: [edge("ae1", "a1", "a2"), edge("ae2", "a2", "a3"), edge("ae3", "a2", "a4")],
    },

]