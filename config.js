switch (process.env.NODE_ENV) {
    case 'development':
        let siteUrl = exports.siteUrl = 'http://localhost:3000/';
        // temporary
        let token = exports.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdqdnBhZXRAZ21haWwuY29tIiwidXNlcklkIjoiNWFhYzViNTdmN2M3ZDY3OTdmZjUwZGI4IiwiaWF0IjoxNTIzNTI1NzM2LCJleHAiOjE1MjM1MjkzMzZ9.Y5megp9KRLpLpemBw0VFSgf9bGM5BcPQ5edw-IjJvvA';
        break;
    default:
        break;
}
