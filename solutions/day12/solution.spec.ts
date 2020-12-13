import { navigate, calcManhattanDistance } from "./solution"
import { expect } from 'chai';
import 'mocha';

describe ('Day 12', () => {

  var input = 
`F10
N3
F7
R90
F11
`;

  it('Navigates properly', () => {
    var endPos = navigate(0,0,'E',input);
    expect(calcManhattanDistance(0,0,endPos.x,endPos.y)).is.equal(25);
  })

});
