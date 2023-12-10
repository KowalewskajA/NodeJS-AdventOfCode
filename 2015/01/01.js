#!/usr/bin/env node

// https://adventofcode.com/2015/day/1
// node ./2015/01/01.js

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

function calculateOverallFloor (inputString) {
  const open = new RegExp('[(]', 'g')
  const close = new RegExp('[)]', 'g')
  const countOpen = (inputString.match(open) || []).length
  const countClose = (inputString.match(close) || []).length
  return countOpen - countClose
}

function calculateEnterBasement (inputString) {
  let floor = 0
  for (let i = 0; i < inputString.length; i++) {
    if (inputString[i] === '(') {
      floor++
    }
    else {
      if (floor === 0) {
        return i + 1
      }
      floor--
    }
  }
  return -1
}

const instruct = await getInputFromFile('input1')
console.log(chalk.magenta('Part1: '), chalk.cyan(calculateOverallFloor(instruct)))
console.log(chalk.magenta('Part2: '), chalk.cyan(calculateEnterBasement(instruct)))
