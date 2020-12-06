import { connect } from "http2";
import { performance } from "perf_hooks";
import { read } from "promise-path";
import { fromHere, report as reportGen } from "../../util";

const report = reportGen(__filename);

export function parseInput(input:string):Set<string>[] {
  var groups:Set<string>[] = [];
  
  var groupSet = new Set<string>();
  input.split('\n').forEach(row => {
    if ( row.trim() === '' ) {
      groups.push(groupSet);
      groupSet = new Set<string>();
    }
    row.trim().split('').forEach(ltr=>{
      groupSet.add(ltr);
    });
  });
  // last one
  groups.push(groupSet);
  return groups;
}

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

async function solveForFirstStar(input) {
  var groups:Set<string>[] = parseInput(input);
  var sizes = groups.map( group => {
    return group.size;
  });
  var solution = sizes.reduce((a,b) => a+b,0);
  report("First star solution:", solution.toString());
}

async function solveForSecondStar(input) {
  const solution = "UNSOLVED";
  report("Second star solution:", solution);
}
