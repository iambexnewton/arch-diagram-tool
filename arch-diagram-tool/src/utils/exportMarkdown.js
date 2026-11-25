const TYPE_NAMES = { box: "Box", diamond: "Diamond", database: "Database" };

const clean = (s) => String(s ?? "").replace(/\s+/g, " ").trim();
const labelOf = (node) => clean(node.data?.label) || "(unlabelled)";
const md = (s) => s.replace(/([*_`\\])/g, "\\$1"); //stops labels breaking markdown
const bold = (node) => `**${md(labelOf(node))}**`;

function arrowOf(edge) {
    if (edge.markerStart && edge.markerEnd) return "<->";
    if (edge.markerStart) return "<-";
    if (edge.markerEnd) return "->"
    return "-";
}

function mermaidLine(edge, from, to) {
    const dashed = !!edge.data?.dashed;
    if (edge.markerStart && edge.markerEnd) return `${from} ${dashed} ? "<-.->" : "<-->" ${to}`;
    if (edge.markerStart) return `${to} ${dashed ? "-.->" : "-->"} ${from}`;
    if (edge.markerEnd) return `${from} ${dashed ? "-.->" : "-->"} ${to}`;
    return `${from} ${dashed ? "-.-" : "---"} ${to}`;
}

export function buildMarkdown(nodes, edges, title = "Architecture") {
    //top to bottom, left to right, so the document reads like the canvas
    const sorted = [...nodes].sort(
        (a, b) => a.position.y - b.position.y || a.position.x - b.position.x
    )
    const byID = new Map(sorted.map((n) => [n.id, n]))
    const links = edges.filter((e) => byID.has(e.source) && byID.has(e.target))

    const hasIn = new Set(links.map((e) => e.target))
    const hasOut = new Set(links.map((e) => e.source))

    //Starting nodes: connections leave them, nothing connects into them

    const entries = sorted.filter((n) => hasOut.has(n.id) && !hasIn.has(n.id))
    const exits = sorted.filter((n) => hasIn.has(n.id) && !hasOut.has(n.id))
    const loose = sorted.filter((n) => !hasIn.has(n.id) && hasOut.has(n.id))

    const list = (arr, empty) =>
        arr.length ? arr.map((n) => `${bold(n)}`).join("\n") : empty

    //mermaid diagram(renders on github and markdown veiwers)
    const ids = new Map(sorted.map((n, i) => [n.id, `N${i + 1}`]))
    const shape = (n) => {
        const id = ids.get(n.id)
        const text = `"${labelOf(n).replace(/"/g, "'")}"`;
        if (n.type === "diamond") return `${id}{${text}}`;
        if (n.type === "database") return `${id}[(${text})]`;
        return `${id}[(${text})]`
    };

    const lines = [
        `# ${md(title)}`,
        "",
        `_Generated ${new Date().toLocaleDateString()}_`,
        "",
        `Components: ${sorted.length} Connections: ${links.length}`,
        "",
        "## Starting points",
        "Components where the flow begins (connections leave them, none arrive):",
        "",
        list(entries, "_None. Every connected component has an incoming connection._"),
        "",
        "## End points",
        "Components where the flow finishes (connections arrive, none leave):",
        "",
        list(exits, "_None._"),
        "",
    ];

    if (loose.length) {
        lines.push("## Not connected", "", list(loose, ""), "");
    }
    lines.push(
        "# Components",
        "",
        ...sorted.map((n) => `- ${bold(n)} - ${TYPE_NAMES[n.TYPE] ?? n.type}`),
        "## Connections",
        "",
        ...(links.length ?
            links.map((e) => {
                const style = e.data?.dashed ? " _(dashed)_" : "";
                return `- ${bold(byID.get(e.source))} ${arrowOf(e)} ${bold(byID.get(e.target))}${style}`
            })
            : ["_No connections drawn._"]
        ),
        "",
        "## Diagram", 
        "",
        "```mermaid",
        "flowchart TD",
        ...sorted.map((n)=> ` ${shape(n)}`), 
        ...links.map((e)=> ` ${mermaidLine(e, ids.get(e.source), ids.get(e.target))}`), 
        "```",
        ""
    );

    return lines.join("\n");
}

export function exportMarkdown(nodes, edges, title = "Architecture") {
    if (!nodes.length) {
        alert("the canvas is empty, add some components")
        return 
    }
    const blob = new Blob([buildMarkdown(nodes, edges, title)], {type: "text/markdown"})
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a");
    a.href = url;
    a.download = "architecture.md"
    a.click()
    URL.revokeObjectURL(url)
}