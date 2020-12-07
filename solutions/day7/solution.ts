import { connect } from "http2";
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

  var holding = innerBags.split(', ').map( innerBagTxt => {
    var bagMatch = /^(\d) (\w+ \w+)/g.exec(innerBagTxt);
    if (bagMatch == null) return null;
    return <Bag> {
      color: bagMatch[2],
      num: bagMatch[1] != null ? +bagMatch[1] : null,
      inner: []
    }
  });

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
  countMatchingBags(bags, 'shiny gold', solutionBags);
  report("First star solution:", solutionBags.size.toString());
}

export function countMatchingBags(bags:Bag[],toMatch:string,solutionBags:Set<string>) {
  var matching = bags.filter(bag => {
    return bag.inner?.filter( innerBag => innerBag?.color === toMatch ).length > 0;    
  })

  console.log("Matching:\n");
  matching.forEach(bag => {
    console.log(bag);
    solutionBags.add(bag.color);
    countMatchingBags(bags, bag.color, solutionBags);
  });
}

async function solveForSecondStar(bags) {
  const solution = "UNSOLVED";
  report("Second star solution:", solution);
}
