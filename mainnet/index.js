/*
*/

'use strict'

const Boilerplate = require('./lib/boilerplate')
const boilerplate = new Boilerplate()

const Blockbook = require('./lib/blockbook')
const blockbook = new Blockbook()

async function startBackup() {
  try {
    //await boilerplate.backup()

    await blockbook.backup()

  } catch(err) {
    console.log(`Error in startBackup(): `, err)
  }
}
startBackup()
