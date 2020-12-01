import { read } from "promise-path";
import { fromHere, report as reportGen } from "../../util";

const report = reportGen(__filename);

export async function run(day: string) {
  const input = (
    await read(fromHere(`solutions/${day}` + "/input.txt"), "utf8")
  ).trim();

  await solveForFirstStar(input);
  await solveForSecondStar(input);
}

async function solveForFirstStar(input) {
  var solution;
  var lines = input.split('\n');

  for (var i1 = 0; i1 < lines.length; i1++) {
    for (var i2 = i1 +1; i2 < lines.length; i2++) {
      var n1: number = +lines[i1];
      var n2: number = +lines[i2];
      if( n1 + n2 === 2020) {
        solution = (n1 * n2).toString();
      }
    }
  }

  report("Solution 1:", solution);
  
}

async function solveForSecondStar(input) {
  var solution;
  var lines = input.split('\n');

  for (var i1 = 0; i1 < lines.length; i1++) {
    for (var i2 = i1 +1; i2 < lines.length; i2++) {
      for( var i3 = i2 + 1; i3 < lines.length; i3++) {
        var n1: number = +lines[i1];
        var n2: number = +lines[i2];
        var n3: number = +lines[i3];
        if( n1 + n2 + n3 === 2020) {
          solution = (n1 * n2 * n3).toString();
        }
      }
    }
  }

  report("Solution 2:", solution);
  
}
