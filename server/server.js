/***
 * Copyright (C) Rodolfo Herrera Hernandez. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project root
 * for full license information.
 *
 * =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
 *
 * For related information - https://github.com/rodyherrera/Quantum/
 *
 * All your applications, just in one place. 
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
****/

require('./aliases');

global.logStreamStore = {};
global.userContainers = {};

const { httpServer } = require('@config/express');
const { cleanHostEnvironment } = require('@utilities/runtime');
const mongoConnector = require('@utilities/mongoConnector');
const bootstrap = require('@utilities/bootstrap');

require('@config/ws');

const SERVER_PORT = process.env.SERVER_PORT || 8000;
const SERVER_HOST = process.env.SERVER_HOSTNAME || '0.0.0.0';

process.on('SIGINT', async () => {
    console.log('[Quantum Cloud]: SIGINT signal received, shutting down...');
    await cleanHostEnvironment();
    process.exit(0);
});

httpServer.listen(SERVER_PORT, SERVER_HOST, async () => {
    await mongoConnector();
    console.log('[Quantum Cloud]: Docker containers and user applications will be started. This may take a few minutes...');
    await bootstrap.loadUserContainers();
    await bootstrap.initializeRepositories();
    console.log(`[Quantum Cloud]: Server running at http://${SERVER_HOST}:${SERVER_PORT}/.`);
});