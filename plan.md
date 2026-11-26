# SentraAI — Implementation Plan

## 1. Objective

Develop the SentraAI MVP by implementing the five-phase security investigation workflow while preserving existing project decisions.

## 2. Implementation Phases

### Phase 1 — Environment Setup
- [ ] Verify existing n8n Docker deployment.
- [ ] Set up local Neo4j Community Edition.
- [ ] Configure persistent database storage.
- [ ] Establish n8n-to-Neo4j connectivity.
- [ ] Configure Groq and threat-intelligence credentials.

### Phase 2 — Alert Ingestion and Enrichment
- [ ] Verify existing JSON alert ingestion.
- [ ] Verify indicator extraction.
- [ ] Integrate MITRE ATT&CK mapping.
- [ ] Validate enrichment results.

### Phase 3 — Historical Alert Correlation
- [ ] Create the required graph schema.
- [ ] Store alerts and their indicators.
- [ ] Implement historical alert searches.
- [ ] Identify alerts sharing indicators.
- [ ] Exclude the current alert from historical matches.

### Phase 4 — Related Alert Retrieval
- [ ] Retrieve alerts connected through shared indicators.
- [ ] Return relevant alert details.
- [ ] Remove duplicate results.
- [ ] Pass retrieved alerts to the investigation phase.

### Phase 5 — AI Investigation
- [ ] Preserve the existing Groq integration.
- [ ] Pass enriched alert information.
- [ ] Include MITRE mappings and historical correlations.
- [ ] Include related-alert context.
- [ ] Generate the final investigation report.

### Phase 6 — Frontend Integration
- [ ] Connect React to investigation results.
- [ ] Display alerts and threat intelligence.
- [ ] Display historical and related alerts.
- [ ] Display AI-generated investigation reports.
- [ ] Verify dashboard functionality.

### Phase 7 — Testing
- [ ] Test with multiple simulated alerts.
- [ ] Verify indicator extraction and enrichment.
- [ ] Verify MITRE technique mapping.
- [ ] Verify historical alert correlation.
- [ ] Verify related-alert retrieval.
- [ ] Test API and database failure scenarios.
- [ ] Perform end-to-end workflow testing.

## 3. Implementation Priorities

| Priority | Task |
|---|---|
| High | Local environment and database setup |
| High | MITRE ATT&CK mapping |
| High | Historical alert correlation |
| High | Related-alert retrieval |
| High | Groq investigation integration |
| Medium | React dashboard integration |
| Medium | Error handling and testing |

## 4. Important Constraints

- Keep Phase 1 unchanged.
- Keep Phase 5 unchanged.
- Modify only the requested workflow phases.
- Use local Neo4j Community Edition through Docker.
- Keep n8n as the workflow engine.
- Do not introduce additional application databases.
- Keep Wazuh simulated.
- Avoid unnecessary implementation complexity.

## 5. Expected Outcome

A functional MVP capable of accepting simulated security alerts, enriching and correlating them, retrieving related events, generating AI-powered investigation reports, and presenting the results through a React dashboard.