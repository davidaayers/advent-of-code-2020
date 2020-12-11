import { parseInput, runGeneration, printSeatMap, matches } from "./solution"
import { expect } from 'chai';
import 'mocha';

describe ('Day 9', () => {

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

  it('Properly runs a two generations', () => {
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
    var gen1 = runGeneration(seatMap);
    var gen2 = runGeneration(gen1);
    //console.log('Gen1')
    //printSeatMap(gen1);
    //console.log('Gen2')
    //printSeatMap(gen2);
    expect(matches(gen1,expected1),'Gen 1 matches').to.equal(true);
    expect(matches(gen2,expected2),'Gen 2 matches').to.equal(true);
  })

});
