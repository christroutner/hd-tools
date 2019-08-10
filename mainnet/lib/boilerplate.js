/*
  This library controls the backup of Boilerplate data and the handling of its
  Docker container.
*/

'use strict'

const shell = require("shelljs");

const WORK_DIR = `/home/trout/work/personal/docker-boilerplate`

class Boilerplate {
  constructor() {}

  hello() {
    console.log(`hello world`)
  }

  async backup() {
    try {
      // Enter to the working directory.
      shell.cd(WORK_DIR)

      // Stop Docker container
      shell.exec(`docker stop docker-boilerplate`)
      console.log(`Boilerplate Docker container stopped.`)

      // Wait for container to spin down.
      await this.sleep(5000)

      // Move old data
      shell.mv(`*.zip`, `old-data/`)
      console.log(`Old zip data moved.`)

      // Zip the data folder.
      console.log(`Zipping data...`)
      shell.exec(`zip -r boilerplate-data.zip data/`)
      console.log(`...Finished zipping data.`)

      // Restart the Docker container
      console.log(`Starting Docker container.`)
      shell.exec(`docker-compose up -d`)
      console.log(`Docker container started.`)

      // Move the old data.

    } catch(err) {
      console.log(`Error in boilerplate.js/backup(): `, err);
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = Boilerplate
