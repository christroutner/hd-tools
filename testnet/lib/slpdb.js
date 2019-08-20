/*
  This library controls the backup of slpdb data.
*/

'use strict'

const shell = require("shelljs");

const WORK_DIR = `/mnt/usb/indexers/slpdb/testnet`

class Slpdb {
  constructor() {}

  async backup() {
    try {
      console.log(`Starting slpdb.js/backup()`)

      // Enter to the working directory.
      shell.cd(WORK_DIR)

      // Move old data
      shell.mv(`*.zip`, `old-data/`)
      console.log(`Old zip data moved.`)

      // Zip the data folder.
      console.log(`Zipping data...`)
      shell.exec(`zip -r slpdb-testnet-data.zip data/`)
      console.log(`...Finished zipping data.`)

      // Delete the old data.
      shell.rm(`rm ./old-data/*.zip`)
      console.log(`Deleted old data`)

      console.log(`Finished slpdb.js/backup()`)

    } catch(err) {
      console.log(`Error in slpdb.js/backup(): `, err);
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = Slpdb
