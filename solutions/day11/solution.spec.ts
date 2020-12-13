import { parseInput, runGeneration, printSeatMap, matches, calcAdjacentSeats,calcAdjacentSeats2 } from "./solution"
import { expect } from 'chai';
import 'mocha';

describe ('Day 11', () => {

  var input = 
  `L.LL.LL.LL
  LLLLLLL.LL
  L.L.L..L..
  LLLL.LL.LL
  L.LL.LL.LL
  L.LLLLL.LL
  ..L.L.....
  LLLLLLLLLL
  L.LLLLLL.L
  L.LLLLL.LL`;

  it('Part1: Properly runs a two generations', () => {
    var expected1 = parseInput(
   `#.##.##.##
    #######.##
    #.#.#..#..
    ####.##.##
    #.##.##.##
    #.#####.##
    ..#.#.....
    ##########
    #.######.#
    #.#####.##`);
    var expected2 = parseInput(
   `#.LL.L#.##
    #LLLLLL.L#
    L.L.L..L..
    #LLL.LL.L#
    #.LL.LL.LL
    #.LLLL#.##
    ..L.L.....
    #LLLLLLLL#
    #.LLLLLL.L
    #.#LLLL.##`);
    var seatMap = parseInput(input);
    var gen1 = runGeneration(seatMap,calcAdjacentSeats,4);
    var gen2 = runGeneration(gen1,calcAdjacentSeats,4);
    //console.log('Gen1')
    //printSeatMap(gen1);
    //console.log('Gen2')
    //printSeatMap(gen2);
    expect(matches(gen1,expected1),'Gen 1 matches').to.equal(true);
    expect(matches(gen2,expected2),'Gen 2 matches').to.equal(true);
  })

  it('Part2: works', () => {
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
    expect(occupiedSeats).to.equal(26);
  });

});
