#!/usr/bin/env node

// https://adventofcode.com/2015/day/5
// node ./2015/05/02.js

/*
Realizing the error of his ways, Santa has switched to a better model of determining whether a string is naughty or nice. None of the old rules apply, as they are all clearly ridiculous.

Now, a nice string is one with all of the following properties:

  It contains a pair of any two letters that appears at least twice in the string
  without overlapping, like xyxy (xy) or aabcdefgaa (aa), but not like aaa (aa,
  but it overlaps).

  It contains at least one letter which repeats with exactly one letter between them, like xyx, abcdefeghi (efe), or even aaa.

For example:

  qjhvhtzxzqqjkmpb is nice because
    -is has a pair that appears twice (qj) and
    -a letter that repeats with exactly one letter between them (zxz).
  xxyxx is nice because
    -it has a pair that appears twice and
    -a letter that repeats with one between,
    even though the letters used by each rule overlap.
  uurcxstgmygtbstg is naughty because
    -it has a pair (tg) but no repeat with a single letter between them.
  ieodomkazucvgmuy is naughty because
    -it has a repeating letter with one between (odo),
    but no pair that appears twice.

How many strings are nice under these new rules?
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

const pair = /([a-z]{2})(\w)*\1/g
const triplet = /([a-z])[a-z]{1}\1/g

/*
const tests = [
  'qjhvhtzxzqqjkmpb',
  'xxyxx',
  'uurcxstgmygtbstg',
  'ieodomkazucvgmuy'
]

for (const test of tests) {
  const nPair = (test.match(pair) || []).length
  const nTriplet = (test.match(triplet) || []).length
  console.log(
    chalk.magenta('Pair-s: '), chalk.cyan(nPair),
    chalk.magenta('Trip-s: '), chalk.cyan(nTriplet)
  )
}
*/

const words = await getInputFromFile('input1')
let counter = 0

for (const word of words) {
  const nPair = (word.match(pair) || []).length
  const nTriplet = (word.match(triplet) || []).length

  if (nPair >= 1 && nTriplet >= 1) {
    counter++
  }
}

console.log(chalk.magenta('Part: '), chalk.cyan(counter))
