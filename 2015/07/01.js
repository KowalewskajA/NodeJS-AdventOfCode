#!/usr/bin/env node

// https://adventofcode.com/2015/day/7
// node ./2015/07/01.js

/*
For example:
  123 -> x        means that the signal 123 is provided to wire x.
  x AND y -> z    means that the bitwise AND of wire x and wire y is provided to wire z.
  p LSHIFT 2 -> q means that the value from wire p is left-shifted by 2 and then provided to wire q.
  NOT e -> f      means that the bitwise complement of the value from wire e is provided to wire f.

Other possible gates include
  OR (bitwise OR) and
  RSHIFT (right-shift).
  If, for some reason,
  you'd like to emulate the circuit instead, almost all programming languages
  (for example, C, JavaScript, or Python) provide operators for these gates.

  3 number|variable -> variable
  4 NOT number|variable -> variable
  5 number|variable AND|OR|LSHIFT|RSHIFT number|variable -> variable
*/

import { readFile } from 'node:fs/promises'
// import { randomInt } from 'node:crypto'
// import { inspect } from 'node:util'
import chalk from 'chalk'

async function getInputFromFile (filename) {
  const path = process.argv[1].split('/').slice(0, -1).join('/')
  let data
  try {
    data = await readFile(path + '/' + filename, { encoding: 'utf8' })
  } catch (err) {
    console.log(err)
  }
  const instructs = []
  const lines = data.split('\r\n')
  for (const line of lines) {
    instructs.push(parseInstructions(line))
  }
  return instructs
}

function parseInstructions (line) {
  const arr = line.split(' ')
  let instruct = {}
  switch (arr[0]) {
    case 'toggle':
      instruct = {
        value: 2,
        start: {
          x: parseInt(arr[1].split(',')[0]),
          y: parseInt(arr[1].split(',')[1])
        },
        end: {
          x: parseInt(arr[3].split(',')[0]),
          y: parseInt(arr[3].split(',')[1])
        }
      }
      break
    case 'turn':
      instruct = {
        value: arr[1] === 'on' ? 1 : -1,
        start: {
          x: parseInt(arr[2].split(',')[0]),
          y: parseInt(arr[2].split(',')[1])
        },
        end: {
          x: parseInt(arr[4].split(',')[0]),
          y: parseInt(arr[4].split(',')[1])
        }
      }
      break
    default:
      console.log('Should never land here!')
  }
  return instruct
}

function changeLights (instruct) {
  for (let x = instruct.start.x; x <= instruct.end.x; x++) {
    for (let y = instruct.start.y; y <= instruct.end.y; y++) {
      Lights[x][y] = Math.max(Lights[x][y] + instruct.value, 0)
    }
  }
}

function countLights () {
  let count = 0
  for (let x = 0; x < 1000; x++) {
    for (let y = 0; y < 1000; y++) {
      count = count + Lights[x][y]
    }
  }
  return count
}

const Lights = new Array(1000)

for (let i = 0; i < Lights.length; i++) {
  Lights[i] = new Array(1000)
  Lights[i].fill(0)
}

const instructs = await getInputFromFile('input1')

for (const instruct of instructs) {
  changeLights(instruct)
}

console.log(chalk.magenta('Part2: '), chalk.cyan(countLights()))

/*
console.log(chalk.magenta('0: '), chalk.cyan(inspect(instructs[0])))
const rnd = randomInt(300)
console.log(chalk.magenta(`${rnd}:`), chalk.cyan(inspect(instructs[rnd])))
console.log(chalk.magenta('Part: '), chalk.cyan(instructs.length))
*/
