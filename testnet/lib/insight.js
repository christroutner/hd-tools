/*
  This library controls the backup of Insight v3 data and the handling of its
  Docker container. This is the indexer used by rest.bitcoin.com.
*/

'use strict'

const shell = require("shelljs");

const WORK_DIR = `/mnt/usb/indexers/insight/testnet`

class Insight {
  constructor() {}

  async backup() {
    try {
      console.log(`Starting insight.js/backup()`)

      // Enter to the working directory.
      shell.cd(WORK_DIR)

      // Move old data
      shell.mv(`*.zip`, `old-data/`)
      console.log(`Old zip data moved.`)

      // Zip the data folder.
      console.log(`Zipping data...`)
      shell.exec(`zip -r insight-testnet-data.zip blockchain-data/`)
      console.log(`...Finished zipping data.`)

      // Delete the old data.
      shell.rm(`rm ../old-data/*.zip`)
      console.log(`Deleted old data`)

      console.log(`Finished insight.js/backup()`)

    } catch(err) {
      console.log(`Error in insight.js/backup(): `, err);
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = Insight
