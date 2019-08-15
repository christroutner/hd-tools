/*
  This library controls the backup of Blockbook data and the handling of its
  Docker container.
*/

'use strict'

const shell = require("shelljs");

const WORK_DIR = `/mnt/usb/indexers/blockbook/mainnet`

class Blockbook {
  constructor() {}

  async backup() {
    try {
      console.log(`Starting blockbook.js/backup()`)

      // Enter to the working directory.
      shell.cd(WORK_DIR)

      // Move old data
      shell.mv(`*.zip`, `old-data/`)
      console.log(`Old zip data moved.`)

      // Zip the data folder.
      console.log(`Zipping data...`)
      shell.exec(`zip -r blockbook-mainnet-data.zip data/`)
      console.log(`...Finished zipping data.`)

      // Delete the old data.
      shell.rm(`rm ../old-data/*.zip`)
      console.log(`Deleted old data`)

      console.log(`Finished blockbook.js/backup()`)

    } catch(err) {
      console.log(`Error in blockbook.js/backup(): `, err);
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = Blockbook
