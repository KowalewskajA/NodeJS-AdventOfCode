#!/usr/bin/env node

// https://adventofcode.com/2015/day/5
// node ./2015/05/01.js

/*
A nice string is one with all of the following properties:

  It contains at least three vowels (aeiou only), like aei, xazegov, or aeiouaeiouaeiou.
  It contains at least one letter that appears twice in a row, like xx, abcdde (dd), or aabbccdd (aa, bb, cc, or dd).
  It does not contain the strings ab, cd, pq, or xy, even if they are part of one of the other requirements.

For example:

  ugknbfddgicrmopn is nice because it has at least three vowels (u...i...o...), a double letter (...dd...), and none of the disallowed substrings.
  aaa is nice because it has at least three vowels and a double letter, even though the letters used by different rules overlap.
  jchzalrnumimnmhp is naughty because it has no double letter.
  haegwjzuvuyypxyu is naughty because it contains the string xy.
  dvszwmarrgswjxmb is naughty because it contains only one vowel.
*/

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
  return data.split('\r\n')
}

const vowel = /[aeiou]/g
const double = /([a-z])\1/g
const string = /(ab|cd|pq|xy)/g

/*
const tests = [
  'ugknbfddgicrmopn',
  'aaa',
  'jchzalrnumimnmhp',
  'haegwjzuvuyypxyu',
  'dvszwmarrgswjxmb'
]

for (const test of tests) {
  const nVowels = (test.match(vowel) || []).length
  const nDouble = (test.match(double) || []).length
  const nString = (test.match(string) || []).length
  console.log(
    chalk.magenta('V: '), chalk.cyan(nVowels),
    chalk.magenta('D: '), chalk.cyan(nDouble),
    chalk.magenta('S: '), chalk.cyan(nString),
  )
}
*/

const words = await getInputFromFile('input1')
let counter = 0

for (const word of words) {
  const nVowels = (word.match(vowel) || []).length
  const nDouble = (word.match(double) || []).length
  const nString = (word.match(string) || []).length

  if (nVowels >= 3 && nDouble >= 1 && nString === 0) {
    counter++
  }
}

console.log(chalk.magenta('Part: '), chalk.cyan(counter))
