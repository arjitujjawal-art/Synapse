// KORTEX — Neural Network Graph Generator
// Precomputed node graph + pulse path generation for the Neural Pulse Canvas

export interface NeuralNode {
  id: number;
  x: number;
  y: number;
  radius: number;
}

export interface NeuralEdge {
  from: number;
  to: number;
}

export interface NeuralPath {
  edges: number[];
}

export interface NeuralNetwork {
  nodes: NeuralNode[];
  edges: NeuralEdge[];
  paths: NeuralPath[];
}

// Generate a neural network graph with precomputed edges and paths
export function generateNeuralNetwork(
  width: number,
  height: number,
  nodeCount: number = 45
): NeuralNetwork {
  const nodes: NeuralNode[] = [];
  const edges: NeuralEdge[] = [];
  const paths: NeuralPath[] = [];

  // Generate nodes with controlled randomness
  const padding = 40;
  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      id: i,
      x: padding + Math.random() * (width - 2 * padding),
      y: padding + Math.random() * (height - 2 * padding),
      radius: 2 + Math.random() * 2.5,
    });
  }

  // Connect nearby nodes (Delaunay-like, but simpler)
  const maxDist = Math.sqrt(width * width + height * height) * 0.25;
  for (let i = 0; i < nodes.length; i++) {
    // Find closest neighbors
    const distances: { index: number; dist: number }[] = [];
    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue;
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDist) {
        distances.push({ index: j, dist });
      }
    }
    distances.sort((a, b) => a.dist - b.dist);

    // Connect to 2-4 nearest neighbors
    const connectionCount = 2 + Math.floor(Math.random() * 3);
    for (let k = 0; k < Math.min(connectionCount, distances.length); k++) {
      const j = distances[k].index;
      // Avoid duplicate edges
      const exists = edges.some(
        (e) => (e.from === i && e.to === j) || (e.from === j && e.to === i)
      );
      if (!exists) {
        edges.push({ from: i, to: j });
      }
    }
  }

  // Generate traversal paths (each path is a sequence of connected edges)
  for (let p = 0; p < 5; p++) {
    const path: number[] = [];
    const startNode = Math.floor(Math.random() * nodes.length);
    let currentNode = startNode;
    const visited = new Set<number>([currentNode]);

    for (let step = 0; step < 6; step++) {
      // Find edges from current node
      const connectedEdges = edges
        .map((e, idx) => ({ idx, other: e.from === currentNode ? e.to : e.to === currentNode ? e.from : -1 }))
        .filter((e) => e.other !== -1 && !visited.has(e.other));

      if (connectedEdges.length === 0) break;

      const chosen = connectedEdges[Math.floor(Math.random() * connectedEdges.length)];
      path.push(chosen.idx);
      currentNode = chosen.other;
      visited.add(currentNode);
    }

    if (path.length > 1) {
      paths.push({ edges: path });
    }
  }

  return { nodes, edges, paths };
}
