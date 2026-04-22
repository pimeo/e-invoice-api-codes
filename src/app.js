import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export function createStore() {
    // Centralized french store
    const storeFR = {
        currencies: new Map(),
        organizationIdentifiers: new Map(),
        creditNoteType: new Map(),
        vatDate: new Map(),
        paymentMeans: new Map(),
        chargeReason: new Map(),
        alpha2Country: new Map(),
        dutyTaxFeeCategory: new Map(),
        invoiceType: new Map(),
        invoicedNoteSubject: new Map(),
        allowanceReason: new Map(),
        vatex: new Map(),
        unit: new Map(),
        specificFrenchRules: {
            BrFr04: new Map(),
            BrFr17: new Map(),
            BrFrCdvCl01: new Map(),
            BrFrCdvCl02: new Map(),
            BrFrCdvCl03: new Map(),
            BrFrCdvCl04: new Map(),
            BrFrCdvCl05: new Map(),
            BrFrCdvCl06: new Map(),
            BrFrCdvCl07: new Map(),
            BrFrCdvCl08: new Map(),
            BrFrCdvCl09: new Map(),
            BrFrCdvCl10: new Map(),
            BrFrCdvCl11: new Map(),
            brFrMap12: new Map(),
        }
    };

    // Centralized english store
    const storeEN = {
        currencies: new Map(),
        organizationIdentifiers: new Map(),
        creditNoteType: new Map(),
        vatDate: new Map(),
        paymentMeans: new Map(),
        chargeReason: new Map(),
        alpha2Country: new Map(),
        dutyTaxFeeCategory: new Map(),
        invoiceType: new Map(),
        invoicedNoteSubject: new Map(),
        allowanceReason: new Map(),
        vatex: new Map(),
        unit: new Map(),
    };

    // Centralized store
    const store = {
        fr: storeFR,
        en: storeEN,
    };

    return store;
}

export function validateLocale(store, locale) {
    if (!Object.hasOwn(store, locale)) {
        throw new Error("Invalid locale");
    }
}

/**
 * Helper to load and index JSON data into a Map
 */
async function loadAndIndex(fileName, filePath = "data", targetMap) {
    const path = join(process.cwd(), filePath, fileName);
    const rawData = await readFile(path, "utf-8");
    const items = JSON.parse(rawData);

    items.forEach((item) => {
        // We index by lowercase code for case-insensitive searching
        targetMap.set(item.code.toLowerCase(), item);
    });
}

