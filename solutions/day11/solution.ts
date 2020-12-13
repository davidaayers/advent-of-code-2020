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
export function runGeneration(seatMap:string[][],calcSeats:Function,upperBounds:number) : string[][] {
  var newSeatMap:string[][] = [];
  //console.log('About to run generation');
  for (var y = 0; y < seatMap.length; y++ ) {
    newSeatMap[y] = [];
    for ( var x = 0 ; x < seatMap[y].length; x++ ) {

      var newState = seatMap[y][x];      
      var numAdjacentSeats = calcSeats(x,y,seatMap);
      if ( newState === 'L' && numAdjacentSeats === 0 ) newState = '#';
      else if ( newState === '#' && numAdjacentSeats >= upperBounds ) newState = 'L';

      // Otherwise, the seat's state does not change
      newSeatMap[y][x] = newState;
      //console.log('x='+x+' y='+y+' was ' + seatMap[y][x] + ' now ' + newState + ' numAdjacent ' + numAdjacentSeats);
    }
  }

  return newSeatMap;
}

const deltas:number[][] = [
  [ 0, -1 ],  // N
  [ 1, -1 ],  // NE
  [ 1, 0 ],   // E
  [ 1 ,1 ],   // SE
  [ 0, 1 ],   // S
  [ -1, 1 ],  // SW
  [ -1, 0 ],  // W
  [ -1, -1 ], // NW
];

export function calcAdjacentSeats(x:number, y:number, seatMap:string[][]) : number {
  return deltas.map<number>( d=> {
    var checkX = x+d[0];
    var checkY = y+d[1];

    if ( !isInBounds(checkX,checkY,seatMap)){
      return 0;
    }
    return seatMap[checkY][checkX] === '#' ? 1 : 0;
  }).reduce((a,b) => a + b, 0);
}

export function calcAdjacentSeats2(x:number, y:number, seatMap:string[][]) : number {
  return deltas.map<number>( d=> {
    var checkX = x+d[0];
    var checkY = y+d[1];
    //x=0,y=1
    while(isInBounds(checkX,checkY,seatMap)) {
      if( x === 0 && y === 1 ) {
        console.log('at (0,1), direction looking:')
        console.log(d);
        console.log('checkX='+checkX+' checkY='+checkY+ 'tile='+seatMap[checkY][checkX]);
      }
      if (seatMap[checkY][checkX] === '#') {
        if( x === 0 && y === 1 ) console.log('found a full seat, returning 1');
        return 1;
      }
      if (seatMap[checkY][checkX] === 'L') {
        if( x === 0 && y === 1 ) console.log('found an empty seat, return 0');
        return 0;
      }
      checkX += d[0];
      checkY += d[1];
    }
    if( x === 0 && y === 1 ) console.log('ran off the map, returning 0');
    return 0;
  }).reduce((a,b) => a + b, 0);
}

function isInBounds(x:number, y:number, seatMap:string[][]):boolean {
  if ( x < 0 || x > seatMap[0].length-1 || y < 0 || y > seatMap.length-1 ){
    return false;
  }
  return true;
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
    var nextGen = runGeneration(seatMap,calcAdjacentSeats,4);
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
  var seatMap = parseInput(input);
  var generations = 0;

  while (true) {
    var nextGen = runGeneration(seatMap,calcAdjacentSeats2,5);
    console.log('generate ' + generations);
    printSeatMap(nextGen);
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

  report("Second star solution:", occupiedSeats.toString());
}
