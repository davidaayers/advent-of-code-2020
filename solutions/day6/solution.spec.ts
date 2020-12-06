import { parseInput } from "./solution"
import { expect } from 'chai';
import 'mocha';

describe ('Parse Input Test', () => {
  it('should parse input ', () => {
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

    var groups = parseInput(testInput);
    console.log(groups)
    expect(groups.length,'Num groups').to.equal(5);
    expect(groups[0].size,'Group 1 size').to.equal(3);

  });
});