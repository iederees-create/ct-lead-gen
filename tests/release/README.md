# Release Validator Fixtures

This folder contains harmless fixtures for the Precision Laser release validators.

## Commands

```bash
node scripts/release/validate-tags.mjs tests/release/product-pack-fixture.json
node scripts/release/validate-product-pack.mjs --self-test
node scripts/release/scan-secrets.mjs tests/release
node scripts/release/validate-links.mjs tests/release
```

The JSON fixture is intentionally scoped to tag and URL validation. The `--self-test` command creates a temporary product pack under the system temp directory and validates referenced files, buyer files, and media. It does not require private credentials and does not modify product UI files.
