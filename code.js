figma.showUI(__html__, { width: 300, height: 300 });

function sendViewportInfo() {
  const bounds = figma.viewport.bounds;
  const zoom = figma.viewport.zoom;
  const center = figma.viewport.center;

  // Extraemos nodos del canvas para tener una idea del tamaño del mundo
  const nodes = figma.currentPage.children;
  const nodeData = nodes.map(node => ({
    x: node.absoluteTransform[0][2],
    y: node.absoluteTransform[1][2],
    width: node.width,
    height: node.height
  }));

  figma.ui.postMessage({
    type: 'init',
    viewport: { bounds, zoom, center },
    nodes: nodeData
  });
}

sendViewportInfo();

figma.ui.onmessage = msg => {
  if (msg.type === 'move-to') {
    figma.viewport.center = { x: msg.x, y: msg.y };
  }
};
