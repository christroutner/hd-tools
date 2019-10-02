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
//  `/mnt/usb/indexers/bitcore/mainnet/docker-bitcore-node`,
  `/mnt/usb/full-nodes/mainnet/docker-abc`
]

class Containers {
  constructor() {}

  // Stop all Docker containers
  async stop() {
    try {
      console.log(`Starting mainnet-containers.js/stop()`)

      // Loop through each docker container.
      for(let i=0; i < composeDirs.length; i++) {
        const composeDir = composeDirs[i]

        // Enter to the working directory.
        shell.cd(composeDir)

        // Stop Docker container
        // Absolute paths must be used for cron job to work.
        shell.exec(`/usr/local/bin/docker-compose down`)
        console.log(`Stopped containers at ${composeDir}`)

        // Wait for container to spin down.
        await this.sleep(5000)
      }

      console.log(`Finished mainnet-containers.js/stop()`)

    } catch(err) {
      console.log(`Error in mainnet-containers.js/stop(): `, err);
    }
  }

  // Start all Docker containers.
  async start() {
    try {
      console.log(`Starting mainnet-containers.js/start()`)

      // Loop through each docker container, in reverse order
      for(let i=composeDirs.length-1; i > -1 ; i--) {
        const composeDir = composeDirs[i]

        // Enter to the working directory.
        shell.cd(composeDir)

        // Stop Docker container
        // Absolute paths must be used for cron job to work.
        shell.exec(`/usr/local/bin/docker-compose up -d`)
        console.log(`Started containers at ${composeDir}`)

        // Wait for container to spin up.
        await this.sleep(15000)
      }

      console.log(`Finished mainnet-containers.js/start()`)

    } catch(err) {
      console.log(`Error in mainnet-containers.js/start(): `, err);
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = Containers
