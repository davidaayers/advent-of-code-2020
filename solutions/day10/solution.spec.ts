import { parseInput,findDistribution } from "./solution"
import { expect } from 'chai';
import 'mocha';

describe ('Day 10', () => {

  var input = 
  `16
  10
  15
  5
  1
  11
  7
  19
  6
  12
  4`;

  it('Calcs proper distribution', () => {
    var adapters = parseInput(input);
    var distribution = findDistribution(adapters);
    expect(distribution['ones']).to.equal(7);
    expect(distribution['threes']).to.equal(5);
  })

});
