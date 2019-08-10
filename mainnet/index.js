/*
  This is the main application that kicks off backup tasks.

*/

'use strict'

const Boilerplate = require('./lib/boilerplate')
const boilerplate = new Boilerplate()

const Blockbook = require('./lib/blockbook')
const blockbook = new Blockbook()

const Insight = require('./lib/insight')
const insight = new Insight()

async function startBackup() {
  try {
    //await boilerplate.backup()

    //await blockbook.backup()

    await insight.backup()

  } catch(err) {
    console.log(`Error in startBackup(): `, err)
  }
}
startBackup()
