/*
  This is the main application that kicks off backup tasks.
*/

'use strict'

const Containers = require('../lib/mainnet-containers')
const containers = new Containers()

const Bitcore = require('../lib/bitcore')
const bitcore = new Bitcore()

async function startBackup() {
  try {
    console.log(`Stopping all Docker containers.`)
    await containers.stop()

    await bitcore.backup()
    console.log(`Finished backing up Bitcore Node API.`)

    await containers.start()
    console.log(`All Docker containers started.`)

  } catch(err) {
    console.log(`Error in startBackup(): `, err)
  }
}
startBackup()
