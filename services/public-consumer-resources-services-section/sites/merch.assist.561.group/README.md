# Merch Assist — make and sell merchandise from content

**Status:** proposed Causeway service; **not** a claim that `merch.assist.561.group` resolves, accepts uploads, publishes products, processes payments, or fulfills orders.

**Service owner:** Causeway Public Consumer Resources. **Public interface:** the existing ASSIST shared engine, `merch.assist.561.group` when admitted and deployed. **Reusable print-design technology:** [Red Cup Print Design Engineering](https://github.com/red-cup-engineering/print-design-engineering-services-section). **Accepted art / supplier draft boundary:** [Causeway Public Media](https://github.com/causeway-services/public-media-services-section/blob/main/src/pod-printify.mjs). **Original customer Shop:** [shop.561.group](https://github.com/causeway-services/shop.561.group). The [original Fine Print Mercantile products and operator runbook](https://github.com/causeway-services/public-print-on-demand-services-section/blob/main/PRINCIPAL-RUNBOOK.md) remain their own product instance, not the entire Merch Assist business.

## The actual customer job

> I have content (for example a drawing, a rights-cleared photograph, a logo or a page illustration). Help me turn that into a good T-shirt people can actually buy, and account for the cost, production, sale, payment, delivery and support.

Merch Assist is a **creator-side service interface**, not a second Shop, Bazaar, Market, image model, art catalog, provider account, or ledger. It should work for one creator's original artwork first, then for other consented content types and merchandise. A creator may own content, another authorized merchant may sell the shirt, and a third party may print it. Those are distinct source-qualified roles, not one generic `owner` field.

The first viable job is **one permitted image → one qualified printable T-shirt → one approved seller offer → one externally confirmed order/delivery**. Do not substitute mockups, speculative price tables, provider-created product IDs, or test checkouts for those different facts.

**Reusable image-to-print candidate supplier (draft):** [Red Cup Print Design PR #2](https://github.com/red-cup-engineering/print-design-engineering-services-section/pull/2) adds a source-hash-checked, claim-scoped image placement operation using original transparent PNG composition and recorded physical dimensions. It returns only a candidate and its manifest, not a commercial-license award, garment quality acceptance, supplier product, paid order or Shop listing. This must be independently received before the service treats creator images as runnable inputs.

**Scientific and operational correction (2026-10-23):** [Lenticule's source-pixel/physical-inches derivation](https://github.com/lenticule-science/561-theory/pull/31) changed the [Red Cup candidate producer](https://github.com/red-cup-engineering/print-design-engineering-services-section/pull/2). The creator's 3-inch *maximum* artwork envelope can admit a measured 2-inch print from 600 source pixels at a 300-pixel/inch raster target; an explicit 3-inch *minimum* must refuse that source rather than invent detail. The original `pod-merch content-image` operator entrance now consumes an existing custody-scoped source file, JSON rights/print request, existing private output directory and candidate slug, returning the PNG plus provenance, actual physical extent and missing external receiving. This is a proposed tool on a review branch, not yet a genuinely installed staff Work-Run. [Coesite's original research→technology→practice skill](https://github.com/coesite-operations/operations-services-section/blob/main/lib/agency/skills/improve-research-technology-practice/SKILL.md) holds the situated next-use rule. The first customer-facing admission remains separately owed, and no approved physical SKU, sales checkout or delivered order has been received.\n\n## A usable intake now, before self-service uploads exist

A visitor can request a *nonbinding* product feasibility/commission conversation at [causeway@561.group](mailto:causeway@561.group?subject=Merch%20Assist%20product%20request) with:

1. A public or shareable **source-content reference** and the identity of the rights-holder; a description is fine if sharing the actual file needs a private channel. Do not put unreleased, confidential or personal images in a public issue.
2. The requested use and permissions: who may reproduce, edit, sell, distribute and withdraw the art; any attribution, license restrictions, cultural stewardship, consent or prohibited uses. Possession of a file, online visibility and image-generation availability are **not** a commercial license.
3. Desired product and audience: first priority a T-shirt, preferred blank style/color, sizes, print position and approximate quantity or on-demand expectation. No invented size or variant mapping.
4. Required sales channel and permitted payee, plus target customer price or acceptable quote range if known. Unquoted costs, fees and shipping remain unknown, never "$0".
5. Whether the request is for **a concept, an artwork adaptation, a print-ready master, a product listing, or a complete seller-managed sale**. These have different delivery and permission boundaries.

**The intake link requests a conversation only**; it is not an integrated order form, an uploaded-asset API, an acceptance, a promised turnaround or an agent authority grant. An authorized requester receives an explicit quote and scoped deliverable before paid service, provider write or disclosure. Avoid mailing passwords, payment cards, private account tokens or sensitive personal material.

## One source-owned transaction through the actual house

| Stage | Original writer / receiver | What passes the gate |
| --- | --- | --- |
| 1. Content received | creator and permitted source custodian → Causeway creator service | Immutable source reference or content digest, rights and modification license, beneficiary, allowed uses, withdrawal/contact route. The subject is content, not automatically a product. |
| 2. Candidate proposed | Causeway merchandising brief → Red Cup supported design/art composition | One design/version/placement candidate; any source-generated image identifies its actual media capability and license. Consent to propose is not approval to publish. |
| 3. Print preflight | accepted artwork → real selected physical supplier | Pixel/vector file at supplier's actual printable dimensions; position, contrast, transparency, garment/size/color variant IDs, method, rights, print-area fit and honest test/mockup provenance. Printed quality is still unknown until physical receiving. |
| 4. Offer approved | creator/merchant rights and price decision → merchant's **Shop** | Item and seller identity, approved available variants, all applicable unit/fulfillment/transaction costs, price, taxes/shipping rules, consumer policies, support and returns; versioned product/offer schema. A merchant may refuse an uneconomic candidate. |
| 5. Customer purchases | buyer-authorized checkout → merchant + settlement provider | Real price and all-in quote, payment consent, idempotent external receipt and buyer order identity; no duplicate charge on retry. Agent prose alone never authorizes payment. |
| 6. Printer fulfills | accepted paid order → original production provider → buyer | Authorized supplier order, paid production allocation, status, shipping/tracking or refusal/refund and independent readback. Fulfilled ≠ merely ordered. |
| 7. Learn and improve | actual market/sales/quality observations → Opportunity, Science, Operations and Public Services | Funnel from qualified content leads to ready SKUs to views, carts, paid sales, refunds and contribution. Attribute margin only against observed costs and expenses. |

Typed seams should reuse admitted `MediaNeed`, producer catalogue/print-policy, accepted-product and merchant Shop/offer/checkout/order contracts as **consumers of their original source**. Do not invent a new permanent `merch-sales.json` or universal upload API to mask missing receivers. `Product`/`Offer` from schema.org can describe published customer-facing goods; they cannot attest to unreceived physical variants or a fulfilled sale.

## What to exercise first

**Positive:** With one voluntarily submitted rights-cleared image, a real creator can review a compelling shirt composition, accepted original art/print file, actual provider variant/print method and itemized costs; merchant explicitly approves a Shop offer; a separately authorized buyer completes checkout; order and actual production/delivery evidence are received by distinct systems. Compare its time, incremental cash, defects and creator share with a comparable Printify/Printful/other POD path.

**Alternate:** An image is too small for the chosen full-size print. Offer *a smaller permitted placement or alternative product* and obtain new creator approval, rather than silently upscale or hallucinate quality.

**Refusal:** Missing commercial rights, sacred/restricted imagery without steward consent, unknown provider variant/visibility, negative unit contribution under an accepted quote, unresolved seller payout, unsupported Shop physical-goods checkout, or no actual spending authority keeps the candidate unlisted and unpaid. A draft is still a valid useful result, but is **not** a sale.

## Original connected work

- [561 Group Leader-origin Work request in MetroPlat](https://github.com/561-group/561-group-services-section) — the source-qualified Leader requirement, 2026-10-23, concerns `merch.assist.561.group` specifically; live Work thread `ni:///sha-256;1Jropby1uJSZLS8Eh8oSCCKXeqLHLKTyCtTJddBgUWU`.
- [Fine Print Mercantile original production runbook](https://github.com/causeway-services/public-print-on-demand-services-section/blob/main/PRINCIPAL-RUNBOOK.md): actual design inventory, separation of generated assets and accepted products.
- [Public Media Heart-A merchandise proposal](https://github.com/causeway-services/public-media-services-section/issues/16): useful candidate, explicitly not accepted SKU.
- [Shop physical-goods and direct-buy requirements](https://github.com/causeway-services/public-services-section/issues/17): customer sale, returns, settlement and provider fulfillment.
- [ASSIST shared application registry](https://github.com/red-cup-engineering/assist/tree/main/data/records/assist-apps): source-owned roster for the app; the app must be `proposed` until installed and independently served.

## Development and receiving

The site seat and its ASSIST app record are a **published proposal**, not an independent codebase. First read back a hosted `/apps/merch` projection that offers the actual intake, examples, and source/readiness disclaimers using the existing shared TUFTE renderer. Prove it doesn't assert stock or accepting checkout. Next bind an admitted real user-supplied image and a qualified creator-accepted `Content → Candidate` result using existing media and print-design suppliers. Next connect the actual Shop physical-good seller interface and original provider order receiver. Keep human creator choice, privacy, commercial permission and separate spending grants explicit at every external effect. The test fails if a viewer can be charged or a printable garment listed solely by submitting a prompt.
