export default {
    method: ['GET'],
    path: '/test',
    options: {
        handler: async (request, h) => {
            
            return h.view('test');
        }
    }
};
