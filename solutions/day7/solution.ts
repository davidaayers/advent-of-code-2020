import { performance } from "perf_hooks";
import { read } from "promise-path";
import { fromHere, report as reportGen } from "../../util";

const report = reportGen(__filename);

export type Bag = {
  color: string,
  num: number,
  inner: Bag[]
}

export function parseLine(line: string) : Bag {
  var parts = line.split(' bags contain ');
  var outerBag = parts[0];
  var innerBags = parts[1];

  var holding = innerBags != 'no other bags.' ? innerBags.split(', ').map( innerBagTxt => {
    var bagMatch = /^(\d) (\w+ \w+)/g.exec(innerBagTxt);
    if (bagMatch == null) return null;
    return <Bag> {
      color: bagMatch[2],
      num: bagMatch[1] != null ? +bagMatch[1] : null,
      inner: []
    }
  }) : [];

  return <Bag>{
    color: outerBag,
    num: 1,
    inner: holding
  }
}

export function parseInput(input: string) : Bag[] {
  return input.split('\n').map(line => parseLine(line));
}

export async function run(day: string) {
  const input = (
    await read(fromHere(`solutions/${day}` + "/input.txt"), "utf8")
  ).trim();

  var bags = parseInput(input);

  var firstStarStart = performance.now();
  await solveForFirstStar(bags);
  report('First star took ' + (performance.now()-firstStarStart)+ 'ms');
  var secondStarStart = performance.now();
  await solveForSecondStar(bags);
  report('Second star took ' + (performance.now()-secondStarStart)+ 'ms');
}

async function solveForFirstStar(bags) {
  var solutionBags = new Set<string>();
  findMatchingBags(bags, 'shiny gold', solutionBags);
  report("First star solution:", solutionBags.size.toString());
}

export function findMatchingBags(bags:Bag[], toMatch:string, solutionBags : Set<string>) {
  var matching = bags.filter(bag => {
    return bag.inner?.filter( innerBag => innerBag?.color === toMatch ).length > 0;    
  })

  matching.forEach(bag => {
    solutionBags.add(bag.color);
    findMatchingBags(bags, bag.color, solutionBags);
  });
}

async function solveForSecondStar(bags) {
  report("Second star solution:", countNestedBags(bags,'shiny gold').toString());
}

export function countNestedBags(bags:Bag[], color:string) : number {
  // find the bag in the list
  var bag = bags.find(bag => bag.color === color);

  var bagCnt = 0;
  bag?.inner.forEach(innerBag => {
    bagCnt += innerBag.num;
    bagCnt += innerBag.num * countNestedBags(bags, innerBag.color);
  })

  return bagCnt;
}

