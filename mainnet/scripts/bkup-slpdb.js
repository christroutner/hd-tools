/*
  This is the main application that kicks off backup tasks.
*/

'use strict'

const Containers = require('../lib/mainnet-containers')
const containers = new Containers()

const Slpdb = require('../lib/slpdb')
const slpdb = new Slpdb()

async function startBackup() {
  try {
    console.log(`Stopping all Docker containers: ${timestamp()}`)
    await containers.stop()

    await slpdb.backup()
    console.log(`Finished backing up Bitcore Node API: ${timestamp()}`)

    await containers.start()
    console.log(`All Docker containers started: ${timestamp()}`)

  } catch(err) {
    console.log(`Error in startBackup(): `, err)
  }
}
startBackup()


function timestamp() {
  const now = new Date()
  return now.toLocaleString()
}
