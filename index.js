const graphData = {
  components: {
    A: { type: "Cabinet" },
    B: { type: "POT" },
    C: { type: "POT" },
    D: { type: "POT" },
    E: { type: "POT" },
    F: { type: "Chamber" },
    G: { type: "Chamber" },
    H: { type: "Chamber" },
    I: { type: "Chamber" },
  },
  connections: [
    { from: "A", to: "F", length: 50, material: "verge" },
    { from: "B", to: "F", length: 20, material: "verge" },
    { from: "C", to: "G", length: 50, material: "road" },
    { from: "D", to: "H", length: 100, material: "road" },
    { from: "E", to: "H", length: 50, material: "verge" },
    { from: "F", to: "G", length: 100, material: "verge" },
    { from: "G", to: "I", length: 40, material: "road" },
    { from: "H", to: "G", length: 100, material: "road" },
  ],
};
