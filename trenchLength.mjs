import fs from "fs";
import graphlibDot from "graphlib-dot";

const graphData = fs.readFileSync("./problem.dot", "utf8");
const graph = graphlibDot.read(graphData);

const nodes = {};
const edges = [];

graph.nodes().forEach((node) => {
  nodes[node] = graph.node(node).type;
});

graph.edges().forEach((edge) => {
  const source = edge.v;
  const target = edge.w;
  const length = parseInt(graph.edge(edge).length, 10);
  edges.push({ source, target, length });
});

// Function to find the shortest path using breadth-first search (BFS)
const pathFromPotToCabinet = (start, end) => {
  let queue = [{ node: start, length: 0 }];
  const visited = new Set();

  while (queue.length > 0) {
    const { node: currentNode, length: currentLength } = queue.shift();

    if (currentNode === end) return currentLength;

    if (!visited.has(currentNode)) {
      visited.add(currentNode);

      edges.forEach((edge) => {
        if (edge.source === currentNode && !visited.has(edge.target)) {
          queue.push({
            node: edge.target,
            length: currentLength + edge.length,
          });
        } else if (edge.target === currentNode && !visited.has(edge.source)) {
          queue.push({
            node: edge.source,
            length: currentLength + edge.length,
          });
        }
      });
    }
  }

  return Infinity; // No path found
};

// Function to calculate the trench length from a POT to the Cabinet
export const trenchLength = (pot) => {
  const cabinet = Object.keys(nodes).find((node) => nodes[node] === "Cabinet");
  if (!cabinet) throw new Error("No Cabinet node found in the graph.");

  return pathFromPotToCabinet(pot, cabinet);
};
