import { performance } from "perf_hooks";
import { read } from "promise-path";
import { fromHere, report as reportGen } from "../../util";

const report = reportGen(__filename);

export type BoardingPass = {
  row: number,
  column: number,
  seatId: number
}

export function decodeBoardingPassString(bpString:string):BoardingPass {
  var columnData = bpString.substring(0,bpString.length-3);
  var rowData = bpString.substring(bpString.length-3);

  var row = decode(columnData, 127);
  var column = decode(rowData, 7);

  var bp:BoardingPass = {
    row: row,
    column: column,
    seatId: (row * 8 + column),
  };
  return bp;
}

export function decode(data:string, value:number):number {
  var lower = 0;
  var upper = value;
  var firstSix = data.substring(0,data.length-1);
  firstSix.split('').forEach(str => {
    if( str === 'F' || str === 'L' ) {
      upper = Math.floor(upper - (upper-lower)/2);
    } else {
      lower = Math.floor(lower + (upper-lower)/2) + 1;
    }
  })
  var lastChar = data.substring(data.length-1);
  return lastChar === 'F' || lastChar == 'L' ? lower : upper;
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
  var solution = input.split('\n').map(i => {
    return decodeBoardingPassString(i);
  }).map(bp => {return bp.seatId}).sort(function(a, b){return b-a})[0]
  report("First star solution:", solution);
}

async function solveForSecondStar(input) {
  var seats = input.split('\n').map(i => {
    return decodeBoardingPassString(i);
  }).map(bp => {return bp.seatId}).sort((a, b) => {return a-b});

  var solution = -1;
  for (var idx = 0; idx < seats.length - 1; idx ++) {
    var idxAfter = idx + 1;
    if ( seats[idx] + 1 != seats[idxAfter]) {
      solution = seats[idx] + 1;
      break;
    }
  }

  report("Second star solution:", solution.toString());
}
