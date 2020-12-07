import { parseLine,parseInput,findMatchingBags,countNestedBags } from "./solution"
import { expect } from 'chai';
import 'mocha';

describe ('Parse Input Test', () => {
  it('should parse single line ', () => {
    var bag = parseLine('plaid magenta bags contain 2 clear lavender bags, 3 clear teal bags, 4 vibrant gold bags.');
    expect(bag.color,'Bag Color').to.equal('plaid magenta');
    expect(bag.num,'Num Bags').to.equal(1);
    expect(bag.inner.length).to.equal(3);
  });

  it('should count the correct number of bags', () => {
    var input = 
`light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`

    var bags = parseInput(input);
    var solutionBags = new Set<string>();
    findMatchingBags(bags, 'shiny gold', solutionBags);
    expect(solutionBags.size).to.equal(4);

  });

  it('should solve for part2', () => {
    var input = 
`shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.`;
    var bags = parseInput(input);
    var cnt = countNestedBags(bags,'shiny gold');
    expect(cnt).to.equal(126);

  })

});
