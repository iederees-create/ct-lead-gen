# Listing Manager Blocker

- Listing Manager is installed and its idempotent `product:import` / `etsy:draft` workflow was inspected.
- Read-only database search found no Hydro Clean product record or Etsy listing/draft ID.
- Etsy connection state is disconnected.
- Selling price, currency and Etsy taxonomy/category are not confirmed.
- No accurate Hydro Clean listing image set is available.

No import or Etsy draft was created. Confirm price, currency, taxonomy and listing media, connect the intended Etsy shop, then review the import JSON before running the Listing Manager workflow. Stop at draft.
