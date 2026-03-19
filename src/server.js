import Fastify from "fastify";
import {createApp} from './app.js'

const fastify = Fastify({ logger: true });

// Start Server
const start = async () => {
    try {
        await createApp(fastify, {})

        const host = "0.0.0.0";
        const port = 4040;
        await fastify.listen({ port, host });
        console.log(`🚀 E-invoice Codes API running on http://${host}:${port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
