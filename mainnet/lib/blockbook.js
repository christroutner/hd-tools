/*
*/

'use strict'

const shell = require("shelljs");

const WORK_DIR = `/mnt/usb/indexers/blockbook/mainnet`

class Blockbook {
  constructor() {}

  hello() {
    console.log(`hello world`)
  }

  backup() {
    try {
      // Enter to the working directory.
      shell.cd(WORK_DIR)

      // Stop Docker container
      shell.exec(`docker stop blockbook`)
      console.log(`Blockbook Docker container stopped.`)

      // Move old data
      shell.mv(`*.zip`, `old-data/`)
      console.log(`Old zip data moved.`)

      // Zip the data folder.
      console.log(`Zipping data...`)
      shell.exec(`zip -r blockbook-data.zip data/`)
      console.log(`...Finished zipping data.`)

      // Restart the Docker container
      console.log(`Starting Docker container.`)
      shell.cd(`docker-ubuntu-blockbook`)
      shell.exec(`docker-compose up -d`)
      console.log(`Docker container started.`)

      // Move the old data.

    } catch(err) {
      console.log(`Error in blockbook.js/blockbook(): `, err);
    }
  }
}

module.exports = Blockbook
