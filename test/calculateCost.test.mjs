import { expect } from "chai";
import dotparser from "dotparser";
import fs from "fs/promises";
import { calculateCost } from "../index.mjs";
import { rateCardA, rateCardB } from "../rateCards.mjs";

describe('Testing suite for the "calculateCost" function', () => {
  it("calculates cost correctly using Rate Card A", async () => {
    const data = await fs.readFile("problem.dot", "utf8");
    const dotData = dotparser(data);
    const cost = calculateCost(dotData, rateCardA);
    expect(cost).to.equal(42200);
  });

  it("calculates cost correctly using Rate Card B", async () => {
    const data = await fs.readFile("problem.dot", "utf8");
    const dotData = dotparser(data);
    const cost = calculateCost(dotData, rateCardB);
    expect(cost).to.equal(38400);
  });

  it("calculates cost for an empty graph", () => {
    const dotData = dotparser("strict graph {}");
    const cost = calculateCost(dotData, rateCardA);
    expect(cost).to.equal(0);
  });

  it("calculates cost for a graph with only nodes", () => {
    const dotData = dotparser(`
      strict graph {
        A [type=Cabinet];
        B [type=Pot];
        C [type=Chamber];
      }
    `);

    const cost = calculateCost(dotData, rateCardA);
    expect(cost).to.equal(
      rateCardA.cabinet + rateCardA.pot + rateCardA.chamber
    );
  });

  it("calculates cost for a graph with only edges", () => {
    const dotData = dotparser(`
      strict graph {
        A -- B [length=100, material=verge];
        B -- C [length=50, material=road];
      }
    `);
    const cost = calculateCost(dotData, rateCardA);
    expect(cost).to.equal(
      100 * rateCardA.trenchVerge + 50 * rateCardA.trenchRoad
    );
  });

  it("handles a large graph efficiently", async () => {
    const largeGraphData = Array.from(
      { length: 1000 },
      (_, i) => `
      A${i} -- B${i} [length=${i}, material=verge];
    `
    ).join("\n");

    const dotData = dotparser(`
      strict graph {
        ${largeGraphData}
      }
    `);

    const start = process.hrtime();
    const cost = calculateCost(dotData, rateCardA);
    const end = process.hrtime(start);

    expect(cost).to.be.a("number");
    expect(end[0]).to.be.lessThan(5);
  });

  it("throws an error with an invalid rate card", async () => {
    const dotData = await fs.readFile("problem.dot", "utf8");
    expect(() => calculateCost(dotData, null)).to.throw(Error);
  });

  it("throws an error with invalid DOT data", () => {
    const dotData = "invalid graph data";
    expect(() => dotparser(dotData)).to.throw(Error);
  });
});
