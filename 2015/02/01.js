#!/usr/bin/env node

// https://adventofcode.com/2015/day/2
// node ./2015/02/01.js

import { readFile } from 'node:fs/promises'
import chalk from 'chalk'

async function getInputFromFile (filename) {
  const path = process.argv[1].split('/').slice(0, -1).join('/')
  let data
  try {
    data = await readFile(path + '/' + filename, { encoding: 'utf8' })
  } catch (err) {
    console.log(err)
  }
  return data
}

function parseInput (input) {
  const presents = []
  const array = input.split('\r\n')
  for (const present of array) {
    presents.push(present.split('x'))
  }
  return presents
}

function calculateWrapping (p) {
  const squares = [p[0] * p[1], p[1] * p[2], p[2] * p[0]]
  const wrapping = Math.min(...squares) +
    squares.map(x => x * 2).reduce(
      (acc, cVal) => acc + cVal, 0
    )
  return (isNaN(wrapping) ? 0 : wrapping)
}

function calculateRibbon (p) {
  const dim = p.sort(sortAscNumber)
  return 2 * (dim[0] + dim[1]) + (dim[0] * dim[1] * dim[2])
}

function sortAscNumber (a, b) {
  return a - b
}

const presents = parseInput(await getInputFromFile('input1'))

let accWrapping = 0
let accRibbon = 0
for (const present of presents) {
  accWrapping = accWrapping + calculateWrapping(present)
  accRibbon = accRibbon + calculateRibbon(present)
}
console.log(chalk.magenta('Part1: '), chalk.cyan(accWrapping))
console.log(chalk.magenta('Part2: '), chalk.cyan(accRibbon))

// This are right, but I get: 5194436 instead 3737498
console.log(chalk.magenta('Test1: '), chalk.cyan(calculateRibbon([2, 3, 4])))
console.log(chalk.magenta('Test2: '), chalk.cyan(calculateRibbon([1, 1, 10])))
