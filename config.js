switch (process.env.NODE_ENV) {
    case 'development':
        let siteUrl = exports.siteUrl = 'http://localhost:3000/';
        // temporary
        let token = exports.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdqdnBhZXRAZ21haWwuY29tIiwidXNlcklkIjoiNWFhYzViNTdmN2M3ZDY3OTdmZjUwZGI4IiwiaWF0IjoxNTIyOTMzNTA2LCJleHAiOjE1MjI5MzcxMDZ9.RDbVS6ljSp1ir6X2T4nBwBmckjbUEzNeCnL3tIkqAZ0';
        break;
    default:
        break;
}
