import _ from 'underscore';
import { performance } from "perf_hooks";
import { read } from "promise-path";
import { fromHere, report as reportGen } from "../../util";

const report = reportGen(__filename);

export function parseForPart1(input:string):Set<string>[] {
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

export function parseForPart2(input:string):string[][][] {
  var groups:string[][][] = [];
  
  var group:string[][] = [];

  input.split('\n').forEach((row) => {
    if ( row.trim() === '' ) {
      groups.push(group);
      group = [];
    } else {
      group.push(row.trim().split(''));
    }
  });
  // last one
  groups.push(group);
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
  var groups:Set<string>[] = parseForPart1(input);
  var sizes = groups.map( group => {
    return group.size;
  });
  var solution = sizes.reduce((a,b) => a+b,0);
  report("First star solution:", solution.toString());
}

async function solveForSecondStar(input) {
  var groups:string[][][] = parseForPart2(input);

  var solution = groups.map( group => {
    return _.intersection.apply(_,group).length;
  }).reduce((a,b) => a+b,0);

  report("Second star solution:", solution.toString());
}
