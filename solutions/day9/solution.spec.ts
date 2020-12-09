import { parseInput,findOutOfPlaceNumber,findWeakness } from "./solution"
import { expect } from 'chai';
import 'mocha';
import { assert } from "console";

describe ('Day 9', () => {

  var input = 
  `35
  20
  15
  25
  47
  40
  62
  55
  65
  95
  102
  117
  150
  182
  127
  219
  299
  277
  309
  576`;

  it('Find out of place number', () => {

    var numbers = parseInput(input);
    var solution = findOutOfPlaceNumber(numbers,5);
    expect(solution).to.equal(127);
  })

  it('Finds encryption weakness', () => {
    var numbers = parseInput(input);
    var part1Solution = findOutOfPlaceNumber(numbers,5);
    var part2Solution = findWeakness(numbers,part1Solution);
    expect(part2Solution).to.equal(62);
  });
});
