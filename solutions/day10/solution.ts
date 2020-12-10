import { performance } from "perf_hooks";
import { read } from "promise-path";
import { fromHere, report as reportGen } from "../../util";

const report = reportGen(__filename);

export async function run(day: string) {
  const input = (
    await read(fromHere(`solutions/${day}` + "/input.txt"), "utf8")
  ).trim();

  var firstStarStart = performance.now();
  await solveForFirstStar(input);
  report('First star took ' + (performance.now()-firstStarStart)+ 'ms');
  var secondStarStart = performance.now();
  await solveForSecondStar(input);
  report('Second star took ' + (performance.now()-secondStarStart)+ 'ms');
}

export function parseInput(input:string) : number[] {
  return input.split('\n').map(line => +line).sort((a, b) => {return a-b})
}

export function findDistribution(input:number[]) : {} {
  // start threes with 1 to account for the last plugin to the actual device,
  // which is always a step of 3
  var distribution = { ones: 0, threes: 1 };
  var currentJoltage = 0;
  while( input.length > 0 ) { 
    var nextJoltage = input.splice(0,1)[0];
    if ( nextJoltage - currentJoltage === 1 ) distribution.ones++
    else distribution.threes++
    currentJoltage = nextJoltage;
  }

  return distribution;
}

async function solveForFirstStar(input) {
  var adapters = parseInput(input);
  var distribution = findDistribution(adapters);
  report("First star solution:", (distribution['ones'] * distribution['threes']).toString());
}

async function solveForSecondStar(input) {
  const solution = "UNSOLVED";
  report("Second star solution:", solution);
}
