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

const prompts = require('prompts');
const mongoose = require('mongoose');
const fs = require('fs');

const dropDatabase = async () => {
    const { confirm } = await prompts({
        type: 'confirm', 
        name: 'confirm', 
        message: 'Are you sure you want to perform this action? You will not be able to redo',
        initial: true
    });
    if(!confirm){
        console.log('[Quantum Manager]: Perfect, no action will be executed.')
        return;
    }
    await mongoose.connection.dropDatabase();
    console.log('[Quantum Manager]: The database has been deleted successfully.');
    console.log(`[Quantum Manager]: Tried to delete the "/var/lib/quantum" directory that contains .logs files and downloaded repositories...`);
    fs.rm('/var/lib/quantum', { recursive: true }, () => console.log(`[Quantum Manager]: Directory "/var/lib/quantum" successfully deleted. The database has been cleaned and the debris within the file system as well. Your instance is clean.`));
};

module.exports = dropDatabase;