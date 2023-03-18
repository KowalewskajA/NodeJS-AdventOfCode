#!/usr/bin/env node

// https://adventofcode.com/2015/day/4
// node ./2015/04/01.js

import { createHash } from 'node:crypto'
import chalk from 'chalk';

const start_5 = new RegExp("^[0]{5,}", "g");
const start_6 = new RegExp("^[0]{6,}", "g");

let found = false, counter = 0, hash = createHash('md5'), key = 'ckczppom';

while (!found) {
	(hash.copy()
		.update(key + counter)
		.digest('hex')
		// change it: start_5 for part1 or start_6 for part2
		.match(start_6) || []
	).length == 0
	? counter++
	: found = true
}

console.log(chalk.magenta("Part: "), chalk.cyan(counter));
