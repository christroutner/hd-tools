/*
  This is the main application that kicks off backup tasks.
*/

'use strict'

const Containers = require('../lib/testnet-containers')
const containers = new Containers()

const ABC = require('../lib/abc-full-node')
const abc = new ABC()

async function startBackup() {
  try {
    console.log(`Stopping all Docker containers: ${timestamp()}`)
    await containers.stop()

    await abc.backup()
    console.log(`Finished backing up ABC blockchain: ${timestamp()}`)

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
