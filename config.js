switch (process.env.NODE_ENV) {
    case 'development':
        let siteUrl = exports.siteUrl = 'http://localhost:3000/';
        // temporary
        let token = exports.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdqdnBhZXRAZ21haWwuY29tIiwidXNlcklkIjoiNWFhYzViNTdmN2M3ZDY3OTdmZjUwZGI4IiwiaWF0IjoxNTIzMjU5NzEwLCJleHAiOjE1MjMyNjMzMTB9.gOqhH4VdbdemIi_Cqip3yvEE0m4xv2QGCoM83RYmYdQ';
        break;
    default:
        break;
}
