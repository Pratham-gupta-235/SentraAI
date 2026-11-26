# SentraAI — Project Status

## 1. Project Information

**Project:** Sentra AI: AI-Powered Security Alert Investigation and Threat Correlation Platform

## 2. Technology Stack

| Component | Technology | Status |
|---|---|---|
| Workflow Engine | n8n | Existing deployment |
| Graph Database | Neo4j Community Edition | Local setup required |
| Database Deployment | Docker | Existing environment |
| AI Investigation | Groq API | Existing integration |
| Threat Intelligence | VirusTotal, AbuseIPDB | Integration |
| ATT&CK Mapping | MITRE ATT&CK | To be added |
| Frontend | React | Dashboard integration |

## 3. Workflow Status

| Phase | Description | Status |
|---|---|---|
| Phase 1 | Alert Ingestion | Existing implementation; preserve |
| Phase 2 | Threat Intelligence Enrichment and MITRE Mapping | Existing implementation; MITRE mapping to be added |
| Phase 3 | Historical Alert Correlation | Historical correlation to be added |
| Phase 4 | Related Alert Retrieval | To be added |
| Phase 5 | AI Investigation and Report Generation | Existing implementation; preserve |

## 4. Completed Decisions

- [x] Finalized project objective and scope.
- [x] Selected n8n as the workflow engine.
- [x] Selected Neo4j Community Edition as the graph database.
- [x] Decided to deploy Neo4j locally using Docker.
- [x] Selected Groq for AI investigation.
- [x] Selected VirusTotal and AbuseIPDB for threat intelligence.
- [x] Selected MITRE ATT&CK for technique mapping.
- [x] Decided to simulate Wazuh alerts using JSON.
- [x] Finalized the five-phase workflow.
- [x] Decided to preserve Phase 1 and Phase 5.

## 5. Pending Tasks

- [ ] Complete local Neo4j setup.
- [ ] Configure database persistence.
- [ ] Connect n8n to Neo4j.
- [ ] Implement MITRE ATT&CK mapping.
- [ ] Implement historical alert correlation.
- [ ] Implement related-alert retrieval.
- [ ] Pass additional context into Groq.
- [ ] Integrate investigation results into React.
- [ ] Perform end-to-end testing.

## 6. Current Constraints

- No AuraDB or cloud database.
- No additional application databases.
- No real Wazuh deployment required.
- No unnecessary changes to existing workflow phases.
- Keep the MVP implementation simple and manageable.

## 7. Next Immediate Milestone

**Complete the local database setup and integrate Neo4j with the existing n8n workflow.**

After connectivity is verified, proceed with the requested Phase 2, Phase 3 and Phase 4 modifications.