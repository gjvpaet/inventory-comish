switch (process.env.NODE_ENV) {
    case 'development':
        let siteUrl = exports.siteUrl = 'http://localhost:3000/';
        // temporary
        let token = exports.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdqdnBhZXRAZ21haWwuY29tIiwidXNlcklkIjoiNWFhYzViNTdmN2M3ZDY3OTdmZjUwZGI4IiwiaWF0IjoxNTIzMTUxNjY3LCJleHAiOjE1MjMxNTUyNjd9.j_6Roc0r5-8GY8yZLiDJSBlWacIOwnMXk0W82l9oX0I';
        break;
    default:
        break;
}
