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
  var lines:number[] = input.split('\n').map(line => {return +line});
  var solution;

  lines.forEach((v1,idx) => {
    lines.slice(idx+1).forEach(v2 => {
      if( v1 + v2 === 2020 ) {
        solution = (v1 * v2).toString();
      }
    });
  });

  report("Solution 1:", solution);
}

async function solveForSecondStar(input) {
  var lines:number[] = input.split('\n').map(line => {return +line});
  var solution;

  lines.forEach((v1,idx) => {
    lines.slice(idx+1).forEach((v2,idx2) => {
      lines.slice(idx2+1).forEach(v3 => {
        if( v1 + v2 + v3 === 2020 ) {
          solution = (v1 * v2 * v3).toString();
        }
      });
    });
  });

  report("Solution 2:", solution);
  
}
