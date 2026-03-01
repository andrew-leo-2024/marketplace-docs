#!/usr/bin/env node
/**
 * scaffold-pages.mjs
 * Generates ~213 MDX stub pages for the FrankMax Marketplace Documentation Site.
 * Source of truth: /home/leo/Projects/Brainstorm/docs/MARKETPLACE_OPPORTUNITY_CATALOG.md
 *
 * Run: node scripts/scaffold-pages.mjs
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';

const DOCS = join(import.meta.dirname, '..', 'docs');

function ensureDir(path) {
  if (!existsSync(path)) mkdirSync(path, { recursive: true });
}

function writeMdx(relPath, content) {
  const full = join(DOCS, relPath);
  ensureDir(dirname(full));
  writeFileSync(full, content, 'utf-8');
}

function toolPage({ title, pos, businessProcess, businessFunction, category, problemSolved, audienceNum, audienceName, moduleName, entity }) {
  return `---
title: "${title}"
sidebar_position: ${pos}
tags: [audience-${audienceNum}, ${category.toLowerCase()}, ${entity || 'marketplace'}]
---

# ${title}

<div className="entity-badge entity-badge--${(entity || 'frankmax').toLowerCase()}">${entity || 'Frankmax'}</div>
<span className="naics-tag">Audience ${audienceNum}</span>

> **${audienceName}** — ${moduleName}

## Objective & Purpose

${problemSolved}

## Business Context

| Attribute | Value |
|---|---|
| **Business Process** | ${businessProcess} |
| **Business Function** | ${businessFunction} |
| **Category** | ${category} |
| **Target Audience** | ${audienceNum}. ${audienceName} |

## BPMN Workflow

\`\`\`mermaid
graph LR
    A[Input] --> B[${title}]
    B --> C[Processing]
    C --> D[Output]
    D --> E[Audit Trail]
\`\`\`

<!-- TODO: Expand BPMN with actual process steps -->

## Features

<!-- TODO: Define 5-8 key features -->

1. Feature 1
2. Feature 2
3. Feature 3

## Workflow & Automation

<!-- TODO: Step-by-step automation description -->

## Input/Output Specifications

| Direction | Data | Format |
|---|---|---|
| Input | <!-- TODO --> | <!-- TODO --> |
| Output | <!-- TODO --> | <!-- TODO --> |

## Integration Points

<!-- TODO: Connections to other systems -->

## Pricing & Revenue Model

<!-- TODO: From economic model -->

## NAICS/SIC Mapping

<!-- TODO: Industry codes -->
`;
}

// ============================================================
// AUDIENCE PAGES — 15 audiences, each with index + module tools
// ============================================================

const audiences = [
  {
    num: 1, slug: '01-governments', name: 'Governments & Ministries',
    naics: '921110-928120', sic: '9111-9721',
    budgetCycle: 'Annual appropriations, multi-year programs',
    decisionMaker: 'Permanent Secretaries, Directors-General, Ministers',
    modules: [
      { name: 'Sovereign AI Governance Stack', tools: [
        { title: 'Policy Compiler Engine', bp: 'Legislative drafting & review', bf: 'Policy Development', cat: 'Governance', problem: 'Manual policy creation takes months; AI compiles policy from intent statements in hours' },
        { title: 'Regulatory Impact Analyzer', bp: 'Regulatory impact assessment', bf: 'Policy Analysis', cat: 'Compliance', problem: 'Impact assessments are subjective and slow; AI models scenario consequences across sectors' },
        { title: 'Citizen Service Orchestrator', bp: 'Service delivery automation', bf: 'Public Services', cat: 'Operations', problem: 'Citizen-facing services fragmented across 50+ agencies; AI routes and resolves' },
        { title: 'Inter-Ministry Coordination Platform', bp: 'Cross-agency coordination', bf: 'Administrative Coordination', cat: 'Coordination', problem: 'Ministries operate in silos; creates shared decision surface with audit trails' },
        { title: 'Budget Allocation Optimizer', bp: 'National budget planning', bf: 'Financial Management', cat: 'Finance', problem: 'Budget allocation driven by politics not data; AI models outcome-per-dollar across programs' },
        { title: 'Legislative Language Harmonizer', bp: 'Cross-jurisdictional alignment', bf: 'Legal Harmonization', cat: 'Legal', problem: 'Laws conflict across jurisdictions; AI identifies contradictions and proposes harmonization' },
        { title: 'Public Procurement Intelligence', bp: 'Procurement & tendering', bf: 'Supply Chain', cat: 'Procurement', problem: 'Procurement fraud, bid-rigging, and vendor lock-in; AI scores bids on value not relationships' },
        { title: 'National Data Sovereignty Vault', bp: 'Data governance', bf: 'Information Security', cat: 'Infrastructure', problem: 'Government data scattered across foreign cloud providers; sovereign storage with AI indexing' },
        { title: 'Grant & Subsidy Fraud Detector', bp: 'Disbursement verification', bf: 'Fraud Prevention', cat: 'Audit', problem: 'Billions lost to fraudulent claims; AI cross-references applications against registry data' },
        { title: 'Constitutional Compliance Checker', bp: 'Legal review', bf: 'Constitutional Law', cat: 'Legal', problem: 'Proposed legislation may violate constitutional provisions; AI flags conflicts pre-drafting' },
      ]},
      { name: 'National AI Safety & Ethics', tools: [
        { title: 'AI Deployment Authorization System', bp: 'AI system approval workflow', bf: 'AI Governance', cat: 'Regulatory', problem: 'No standardized process for approving AI deployments in government; creates gated approval' },
        { title: 'Algorithmic Bias Auditor', bp: 'Fairness assessment', bf: 'Ethics & Compliance', cat: 'Audit', problem: 'Government AI systems may discriminate; automated bias detection across protected classes' },
        { title: 'Citizen Privacy Impact Modeler', bp: 'Privacy impact assessment', bf: 'Data Protection', cat: 'Privacy', problem: 'GDPR/PDPA compliance is manual and inconsistent; AI models privacy risks before deployment' },
        { title: 'AI Incident Response Coordinator', bp: 'Incident management', bf: 'Crisis Management', cat: 'Operations', problem: 'No playbook when government AI fails; automated escalation, containment, and communication' },
        { title: 'Sovereign AI Registry', bp: 'National AI inventory', bf: 'Asset Management', cat: 'Registry', problem: "Government doesn't know what AI it runs; centralized registry with risk scoring" },
      ]},
      { name: 'E-Government Intelligence', tools: [
        { title: 'Citizen Intent Router', bp: 'Service request classification', bf: 'Customer Service', cat: 'Operations', problem: "Citizens don't know which agency handles their problem; AI classifies and routes" },
        { title: 'Public Document Simplifier', bp: 'Document transformation', bf: 'Communications', cat: 'Content', problem: 'Government documents incomprehensible to citizens; AI rewrites at appropriate literacy level' },
        { title: 'Multi-Language Government Translator', bp: 'Translation & localization', bf: 'Communications', cat: 'Language', problem: 'Multilingual nations struggle with document translation; AI maintains legal precision across languages' },
        { title: 'National Statistics Accelerator', bp: 'Statistical analysis & reporting', bf: 'Research & Analysis', cat: 'Analytics', problem: 'Census and survey analysis takes years; AI processes and models in weeks' },
        { title: 'Smart City Operations Platform', bp: 'Urban infrastructure management', bf: 'Infrastructure Ops', cat: 'IoT/Operations', problem: 'City systems (traffic, utilities, waste) uncoordinated; AI optimizes across systems' },
      ]},
    ],
    gaps: 'Decision latency (months for approvals), accountability diffusion (no single owner), vendor dependency, data silos, regulatory lag, institutional memory loss, procurement corruption.'
  },
  {
    num: 2, slug: '02-defense-security', name: 'Defense / Security / Intelligence',
    naics: '928110, 541715, 334511', sic: '9711, 8711, 3812',
    budgetCycle: 'Classified + annual defense budgets',
    decisionMaker: 'Flag Officers, Agency Directors, Defense Secretaries',
    modules: [
      { name: 'Intelligence & Analysis', tools: [
        { title: 'Multi-Source Intelligence Fusion', bp: 'OSINT/SIGINT/HUMINT synthesis', bf: 'Intelligence Analysis', cat: 'Analytics', problem: 'Analysts drowning in data; AI fuses signals across sources and highlights anomalies' },
        { title: 'Threat Pattern Recognition Engine', bp: 'Threat assessment', bf: 'Early Warning', cat: 'Security', problem: 'Threats detected too late; AI identifies emerging patterns from weak signals' },
        { title: 'Strategic Scenario Modeler', bp: 'Wargaming & scenario planning', bf: 'Strategic Planning', cat: 'Planning', problem: 'Scenario planning limited by human cognitive bandwidth; AI generates 1000+ scenarios' },
        { title: 'Secure Communications Analyzer', bp: 'Communications monitoring', bf: 'SIGINT', cat: 'Intelligence', problem: 'Volume of intercepted communications exceeds human analysis capacity' },
        { title: 'Adversary Behavior Predictor', bp: 'Predictive intelligence', bf: 'Threat Intelligence', cat: 'Analytics', problem: 'Reactive posture; AI models adversary decision patterns and predicts next moves' },
      ]},
      { name: 'Operational Security', tools: [
        { title: 'Cyber Threat Hunting Platform', bp: 'Threat detection & response', bf: 'Cybersecurity', cat: 'Security', problem: 'APTs dwell undetected for months; AI hunts lateral movement and anomalous patterns' },
        { title: 'Supply Chain Integrity Verifier', bp: 'Defense supply chain audit', bf: 'Supply Chain Security', cat: 'Procurement', problem: 'Compromised components in defense supply chains; AI traces provenance and flags risks' },
        { title: 'Personnel Security Continuous Eval', bp: 'Security clearance monitoring', bf: 'Personnel Security', cat: 'HR/Security', problem: 'Point-in-time clearance checks miss ongoing risks; continuous behavioral monitoring' },
        { title: 'Disinformation Detection Engine', bp: 'Information warfare defense', bf: 'Information Ops', cat: 'Security', problem: 'State-sponsored disinformation campaigns; AI identifies coordinated inauthentic behavior' },
        { title: 'Autonomous System Kill-Chain Auditor', bp: 'Autonomous weapons oversight', bf: 'Weapons Governance', cat: 'Compliance', problem: 'Autonomous weapons need human-in-the-loop verification; AI enforces ETLB compliance' },
      ]},
    ],
    gaps: 'Classification barriers, legacy system integration (50-year-old systems), acquisition cycle length (7-15 years), vendor lock-in, interoperability failure, insider threat detection.'
  },
  {
    num: 3, slug: '03-critical-infrastructure', name: 'National Critical Infrastructure',
    naics: '221112-221330, 486110-488999, 517311', sic: '4911-4971, 4011-4789, 4811-4899',
    budgetCycle: 'Regulated rate-base + capital programs',
    decisionMaker: 'Utility CEOs, Infrastructure Boards, Regulatory Commissions',
    modules: [
      { name: 'Infrastructure Operations Intelligence', tools: [
        { title: 'Grid Stability Predictor', bp: 'Energy grid management', bf: 'Power Operations', cat: 'Operations', problem: 'Grid instability from renewables integration; AI predicts load and optimizes dispatch' },
        { title: 'Pipeline Integrity Monitor', bp: 'Asset condition monitoring', bf: 'Asset Management', cat: 'Maintenance', problem: 'Pipeline failures cause catastrophic incidents; AI predicts degradation from sensor data' },
        { title: 'Water Treatment Optimizer', bp: 'Water quality management', bf: 'Utility Operations', cat: 'Operations', problem: 'Water treatment chemical dosing is reactive; AI optimizes treatment in real-time' },
        { title: 'Telecom Network Resilience Engine', bp: 'Network management', bf: 'Network Operations', cat: 'Operations', problem: 'Network outages cascade; AI reroutes traffic and predicts failure points' },
        { title: 'Transportation Flow Optimizer', bp: 'Traffic and logistics management', bf: 'Transportation Ops', cat: 'Operations', problem: 'Congestion costs billions annually; AI optimizes signal timing, routing, and modal shift' },
      ]},
      { name: 'Infrastructure Security & Compliance', tools: [
        { title: 'SCADA/ICS Security Monitor', bp: 'Industrial control system security', bf: 'Cybersecurity', cat: 'Security', problem: 'Critical infrastructure SCADA systems are attack targets; AI monitors for anomalies' },
        { title: 'Regulatory Compliance Automator', bp: 'Regulatory reporting', bf: 'Compliance', cat: 'Regulatory', problem: 'Utilities file hundreds of reports annually; AI automates data collection and filing' },
        { title: 'Climate Resilience Modeler', bp: 'Infrastructure vulnerability assessment', bf: 'Risk Management', cat: 'Planning', problem: "Climate change impacts on infrastructure unpredictable; AI models exposure scenarios" },
        { title: 'Asset Lifecycle Optimizer', bp: 'Capital planning', bf: 'Asset Management', cat: 'Finance', problem: 'Billions wasted on premature replacement or deferred maintenance; AI optimizes timing' },
        { title: 'Emergency Response Coordinator', bp: 'Disaster response', bf: 'Crisis Management', cat: 'Operations', problem: 'Multi-agency coordination during emergencies is chaotic; AI orchestrates response' },
      ]},
    ],
    gaps: 'Aging assets (50+ years), regulatory lag, cybersecurity vulnerability, climate exposure, workforce aging, interdependency blindness.'
  },
  {
    num: 4, slug: '04-international-institutions', name: 'International Institutions (UN/EU/AU/GCC/ASEAN)',
    naics: '928120, 813910', sic: '9721, 8611',
    budgetCycle: 'Multi-year assessed contributions + voluntary funding',
    decisionMaker: 'Secretary-Generals, Commissioners, Executive Directors',
    modules: [
      { name: 'Global Coordination Intelligence', tools: [
        { title: 'Treaty Compliance Monitor', bp: 'Treaty implementation tracking', bf: 'Compliance Monitoring', cat: 'Governance', problem: 'Treaties signed but not implemented; AI tracks compliance across signatories' },
        { title: 'SDG Progress Tracker', bp: 'Development goals monitoring', bf: 'Performance Management', cat: 'Analytics', problem: 'SDG tracking relies on self-reported data with 2-3 year lag; AI synthesizes real-time indicators' },
        { title: 'Cross-Border Obligation Router', bp: 'International obligation management', bf: 'Coordination', cat: 'Operations', problem: '"Money stays domestic, obligations go global" — AI routes and tracks cross-border commitments' },
        { title: 'Multilateral Negotiation Simulator', bp: 'Diplomatic negotiation support', bf: 'Strategic Planning', cat: 'Planning', problem: 'Complex multi-party negotiations; AI models positions, trade-offs, and convergence paths' },
        { title: 'Humanitarian Response Optimizer', bp: 'Aid allocation', bf: 'Resource Management', cat: 'Operations', problem: 'Aid misallocated due to political pressure; AI optimizes allocation by impact per dollar' },
      ]},
      { name: 'Institutional Governance', tools: [
        { title: 'Member State Reporting Harmonizer', bp: 'Standardized reporting', bf: 'Data Management', cat: 'Compliance', problem: '193 member states report in different formats; AI normalizes and validates' },
        { title: 'Peacekeeping Operations Dashboard', bp: 'Mission management', bf: 'Operations Management', cat: 'Operations', problem: 'Complex multi-country missions lack real-time visibility; AI consolidates operational data' },
        { title: 'International Standards Compiler', bp: 'Standards development', bf: 'Standards Management', cat: 'Governance', problem: 'Standards development takes 5-10 years; AI accelerates drafting and harmonization' },
        { title: 'Climate Finance Tracker', bp: 'Climate funding flows', bf: 'Financial Tracking', cat: 'Finance', problem: '$100B/year climate finance pledge untracked; AI traces flows from pledge to project' },
        { title: 'Sanctions Compliance Engine', bp: 'Sanctions enforcement', bf: 'Compliance', cat: 'Legal', problem: 'Sanctions regimes complex and overlapping; AI maps entities, relationships, and exposure' },
      ]},
    ],
    gaps: 'Consensus paralysis (194 sovereign vetoes), data sovereignty conflicts, implementation gap, funding uncertainty, institutional inertia, accountability vacuum, coordination overhead.'
  },
  {
    num: 5, slug: '05-dynasties', name: 'Dynasties & Royal Houses',
    naics: '525920, 551112', sic: '6726, 6712',
    budgetCycle: 'Sovereign wealth + endowments + private holdings',
    decisionMaker: 'Monarchs, Crown Princes, Privy Councils, Trust Advisors',
    modules: [
      { name: 'Dynasty Continuity & Governance', tools: [
        { title: 'Succession Intelligence Platform', bp: 'Succession planning', bf: 'Governance', cat: 'Strategic', problem: 'Generational wealth transfer fails 70% by 2nd generation; AI models succession scenarios' },
        { title: 'Dynasty Knowledge Vault', bp: 'Institutional memory preservation', bf: 'Knowledge Management', cat: 'Archive', problem: 'Family wisdom, relationships, and context lost across generations; AI preserves and indexes' },
        { title: 'Reputation Risk Sentinel', bp: 'Reputation monitoring', bf: 'Risk Management', cat: 'Communications', problem: 'Royal families face asymmetric reputational risk; AI monitors global media and social signals' },
        { title: 'Political Landscape Navigator', bp: 'Geopolitical risk assessment', bf: 'Strategic Intelligence', cat: 'Analytics', problem: 'Dynasties must navigate shifting political environments; AI maps power structures and risks' },
        { title: 'Cultural Legacy Curator', bp: 'Heritage and legacy management', bf: 'Cultural Affairs', cat: 'Archive', problem: 'Cultural assets and heritage scattered; AI catalogs, connects, and preserves' },
      ]},
      { name: 'Dynasty Wealth Intelligence', tools: [
        { title: 'Multi-Jurisdiction Asset Shield', bp: 'Cross-border asset protection', bf: 'Wealth Protection', cat: 'Legal/Finance', problem: 'Assets exposed across jurisdictions with conflicting laws; AI models legal exposure' },
        { title: 'Philanthropic Impact Optimizer', bp: 'Charitable giving strategy', bf: 'Philanthropy', cat: 'Social Impact', problem: 'Philanthropy used politically; AI optimizes for genuine impact and legacy positioning' },
        { title: 'Private Treaty Analyzer', bp: 'Inter-family agreement management', bf: 'Legal Affairs', cat: 'Legal', problem: 'Agreements between dynasties are complex; AI tracks obligations, expiries, and conflicts' },
        { title: 'Dynasty Network Intelligence', bp: 'Relationship mapping', bf: 'Stakeholder Management', cat: 'Intelligence', problem: 'Power networks shift; AI maps relationships, obligations, and opportunities' },
        { title: 'Sovereign Wealth Optimizer', bp: 'National wealth management', bf: 'Investment Management', cat: 'Finance', problem: 'Sovereign funds underperform due to political allocation; AI models optimal allocation' },
      ]},
    ],
    gaps: 'Generational entropy, succession conflict, information asymmetry, jurisdictional complexity, reputational fragility, political exposure, wealth concentration risk.'
  },
  {
    num: 6, slug: '06-family-offices', name: 'Family Offices',
    naics: '523920, 525920', sic: '6282, 6726',
    budgetCycle: 'AUM-driven + distributions',
    decisionMaker: 'Principals, CIOs, Family Office CEOs',
    modules: [
      { name: 'Investment & Portfolio Intelligence', tools: [
        { title: 'Alternative Investment Analyzer', bp: 'Due diligence on alternatives', bf: 'Investment Analysis', cat: 'Finance', problem: 'PE/VC/RE due diligence is manual and slow; AI analyzes deal flow, comps, and risks' },
        { title: 'Co-Investment Network Engine', bp: 'Co-investment sourcing', bf: 'Deal Sourcing', cat: 'Finance', problem: 'Deal flow limited to existing networks; AI matches co-investment opportunities' },
        { title: 'Tax-Efficient Structuring Advisor', bp: 'Tax planning', bf: 'Tax Management', cat: 'Legal/Finance', problem: 'Multi-jurisdiction tax optimization requires armies of advisors; AI models structures' },
        { title: 'Liquidity & Cash Flow Predictor', bp: 'Cash management', bf: 'Treasury', cat: 'Finance', problem: 'Illiquid portfolios create cash crunches; AI predicts liquidity needs across holdings' },
        { title: 'ESG & Impact Scoring Engine', bp: 'Impact measurement', bf: 'ESG Compliance', cat: 'Analytics', problem: 'ESG reporting fragmented; AI scores portfolio across environmental, social, governance metrics' },
      ]},
      { name: 'Family Office Operations', tools: [
        { title: 'Consolidated Reporting Platform', bp: 'Multi-entity reporting', bf: 'Financial Reporting', cat: 'Finance', problem: 'Reporting across 50+ entities is manual; AI consolidates and normalizes' },
        { title: 'Vendor & Service Provider Optimizer', bp: 'Vendor management', bf: 'Operations', cat: 'Procurement', problem: 'Family offices overpay for services; AI benchmarks fees and negotiates' },
        { title: 'Family Governance Facilitator', bp: 'Family meeting & decision support', bf: 'Governance', cat: 'Administration', problem: 'Family disputes destroy wealth; AI facilitates structured decision-making' },
        { title: 'Next-Gen Education & Integration', bp: 'Heir preparation', bf: 'Education', cat: 'HR/Development', problem: 'Next generation unprepared; AI-curated learning paths tied to family portfolio' },
        { title: 'Cybersecurity & Privacy Shield', bp: 'Personal security management', bf: 'Security', cat: 'IT/Security', problem: 'HNW families are prime targets; AI monitors threats across digital footprint' },
      ]},
    ],
    gaps: 'Principal-agent problem, fragmented reporting, succession planning avoidance, cybersecurity underinvestment, illiquidity traps, family conflict, regulatory complexity.'
  },
  {
    num: 7, slug: '07-multinationals', name: 'Multinational Corporate Empires',
    naics: '551112, 541611-541990', sic: '6712, 7371-7389',
    budgetCycle: 'Quarterly earnings + annual strategic plans',
    decisionMaker: 'CEOs, COOs, CIOs, Board Directors',
    modules: [
      { name: 'Enterprise AI Operations', tools: [
        { title: 'DocuFlow — Document Intelligence', bp: 'Document processing & extraction', bf: 'Operations', cat: 'Automation', problem: 'Enterprises process millions of documents manually; AI extracts, classifies, and routes' },
        { title: 'Billing Leakage Detector', bp: 'Revenue assurance', bf: 'Finance', cat: 'Audit', problem: '2-7% of revenue lost to billing errors; AI identifies leakage patterns across transactions' },
        { title: 'Chokepoint Intelligence Engine', bp: 'Operational bottleneck identification', bf: 'Operations', cat: 'Analytics', problem: 'Bottlenecks hidden in process complexity; AI maps workflow chokepoints and quantifies cost' },
        { title: 'Multi-Model AI Orchestrator', bp: 'AI model management', bf: 'IT/AI Operations', cat: 'Infrastructure', problem: 'Enterprises locked into single AI providers; orchestrates across Claude/GPT/Gemini/open-source' },
        { title: 'Enterprise Knowledge Graph', bp: 'Knowledge management', bf: 'Information Management', cat: 'Knowledge', problem: 'Institutional knowledge siloed in individuals; AI builds searchable organizational memory' },
      ]},
      { name: 'Corporate Governance & Risk', tools: [
        { title: 'Board Decision Intelligence', bp: 'Board meeting preparation', bf: 'Corporate Governance', cat: 'Governance', problem: 'Board members get 500-page decks; AI synthesizes to decision-ready briefings' },
        { title: 'Regulatory Change Tracker', bp: 'Regulatory monitoring', bf: 'Compliance', cat: 'Legal', problem: 'Regulations change constantly across jurisdictions; AI monitors and assesses impact' },
        { title: 'Supply Chain Risk Neural Network', bp: 'Supply chain risk management', bf: 'Supply Chain', cat: 'Risk', problem: 'Supply chain disruptions cost billions; AI models multi-tier supplier risk in real-time' },
        { title: 'M&A Due Diligence Accelerator', bp: 'Mergers & acquisitions', bf: 'Corporate Development', cat: 'Finance', problem: 'Due diligence takes months; AI analyzes targets across financial, legal, operational dimensions' },
        { title: 'ESG Compliance & Reporting Engine', bp: 'Sustainability reporting', bf: 'ESG/Compliance', cat: 'Reporting', problem: 'ESG reporting mandates expanding globally; AI automates data collection and report generation' },
      ]},
      { name: 'Enterprise Workforce Intelligence', tools: [
        { title: 'Operator Performance Analytics', bp: 'Workforce performance measurement', bf: 'HR/Operations', cat: 'Analytics', problem: 'Performance reviews subjective; AI measures output, quality, and capability objectively' },
        { title: 'Talent-to-Task Matching Engine', bp: 'Resource allocation', bf: 'HR/Operations', cat: 'Optimization', problem: 'Wrong people assigned to wrong tasks; AI matches skills to requirements' },
        { title: 'Organizational Drift Detector', bp: 'Culture and alignment monitoring', bf: 'HR/Culture', cat: 'Analytics', problem: 'Organizations drift from stated values; AI measures behavioral alignment to values' },
        { title: 'Internal Fraud Pattern Detector', bp: 'Internal audit', bf: 'Audit', cat: 'Security', problem: 'Internal fraud costs 5% of revenue; AI detects anomalous patterns in transactions and behavior' },
        { title: 'Workforce Planning Simulator', bp: 'Headcount planning', bf: 'HR', cat: 'Planning', problem: 'Hiring decisions reactive; AI models workforce needs against business scenarios' },
      ]},
    ],
    gaps: 'Coordination costs, bureaucratic entropy, innovation theater, regulatory arbitrage complexity, cultural fragmentation, legacy tech debt, board-management information asymmetry.'
  },
  {
    num: 8, slug: '08-legacy-enterprises', name: 'Legacy Enterprises',
    naics: '311-339, 423-425, 441-454', sic: '2000-3999, 5000-5199, 5200-5999',
    budgetCycle: 'Annual + capital programs',
    decisionMaker: 'COOs, VP Operations, Plant Managers, Division Heads',
    modules: [
      { name: 'Legacy Modernization Intelligence', tools: [
        { title: 'Legacy System Migration Planner', bp: 'IT modernization', bf: 'IT Strategy', cat: 'Infrastructure', problem: 'Decades-old systems too risky to replace; AI maps dependencies and sequences migration' },
        { title: 'Process Mining & Optimization Engine', bp: 'Business process analysis', bf: 'Operations', cat: 'Analytics', problem: '"We\'ve always done it this way" — AI discovers actual process flows vs documented ones' },
        { title: 'Mainframe-to-Cloud Bridge', bp: 'Application modernization', bf: 'IT Operations', cat: 'Infrastructure', problem: "COBOL/mainframe systems can't integrate with modern AI; AI creates translation layers" },
        { title: 'Tribal Knowledge Extractor', bp: 'Knowledge capture from retiring workforce', bf: 'Knowledge Management', cat: 'HR/Knowledge', problem: '40% of workforce retiring in 10 years; AI captures undocumented expertise before it walks out' },
        { title: 'Quality Prediction Engine', bp: 'Quality management', bf: 'Manufacturing/QA', cat: 'Operations', problem: 'Defects detected post-production; AI predicts quality issues from upstream process data' },
      ]},
      { name: 'Legacy Operations Optimization', tools: [
        { title: 'Predictive Maintenance Platform', bp: 'Equipment maintenance', bf: 'Asset Management', cat: 'Operations', problem: 'Unplanned downtime costs $260K/hour in manufacturing; AI predicts failures before they occur' },
        { title: 'Inventory Optimization Engine', bp: 'Inventory management', bf: 'Supply Chain', cat: 'Finance', problem: 'Excess inventory ties up capital; stockouts lose sales; AI optimizes dynamically' },
        { title: 'Energy Consumption Optimizer', bp: 'Energy management', bf: 'Facilities', cat: 'Operations', problem: 'Energy costs 20-30% of manufacturing cost; AI identifies waste patterns' },
        { title: 'Supplier Dependency Risk Scorer', bp: 'Vendor risk management', bf: 'Procurement', cat: 'Risk', problem: 'Single-source dependency creates fragility; AI scores and models alternative scenarios' },
        { title: 'Compliance Documentation Generator', bp: 'Regulatory documentation', bf: 'Compliance', cat: 'Legal', problem: 'ISO/FDA/EPA documentation is manual and error-prone; AI generates from process data' },
      ]},
    ],
    gaps: 'Technical debt (20-40 years), tribal knowledge concentration, resistance to change, skill gap, integration complexity, regulatory burden, deferred maintenance.'
  },
  {
    num: 9, slug: '09-banks-insurers', name: 'Banks, Insurers, Financial Foundations',
    naics: '522110-524298, 525100-525990', sic: '6011-6399, 6411-6726',
    budgetCycle: 'Regulatory capital cycles + annual budgets',
    decisionMaker: 'CEOs, CROs, CIOs, Chief Actuaries, Board Risk Committees',
    modules: [
      { name: 'Financial Services AI Operations', tools: [
        { title: 'Claims Processing Accelerator', bp: 'Insurance claims automation', bf: 'Claims Management', cat: 'Operations', problem: 'Claims take 30+ days; AI triages, validates, estimates, and settles in hours' },
        { title: 'Underwriting Intelligence Engine', bp: 'Risk assessment & pricing', bf: 'Underwriting', cat: 'Analytics', problem: 'Manual underwriting slow and inconsistent; AI processes applications with risk scoring' },
        { title: 'AML/KYC Automation Platform', bp: 'Anti-money laundering & identity verification', bf: 'Compliance', cat: 'Regulatory', problem: 'AML compliance costs $30B+ annually across banks; AI reduces false positives by 70%+' },
        { title: 'Credit Risk Modeler', bp: 'Credit decisioning', bf: 'Risk Management', cat: 'Finance', problem: 'Credit models stale and discriminatory; AI builds dynamic, fair, explainable models' },
        { title: 'Fraud Detection Neural Network', bp: 'Transaction monitoring', bf: 'Fraud Prevention', cat: 'Security', problem: '$32B+ lost to fraud annually; AI detects patterns across transaction networks in real-time' },
      ]},
      { name: 'Insurance-Specific Intelligence', tools: [
        { title: 'Cyber Insurance Risk Modeler', bp: 'Cyber risk assessment', bf: 'Underwriting', cat: 'Risk', problem: 'Cyber risk correlated and unpredictable; AI models portfolio-level exposure' },
        { title: 'Parametric Insurance Designer', bp: 'Product development', bf: 'Product Management', cat: 'Innovation', problem: 'Traditional claims processes slow; parametric triggers enable instant payouts' },
        { title: 'Reinsurance Optimization Engine', bp: 'Reinsurance strategy', bf: 'Risk Transfer', cat: 'Finance', problem: 'Reinsurance placement suboptimal; AI models optimal cession strategies' },
        { title: 'Policyholder Behavior Predictor', bp: 'Retention management', bf: 'Customer Management', cat: 'Analytics', problem: 'Lapse prediction inaccurate; AI models policyholder behavior from multi-dimensional data' },
        { title: 'Actuarial Model Accelerator', bp: 'Reserving & pricing', bf: 'Actuarial', cat: 'Finance', problem: 'Actuarial models take weeks to run; AI accelerates by 10-100x' },
      ]},
      { name: 'Banking Operations Intelligence', tools: [
        { title: 'Regulatory Reporting Automator', bp: 'Regulatory submissions', bf: 'Compliance', cat: 'Regulatory', problem: 'Banks spend $270B+ on compliance annually; AI automates report generation' },
        { title: 'Trade Surveillance Engine', bp: 'Market abuse detection', bf: 'Compliance', cat: 'Regulatory', problem: 'Market manipulation detection overwhelmed by volume; AI identifies suspicious patterns' },
        { title: 'Loan Origination Optimizer', bp: 'Lending operations', bf: 'Credit', cat: 'Operations', problem: 'Loan processing takes 45+ days for mortgages; AI streamlines to days' },
        { title: 'Wealth Management Copilot', bp: 'Client advisory', bf: 'Wealth Management', cat: 'Client Service', problem: 'Advisors serve 100+ clients; AI personalizes advice and automates portfolio rebalancing' },
        { title: 'Payment Fraud Shield', bp: 'Payment processing', bf: 'Payments', cat: 'Security', problem: 'Real-time payment fraud rising 30%+ annually; AI scores transactions in milliseconds' },
      ]},
    ],
    gaps: 'Regulatory burden (10-15% of costs), legacy core systems (40+ years), model risk, cyber risk correlation, talent war, product commoditization, margin compression, systemic risk.'
  },
  {
    num: 10, slug: '10-industry-bodies', name: 'National Industry Bodies',
    naics: '813910-813990', sic: '8611-8699',
    budgetCycle: 'Member dues + government grants',
    decisionMaker: 'Executive Directors, Board Chairs, Policy Directors',
    modules: [
      { name: 'Industry Intelligence & Advocacy', tools: [
        { title: 'Industry Benchmarking Engine', bp: 'Competitive benchmarking', bf: 'Research & Analysis', cat: 'Analytics', problem: 'Benchmarking relies on voluntary surveys with 20% response rates; AI synthesizes public data' },
        { title: 'Regulatory Impact Modeler', bp: 'Policy advocacy', bf: 'Government Relations', cat: 'Policy', problem: 'Advocacy is qualitative; AI quantifies impact of proposed regulations on industry members' },
        { title: 'Skills Gap Analyzer', bp: 'Workforce development', bf: 'Education/Training', cat: 'HR', problem: "Industry doesn't know its own skills gaps; AI maps demand vs supply by role and region" },
        { title: 'Trade Dispute Intelligence', bp: 'Trade policy analysis', bf: 'International Trade', cat: 'Policy', problem: 'Tariff and trade dispute impacts poorly understood; AI models cascading effects' },
        { title: 'Industry Standards Compiler', bp: 'Standards development', bf: 'Standards Management', cat: 'Governance', problem: 'Standards take 5+ years to develop; AI accelerates drafting from best-practice synthesis' },
      ]},
      { name: 'Member Services Intelligence', tools: [
        { title: 'Member Engagement Predictor', bp: 'Membership retention', bf: 'Member Relations', cat: 'Analytics', problem: 'Members leave silently; AI identifies disengagement patterns and triggers intervention' },
        { title: 'Event & Conference Optimizer', bp: 'Event management', bf: 'Events', cat: 'Operations', problem: 'Conference ROI unmeasured; AI optimizes programming, matchmaking, and sponsorship' },
        { title: 'Collective Bargaining Intelligence', bp: 'Negotiation support', bf: 'Labor Relations', cat: 'Legal', problem: 'Negotiation positions poorly data-supported; AI models scenarios and precedents' },
        { title: 'Supply Chain Sector Monitor', bp: 'Industry supply chain tracking', bf: 'Supply Chain', cat: 'Analytics', problem: 'Industry bodies blind to systemic supply chain risks; AI monitors across members' },
        { title: 'Innovation Radar', bp: 'Technology trend monitoring', bf: 'R&D/Innovation', cat: 'Strategy', problem: 'Industries disrupted because they detect threats too late; AI scans signals globally' },
      ]},
    ],
    gaps: 'Relevance erosion, data poverty, talent competition, consensus paralysis, slow cycle time, revenue dependency on membership dues, inability to enforce standards.'
  },
  {
    num: 11, slug: '11-education-rd', name: 'Education / R&D / Think Tanks',
    naics: '611110-611710, 541711-541720', sic: '8211-8299, 8731-8742',
    budgetCycle: 'Grants + tuition + endowments + contracts',
    decisionMaker: 'Provosts, Deans, Lab Directors, Research Directors',
    modules: [
      { name: 'Research Intelligence', tools: [
        { title: 'Literature Review Accelerator', bp: 'Systematic literature review', bf: 'Research', cat: 'Analytics', problem: 'Lit reviews take months; AI synthesizes thousands of papers in hours with bias detection' },
        { title: 'Grant Proposal Optimizer', bp: 'Grant writing & submission', bf: 'Research Administration', cat: 'Finance', problem: 'Grant success rates 10-20%; AI optimizes proposals against funder priorities' },
        { title: 'Research Collaboration Matcher', bp: 'Researcher networking', bf: 'Collaboration', cat: 'R&D', problem: "Researchers don't know who's working on adjacent problems; AI matches globally" },
        { title: 'Experiment Design Assistant', bp: 'Research methodology', bf: 'Research Design', cat: 'R&D', problem: 'Poor experimental design wastes funding; AI validates methodology and identifies confounds' },
        { title: 'IP Commercialization Engine', bp: 'Technology transfer', bf: 'Innovation/IP', cat: 'Finance', problem: '95% of university patents go unlicensed; AI matches IP to commercial opportunities' },
      ]},
      { name: 'Education Operations', tools: [
        { title: 'Adaptive Learning Orchestrator', bp: 'Curriculum delivery', bf: 'Teaching', cat: 'Education', problem: 'One-size-fits-all teaching; AI personalizes learning paths per student' },
        { title: 'Student Outcome Predictor', bp: 'Student success monitoring', bf: 'Student Services', cat: 'Analytics', problem: 'At-risk students identified too late; AI predicts dropout risk from behavioral signals' },
        { title: 'Accreditation Compliance Automator', bp: 'Accreditation reporting', bf: 'Compliance', cat: 'Regulatory', problem: 'Accreditation reports consume months; AI continuously collects evidence and generates reports' },
        { title: 'Research Impact Quantifier', bp: 'Impact measurement', bf: 'Analytics', cat: 'Performance', problem: '"Publish or perish" metrics broken; AI measures real-world impact beyond citations' },
        { title: 'Lab Resource Optimizer', bp: 'Lab management', bf: 'Operations', cat: 'Facilities', problem: 'Expensive lab equipment sits idle 60%+ of time; AI optimizes scheduling across researchers' },
      ]},
    ],
    gaps: 'Publish-or-perish dysfunction, grant dependency, slow knowledge transfer, accreditation burden, adjunct exploitation, student debt, research reproducibility crisis, IP undercommercialization.'
  },
  {
    num: 12, slug: '12-consulting-si', name: 'Consulting Firms & System Integrators',
    naics: '541611-541618, 541512-541519', sic: '7371-7389, 8742-8748',
    budgetCycle: 'Engagement-driven + annual targets',
    decisionMaker: 'Managing Partners, Practice Leads, CTO/CDOs',
    modules: [
      { name: 'Consulting Delivery Intelligence', tools: [
        { title: 'Engagement Scoping Optimizer', bp: 'Project scoping & estimation', bf: 'Sales/Delivery', cat: 'Pre-Sales', problem: 'Scope creep and underestimation; AI models effort from requirements and historical data' },
        { title: 'Knowledge Reuse Engine', bp: 'Deliverable reuse', bf: 'Knowledge Management', cat: 'Operations', problem: 'Same analysis repeated across clients; AI indexes past work and surfaces reusable components' },
        { title: 'Benchmarking-as-a-Service', bp: 'Industry benchmarking', bf: 'Analysis', cat: 'Client Service', problem: 'Benchmarking data expensive and stale; AI synthesizes real-time comparative data' },
        { title: 'Due Diligence Automation Suite', bp: 'M&A and strategy due diligence', bf: 'Analysis', cat: 'Client Service', problem: 'DD teams manually review thousands of documents; AI extracts risks and red flags' },
        { title: 'Implementation Risk Predictor', bp: 'Project risk management', bf: 'Delivery', cat: 'Risk', problem: 'SI projects fail 70% of the time; AI identifies risk factors from project patterns' },
      ]},
      { name: 'SI Operations Intelligence', tools: [
        { title: 'Resource-to-Engagement Matcher', bp: 'Staffing optimization', bf: 'HR/Operations', cat: 'Operations', problem: 'Bench costs and mismatches; AI matches consultant skills to engagement requirements' },
        { title: 'Client Relationship Intelligence', bp: 'Account management', bf: 'Sales', cat: 'CRM', problem: 'Relationships depend on partner personal networks; AI maps and monitors client health' },
        { title: 'Proposal Generation Engine', bp: 'RFP response automation', bf: 'Business Development', cat: 'Sales', problem: 'Proposals take weeks; AI generates tailored responses from templates and past wins' },
        { title: 'Margin & Utilization Optimizer', bp: 'Financial management', bf: 'Finance', cat: 'Operations', problem: 'Utilization below 70% destroys margin; AI optimizes staffing and pricing' },
        { title: 'Training & Certification Tracker', bp: 'Professional development', bf: 'HR/Learning', cat: 'HR', problem: "Consultants' skills stale; AI tracks certifications and recommends upskilling" },
      ]},
    ],
    gaps: 'Billable-hour misalignment, knowledge walking out the door, scale-quality trade-off, commoditization of strategy, AI threatening core business model, bench costs, proposal fatigue.'
  },
  {
    num: 13, slug: '13-investors-vc', name: 'Investors / VCs / Syndicates',
    naics: '523910-523999, 525910', sic: '6159, 6199, 6726',
    budgetCycle: 'Fund lifecycle (deploy, manage, exit)',
    decisionMaker: 'General Partners, Managing Directors, Investment Committee Chairs',
    modules: [
      { name: 'Deal Intelligence', tools: [
        { title: 'Deal Flow Scoring Engine', bp: 'Investment sourcing & screening', bf: 'Deal Sourcing', cat: 'Analytics', problem: '99% of deals are noise; AI scores opportunities against thesis, market, and team quality' },
        { title: 'Portfolio Company Health Monitor', bp: 'Portfolio management', bf: 'Portfolio Ops', cat: 'Analytics', problem: 'Board reports quarterly and curated; AI monitors real-time health from financial/operational data' },
        { title: 'Market Timing Analyzer', bp: 'Market cycle analysis', bf: 'Investment Strategy', cat: 'Analytics', problem: 'Entry/exit timing drives returns; AI models market cycles and signals' },
        { title: 'LP Reporting Automator', bp: 'Investor relations reporting', bf: 'Fund Operations', cat: 'Finance', problem: 'LP reports take weeks to prepare; AI generates from portfolio data continuously' },
        { title: 'Exit Scenario Modeler', bp: 'Exit planning', bf: 'Investment Strategy', cat: 'Planning', problem: 'Exit timing and method suboptimal; AI models IPO/M&A/secondary scenarios' },
      ]},
      { name: 'Investment Operations Intelligence', tools: [
        { title: 'Competitive Landscape Mapper', bp: 'Market analysis', bf: 'Research', cat: 'Analytics', problem: 'Competitive intelligence fragmented; AI maps competitors, positioning, and market dynamics' },
        { title: 'Founder Assessment Engine', bp: 'Team evaluation', bf: 'Due Diligence', cat: 'HR/Analytics', problem: 'Founder evaluation biased and subjective; AI assesses track record, network, and capability' },
        { title: 'Term Sheet Analyzer', bp: 'Deal structuring', bf: 'Legal/Finance', cat: 'Legal', problem: 'Complex term sheets hide adverse terms; AI flags non-standard provisions and precedents' },
        { title: 'Fund Performance Attribution', bp: 'Performance analytics', bf: 'Fund Management', cat: 'Finance', problem: 'Attribution between market beta and alpha unclear; AI decomposes returns' },
        { title: 'Syndicate Coordination Platform', bp: 'Co-investment management', bf: 'Operations', cat: 'Coordination', problem: 'Multi-investor deals require complex coordination; AI streamlines communication and documentation' },
      ]},
    ],
    gaps: 'Power law returns, information asymmetry, herd mentality, vintage year dependency, LP pressure, fee structure misalignment, lack of operational support, founder-investor trust breakdown.'
  },
  {
    num: 14, slug: '14-founders-operators', name: 'High-Power Founders & Operators',
    naics: '541511-541519, 511210', sic: '7371-7372',
    budgetCycle: 'Funding rounds + revenue',
    decisionMaker: 'CEOs, CTOs, CPOs',
    modules: [
      { name: 'Founder Execution Intelligence', tools: [
        { title: 'Pivot Signal Detector', bp: 'Product-market fit analysis', bf: 'Strategy', cat: 'Analytics', problem: 'Founders persist too long on wrong ideas; AI identifies signals to pivot or persist' },
        { title: 'Burn Rate Optimizer', bp: 'Financial management', bf: 'Finance', cat: 'Planning', problem: 'Startups die from burn, not bad ideas; AI models runway scenarios and optimization' },
        { title: 'Hiring Signal Analyzer', bp: 'Talent acquisition', bf: 'HR', cat: 'Recruitment', problem: 'Bad hires cost 6-12 months; AI identifies quality signals beyond resume patterns' },
        { title: 'Customer Discovery Accelerator', bp: 'Customer development', bf: 'Product', cat: 'Research', problem: 'Manual customer interviews scale slowly; AI synthesizes patterns from conversations' },
        { title: 'Technical Debt Quantifier', bp: 'Engineering management', bf: 'Engineering', cat: 'Operations', problem: 'Tech debt invisible until crisis; AI quantifies debt and models refactoring ROI' },
      ]},
      { name: 'Operator Productivity Intelligence', tools: [
        { title: 'Execution Velocity Dashboard', bp: 'Operational performance', bf: 'Operations', cat: 'Analytics', problem: 'Speed without direction; AI tracks output-to-outcome ratio across teams' },
        { title: 'Decision Fatigue Reducer', bp: 'Decision support', bf: 'Executive Function', cat: 'Productivity', problem: '35K decisions/day creates fatigue; AI pre-analyzes and recommends for low-stakes decisions' },
        { title: 'Stakeholder Communication Engine', bp: 'Investor/board updates', bf: 'Communications', cat: 'Relations', problem: 'Monthly updates consume founder time; AI generates from operational data' },
        { title: 'Competitive Intelligence Feed', bp: 'Market monitoring', bf: 'Strategy', cat: 'Analytics', problem: 'Founders surprised by competitors; AI monitors competitive landscape continuously' },
        { title: 'Personal Operating System', bp: 'Founder productivity', bf: 'Executive Function', cat: 'Productivity', problem: 'Founder is single point of failure; AI manages calendar, priorities, and energy optimization' },
      ]},
    ],
    gaps: 'Loneliness, decision fatigue, information overload, impostor syndrome, founder-market fit uncertainty, co-founder conflict, board management overhead, fundraising time drain, burnout.'
  },
  {
    num: 15, slug: '15-high-risk-individuals', name: 'High-Risk Individuals',
    naics: 'N/A (personal services)', sic: 'N/A',
    budgetCycle: 'Personal/family wealth',
    decisionMaker: 'The individual + trusted advisors',
    modules: [
      { name: 'Personal Risk Intelligence', tools: [
        { title: 'Digital Footprint Monitor', bp: 'Online presence monitoring', bf: 'Personal Security', cat: 'Security', problem: 'Personal data exposed across breaches; AI monitors and alerts on exposure' },
        { title: 'Threat Intelligence Feed', bp: 'Personal threat assessment', bf: 'Security', cat: 'Intelligence', problem: 'HNW individuals targeted; AI monitors for credible threats across channels' },
        { title: 'Legal Exposure Analyzer', bp: 'Legal risk assessment', bf: 'Legal Affairs', cat: 'Legal', problem: 'Complex legal exposure across jurisdictions; AI models risk scenarios' },
        { title: 'Media Narrative Tracker', bp: 'Reputation monitoring', bf: 'Communications', cat: 'PR', problem: 'Narrative attacks can destroy reputation overnight; AI monitors sentiment and flags escalation' },
        { title: 'Travel Risk Advisor', bp: 'Travel security', bf: 'Personal Security', cat: 'Security', problem: 'Travel to high-risk locations; AI assesses route, destination, and timing risks' },
      ]},
      { name: 'Personal Wealth & Legacy Intelligence', tools: [
        { title: 'Estate Architecture Optimizer', bp: 'Estate planning', bf: 'Wealth Transfer', cat: 'Legal/Finance', problem: 'Estate plans outdated and suboptimal; AI models structures across jurisdictions and tax regimes' },
        { title: 'Relationship Network Analyzer', bp: 'Personal network management', bf: 'Relationship Intelligence', cat: 'Intelligence', problem: 'Trust network shifts; AI maps relationship health and identifies risks' },
        { title: 'Health Optimization Engine', bp: 'Personal health management', bf: 'Health', cat: 'Wellness', problem: 'Reactive healthcare; AI integrates biomarkers and predicts health risks proactively' },
        { title: 'Privacy Architecture Designer', bp: 'Personal data protection', bf: 'Privacy', cat: 'Security', problem: 'Privacy eroding; AI designs and monitors personal data minimization strategies' },
        { title: 'Legacy & Memoir Engine', bp: 'Legacy documentation', bf: 'Knowledge/Heritage', cat: 'Archive', problem: 'Stories and wisdom die with individuals; AI captures, structures, and preserves' },
      ]},
    ],
    gaps: 'Advisor conflicts of interest, information asymmetry, privacy erosion, family fragmentation, health negligence, legacy planning avoidance, political exposure, cybersecurity naivety.'
  },
];

// ============================================================
// GENERATE AUDIENCE PAGES
// ============================================================
let totalPages = 0;

for (const aud of audiences) {
  // Index page per audience
  const indexContent = `---
title: "${aud.name}"
sidebar_position: 1
tags: [audience-${aud.num}]
---

# Audience ${aud.num}: ${aud.name}

<div className="audience-header">
  <div className="audience-header__naics">NAICS: ${aud.naics} | SIC: ${aud.sic}</div>
  <div className="audience-header__decision-maker">Budget Cycle: ${aud.budgetCycle} | Decision Maker: ${aud.decisionMaker}</div>
</div>

## Modules

${aud.modules.map((m, i) => `### Module ${i + 1}: ${m.name}

| Tool/System | Business Process | Business Function | Category | Problem Solved |
|---|---|---|---|---|
${m.tools.map(t => `| **${t.title}** | ${t.bp} | ${t.bf} | ${t.cat} | ${t.problem} |`).join('\n')}
`).join('\n')}

## Systemic Gaps

${aud.gaps}

## Related

- [Economic Model — Bundles](/economic-model/bundles)
- [Cross-Audience Analysis](/cross-audience)
- [Agent Recovery Prompt](/_recovery)
`;

  writeMdx(`audiences/${aud.slug}/index.mdx`, indexContent);
  totalPages++;

  // Individual tool pages
  let toolPos = 2;
  for (const mod of aud.modules) {
    for (const tool of mod.tools) {
      const slug = tool.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const content = toolPage({
        title: tool.title,
        pos: toolPos++,
        businessProcess: tool.bp,
        businessFunction: tool.bf,
        category: tool.cat,
        problemSolved: tool.problem,
        audienceNum: aud.num,
        audienceName: aud.name,
        moduleName: mod.name,
      });
      writeMdx(`audiences/${aud.slug}/${slug}.mdx`, content);
      totalPages++;
    }
  }
}

// ============================================================
// ECOSYSTEM ENTITY PAGES
// ============================================================
const entities = [
  { name: 'AINEFF', fullName: 'AI-Native Enterprise Foundation Framework', role: 'Constitutional constraints — defines what the ecosystem CANNOT do', pos: 1 },
  { name: 'AINEF', fullName: 'AI-Native Enterprise Framework', role: 'Structural framework for building AI-native enterprises', pos: 2 },
  { name: 'AINEG', fullName: 'AI-Native Enterprise Governance', role: 'Governance infrastructure — policies, controls, audit frameworks', pos: 3 },
  { name: 'AINE', fullName: 'AI-Native Enterprise', role: 'The enterprise template — any organization built on AI-native principles', pos: 4 },
  { name: 'WGE', fullName: 'Work Genesis Engine', role: 'Runtime execution — the engine that creates, manages, and terminates AI work units', pos: 5 },
  { name: 'Frankmax', fullName: 'FrankMax Digital', role: 'Pre-incident governance — accountability, liability, defensibility services', pos: 6 },
  { name: 'LPI', fullName: 'Legitimacy & Power Infrastructure', role: 'Power constraint — detects and prevents illegitimate power concentration', pos: 7 },
  { name: 'UniVenture', fullName: 'UniVenture Platform', role: 'IP licensing & venture execution — connects IP owners with certified operators', pos: 8 },
];

for (const entity of entities) {
  writeMdx(`ecosystem-entities/${entity.name.toLowerCase()}.mdx`, `---
title: "${entity.name} — ${entity.fullName}"
sidebar_position: ${entity.pos}
tags: [entity, ${entity.name.toLowerCase()}]
---

# ${entity.name}: ${entity.fullName}

<div className="entity-badge entity-badge--${entity.name.toLowerCase()}">${entity.name}</div>

## Role in Ecosystem

${entity.role}

## Core Functions

<!-- TODO: Define 5-7 core functions from source documents -->

## Products & Services

<!-- TODO: Link to specific marketplace products owned by this entity -->

## Governance Mandate

<!-- TODO: What this entity is authorized to do and constrained from doing -->

## Revenue Model

<!-- TODO: How this entity generates revenue -->

## Integration Points

<!-- TODO: How this entity connects to other entities -->

## BPMN Workflow

\`\`\`mermaid
graph TB
    A[${entity.name}] --> B[Core Function 1]
    A --> C[Core Function 2]
    A --> D[Core Function 3]
    B --> E[Output]
    C --> E
    D --> E
\`\`\`

## Related

- [Protocols](/protocols)
- [Agent Recovery Prompt](/_recovery)
`);
  totalPages++;
}

// ============================================================
// PROTOCOL PAGES
// ============================================================
const protocols = [
  { name: 'ORF', fullName: 'Obligation & Responsibility Finality', desc: 'The foundational coordination protocol — defines how obligations are created, bound, tracked, fulfilled, and terminated with irrevocable finality. TCP/IP of the ecosystem.', pos: 1 },
  { name: 'ETLB', fullName: 'Execution-Time Liability Binding', desc: 'At execution time, exactly one natural person is cryptographically bound as the liability bearer for every AI action. No anonymous AI decisions.', pos: 2 },
  { name: 'MCO', fullName: 'Mortality Compliance Object', desc: 'Every AI system granted authority must have an enforced death/expiry. No immortal AI commitments. Systems that do not expire cannot be granted authority.', pos: 3 },
];

for (const proto of protocols) {
  writeMdx(`protocols/${proto.name.toLowerCase()}.mdx`, `---
title: "${proto.name} — ${proto.fullName}"
sidebar_position: ${proto.pos}
tags: [protocol, ${proto.name.toLowerCase()}]
---

# ${proto.name}: ${proto.fullName}

## What It Is

${proto.desc}

## Protocol Specification

<!-- TODO: Detailed protocol spec from source documents -->

## As Revenue Infrastructure

<!-- TODO: Revenue streams from protocol -->

## Target Audiences

<!-- TODO: Which audiences need this protocol -->

## BPMN Workflow

\`\`\`mermaid
graph LR
    A[Trigger] --> B[${proto.name} Protocol]
    B --> C[Validation]
    C --> D[Binding]
    D --> E[Finality]
    E --> F[Audit Record]
\`\`\`

## Related

- [Ecosystem Entities](/ecosystem-entities)
- [Agent Recovery Prompt](/_recovery)
`);
  totalPages++;
}

// ============================================================
// EXECUTIVE OVERVIEW PAGES
// ============================================================
const overviewPages = [
  { slug: 'premise', title: 'The Marketplace Premise', pos: 1 },
  { slug: 'architecture', title: 'Platform Architecture', pos: 2 },
  { slug: 'economics', title: 'Economic Model Summary', pos: 3 },
  { slug: 'statistics', title: 'Marketplace Statistics', pos: 4 },
];

for (const page of overviewPages) {
  writeMdx(`executive-overview/${page.slug}.mdx`, `---
title: "${page.title}"
sidebar_position: ${page.pos}
tags: [overview]
---

# ${page.title}

<!-- TODO: Fill from MARKETPLACE_OPPORTUNITY_CATALOG.md -->
`);
  totalPages++;
}

// ============================================================
// ECONOMIC MODEL PAGES
// ============================================================
const econPages = [
  { slug: 'burger-fries-kitchen', title: 'Burger / Fries / Kitchen Framework', pos: 1, dir: '' },
  { slug: 'unit-economics', title: 'Unit Economics Model', pos: 2, dir: '' },
  { slug: 'attachment-layers', title: 'High-Margin Attachment Layers (The Fries)', pos: 3, dir: '' },
  { slug: 'habit-engineering', title: 'Habit Engineering Strategy', pos: 4, dir: '' },
  { slug: 'structural-dominance', title: 'Structural Dominance Strategy', pos: 5, dir: '' },
];

for (const page of econPages) {
  writeMdx(`economic-model/${page.slug}.mdx`, `---
title: "${page.title}"
sidebar_position: ${page.pos}
tags: [economic-model]
---

# ${page.title}

<!-- TODO: Fill from MARKETPLACE_OPPORTUNITY_CATALOG.md Part III -->
`);
  totalPages++;
}

// Bundle pages
const bundles = [
  { num: 1, name: 'Government Starter Pack', price: '$2,500/month', pos: 1 },
  { num: 2, name: 'Financial Services Compliance Pack', price: '$8,500/month', pos: 2 },
  { num: 3, name: 'Enterprise Operations Pack', price: '$4,500/month', pos: 3 },
  { num: 4, name: 'Founder/Operator Sprint Pack', price: '$499/month', pos: 4 },
  { num: 5, name: 'Dynasty/Family Office Continuity Pack', price: '$12,000/month', pos: 5 },
  { num: 6, name: 'Defense & Intelligence Pack', price: '$25,000/month', pos: 6 },
  { num: 7, name: 'Critical Infrastructure Pack', price: '$15,000/month', pos: 7 },
];

for (const bundle of bundles) {
  writeMdx(`economic-model/bundles/bundle-${bundle.num}.mdx`, `---
title: "Bundle ${bundle.num}: ${bundle.name}"
sidebar_position: ${bundle.pos}
tags: [bundle, economic-model]
---

# Bundle ${bundle.num}: ${bundle.name}

**Price**: ${bundle.price}

<!-- TODO: Fill bundle contents from Part III -->
`);
  totalPages++;
}

// Service layers
const serviceLayers = [
  'Capability-as-a-Service (CaaS)', 'Skill-as-a-Service (SaaS)', 'Role-as-a-Service (RaaS)',
  'Workflow-as-a-Service (WaaS)', 'Enterprise-as-a-Service (EaaS)', 'Compliance-as-a-Service (CoaaS)',
  'Governance-as-a-Service (GaaS)', 'Audit-as-a-Service (AaaS)', 'Insurance-as-a-Service (InaaS)',
  'Trust-as-a-Service (TaaS)', 'Intelligence-as-a-Service (IaaS)', 'Coordination-as-a-Service (CoordaaS)',
  'Certification-as-a-Service (CertaaS)', 'Simulation-as-a-Service (SimaaS)', 'Liability-as-a-Service (LaaS)',
];

serviceLayers.forEach((sl, i) => {
  const slug = sl.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  writeMdx(`economic-model/service-layers/${slug}.mdx`, `---
title: "${sl}"
sidebar_position: ${i + 1}
tags: [service-layer, economic-model]
---

# ${sl}

<!-- TODO: Fill from Part IX -->
`);
  totalPages++;
});

// Byproduct pages
const byproducts = [
  'Optionality-as-a-Service', 'Drift Early-Warning Systems', 'Human Accountability Infrastructure',
  'Governance Pattern Libraries', 'AI Labor Statistics', 'Regulatory Pre-Compliance Sandboxes',
  'Legibility-as-Infrastructure', 'Dispute Compression Systems', 'Economic Shock Absorption',
  'Anti-Bullshit Filter', 'Time-Indexed Knowledge Markets', 'Synthetic Benchmark Enterprises',
  'Trust-as-a-Service', 'Failure Intelligence Feeds', 'Enterprise Mortality Tables',
];

byproducts.forEach((bp, i) => {
  const slug = bp.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  writeMdx(`economic-model/byproducts/${slug}.mdx`, `---
title: "${bp}"
sidebar_position: ${i + 1}
tags: [byproduct, economic-model]
---

# ${bp}

<!-- TODO: Fill from Gap 5 -->
`);
  totalPages++;
});

// ============================================================
// PLATFORM PAGES
// ============================================================

// Core Systems (42 across 7 layers)
const coreSystems = {
  'Layer 1 — Compute & Infrastructure': [
    'Multi-Model Orchestration Engine', 'AI Cost Optimization Engine', 'Sovereign AI Pods', 'Edge AI Control Grid'
  ],
  'Layer 2 — Cognition & Agent': [
    'Agent Runtime & Identity Kernel', 'Enterprise Agent Orchestration OS', 'Verticalized Autonomous Operator Stack',
    'Executive AI Co-Pilot', '200+ Specialized Agent Library'
  ],
  'Layer 3 — Memory & Data Control': [
    'Enterprise Memory Graph', 'Autonomous Data Ingestion Engine', 'Failure Pattern Library', 'Enterprise Mortality Tables'
  ],
  'Layer 4 — Execution & Governance': [
    'Governed AI Execution Engine', 'AI Audit & Verification Infrastructure', 'ETLB Engine',
    'MCO Generator & Validator', 'Pre-Incident Accountability Review (PIAR)', 'Decision Defensibility Structuring', 'Kill-Switch Infrastructure'
  ],
  'Layer 5 — Economic & Transaction': [
    'AI Contract & Transaction Protocol', 'Agent Marketplace', 'Decision Latency Arbitrage Network',
    'Autonomous Budget Optimization', 'Liability Escrow Infrastructure'
  ],
  'Layer 6 — Trust & Certification': [
    'Alignment Scoring & Certification', 'Skill Valuation & Credentialing', 'Reputation & Trust Graph', 'Operator Certification System'
  ],
  'Layer 7 — Simulation & Digital Twin': [
    'Enterprise Digital Twin Platform', 'Policy Simulation Engine', 'Synthetic Enterprise Platform', 'Wargaming & Scenario Modeler'
  ],
};

let sysPos = 1;
for (const [layer, systems] of Object.entries(coreSystems)) {
  for (const sys of systems) {
    const slug = sys.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    writeMdx(`platform/core-systems/${slug}.mdx`, `---
title: "${sys}"
sidebar_position: ${sysPos++}
tags: [core-system, platform, ${layer.split('—')[0].trim().toLowerCase().replace(/\s+/g, '-')}]
---

# ${sys}

**${layer}**

<!-- TODO: Fill from Part VIII -->
`);
    totalPages++;
  }
}

// Agent categories
const agentCategories = [
  'Strategy Agents', 'Operations Agents', 'Governance Agents', 'Finance Agents',
  'Culture & Psychology Agents', 'Influence Agents', 'Competitive Intelligence Agents',
  'Risk Agents', 'Compliance Agents', 'Innovation Agents', 'Coordination Agents',
  'Civilization-Scale Agents',
];

agentCategories.forEach((cat, i) => {
  const slug = cat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  writeMdx(`platform/agents/${slug}.mdx`, `---
title: "${cat}"
sidebar_position: ${i + 1}
tags: [agents, platform]
---

# ${cat}

<!-- TODO: Fill from Gap 3 — Agent Library -->
`);
  totalPages++;
});

// Composition model
writeMdx('platform/agents/composition-model.mdx', `---
title: "Agent Composition Model"
sidebar_position: 13
tags: [agents, platform]
---

# Agent Composition Model

\`\`\`mermaid
graph TB
    A[12 Primitives] --> B[Capabilities]
    B --> C[Competencies]
    C --> D[Job Roles]
    D --> E[Teams]
    E --> F[Multi-Agent Systems]
\`\`\`

<!-- TODO: Fill from Gap 14 -->
`);
totalPages++;

// Primitive agent roles
const primitives = [
  'Perceiver', 'Retriever', 'Interpreter', 'Planner', 'Decider', 'Executor',
  'Monitor', 'Critic', 'Verifier', 'Memory Keeper', 'Router', 'Reflector',
];

primitives.forEach((p, i) => {
  const slug = p.toLowerCase().replace(/\s+/g, '-');
  writeMdx(`platform/primitives/${slug}.mdx`, `---
title: "${p}"
sidebar_position: ${i + 1}
tags: [primitive, platform]
---

# ${p}

Primitive Agent Role #${i + 1}

<!-- TODO: Fill from Gap 14 -->
`);
  totalPages++;
});

// Infrastructure layers (19)
const infraLayers = [
  'Truth / System of Record', 'Execution Authority', 'Coordination', 'Decision Legitimacy',
  'Coercion / Consequence', 'Proof / Verifiability', 'Incentive Gradient', 'Trust Compression',
  'Narrative Legitimacy', 'Internal Purpose', 'Boundary Definition', 'Irreversibility',
  'Entropy / Decay', 'Silence / Non-Action', 'Legibility to Power', 'Human Discipline',
  'Time Synchronization', 'Exit & Substitution', 'Accountability Asymmetry',
];

infraLayers.forEach((layer, i) => {
  const slug = layer.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  writeMdx(`platform/infrastructure-layers/${slug}.mdx`, `---
title: "Layer ${i + 1}: ${layer}"
sidebar_position: ${i + 1}
tags: [infrastructure-layer, platform, civilizational-kernel]
---

# Layer ${i + 1}: ${layer}

<!-- TODO: Fill from Gap 15 -->
`);
  totalPages++;
});

// OpenClaw components
const openclawComponents = [
  'MCP Tool Orchestrator', 'Claude Skill Modules', 'Claude Code Sandbox',
  'Antigravity Autonomy Governor', 'NotebookLM-style Knowledge Grounding',
  'Compliance Guardrails', 'Telemetry Agent', 'Behavioral Anomaly Monitor',
];

openclawComponents.forEach((comp, i) => {
  const slug = comp.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  writeMdx(`platform/openclaw/${slug}.mdx`, `---
title: "${comp}"
sidebar_position: ${i + 1}
tags: [openclaw, platform]
---

# ${comp}

<!-- TODO: Fill from Gap 8 -->
`);
  totalPages++;
});

// Doc-as-Code
const dacPages = ['Overview', 'Directory Structure', 'DOC-AS-CODE Platform', 'Documentation Synthesis Agent', 'Market Positioning Agent'];
dacPages.forEach((p, i) => {
  const slug = p.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  writeMdx(`platform/doc-as-code/${slug}.mdx`, `---
title: "${p}"
sidebar_position: ${i + 1}
tags: [doc-as-code, platform]
---

# ${p}

<!-- TODO: Fill from Gap 7 -->
`);
  totalPages++;
});

// Blockchain & IoT
const blockchainPages = [
  'Immutable Audit Chain', 'Smart Contract Governance', 'Mandate State Ledger',
  'Cross-Entity Settlement Chain', 'Provenance Verification Network',
  'Sensor Data Ingestion Pipeline', 'Physical KPI Feed Engine',
  'Anomaly Detection for Physical Systems', 'Digital Twin Data Connector',
  'Edge-Cloud AI Orchestrator', 'Human-Robot Collaboration Orchestrator',
  'Operator Cognitive Load Monitor', 'Adaptive Automation Controller',
  'Sustainability & Circularity Optimizer', 'Resilient Manufacturing Coordinator',
];

blockchainPages.forEach((p, i) => {
  const slug = p.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  writeMdx(`platform/blockchain-iot/${slug}.mdx`, `---
title: "${p}"
sidebar_position: ${i + 1}
tags: [blockchain-iot, platform]
---

# ${p}

<!-- TODO: Fill from Gap 9 -->
`);
  totalPages++;
});

// Consumer Apps
const consumerApps = [
  'DocuScan AI', 'ResumeReview AI', 'TaxHelper AI', 'ContractReader AI', 'BudgetBrain AI',
  'HealthLog AI', 'StudyCoach AI', 'LegalPlain AI', 'InvoiceSnap AI', 'ComplianceCheck AI',
  'ClaimsFast Pro', 'AuditReady Pro', 'InventoryAI Pro', 'HRAssist Pro', 'PropertyManager Pro',
];

consumerApps.forEach((app, i) => {
  const slug = app.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  writeMdx(`platform/consumer-apps/${slug}.mdx`, `---
title: "${app}"
sidebar_position: ${i + 1}
tags: [consumer-app, platform]
---

# ${app}

<!-- TODO: Fill from Gap 2 -->
`);
  totalPages++;
});

// ============================================================
// MARKET INTELLIGENCE
// ============================================================

// Chokepoint tiers
const chokepointTiers = [
  { name: 'Tier 1 — Maximum Monetization (1-25)', slug: 'tier-1-revenue-compliance', pos: 1 },
  { name: 'Tier 2 — High-Value Growth (26-50)', slug: 'tier-2-operational-efficiency', pos: 2 },
  { name: 'Tier 3 — Hidden Authority (51-75)', slug: 'tier-3-governance-structural', pos: 3 },
  { name: 'Tier 4 — Emerging Demand (76-100)', slug: 'tier-4-ai-governance-trust', pos: 4 },
];

for (const tier of chokepointTiers) {
  writeMdx(`market-intelligence/chokepoints/${tier.slug}.mdx`, `---
title: "${tier.name}"
sidebar_position: ${tier.pos}
tags: [chokepoints, market-intelligence]
---

# ${tier.name}

<!-- TODO: Fill from Part VII -->
`);
  totalPages++;
}

// NAICS mapping
writeMdx('market-intelligence/chokepoints/naics-mapping.mdx', `---
title: "NAICS/SIC Industry Mapping"
sidebar_position: 5
tags: [chokepoints, naics, market-intelligence]
---

# NAICS/SIC Industry Mapping — Complete Cross-Reference

<!-- TODO: Fill from Part IV -->
`);
totalPages++;

// Market wedges
const wedges = [
  { name: 'Manufacturing', naics: '311-339', price: '$95,000', pos: 1 },
  { name: 'Logistics', naics: '481-488', price: '$80,000', pos: 2 },
  { name: 'Professional Services', naics: '541', price: '$110,000', pos: 3 },
  { name: 'Banking', naics: '522', price: '$85,000', pos: 4 },
  { name: 'Construction', naics: '236-238', price: '$90,000', pos: 5 },
  { name: 'Healthcare', naics: '621-624', price: '$70,000-$90,000', pos: 6 },
];

for (const wedge of wedges) {
  const slug = wedge.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  writeMdx(`market-intelligence/market-wedges/${slug}.mdx`, `---
title: "${wedge.name} Wedge"
sidebar_position: ${wedge.pos}
tags: [market-wedge, market-intelligence, ${wedge.naics}]
---

# ${wedge.name} Market Wedge

**NAICS**: ${wedge.naics} | **Entry Price**: ${wedge.price}

<!-- TODO: Fill from Gap 6 -->
`);
  totalPages++;
}

// Wedge sequencing
writeMdx('market-intelligence/market-wedges/sequencing.mdx', `---
title: "Wedge Sequencing Strategy"
sidebar_position: 7
tags: [market-wedge, market-intelligence]
---

# Wedge Sequencing Strategy

<!-- TODO: Fill from Gap 6 -->
`);
totalPages++;

// ============================================================
// CROSS-AUDIENCE ANALYSIS
// ============================================================
const crossAudiencePages = [
  { name: 'Problems — Explicit Pain Points', slug: 'problems', pos: 1 },
  { name: 'Challenges — Structural Difficulties', slug: 'challenges', pos: 2 },
  { name: 'Systemic Gaps — Missing Infrastructure', slug: 'systemic-gaps', pos: 3 },
  { name: 'Entropies — Degradation Forces', slug: 'entropies', pos: 4 },
  { name: 'Bottlenecks — Flow Constraints', slug: 'bottlenecks', pos: 5 },
  { name: 'Chokepoints — Single Points of Failure', slug: 'chokepoints-spof', pos: 6 },
  { name: 'TAM by Audience', slug: 'tam-by-audience', pos: 7 },
];

for (const page of crossAudiencePages) {
  writeMdx(`cross-audience/${page.slug}.mdx`, `---
title: "${page.name}"
sidebar_position: ${page.pos}
tags: [cross-audience]
---

# ${page.name}

<!-- TODO: Fill from Part II -->
`);
  totalPages++;
}

// ============================================================
// OPERATIONS
// ============================================================

// Frankmax services
const fmServices = [
  { name: 'PIAR (Pre-Incident Accountability Review)', slug: 'piar', pos: 1, price: '$15,000-$75,000' },
  { name: 'Authority & Liability Mapping', slug: 'authority-liability-mapping', pos: 2, price: '$10,000-$50,000' },
  { name: 'Failure Propagation & Blast-Radius Analysis', slug: 'failure-propagation', pos: 3, price: '$20,000-$100,000' },
  { name: 'Jurisdictional Exposure & Enforcement Readiness', slug: 'jurisdictional-exposure', pos: 4, price: '$25,000-$150,000' },
  { name: 'Decision Defensibility Structuring', slug: 'decision-defensibility', pos: 5, price: '$5,000-$20,000/month' },
  { name: 'Institutional Memory & Accountability Continuity', slug: 'institutional-memory', pos: 6, price: '$3,000-$10,000/month' },
  { name: 'Accreditation & External Defensibility Signals', slug: 'accreditation', pos: 7, price: '$10,000-$50,000/year' },
];

for (const svc of fmServices) {
  writeMdx(`operations/frankmax-services/${svc.slug}.mdx`, `---
title: "${svc.name}"
sidebar_position: ${svc.pos}
tags: [frankmax-service, operations]
---

# ${svc.name}

**Price**: ${svc.price}

<!-- TODO: Fill from Gap 12 -->
`);
  totalPages++;
}

// Revenue trajectory
writeMdx('operations/frankmax-services/revenue-trajectory.mdx', `---
title: "Frankmax Revenue Trajectory"
sidebar_position: 8
tags: [frankmax-service, operations]
---

# Frankmax Revenue Trajectory

<!-- TODO: Fill from Gap 12 -->
`);
totalPages++;

// LevelUpMax tracks
const tracks = [
  { num: 1, name: 'AI-Native Operator Foundation', duration: '30 days', price: '$900-$1,500' },
  { num: 2, name: 'Governance & Risk Operator', duration: '30 days', price: '$1,200-$1,800' },
  { num: 3, name: 'Revenue Systems Operator', duration: '30 days', price: '$1,200-$1,800' },
  { num: 4, name: 'Capital Allocation & Portfolio Operator', duration: '30 days', price: '$1,500-$2,200' },
  { num: 5, name: 'Venture Production Operator', duration: '90 days', price: '$2,500-$3,500' },
  { num: 6, name: 'Data Infrastructure Operator', duration: '30 days', price: '$1,200-$1,800' },
  { num: 7, name: 'Enterprise Workflow Optimization Operator', duration: '30 days', price: '$1,200-$1,800' },
  { num: 8, name: 'AI Engineering & Systems Architect', duration: '90 days', price: '$3,000-$4,500' },
  { num: 9, name: 'Compliance & Regulatory Deployment Operator', duration: '30 days', price: '$1,500-$2,200' },
  { num: 10, name: 'Performance Intelligence & Learning Systems Operator', duration: '30 days', price: '$1,200-$1,800' },
];

for (const track of tracks) {
  writeMdx(`operations/levelupmax/track-${track.num}.mdx`, `---
title: "Track ${track.num}: ${track.name}"
sidebar_position: ${track.num}
tags: [levelupmax, operations, training]
---

# Track ${track.num}: ${track.name}

**Duration**: ${track.duration} | **Price**: ${track.price}

<!-- TODO: Fill from Gap 11 -->
`);
  totalPages++;
}

// Corporate licensing + advancement
writeMdx('operations/levelupmax/corporate-licensing.mdx', `---
title: "Corporate Licensing"
sidebar_position: 11
tags: [levelupmax, operations]
---

# Corporate Licensing Model

<!-- TODO: Fill from Gap 11 -->
`);
totalPages++;

writeMdx('operations/levelupmax/advancement-path.mdx', `---
title: "Advancement Path"
sidebar_position: 12
tags: [levelupmax, operations]
---

# Advancement Path

<!-- TODO: Fill from Gap 11 -->
`);
totalPages++;

// ============================================================
// RISK & GOVERNANCE
// ============================================================
const riskPages = [
  { name: 'Failure Mode Analysis', slug: 'failure-modes', pos: 1 },
  { name: 'Strategic Moat Recommendations', slug: 'strategic-moat', pos: 2 },
  { name: 'Revenue Priority Stack', slug: 'revenue-priority', pos: 3 },
  { name: 'Sensitivity Analysis', slug: 'sensitivity-analysis', pos: 4 },
];

for (const page of riskPages) {
  writeMdx(`risk-governance/${page.slug}.mdx`, `---
title: "${page.name}"
sidebar_position: ${page.pos}
tags: [risk-governance]
---

# ${page.name}

<!-- TODO: Fill from Parts V, VI, XI -->
`);
  totalPages++;
}

console.log(`\n✅ Generated ${totalPages} MDX pages`);
console.log(`   📁 docs/ directory structure complete`);
console.log(`   📝 Run 'npm run start' to preview`);
