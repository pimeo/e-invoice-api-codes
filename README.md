# Electronic invoice codes lists Api

All electronic invoices codes list you need into a small api. Easy to complete your documents by fetching localized results by category.

## Installation

```sh
pnpm install

# For development
pnpm dev

# For production
pnpm build
node dist/server.js
```

## Format new codes through AI

```txt
Given this list, can you generate a json array with object schema containing keys "code", "label" and "description" ? 

Example: 
{
    "code": "VATEX-EU-79-C",
    "label": "Exempt based on article 79, point c of Council Directive 2006/112/EC",
    "description": "Exemptions relating to repayment of expenditures. Remark, Repayment of expenditure is not an exemption in the sense of the VAT Directive but may be handled as such in the context of the EN16931."
}


<YOUR_LIST_HERE>
```


## Peppol

### Documentation
https://docs.peppol.eu/poacc/billing/3.0/

### Release notes
https://docs.peppol.eu/poacc/billing/3.0/release-notes/

### Codes list

#### ISO 6523 ICD list
https://docs.peppol.eu/poacc/billing/3.0/codelist/ICD/
https://en.wikipedia.org/wiki/ISO/IEC_6523

#### UNCL4461 list
payment means code type
https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL4461/

#### UNCL4451 list
Invoiced note subject code
https://service.unece.org/trade/untdid/d96a/uncl/uncl4451.htm
https://docs.peppol.eu/poacc/billing/3.0/rules/ubl-tc434/BR-CL-08/

#### UNCL7161 list
Charge reason code
https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL7161/
https://service.unece.org/trade/untdid/d97b/uncl/uncl7161.htm

#### Duty or tax or fee category code
5305  Duty or tax or fee category code from
https://unece.org/fileadmin/DAM/trade/untdid/d16b/tred/tred5305.htm

#### Duty or tax or fee type name code
5153  Duty or tax or fee type name code
https://unece.org/fileadmin/DAM/trade/untdid/d16b/tred/tred5153.htm

#### ISO 3166-1 country alpha 2 code
ISO 3166-1:Alpha2 Country codes
https://docs.peppol.eu/poacc/billing/3.0/codelist/ISO3166/

#### UNCL1001 invoice type code
https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL1001-inv/

#### UNCL1001 credit note type code
https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL1001-cn/

#### UNCL2005 VAT date code
https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL2005/

#### UNCL5189 allowance reason code
https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL5189/

#### VATEX code list
https://docs.peppol.eu/poacc/billing/3.0/codelist/vatex/


#### UNECERec20 - Revision 11e
Recommendation 20, including Recommendation 21 codes - prefixed with X (UN/ECE)
https://docs.peppol.eu/poacc/billing/3.0/syntax/ubl-invoice/cac-InvoiceLine/cbc-InvoicedQuantity/unitCode/


## BR-France
Règles de gestion spécifiques France, par catégories :
. BR-FR : règle de gestion sur une donnée
. BR-FR-CO : règle de gestion conditionnelle
. BR-FR-DEC : règle de nombre de décimales
. BR-FR-MAP : règle de mapping pour créer le flux 1 ou 10.1

### Codes list

## BR-FR-04 - Codes type de la facture
Type de facture

## BR-FR-17 - Codes type pour qualifier les pièces jointes

#### BR-FR-CDV-CL-01 - Donnée listée

#### BR-FR-CDV-CL-02 - CodeRole de l'émetteur (Sender) du CDV
(extrait de UNCL 3035)

#### BR-FR-CDV-CL-03 - CodeRole du Créateur (Issuer) du CDV
(extrait de UNCL 3035)

#### BR-FR-CDV-CL-04 - CodeRole du Destinataire du CDV
(extrait de UNCL 3035)

#### BR-FR-CDV-CL-05 - Code Statut Standard (UNTDID 1373)

#### BR-FR-CDV-CL-06 - Codes Statut du Cycle de Vie
Expliquer les échanges inter-plateformes.

#### BR-FR-CDV-CL-07 - CodeType du Vendeur
(extrait de UNCL 3035)

#### BR-FR-CDV-CL-08 - CodeRole du Destinataire de la facture (Nouveau Bénéficiaire)
(Extrait de UNCL 3035)

#### BR-FR-CDV-CL-09 - Code MOTIFS de status
Expliquer les rejets et les suspensions.

#### BR-FR-CDV-CL-10 - Code ACTION requise

#### BR-FR-CDV-CL-11 - Code objet MDG-43
