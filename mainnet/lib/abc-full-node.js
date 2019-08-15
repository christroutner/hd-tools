/*
  This library controls the backup of ABC full node data.
*/

'use strict'

const shell = require("shelljs");

const WORK_DIR = `/mnt/usb/full-nodes/mainnet`

class ABC {
  constructor() {}

  async backup() {
    try {
      console.log(`Starting abc-full-node.js/backup()`)

      // Enter to the working directory.
      shell.cd(WORK_DIR)

      // Move old data
      shell.mv(`*.zip`, `old-data/`)
      console.log(`Old zip data moved.`)

      // Zip the data folder.
      console.log(`Zipping data...`)
      shell.exec(`zip -r abc-full-node-mainnet-data.zip blockchain-data/`)
      console.log(`...Finished zipping data.`)

      // Delete the old data.
      shell.rm(`rm ./old-data/*.zip`)
      console.log(`Deleted old data`)

      console.log(`Finished abc-full-node.js/backup()`)

    } catch(err) {
      console.log(`Error in abc-full-node.js/backup(): `, err);
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = ABC
