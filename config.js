switch (process.env.NODE_ENV) {
    case 'development':
        let siteUrl = exports.siteUrl = 'http://localhost:3000/';
        // temporary
        let token = exports.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdqdnBhZXRAZ21haWwuY29tIiwidXNlcklkIjoiNWFhYzViNTdmN2M3ZDY3OTdmZjUwZGI4IiwiaWF0IjoxNTIzNDQwMzUyLCJleHAiOjE1MjM0NDM5NTJ9.yxJOsyWTZhpk05dgFa2Z98kWvXlfPpvr1_qyg033mzQ';
        break;
    default:
        break;
}
