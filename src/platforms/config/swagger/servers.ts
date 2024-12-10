import app from '../../config/express';

export default {
    servers: [
        {
            url: `http://localhost:${app.get('port')}/v1`,
            description: 'Local Server',
        },
        {
            url: `http://127.0.0.1:${app.get('port')}/v1`,
            description: 'Local Server',
        },
    ],
};
