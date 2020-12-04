import { performance } from "perf_hooks";
import { read } from "promise-path";
import { fromHere, report as reportGen } from "../../util";

const report = reportGen(__filename);

export async function run(day: string) {
  const input = (
    await read(fromHere(`solutions/${day}` + "/input.txt"), "utf8")
  ).trim();

  var rawPassportData:string[] = [];
  var lines = input.split('\n');
  var data = '';
  for ( var idx in lines ) {
    var line = lines[idx];
    if (line === '') {
      rawPassportData.push(data.trim());
      data = '';
    }
    data += lines[idx] + ' ';
  }
  // push the last one
  rawPassportData.push(data.trim());

  var passportData = rawPassportData.map(rawData => {
    var passport:object = {};
    rawData.split(' ').forEach(dataElement => {
      var elementParts = dataElement.split(':');
      passport[elementParts[0]]=elementParts[1];
    });
    return passport;
  });

  var firstStarStart = performance.now();
  await solveForFirstStar(passportData);
  report('First star took ' + (performance.now()-firstStarStart)+ 'ms');
  var secondStarStart = performance.now();
  await solveForSecondStar(passportData);
  report('Second star took ' + (performance.now()-secondStarStart)+ 'ms');
}

async function solveForFirstStar(passportData) {
  // required fields:
  /*
    byr (Birth Year)
    iyr (Issue Year)
    eyr (Expiration Year)
    hgt (Height)
    hcl (Hair Color)
    ecl (Eye Color)
    pid (Passport ID)
    cid (Country ID) // optional
  */
  var required = ['byr','iyr','eyr','hgt','hcl','ecl','pid'];
  var solution = passportData.filter( passport=> {
    for (var idx = 0; idx < required.length; idx ++) {
      var fieldToCheck = required[idx];
      if (!passport.hasOwnProperty(fieldToCheck)) {
        return false;      
      }
    }
    return true;
  }).length;

  report("First star solution:", solution.toString());
}

async function solveForSecondStar(passportData) {

  /*
    byr (Birth Year) - four digits; at least 1920 and at most 2002.
    iyr (Issue Year) - four digits; at least 2010 and at most 2020.
    eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
    hgt (Height) - a number followed by either cm or in:
        If cm, the number must be at least 150 and at most 193.
        If in, the number must be at least 59 and at most 76.
    hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
    ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
    pid (Passport ID) - a nine-digit number, including leading zeroes.
    cid (Country ID) - ignored, missing or not.
  */

  var fieldRules = [
    {
      name:'byr', 
      validation: function(data:string):boolean { return +data >= 1920 && +data <= 2002 },
    },
    {
      name:'iyr', 
      validation: function(data:string):boolean { return +data >= 2010 && +data <= 2020 },
    },
    {
      name:'eyr', 
      validation: function(data:string):boolean { return +data >= 2020 && +data <= 2030 },
    },
    {
      name:'hgt', 
      validation: function(data:string):boolean { 
        var parts = /^(\d+)([a-z]+)$/g.exec(data);
        if ( parts === null ) return false;
        var height:number = +parts[1];
        var unit:string = parts[2];
        if ( unit === 'cm' ) {
          return height >= 150 && height <= 193;
        }
        return height >= 59 && height <= 76;
      }
    },
    {
      name:'hcl', 
      validation: function(data:string):boolean {
        return data.search(/^#[0-9a-f]{6}$/) != -1;
      }
    },
    {
      name:'ecl', 
      validation: function(data:string):boolean {
        return ['amb','blu','brn','gry','grn','hzl','oth'].indexOf(data) != -1;
      }
    },
    {
      name:'pid', 
      validation: function(data:string):boolean { 
        return data.search(/^[0-9]{9}$/) != -1;
      }
    },
  ];

  var solution = passportData.filter( passport=> {
    for (var idx = 0; idx < fieldRules.length; idx ++) {
      var name = fieldRules[idx]['name'];
      var isValid = fieldRules[idx]['validation'];

      if (!passport.hasOwnProperty(name)) {
        return false;      
      }

      var fieldValue = passport[name];
      
      if (!isValid(fieldValue)) {
        return false;
      }      
    }
    return true;
  }).length;

  report("Second star solution:", solution.toString());
}
