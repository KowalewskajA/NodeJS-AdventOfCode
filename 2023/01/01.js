#!/usr/bin/env node

// https://adventofcode.com/2023/day/1
// node ./2023/01/01.js

import { readFile } from 'node:fs/promises'
import chalk from 'chalk'

const dict = {
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine'
}

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

function replaceAll (str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace)
}

function parseNumbers (input) {
  // Problem is order does matter here:
  // 'eightwothree' -> '8wo3' but we parse 'eigh23'
  let str = input
  for (const key in dict) {
    str = replaceAll(str, dict[key], key)
  }
  // console.log(str)
  return str
}

function parseInput (input) {
  return input.split('\r\n')
}

function findAllDigits (inputString) {
  const digitRegex = /\d/g
  const arr = inputString.match(digitRegex)
  return arr
}

function getCalibrationValue (arr) {
  if (arr.length === 1) {
    return parseInt(arr[0]) * 10 + parseInt(arr[0])
  } else {
    return parseInt(arr[0]) * 10 + parseInt(arr[arr.length - 1])
  }
}

async function main () {
  const strings = await getInputFromFile('input1')
  // const stringsA = parseNumbers(strings)

  const lines = parseInput(strings)
  // const linesA = parseInput(stringsA)

  let sum = 0
  // let sumA = 0
  for (let i = 0; i < lines.length; i++) {
    const str = findAllDigits(lines[i])
    // const strA = findAllDigits(linesA[i])
    sum += getCalibrationValue(str)
    // sumA += getCalibrationValue(strA)
  }
  console.log(chalk.magenta('Part1: '), chalk.cyan(sum))
  // console.log(chalk.magenta('Part2: '), chalk.cyan(sumA))
}

main()
