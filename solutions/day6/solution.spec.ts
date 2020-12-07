import { parseForPart1,parseForPart2 } from "./solution"
import { expect } from 'chai';
import 'mocha';

describe ('Day 6', () => {
  it('should parse input for part1 ', () => {
    var testInput = 
    `abc

    a
    b
    c
    
    ab
    ac
    
    a
    a
    a
    a
    
    b`

    var groups = parseForPart1(testInput);
    expect(groups.length,'Num groups').to.equal(5);
    expect(groups[0].size,'Group 1 size').to.equal(3);
  });

  it('should parse input for part2 ', () => {
    var testInput = 
    `abc

    a
    b
    c
    
    ab
    ac
    
    a
    a
    a
    a
    
    b`

    var groups = parseForPart2(testInput);
    expect(groups.length,'Num groups').to.equal(5);
  });



});