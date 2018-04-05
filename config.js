switch (process.env.NODE_ENV) {
    case 'development':
        let siteUrl = exports.siteUrl = 'http://localhost:3000/';
        // temporary
        let token = exports.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdqdnBhZXRAZ21haWwuY29tIiwidXNlcklkIjoiNWFhYzViNTdmN2M3ZDY3OTdmZjUwZGI4IiwiaWF0IjoxNTIyOTIzOTkwLCJleHAiOjE1MjI5Mjc1OTB9.Gy_u8AllRBvqbCM1F6Wp3fdmeynkZMn61ONqZTf7TfU';
        break;
    default:
        break;
}
