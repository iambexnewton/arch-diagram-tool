import { toPng, toSvg } from 'html-to-image';
import {getNodesBounds, getViewportForBounds} from 'reactflow';

function getFlowElement() {
    // return document.querySelectorAll('[class*="react-flow"]')
  return document.querySelector('.react-flow__viewport');
}

async function exportAs(format, nodes, filename) {
    const flowElement = getFlowElement()
    if(!flowElement){
        alert("canvas not found")
        return
    }

    const nodesBounds = getNodesBounds(nodes);
    const imageWidth = 1600;
    const imageHeight =1200;
    const {x, y, zoom } = getViewportForBounds(nodesBounds, imageWidth, imageHeight, 0.5, 2)

    const options ={
         backgroundColor: getComputedStyle(document.documentElement).getPropertyValue("--canvas-bg").trim() || "#ffffff",
         width: imageWidth, 
         height: imageHeight,
         style: {
            width: imageWidth, 
            height: imageHeight,
            transform: `translate(${x}px, ${y})scale(${zoom})`,
         }
    }

const dataUrl = format === 'svg' ? await toSvg(flowElement, options) : await toPng(flowElement, options);

const link = document.createElement('a');
link.download = filename;
link.href = dataUrl;
link.click();

}

export function exportToPng(nodes) {
    return exportAs("png", nodes, "architecture-diagram.png")
}

export function exportToSvg(nodes) {
    return exportAs("svg", nodes, "architecture-diagram.svg")
}