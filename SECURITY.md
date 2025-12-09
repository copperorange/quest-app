# Security Policy

## Known False Positives

### Snyk Code Analysis

**Command Injection (Lines 31, 38, 45)** - FALSE POSITIVE
- **Status**: Not Vulnerable
- **Reason**: Code uses `execFile()` which does NOT invoke a shell
- **Evidence**: Arguments passed as array to `execFile()`, preventing shell injection
- **Mitigation**: Not required - secure by design

**Resource Allocation Without Limits** - FALSE POSITIVE  
- **Status**: Mitigated
- **Reason**: Global rate limiting implemented (line 10)
- **Evidence**: `express-rate-limit` middleware applied to all routes
- **Configuration**: 60 requests per minute per IP

## Dependency Vulnerabilities

All dependencies updated to latest secure versions:
- `express`: 4.21.2 (was 4.16.4)
- `helmet`: 8.0.0 (was 3.21.1)
- `express-rate-limit`: 7.5.0 (was 5.0.0)

## Infrastructure Security

See `terraform/SECURITY.md` for infrastructure hardening notes.
