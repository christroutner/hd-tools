/*
*/

'use strict'

const Blockbook = require('./lib/blockbook')
const blockbook = new Blockbook()

const Boilerplate = require('./lib/boilerplate')
const boilerplate = new Boilerplate()

async function startBackup() {
  try {
    //blockbook.backup()
    boilerplate.backup()
  } catch(err) {
    console.log(`Error in startBackup(): `, err)
  }
}
startBackup()
