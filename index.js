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

const rateCardA = {
  cabinet: 1000,
  trenchVerge: 50,
  trenchRoad: 100,
  chamber: 200,
  pot: 100,
};

const rateCardB = {
  cabinet: 1200,
  trenchVerge: 40,
  trenchRoad: 80,
  chamber: 200,
  potToCabinetMultiplier: 20,
};

const calculateCost = (graph, rateCard) => {
  let totalCost = 0;

  for (let componentKey in graph.components) {
    const component = graph.components[componentKey];
    try {
      if (component.type === "Cabinet") {
        totalCost += rateCard.cabinet;
      } else if (component.type === "POT") {
        // If type POT, check which card we are using, and look for the connected connection
        if (rateCard.potToCabinetMultiplier) {
          for (let i = 0; i < graph.connections.length; i++) {
            const connection = graph.connections[i];
            if (
              connection.from === componentKey ||
              connection.to === componentKey
            ) {
              totalCost += rateCard.potToCabinetMultiplier * connection.length;
              break; // break out once we find the connection
            }
          }
        } else {
          totalCost += rateCard.pot;
        }
      } else if (component.type === "Chamber") {
        totalCost += rateCard.chamber;
      }
    } catch (error) {
      console.error("Error occurred while calculating cost:", error);
    }
  }

  return totalCost;
};

const costA = calculateCost(graphData, rateCardA);
const costB = calculateCost(graphData, rateCardB);

console.log(`Total cost using Rate Card A: ${costA}`);
console.log(`Total cost using Rate Card B: ${costB}`);
