/*
  This library controls taking down and bring up all the docker containers.

  This library focuses on the mainnet server.

  The zip of data on the server tends to hang on the really big indexers like
  insight and bitcore. It's better to take everything down.
*/

'use strict'

const shell = require("shelljs");

const WORK_DIR = `/mnt/usb`

const composeDirs = [
  "/mnt/usb/indexers/slpdb/mainnet/docker-slpdb",
  "/mnt/usb/indexers/blockbook/mainnet/docker-ubuntu-blockbook",
  `/mnt/usb/indexers/insight/mainnet/insight-docker`,
  `/mnt/usb/indexers/bitcore/mainnet/docker-bitcore-node`,
  `/mnt/usb/full-nodes/mainnet/docker-abc`
]

class Containers {
  constructor() {}

  // Stop all Docker containers
  async stop() {
    try {
      // Loop through each docker container.
      for(let i=0; i < composeDirs.length; i++) {
        const composeDir = composeDirs[i]

        // Enter to the working directory.
        shell.cd(composeDir)

        // Stop Docker container
        shell.exec(`docker-compose down`)
        console.log(`Stopped containers at ${composeDir}`)

        // Wait for container to spin down.
        await this.sleep(10000)
      }

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
      console.log(`Error in mainnet-containers.js/stop(): `, err);
    }
  }

  // Start all Docker containers.
  async start() {
    try {
      // Loop through each docker container, in reverse order
      for(let i=composeDirs.length-1; i > -1 ; i--) {
        const composeDir = composeDirs[i]

        // Enter to the working directory.
        shell.cd(composeDir)

        // Stop Docker container
        shell.exec(`docker-compose up -d`)
        console.log(`Started containers at ${composeDir}`)

        // Wait for container to spin up.
        await this.sleep(10000)
      }

    } catch(err) {
      console.log(`Error in mainnet-containers.js/start(): `, err);
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = Containers
