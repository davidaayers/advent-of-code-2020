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

export function parseInput(input:string) : string[][] {
  var seatMap:string[][] = [];
  input.split('\n').forEach((line,idx)=> {
    seatMap[idx] = line.trim().split('');
  });
  return seatMap;
}

/*
    If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
    If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
    Otherwise, the seat's state does not change.
*/
export function runGeneration(seatMap:string[][]) : string[][] {
  var newSeatMap:string[][] = [];
  //console.log('About to run generation');
  for (var y = 0; y < seatMap.length; y++ ) {
    newSeatMap[y] = [];
    for ( var x = 0 ; x < seatMap[y].length; x++ ) {

      var newState = seatMap[y][x];
      var numAdjacentSeats = calcAdjacentSeats(x,y,seatMap);
      if ( newState === 'L' && numAdjacentSeats === 0 ) newState = '#';
      else if ( newState === '#' && numAdjacentSeats >= 4 ) newState = 'L';

      // Otherwise, the seat's state does not change
      newSeatMap[y][x] = newState;
      //console.log('x='+x+' y='+y+' was ' + seatMap[y][x] + ' now ' + newState + ' numAdjacent ' + numAdjacentSeats);
    }
  }

  return newSeatMap;
}

export function calcAdjacentSeats(x:number, y:number, seatMap:string[][]) : number {
  var deltas:number[][] = [
    [ 0, -1 ],  // N
    [ 1, -1 ],  // NE
    [ 1, 0 ],   // E
    [ 1 ,1 ],   // SE
    [ 0, 1 ],   // S
    [ -1, 1 ],  // SW
    [ -1, 0 ],  // W
    [ -1, -1 ], // NW
  ];

  return deltas.map<number>( d=> {
    var checkX = x+d[0];
    var checkY = y+d[1];

    //console.log('x,y ' + x + ',' + y + ' checkX,checkY ' + checkX + ',' + checkY + ' dx,dy ' + d[0] + ',' + d[1]);

    if ( checkX < 0 || checkX > seatMap[0].length-1 || checkY < 0 || checkY > seatMap.length-1 ){
      //console.log('out of range');
      return 0;
    }
    return seatMap[checkY][checkX] === '#' ? 1 : 0;
  }).reduce((a,b) => a + b, 0);
}

export function printSeatMap(seatMap:string[][]) {
  seatMap.forEach(line => {
    console.log(line.join(''));
  });
}

export function matches(seatMap1:string[][], seatMap2:string[][]): boolean {
  for (var y = 0; y < seatMap1.length; y++ ) {    
    for ( var x = 0 ; x < seatMap1[y].length; x++ ) {
      if ( seatMap1[y][x] != seatMap2[y][x]) {
        return false;
      }
    }
  }
  return true;
}

async function solveForFirstStar(input) {
  var seatMap = parseInput(input);
  var generations = 0;

  while (true) {
    var nextGen = runGeneration(seatMap);
    if ( matches(seatMap, nextGen) ) {
      break;
    }
    generations++;
    seatMap = nextGen;
  }

  var occupiedSeats = seatMap.map<number>(line => {
    return line.map<number>(s => {
      return s === '#' ? 1 : 0;
    }).reduce((a,b) => a + b,0);
  }).reduce((a,b) => a + b,0)

  report("First star solution:", occupiedSeats.toString());
}

async function solveForSecondStar(input) {
  const solution = "UNSOLVED";
  report("Second star solution:", solution);
}
