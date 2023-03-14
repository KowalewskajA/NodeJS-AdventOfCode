#!/usr/bin/env node

// https://adventofcode.com/2015/day/3
// node ./2015/03/01.js

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

const houses = new Map();
let x = 0, y = 0;
houses.set(x + ',' + y, 1)

for (const move of instructs) {
	switch (move) {
		case '^':
			y = y + 1;
			break;
		case '>':
			x = x + 1;
			break;
		case '<':
			x = x - 1;
			break;
		case 'v':
			y = y - 1;
			break;
		default:
			console.log("Should not be here!");
	}
	let position = x + ',' + y
	houses.get(position) == "undefined" 
		? houses.set(position, 1) 
		: houses.set(position,  houses.get(position) + 1);
}

console.log(chalk.magenta("Part1: "), chalk.cyan(houses.size));
// console.log(chalk.magenta("Part2: "), chalk.cyan(accRibbon));
