export default {
    method: 'GET',
    path: '/public/{path*}',
    options: {
        auth: false, // autentificación deshabilitada para uso en login
        handler: {
            directory: {
                path: './public',
                listing: false,
                index: false
            }
        }
    }
};