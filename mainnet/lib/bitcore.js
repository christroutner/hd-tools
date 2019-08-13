/*
  This library controls the backup of Bitcore data and the handling of its
  Docker container.
*/

'use strict'

const shell = require("shelljs");

const WORK_DIR = `/mnt/usb/indexers/bitcore/mainnet`
const DOCKER_CONTAINER_NAME = `bitcore`
const COMPOSE_DIR = `docker-bitcore-node`

class Bitcore {
  constructor() {}

  async backup() {
    try {
      console.log(`Starting bitcore.js/backup()`)

      // Enter to the working directory.
      shell.cd(WORK_DIR)

      // Move old data
      shell.mv(`*.zip`, `old-data/`)
      console.log(`Old zip data moved.`)

      // Zip the data folder.
      console.log(`Zipping data...`)
      //shell.exec(`zip -r bitcore-mainnet-data.zip data/`)
      console.log(`...Finished zipping data.`)

      // Delete the old data.
      shell.rm(`rm ../old-data/*.zip`)
      console.log(`Deleted old data`)

      console.log(`Finished bitcore.js/backup()`)

    } catch(err) {
      console.log(`Error in bitcore.js/backup(): `, err);
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = Bitcore
