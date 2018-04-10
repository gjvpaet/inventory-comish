switch (process.env.NODE_ENV) {
    case 'development':
        let siteUrl = exports.siteUrl = 'http://localhost:3000/';
        // temporary
        let token = exports.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdqdnBhZXRAZ21haWwuY29tIiwidXNlcklkIjoiNWFhYzViNTdmN2M3ZDY3OTdmZjUwZGI4IiwiaWF0IjoxNTIzMzU1NzI1LCJleHAiOjE1MjMzNTkzMjV9.WyUCl0SoDqzXaraAuJ3eRQ3fit1rbZrOchgbykI9EZ8';
        break;
    default:
        break;
}
