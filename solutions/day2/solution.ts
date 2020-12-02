import { performance } from "perf_hooks";
import { read } from "promise-path";
import { fromHere, report as reportGen } from "../../util";

const report = reportGen(__filename);

type Password = {
  firstNum: number,
  secondNum: number,
  letter: string,
  password: string,
}

export async function run(day: string) {
  const input = (
    await read(fromHere(`solutions/${day}` + "/input.txt"), "utf8")
  ).trim();

  var passwords:Array<Password> = input.split('\n').map(line => {
    // 15-16 m: mhmjmzrmmlmmmmmm
    const regex = /(\d+)-(\d+)\s(\w+):\s(\w+)/g;

    var result = regex.exec(line);
    if ( result === null) return false;

    var o : Password = {
      firstNum: +result[1],
      secondNum: +result[2],
      letter: result[3],
      password: result[4]
    }

    return o;
  })

  var firstStarStart = performance.now();
  await solveForFirstStar(passwords);
  report('First star took ' + (performance.now()-firstStarStart)+ 'ms');
  var secondStarStart = performance.now();
  await solveForSecondStar(passwords);
  report('Second star took ' + (performance.now()-secondStarStart)+ 'ms');
}

async function solveForFirstStar(passwords:Array<Password>) {  
  var solution = passwords.filter( pw => {
    var numLetters = pw.password.split('').filter(letter => letter === pw.letter).length
    return numLetters >= pw.firstNum && numLetters <= pw.secondNum;
  }).length;
  report("First star solution:", solution.toString());
}

async function solveForSecondStar(passwords:Array<Password>) {
  var solution = passwords.filter( pw => {
    var letterAtPos1 = pw.password.substring(pw.firstNum-1,pw.firstNum);
    var letterAtPos2 = pw.password.substring(pw.secondNum-1,pw.secondNum);
    return (letterAtPos1 === pw.letter || letterAtPos2 === pw.letter) &&
      !(letterAtPos1 === pw.letter && letterAtPos2 === pw.letter);
  }).length;
  report("Second star solution:", solution.toString());
}
