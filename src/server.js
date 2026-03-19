import Fastify from "fastify";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const fastify = Fastify({ logger: true });
const __dirname = dirname(fileURLToPath(import.meta.url));

// Centralized french store
const storeFR = {
    countries: new Map(),
    currencies: new Map(),
    vat: new Map(),
    paymentMeans: new Map(),
};

// Centralized english store
const storeEN = {
    countries: new Map(),
    currencies: new Map(),
    vat: new Map(),
    paymentMeans: new Map(),
};

// Centralized store
const store = {
    fr: storeFR,
    en: storeEN,
};

async function validateLocale(locale) {
    if (!Object.hasOwn(store, locale)) {
        throw new Error("Invalid locale");
    }
}

/**
 * Helper to load and index JSON data into a Map
 */
async function loadAndIndex(fileName, filePath = "data", targetMap) {
    const path = join(process.cwd(), `./src/${filePath}`, fileName);
    const rawData = await readFile(path, "utf-8");
    const items = JSON.parse(rawData);

    items.forEach((item) => {
        // We index by lowercase code for case-insensitive searching
        targetMap.set(item.code.toLowerCase(), item);
    });

}

// Global Search across all datasets
fastify.get("/:locale/search", async (request, reply) => {
    const { locale } = request.params;

    try {
        validateLocale(locale);
    } catch (error) {
        return reply.code(404).send({ error });
    }

    const { q } = request.query;

    if (!q) return [];

    const query = q.toLowerCase();
    const results = [];

    // Search across all Maps
    for (const [category, map] of Object.entries(store[locale])) {
        // Logic: check if code matches exactly OR if description/type contains the string
        for (const item of map.values()) {
            const matchCode = item.code.toLowerCase().includes(query);
            const matchText = (
                item.type ||
                item.description ||
                item.label ||
                ""
            )
                .toLowerCase()
                .includes(query);

            if (matchCode || matchText) {
                results.push({ category, ...item });
            }
        }
    }
    return results.slice(0, 50); // Limit results for performance
});

// Category Specific Routes
fastify.get("/:locale/:category/:code", async (request, reply) => {
    const { locale, category, code } = request.params;

    try {
        validateLocale(locale);
    } catch (error) {
        return reply.code(404).send({ error });
    }

    const targetMap = store[locale][category];

    if (!targetMap) {
        return reply
            .code(404)
            .send({ error: `Category ${category} not found` });
    }

    const result = targetMap.get(code.toLowerCase());
    return result || reply.code(404).send({ error: "Code not found" });
});

// Start Server
const start = async () => {
    try {
        // Load all data before listening
        await Promise.all([
            loadAndIndex(
                "currencies.json",
                "data/peppol/fr",
                storeFR.currencies,
            ),
            loadAndIndex(
                "currencies.json",
                "data/peppol/en",
                storeEN.currencies,
            ),
            //   loadAndIndex('currencies.json', store.currencies),
            //   loadAndIndex('vat-codes.json', store.vat),
            //   loadAndIndex('payment-means.json', store.paymentMeans)
        ]);

        const host = "0.0.0.0";
        const port = 4040;
        await fastify.listen({ port, host });
        console.log(`🚀 E-invoice Codes API running on http://localhost:4040`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
