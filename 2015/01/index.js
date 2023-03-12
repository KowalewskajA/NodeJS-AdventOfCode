#!/usr/bin/env node

// https://adventofcode.com/2015/day/1
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
	return(data);
}

function calculateFloor(inputString) {
	const open = new RegExp("[(]", "g");
	const close = new RegExp("[)]", "g");
	const countOpen = (inputString.match(open) || []).length;
	const countClose = (inputString.match(close) || []).length;
	return countOpen - countClose;
}

const instruct = await getInputFromFile('input1')
console.log(chalk.cyan(calculateFloor(instruct)));
