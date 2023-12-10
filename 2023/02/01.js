#!/usr/bin/env node

// https://adventofcode.com/2023/day/2
// node ./2023/02/01.js

import { readFile } from 'node:fs/promises'
import chalk from 'chalk'

const Games = {}

// Game 1:
// 7 green, 14 red, 5 blue;
// 8 red, 4 green;
// 6 green, 18 red, 9 blue

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

function populateGames (lines) {
  const array = lines.split('\r\n')
  for (let i = 0; i < array.length; i++) {
    const pulls = array[i].split(':')[1].split(';')
    Games[i + 1] = {}
    for (let j = 0; j < pulls.length; j++) {
      const colors = pulls[j].split(',')
      Games[i + 1][j + 1] = { green: 0, red: 0, blue: 0 }
      for (let k = 0; k < colors.length; k++) {
        const pair = colors[k].trim().split(' ')
        Games[i + 1][j + 1][pair[1]] = pair[0]
      }
    }
  }
}

function checkGames (dict) {
  let sum = 0
  for (const number in Games) {
    let valid = true
    for (const draw in Games[number]) {
      for (const color in dict) {
        if (parseInt(Games[number][draw][color]) > parseInt(dict[color])) {
          valid = false
        }
      }
    }
    if (valid) {
      sum += parseInt(number)
    }
  }
  return sum
}

async function main () {
  const lines = await getInputFromFile('input1')
  populateGames(lines)
  // console.log(chalk.magenta('Part1: '), chalk.cyan(JSON.stringify(Games, undefined, 2)))
  console.log(chalk.magenta('Part1: '), chalk.cyan(checkGames({ green: 13, red: 12, blue: 14 })))
  // console.log(chalk.magenta('Part2: '), chalk.cyan(sumA))
}

main()
