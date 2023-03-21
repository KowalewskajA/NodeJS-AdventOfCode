#!/usr/bin/env node

// https://adventofcode.com/2015/day/6
// node ./2015/06/01.js

/*
Lights in your grid are numbered from 0 to 999 in each direction;
the lights at each corner are at 0,0, 0,999, 999,999, and 999,0.
The instructions include whether to
turn on, turn off, or toggle various inclusive ranges given as coordinate pairs.
Each coordinate pair represents opposite corners of a rectangle, inclusive;
a coordinate pair like 0,0 through 2,2 therefore refers to 9 lights in a 3x3 square. The lights all start turned off.

To defeat your neighbors this year, all you have to do is set up your lights by doing the instructions Santa sent you in order.

For example:
  turn on 0,0 through 999,999 would turn on (or leave on) every light.
  toggle 0,0 through 999,0 would toggle the first line of 1000 lights, turning off the ones that were on, and turning on the ones that were off.
  turn off 499,499 through 500,500 would turn off (or leave off) the middle four lights.

  turn off 60,313 through 75,728
  turn on 899,494 through 940,947
  toggle 832,316 through 971,817
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
        toogle: true,
        value: false,
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
        toogle: false,
        value: arr[1] === 'on',
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
  if (instruct.toogle) {
    for (let x = instruct.start.x; x <= instruct.end.x; x++) {
      for (let y = instruct.start.y; y <= instruct.end.y; y++) {
        Lights[x][y] = !Lights[x][y]
      }
    }
  } else {
    for (let x = instruct.start.x; x <= instruct.end.x; x++) {
      for (let y = instruct.start.y; y <= instruct.end.y; y++) {
        Lights[x][y] = instruct.value
      }
    }
  }
}

function countLights () {
  let count = 0
  for (let x = 0; x < 1000; x++) {
    for (let y = 0; y < 1000; y++) {
      if (Lights[x][y]) {
        count++
      }
    }
  }
  return count
}

const Lights = new Array(1000)

for (let i = 0; i < Lights.length; i++) {
  Lights[i] = new Array(1000)
  Lights[i].fill(false)
}

const instructs = await getInputFromFile('input1')

for (const instruct of instructs) {
  changeLights(instruct)
}

console.log(chalk.magenta('Part1: '), chalk.cyan(countLights()))

/*
console.log(chalk.magenta('0: '), chalk.cyan(inspect(instructs[0])))
const rnd = randomInt(300)
console.log(chalk.magenta(`${rnd}:`), chalk.cyan(inspect(instructs[rnd])))
console.log(chalk.magenta('Part: '), chalk.cyan(instructs.length))
*/
