import { performance } from "perf_hooks";
import { read } from "promise-path";
import { fromHere, report as reportGen } from "../../util";

const report = reportGen(__filename);

export async function run(day: string) {
  const input = (
    await read(fromHere(`solutions/${day}` + "/input.txt"), "utf8")
  ).trim();

  var lines = input.split('\n');
  var repeatRight = Math.ceil(lines.length * 7 / lines[0].length);

  var forestMap = lines.map(line => {
    return line.repeat(repeatRight);
  });

  var firstStarStart = performance.now();
  await solveForFirstStar(forestMap);
  report('First star took ' + (performance.now()-firstStarStart)+ 'ms');
  var secondStarStart = performance.now();
  await solveForSecondStar(forestMap);
  report('Second star took ' + (performance.now()-secondStarStart)+ 'ms');
}

async function solveForFirstStar(forestMap:Array<String>) {
  var treeCnt = solve(3,1,forestMap);
  report("First star solution:", treeCnt.toString());
}

async function solveForSecondStar(forestMap:Array<String>) {
  var deltas = [
    [1,1],
    [3,1],
    [5,1],
    [7,1],
    [1,2],
  ]

  var treeCnt = deltas.map(d => {
    return solve(d[0],d[1],forestMap);
  }).reduce((a,b) => a * b, 1);
  
  report("Second star solution:", treeCnt.toString());
}

function solve(dx:number,dy:number,forestMap:Array<String>):number {
  var x = 0, y = 0;
  var treeCnt = 0;
  while ( y < forestMap.length ) {
    var row = forestMap[y];
    var mapFeature = row.substring(x,x+1);
    if (mapFeature === "#") treeCnt++;
    x += dx;
    y += dy;
  }
  return treeCnt;
}
