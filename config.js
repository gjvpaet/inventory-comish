switch (process.env.NODE_ENV) {
    case 'development':
        let siteUrl = exports.siteUrl = 'http://localhost:3000/';
        // temporary
        let token = exports.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdqdnBhZXRAZ21haWwuY29tIiwidXNlcklkIjoiNWFhYzViNTdmN2M3ZDY3OTdmZjUwZGI4IiwiaWF0IjoxNTIzMTk0NjcxLCJleHAiOjE1MjMxOTgyNzF9.q1BDiaJw4AAw5oSbag3blNMFivyhizRcjvyVcjZpFQU';
        break;
    default:
        break;
}
