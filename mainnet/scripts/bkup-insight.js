/*
  This is the main application that kicks off backup tasks.
*/

'use strict'

const Containers = require('../lib/mainnet-containers')
const containers = new Containers()

const Insight = require('../lib/insight')
const insight = new Insight()

async function startBackup() {
  try {
    console.log(`Stopping all Docker containers.`)
    await containers.stop()

    await insight.backup()
    console.log(`Finished backing up Insight API.`)

    await containers.start()
    console.log(`All Docker containers started.`)

  } catch(err) {
    console.log(`Error in startBackup(): `, err)
  }
}
startBackup()
