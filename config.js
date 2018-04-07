switch (process.env.NODE_ENV) {
    case 'development':
        let siteUrl = exports.siteUrl = 'http://localhost:3000/';
        // temporary
        let token = exports.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdqdnBhZXRAZ21haWwuY29tIiwidXNlcklkIjoiNWFhYzViNTdmN2M3ZDY3OTdmZjUwZGI4IiwiaWF0IjoxNTIzMDcxNjY2LCJleHAiOjE1MjMwNzUyNjZ9.5IoTfB_WSWSjyVRizrV4809VyVdy674FDz5t9x7sa3s';
        break;
    default:
        break;
}
