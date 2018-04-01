switch (process.env.NODE_ENV) {
    case 'development':
        let siteUrl = exports.siteUrl = 'http://localhost:3000/';
        // temporary
        let token = exports.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdqdnBhZXRAZ21haWwuY29tIiwidXNlcklkIjoiNWFhYzViNTdmN2M3ZDY3OTdmZjUwZGI4IiwiaWF0IjoxNTIyNTU2NzQ2LCJleHAiOjE1MjI1NjAzNDZ9.AiNGrau7s0cYQRz5bd8we6L5Rxmm5TsfRhx29fUbJG0';
        break;
    default:
        break;
}
