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

type Operation = {
  opCode: string,
  value: number,
  timesExecuted: number
}

async function solveForFirstStar(input) {
  var results = runProgram(parseInput(input));
  report("First star solution:", results['result'].toString());
}

async function solveForSecondStar(input) {
  for ( var idx = 0 ; idx < input.length; idx ++ ) {
    var program = parseInput(input);
    if (program[idx].opCode != 'jmp' ) continue;
    program[idx].opCode = 'nop'
    var results = runProgram(program);
    if ( results['returnCode'] ) {
      report("Second star solution:", results['result'].toString());
      return;
    }
  }

  const solution = "UNSOLVED";
  report("Second star solution:", solution);
}

export function parseInput(input) : Operation[] {
  return input.split('\n').map(line => {
    var [,opCode,sign,value] = line.match(/^(\w+) (-|\+)(\d+)$/);
    value = sign === '-' ? value *= -1 : +value;
    return {
      opCode: opCode,
      value: value,
      timesExecuted: 0
    }
  });
}

export function runProgram(operations:Operation[]) : {} {
  var accumulator = 0;
  var ptr = 0;
  while (true) {
    var operation = operations[ptr];
    if ( operation.timesExecuted === 1 ) {
      break;
    }
    if ( operation.opCode === 'acc' ) accumulator += operation.value;
    if ( operation.opCode === 'jmp' ) ptr += operation.value;
    else ptr++;
    operation.timesExecuted++;

    // terminate if we're at the end
    if ( ptr === operations.length) {
      return {result: accumulator, returnCode: true};
    }
  }
  return {result: accumulator, returnCode: false};
}

