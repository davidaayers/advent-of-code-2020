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
  var numbers = parseInput(input);
  var solution = findOutOfPlaceNumber(numbers,25);
  report("First star solution:", solution.toString());
}

async function solveForSecondStar(input) {
  var numbers = parseInput(input);
  var part1Solution = findOutOfPlaceNumber(numbers,25);
  var part2Solution = findWeakness(numbers,part1Solution);
  report("Second star solution:", part2Solution.toString());
}

export function findWeakness(numbers:number[],match) : number {
  for ( var o = 0 ; o < numbers.length-1; o ++ ) {
    var sum = numbers[o];
    for ( var i = o+1; i < numbers.length; i ++ ) {
      sum += numbers[i];
      if ( sum === match) {
        var matchingNumbers = numbers.slice(o,i+1);
        var least = Math.min(...matchingNumbers);
        var most = Math.max(...matchingNumbers);
        return least + most;
      } 
      if ( sum > match ) {
        break;
      }
    }
  }
  return 0;
}

export function parseInput(input:string):number[] {
  return input.split('\n').map(line=> {
    return +line;
  });
}

export function findOutOfPlaceNumber(input:number[], window:number) : number {
  for (var idx = window; idx < input.length ; idx ++ ) {
    var firstPart = input.slice(idx-window,idx);
    var num = input[idx];
    if (!matchFound(firstPart,num)) {
      return num;
    }
  }
  return 0;
}

function matchFound(numbers:number[],value:number) : boolean {
  for (var o = 0 ; o < numbers.length; o ++ ) {
    for ( var i = 0 ; i < numbers.length; i ++ ) {
      if ( o != i && numbers[o] + numbers[i] === value) {
        return true;
      }
    }
  }
  return false;
}