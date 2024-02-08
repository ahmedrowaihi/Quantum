const { capitalizeToLowerCaseWithDelimitier } = require('@utilities/algorithms');
const { PTYHandler } = require('@utilities/ptyHandler');
const Repository = require('@models/repository');
const Github = require('@utilities/github');

exports.standardizedBindingToApp = ({ app, routes, suffix, middlewares, settings }) => {
    middlewares.forEach((middleware) => app.use(middleware));
    routes.forEach((route) => {
        const path = suffix + capitalizeToLowerCaseWithDelimitier(route);
        const router = require(`../routes/${route}`);
        app.use(path, router);
    });
    settings.deactivated.forEach((deactivated) => app.disabled(deactivated));
};

exports.loadRepositoriesPTYs = async () => {
    console.log('[Quantum Cloud]: Loading repositories PTYs... (This may take a while).');
    console.log('[Quantum Cloud]: This is a one time process, after this, the repositories PTYs will be loaded on demand.');
    const repositories = await Repository.find()
        .populate({ 
            path: 'user', 
            select: 'username',
            populate: { path: 'github', select: 'accessToken username' }
        });
    console.log(`[Quantum Cloud]: Found ${repositories.length} repositories.`);
    for(const repository of repositories){
        const repositoryShell = new PTYHandler(repository._id, repository);
        const github = new Github(repository.user, repository);
        repositoryShell.startRepository(github);
    }
    console.log('[Quantum Cloud]: Repositories PTYs loaded.');
};

module.exports = exports;