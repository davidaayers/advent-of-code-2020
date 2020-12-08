import { parseInput, runProgram } from "./solution"
import { expect } from 'chai';
import 'mocha';

describe ('Day 7', () => {
  it('Part 1 terminates at 2nd run', () => {
    var input = 
`nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`;        
    var accumulator = runProgram(parseInput(input));
    expect(accumulator['result']).to.equal(5);
    expect(accumulator['returnCode']).to.equal(false);
  });

  it('Part 2 terminates normally', () => {
    var input = 
`nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
nop -4
acc +6`;        
    var accumulator = runProgram(parseInput(input));
    expect(accumulator['result']).to.equal(8);
    expect(accumulator['returnCode']).to.equal(true);
  });  
});
