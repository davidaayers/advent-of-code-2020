import { decodeBoardingPassString, BoardingPass } from "./solution"
import { expect } from 'chai';
import 'mocha';

describe ('decodeBoardPass Test', () => {
  var expected = {
    'FBFBBFFRLR': <BoardingPass>{ row: 44, column: 5, seatId: 357 },
    'BFFFBBFRRR': <BoardingPass>{ row: 70, column: 7, seatId: 567 },
    'FFFBBBFRRR': <BoardingPass>{ row: 14, column: 7, seatId: 119 },
    'BBFFBBFRLL': <BoardingPass>{ row: 102, column: 4, seatId: 820 },
  }

  Object.keys(expected).forEach(key => {
    it('should decode ' + key , () => {
      var result:BoardingPass = decodeBoardingPassString(key);
      expect(result.row,'row').to.equal(expected[key].row);
      expect(result.column,'column').to.equal(expected[key].column);
      expect(result.seatId,'seatId').to.equal(expected[key].seatId);  
    });
  });
});