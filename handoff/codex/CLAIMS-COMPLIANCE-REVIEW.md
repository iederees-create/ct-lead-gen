# Claims Compliance Review

Allowed statuses: `allowed`, `needs verification`, `remove`, `replace with demo wording`.

| Claim Type | Status | Notes | Required Wording/Action |
| --- | --- | --- | --- |
| Laser cutting and engraving business category | allowed | Product may describe the intended template niche. | Keep as template/demo wording. |
| Interactive quote planner | needs verification | Expected feature is absent from baseline. | Verify after Claude branch merge. |
| Preliminary estimate | needs verification | Must appear only when budget/estimate mode is enabled. | Label as preliminary and non-binding. |
| Binding quote claims | remove | A browser planner cannot issue binding production quotes. | Use "request summary" or "preliminary estimate". |
| Fake machine claims | remove | Do not claim specific machines, wattage, bed size, or capabilities unless verified. | Replace with configurable/demo copy. |
| Unsupported safety claims | remove | Do not claim safety compliance, certified operators, or risk-free cutting. | Use neutral service/process copy. |
| Exact turnaround promises | remove | No guaranteed same-day or fixed turnaround unless the seller verifies it. | Use "preferred deadline" and "confirm availability". |
| Medical/cosmetic laser confusion | remove | Current baseline is aesthetic clinic content and must not ship in this product. | Replace all medical/cosmetic content. |
| Fake reviews | remove | Baseline contains testimonials and star ratings for an unrelated clinic. | Remove or mark as demo placeholders. |
| Fake certification | remove | Baseline claims certified treatments. | Remove unless evidence exists and it is relevant. |
| Fake project counts | remove | Do not use project counts unless verified. | Use demo statistics only if labeled. |
| Fake ratings | remove | Baseline includes 4.8-star and testimonials. | Remove or replace with demo wording. |
| Unverified material compatibility | needs verification | Material lists can imply capability. | Use "common request types" and "confirm material suitability". |
| File readiness checklist | allowed | Safe if framed as a checklist for quoting. | Avoid claiming automatic file validation. |
| WhatsApp/email handoff | allowed | Safe if it sends a non-binding inquiry summary. | Include no binding quote language. |
