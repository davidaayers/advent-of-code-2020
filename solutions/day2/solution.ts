import { performance } from "perf_hooks";
import { read } from "promise-path";
import { fromHere, report as reportGen } from "../../util";

const report = reportGen(__filename);

export async function run(day: string) {
  const input = (
    await read(fromHere(`solutions/${day}` + "/input.txt"), "utf8")
  ).trim();

  var passwords = input.split('\n').map(line=> {
    var parts = line.split(':');
    var password = parts[1].trim();
    var rulesParts = parts[0].split(' ');
    var requiredLetter = rulesParts[1];
    var countParts = rulesParts[0].split('-');
    var firstNum = +countParts[0];
    var secondNum = +countParts[1];
    return {
      firstNum: firstNum,
      secondNum: secondNum,
      letter: requiredLetter,
      password: password
    }
  })

  var firstStarStart = performance.now();
  await solveForFirstStar(passwords);
  report('First star took ' + (performance.now()-firstStarStart)+ 'ms');
  var secondStarStart = performance.now();
  await solveForSecondStar(passwords);
  report('Second star took ' + (performance.now()-secondStarStart)+ 'ms');
}

async function solveForFirstStar(passwords) {  
  var solution = passwords.filter( pw => {
    var numLetters = pw.password.split('').filter(letter => letter === pw.letter).length
    return numLetters >= pw.firstNum && numLetters <= pw.secondNum;
  }).length;
  report("First star solution:", solution);
}

async function solveForSecondStar(passwords) {
  var solution = passwords.filter( pw => {
    var letterAtPos1 = pw.password.substring(pw.firstNum-1,pw.firstNum);
    var letterAtPos2 = pw.password.substring(pw.secondNum-1,pw.secondNum);
    return (letterAtPos1 === pw.letter || letterAtPos2 === pw.letter) &&
      !(letterAtPos1 === pw.letter && letterAtPos2 === pw.letter);
  }).length;
  report("Second star solution:", solution);
}