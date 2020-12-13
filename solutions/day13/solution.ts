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

async function solveForFirstStar(input) {
  var [startMinuteStr,bussesStr] = input.split('\n');
  var startMinute = +startMinuteStr;
  var busses = bussesStr.split(',').filter(b=> b != 'x');

  var currentMinute = startMinute;
  var searchingForBus = true;
  var busNumber = 0;
  while(searchingForBus) {
    currentMinute++;
    for (var idx = 0 ; idx < busses.length; idx ++ ) {
      if ( currentMinute % busses[idx] === 0 ) {
        busNumber = busses[idx];
        searchingForBus = false;
        break;
      }
    }
  }

  const solution = (currentMinute - startMinute) * busNumber;
  report("Input:", input);
  report("First star solution:", solution.toString());
}

async function solveForSecondStar(input) {
  var [,bussesStr] = input.split('\n');
  var busses = bussesStr.split(',');



  const solution = "UNSOLVED";
  report("Second star solution:", solution);
}
