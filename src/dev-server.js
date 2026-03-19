import {createApp} from "./app.js";

export default async function plugin(fastify, options) {
    await createApp(fastify, options);
    fastify.get('/', async function (req, reply) {
        return options
    })
}

export const options = {
    ignoreTrailingSlash: true,
};