async function loadJsonFiles(store) {
    // Load all data before listening
    return await Promise.all([
        // french datas
        loadAndIndex("currencies.json", "data/peppol/fr", store.fr.currencies),
        loadAndIndex("iso-6523-icd_3.0_1125.json", "data/peppol/fr", store.fr.organizationIdentifiers),
        loadAndIndex("uncl1001-cn_3.0_1125.json", "data/peppol/fr", store.fr.creditNoteType),
        loadAndIndex("uncl2005_3.0_1125.json", "data/peppol/fr", store.fr.vatDate),
        loadAndIndex("uncl4461_3.0_1125.json", "data/peppol/fr", store.fr.paymentMeans),
        loadAndIndex("uncl7161_3.0_1125.json", "data/peppol/fr", store.fr.chargeReason),
        loadAndIndex("iso-3166-1_3.0_1125.json", "data/peppol/fr", store.fr.alpha2Country),
        loadAndIndex("tred5305.json", "data/peppol/fr", store.fr.dutyTaxFeeCategory),
        loadAndIndex("uncl1001-inv_3.0_1125.json", "data/peppol/fr", store.fr.invoiceType),
        loadAndIndex("uncl4451_3.0_1125.json", "data/peppol/fr", store.fr.invoicedNoteSubject),
        loadAndIndex("uncl5189_3.0_1125.json", "data/peppol/fr", store.fr.allowanceReason),
        loadAndIndex("vatex_3.0_1125.json", "data/peppol/fr", store.fr.vatex),
        loadAndIndex("unecerec20_3.0_1125.json", "data/peppol/fr", store.fr.unit),
        loadAndIndex("br-fr-04_2426.json", "data/br-france/fr", store.fr.specificFrenchRules.BrFr04),
        loadAndIndex("br-fr-17_2426.json", "data/br-france/fr", store.fr.specificFrenchRules.BrFr17),
        loadAndIndex("br-fr-cdv-cl-01_0426.json", "data/br-france/fr", store.fr.specificFrenchRules.BrFrCdvCl01),
        loadAndIndex("br-fr-cdv-cl-02_0426.json", "data/br-france/fr", store.fr.specificFrenchRules.BrFrCdvCl02),
        loadAndIndex("br-fr-cdv-cl-03_0426.json", "data/br-france/fr", store.fr.specificFrenchRules.BrFrCdvCl03),
        loadAndIndex("br-fr-cdv-cl-04_0426.json", "data/br-france/fr", store.fr.specificFrenchRules.BrFrCdvCl04),
        loadAndIndex("br-fr-cdv-cl-05_0426.json", "data/br-france/fr", store.fr.specificFrenchRules.BrFrCdvCl05),
        loadAndIndex("br-fr-cdv-cl-06_0426.json", "data/br-france/fr", store.fr.specificFrenchRules.BrFrCdvCl06),
        loadAndIndex("br-fr-cdv-cl-07_0426.json", "data/br-france/fr", store.fr.specificFrenchRules.BrFrCdvCl07),
        loadAndIndex("br-fr-cdv-cl-08_0426.json", "data/br-france/fr", store.fr.specificFrenchRules.BrFrCdvCl08),
        loadAndIndex("br-fr-cdv-cl-09_0426.json", "data/br-france/fr", store.fr.specificFrenchRules.BrFrCdvCl09),
        loadAndIndex("br-fr-cdv-cl-10_0426.json", "data/br-france/fr", store.fr.specificFrenchRules.BrFrCdvCl10),
        loadAndIndex("br-fr-cdv-cl-11_0426.json", "data/br-france/fr", store.fr.specificFrenchRules.BrFrCdvCl11),
        loadAndIndex("br-fr-map-12_0426.json", "data/br-france/fr", store.fr.specificFrenchRules.brFrMap12),

        // english datas
        loadAndIndex("currencies.json", "data/peppol/en", store.en.currencies),
        loadAndIndex("iso-6523-icd_3.0_1125.json", "data/peppol/en", store.en.organizationIdentifiers),
        loadAndIndex("uncl1001-cn_3.0_1125.json", "data/peppol/en", store.en.creditNoteType),
        loadAndIndex("uncl2005_3.0_1125.json", "data/peppol/en", store.en.vatDate),
        loadAndIndex("uncl4461_3.0_1125.json", "data/peppol/en", store.en.paymentMeans),
        loadAndIndex("uncl7161_3.0_1125.json", "data/peppol/en", store.en.chargeReason),
        loadAndIndex("iso-3166-1_3.0_1125.json", "data/peppol/en", store.en.alpha2Country),
        loadAndIndex("tred5305.json", "data/peppol/en", store.en.dutyTaxFeeCategory),
        loadAndIndex("uncl1001-inv_3.0_1125.json", "data/peppol/en", store.en.invoiceType),
        loadAndIndex("uncl4451_3.0_1125.json", "data/peppol/en", store.en.invoicedNoteSubject),
        loadAndIndex("uncl5189_3.0_1125.json", "data/peppol/en", store.en.allowanceReason),
        loadAndIndex("vatex_3.0_1125.json", "data/peppol/en", store.en.vatex),
        loadAndIndex("unecerec20_3.0_1125.json", "data/peppol/en", store.en.unit),

        //   loadAndIndex('currencies.json', store.currencies),
        //   loadAndIndex('vat-codes.json', store.vat),
        //   loadAndIndex('payment-means.json', store.paymentMeans)
    ]);
}

export async function createApp(fastify, options) {
    const store = createStore()
    await loadJsonFiles(store)

    // Global Search across all datasets
    fastify.get("/:locale/search", async (request, reply) => {
        const { locale } = request.params;

        try {
            validateLocale(store, locale);
        } catch (error) {
            return reply.code(404).send({ error: error.message });
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
            validateLocale(store, locale);
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
}
