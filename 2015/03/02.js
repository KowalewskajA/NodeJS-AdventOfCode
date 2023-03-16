#!/usr/bin/env node

// https://adventofcode.com/2015/day/3
// node ./2015/03/02.js

import { readFile } from 'node:fs/promises';
import chalk from 'chalk';

async function getInputFromFile(filename) {
	const path = process.argv[1].split("/").slice(0, -1).join('/');
	let data;
	try {
		data = await readFile(path + '/' + filename, { encoding: 'utf8' });
	} catch (err) {
		console.log(err);
	}
	return data;
}

const instructs = await getInputFromFile('input1');

const data = {
	houses: new Map(),
	counter: 0,
	0: {x: 0, y: 0},
	1: {x: 0, y: 0}
};

data.houses.set('0,0', 1)
let val = null;

for (const move of instructs) {
	data.counter % 2 == 0 
		? val = data[0]
		: val = data[1];
	switch (move) {
		case '^':
			val.y = val.y + 1;
			break;
		case '>':
			val.x = val.x + 1;
			break;
		case '<':
			val.x = val.x - 1;
			break;
		case 'v':
			val.y = val.y - 1;
			break;
		default:
			console.log("Should not be here!");
	}
	let position = val.x + ',' + val.y
	data.houses.get(position) == "undefined" 
		? data.houses.set(position, 1) 
		: data.houses.set(position, data.houses.get(position) + 1);
	data.counter = data.counter + 1;
}

console.log(chalk.magenta("Part1: "), chalk.cyan(data.houses.size));
