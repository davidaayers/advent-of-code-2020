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
  var passwords = input.split('\n').map(line=> {
    var parts = line.split(':');
    var password = parts[1].trim();
    var rulesParts = parts[0].split(' ');
    var requiredLetter = rulesParts[1];
    var countParts = rulesParts[0].split('-');
    var min = +countParts[0];
    var max = +countParts[1];
    return {
      min: min,
      max: max,
      letter: requiredLetter,
      password: password
    }
  })
  
  var solution = passwords.filter( pw => {
    var numLetters = pw.password.split('').filter(letter => letter === pw.letter).length
    return numLetters >= pw.min && numLetters <= pw.max;
  }).length 

  report("First star solution:", solution);
}

async function solveForSecondStar(input) {
  const solution = "UNSOLVED";
  report("Second star solution:", solution);
}
