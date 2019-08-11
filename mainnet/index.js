/*
  This is the main application that kicks off backup tasks.

*/

'use strict'

const Boilerplate = require('./lib/boilerplate')
const boilerplate = new Boilerplate()

const Containers = require('./lib/mainnet-containers')
const containers = new Containers()

const Blockbook = require('./lib/blockbook')
const blockbook = new Blockbook()

const Insight = require('./lib/insight')
const insight = new Insight()

async function startBackup() {
  try {
    //await boilerplate.backup()

    //await blockbook.backup()

    console.log(`Stopping all Docker containers.`)
    await containers.stop()

    await insight.backup()

    await containers.start()
    console.log(`All Docker containers started.`)

  } catch(err) {
    console.log(`Error in startBackup(): `, err)
  }
}
startBackup()
