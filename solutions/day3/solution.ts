import { performance } from "perf_hooks";
import { read } from "promise-path";
import { fromHere, report as reportGen } from "../../util";

const report = reportGen(__filename);

export async function run(day: string) {
  const input = (
    await read(fromHere(`solutions/${day}` + "/input.txt"), "utf8")
  ).trim();

  var lines = input.split('\n');
  var repeatRight = Math.ceil(lines.length * 3 / lines[0].length);

  var forestMap = lines.map(line => {
    return line.repeat(repeatRight);
  });

  var firstStarStart = performance.now();
  await solveForFirstStar(forestMap);
  report('First star took ' + (performance.now()-firstStarStart)+ 'ms');
  var secondStarStart = performance.now();
  await solveForSecondStar(input);
  report('Second star took ' + (performance.now()-secondStarStart)+ 'ms');
}

async function solveForFirstStar(forestMap:Array<String>) {
  var treeCnt = solve(3,1,forestMap);
  report("First star solution:", treeCnt.toString());
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

async function solveForSecondStar(input) {
  const solution = "UNSOLVED";
  report("Second star solution:", solution);
}
