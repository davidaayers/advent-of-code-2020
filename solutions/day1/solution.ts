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
  var solution = "UNSOLVED";
  var lines = input.split('\n');

  //report("Input:", input);
  lines.forEach(e1 => {
    lines.forEach(e2 => {
      var n1: number = +e1;
      var n2: number = +e2;
      let sum = n1 + n2;
      if (sum === 2020) {
        solution = (n1 * n2).toString();
      }
    });
  });

  report("Solution 1:", solution);
  
}

async function solveForSecondStar(input) {
  var solution = "UNSOLVED";
  var lines = input.split('\n');

  //report("Input:", input);
  lines.forEach(e1 => {
    lines.forEach(e2 => {
      lines.forEach(e3 => {
        var n1: number = +e1;
        var n2: number = +e2;
        var n3: number = +e3;
        let sum = n1 + n2 + n3;
        if (sum === 2020) {
          solution = (n1 * n2 * n3).toString();
        }
  
      });
    });
  });

  report("Solution 2:", solution);
  
}
