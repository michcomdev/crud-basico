'use strict';

import Hapi         from '@hapi/hapi';
import hapiRouter   from 'hapi-router';
import Vision       from '@hapi/vision';
import Inert        from '@hapi/inert';
import Boom         from '@hapi/boom';
import Handlebars   from 'handlebars';
import Extend       from 'handlebars-extend-block';
import dotEnv       from 'dotenv';

dotEnv.config()

const init = async () => {

    const server = Hapi.server({
        port: process.env.PORT || 3000,
        host: '0.0.0.0',
        routes: {
            validate: {
                failAction: (request, h, err) => {
                    console.error('ValidationError:', err.message);
                    throw Boom.badRequest(err);
                }
            }
        }
    });

    await server.register([
        Vision,
        Inert,
        {
            plugin: hapiRouter,
            options: {
                routes: 'routes/**/*.js'
            }
        }
    ]);

    await server.views({
        engines: {
            html: {
                module: Extend(Handlebars),
                isCached: false
            }
        },
        path: 'views',
        layoutPath: 'views/layout',
        layout: 'default'
    });
    
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();