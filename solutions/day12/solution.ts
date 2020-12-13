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


export type Position = {
  x: number,
  y: number,
  facing: string
}

export function navigate(startX:number, startY:number, facing:string, input:string) : Position {
  var currentPos = {
    x: startX,
    y: startY,
    facing: facing
  }

  input.split('\n').forEach(line => {
    // console.log('Current pos')
    // console.log(currentPos);
    // console.log('Instr = ' + line)
    processInstruction(currentPos,line);
  })

  return currentPos;
}

const dirs = {
  N: {dx:0,dy:-1,R:'E',L:'W'},
  E: {dx:1,dy:0,R:'S',L:'N'},
  S: {dx:0,dy:1,R:'W',L:'E'},
  W: {dx:-1,dy:0,R:'N',L:'S'},
};

function processInstruction(position:Position, instruction:string) {  
  const matches = instruction.match(/^([A-Z])(\d+)$/);
  if (matches === null) return;
  var instr = matches[1];
  var num = +matches[2];

  if (dirs.hasOwnProperty(instr)) {
    position.x += dirs[instr].dx * num;
    position.y += dirs[instr].dy * num;
    return;
  }

  if (instr === 'F') {
    position.x += dirs[position.facing].dx * num;
    position.y += dirs[position.facing].dy * num;
    return;
  }

  // only left & right left
  for (var ctr = 0; ctr < num/90; ctr ++ ) {
    position.facing = dirs[position.facing][instr];
  } 
}

export function calcManhattanDistance(sx:number,sy:number,ex:number,ey:number): number {
  return Math.abs(sx-ex) + Math.abs(sy-ey);
}

async function solveForFirstStar(input) {
  var endPos = navigate(0,0,'E',input);
  report("First star solution:", calcManhattanDistance(0,0,endPos.x,endPos.y).toString());
}

async function solveForSecondStar(input) {
  const solution = "UNSOLVED";
  report("Second star solution:", solution);
}
