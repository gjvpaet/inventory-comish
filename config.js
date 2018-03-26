let siteUrl = '';

switch (process.env.NODE_ENV) {
    case 'development':
        siteUrl = exports.siteUrl = 'http://localhost:3000/';
        break;
    default:
        break;
}
