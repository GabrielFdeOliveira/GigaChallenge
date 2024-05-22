import fs from "fs/promises";
import dotparser from "dotparser";
import { rateCardA, rateCardB } from "./rateCards.mjs";
import { trenchLength } from "./trenchLength.mjs";

export const calculateCost = (graph, rateCard) => {
  let totalCost = 0;

  for (let i = 0; i < graph[0].children.length; i++) {
    const child = graph[0].children[i];
    try {
      if (child.type === "node_stmt") {
        const nodeId = child.node_id.id;
        const attributes = {};
        for (let j = 0; j < child.attr_list.length; j++) {
          const attr = child.attr_list[j];
          attributes[attr.id] = attr.eq;
        }

        if (attributes.type === "Cabinet") {
          totalCost += rateCard.cabinet;
        } else if (attributes.type === "Pot") {
          if (rateCard.potToCabinetMultiplier) {
            const length = trenchLength(nodeId);
            totalCost += rateCard.potToCabinetMultiplier * length;
          } else {
            totalCost += rateCard.pot;
          }
        } else if (attributes.type === "Chamber") {
          totalCost += rateCard.chamber;
        }
      } else if (child.type === "edge_stmt") {
        const length = parseInt(
          child.attr_list.find((attr) => attr.id === "length").eq,
          10
        );
        const material = child.attr_list.find(
          (attr) => attr.id === "material"
        ).eq;
        if (material === "verge") {
          totalCost += length * rateCard.trenchVerge;
        } else if (material === "road") {
          totalCost += length * rateCard.trenchRoad;
        }
      }
    } catch (error) {
      console.error("Error occurred while calculating cost:", error);
    }
  }

  return totalCost;
};

(async () => {
  try {
    const data = await fs.readFile("problem.dot", "utf8");

    // Parse the DOT file
    const dotData = dotparser(data);

    const costA = await calculateCost(dotData, rateCardA);
    const costB = await calculateCost(dotData, rateCardB);

    console.log(`Total cost using Rate Card A: ${costA}`);
    console.log(`Total cost using Rate Card B: ${costB}`);
  } catch (error) {
    console.error("Error reading file:", error);
  }
})();
