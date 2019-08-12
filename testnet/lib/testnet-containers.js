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
  "/mnt/usb/indexers/slpdb/testnet/docker-slpdb",
  "/mnt/usb/indexers/blockbook/testnet/docker-ubuntu-blockbook",
  `/mnt/usb/indexers/insight/testnet/insight-docker`,
  `/mnt/usb/indexers/bitcore/testnet/docker-bitcore-node`,
  `/mnt/usb/full-nodes/testnet/docker-abc`
]

class Containers {
  constructor() {}

  // Stop all Docker containers
  async stop() {
    try {
      console.log(`Starting testnet-containers.js/stop()`)

      // Loop through each docker container.
      for(let i=0; i < composeDirs.length; i++) {
        const composeDir = composeDirs[i]

        // Enter to the working directory.
        shell.cd(composeDir)

        // Stop Docker container
        shell.exec(`docker-compose down`)
        console.log(`Stopped containers at ${composeDir}`)

        // Wait for container to spin down.
        await this.sleep(5000)
      }

      console.log(`Finished testnet-containers.js/stop()`)

    } catch(err) {
      console.log(`Error in testnet-containers.js/stop(): `, err);
    }
  }

  // Start all Docker containers.
  async start() {
    try {
      console.log(`Starting testnet-containers.js/start()`)

      // Loop through each docker container, in reverse order
      for(let i=composeDirs.length-1; i > -1 ; i--) {
        const composeDir = composeDirs[i]

        // Enter to the working directory.
        shell.cd(composeDir)

        // Stop Docker container
        shell.exec(`docker-compose up -d`)
        console.log(`Started containers at ${composeDir}`)

        // Wait for container to spin up.
        await this.sleep(15000)
      }

      console.log(`Finished testnet-containers.js/start()`)

    } catch(err) {
      console.log(`Error in testnet-containers.js/start(): `, err);
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = Containers
