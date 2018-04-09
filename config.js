switch (process.env.NODE_ENV) {
    case 'development':
        let siteUrl = exports.siteUrl = 'http://localhost:3000/';
        // temporary
        let token = exports.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdqdnBhZXRAZ21haWwuY29tIiwidXNlcklkIjoiNWFhYzViNTdmN2M3ZDY3OTdmZjUwZGI4IiwiaWF0IjoxNTIzMjQ5NDUxLCJleHAiOjE1MjMyNTMwNTF9.nFHsXoWCF6QeHZ5Qtjjm8mBPu2-tsVnEubDbLXKCohw';
        break;
    default:
        break;
}
