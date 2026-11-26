import { useState } from "react";
import { NavLink, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  Activity, AlertTriangle, ArrowDownRight, ArrowRight, ArrowUpRight, Bell,
  BookOpen, BrainCircuit, CheckCircle2, ChevronDown, CircleHelp, Clock3,
  Command, Cpu, Download, ExternalLink, FileSearch, Filter, Globe2, Home,
  Layers3, LockKeyhole, LogOut, Menu, MoreHorizontal, Network, PanelLeftClose,
  Search, Settings, Shield, ShieldAlert, ShieldCheck, Sparkles, Target, X,
  Zap, Eye, CircleDot, Server, UserRound, Waypoints
} from "lucide-react";
import { alerts, investigations, iocs, techniques, activityFeed } from "./data/mockData";

function downloadCsv(filename, rows) {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const escapeCell = value => `"${String(value ?? "").replaceAll('"', '""')}"`;
  const csv = [headers.map(escapeCell).join(","), ...rows.map(row => headers.map(key => escapeCell(row[key])).join(","))].join("\r\n");
  const blob = new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

const navGroups = [
  { label: "WORKSPACE", items: [
    { to: "/", label: "Overview", icon: Home, end: true },
    { to: "/alerts", label: "Alerts", icon: ShieldAlert, count: "12" },
    { to: "/investigations", label: "Investigations", icon: FileSearch, count: "4" },
    { to: "/threat-intel", label: "Threat intelligence", icon: Globe2 },
  ]},
  { label: "KNOWLEDGE", items: [
    { to: "/attack-map", label: "MITRE ATT&CK", icon: Target },
    { to: "/settings", label: "Settings", icon: Settings },
  ]}
];

function Sidebar({ open, onClose }) {
  return <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
    <div className="brand-row">
      <div className="brand-mark"><Shield size={21} strokeWidth={2.4} /></div>
      <div className="brand-copy"><strong>sentra<span>ai</span></strong><small>SECURITY OPERATIONS</small></div>
      <button className="icon-btn mobile-close" onClick={onClose} aria-label="Close menu"><X size={18}/></button>
    </div>
    <div className="workspace-select">
      <div className="workspace-avatar">S</div>
      <div className="workspace-copy"><strong>Sentra workspace</strong><small>Enterprise plan</small></div>
      <ChevronDown size={15} className="muted"/>
    </div>
    <nav className="nav-groups">
      {navGroups.map(group => <div className="nav-group" key={group.label}>
        <div className="nav-heading">{group.label}</div>
        {group.items.map(item => {
          const Icon = item.icon;
          return <NavLink key={item.to} to={item.to} end={item.end} onClick={onClose} className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}>
            <Icon size={17}/><span>{item.label}</span>{item.count && <span className="nav-count">{item.count}</span>}
          </NavLink>;
        })}
      </div>)}
    </nav>
    <div className="sidebar-bottom">
      <div className="system-status"><span className="status-dot"></span><div><strong>All systems operational</strong><small>Last checked just now</small></div></div>
      <div className="profile-row"><div className="profile-avatar">SG</div><div className="profile-copy"><strong>Security Analyst</strong><small>analyst@sentra.local</small></div><MoreHorizontal size={18} className="muted"/></div>
    </div>
  </aside>;
}

function Topbar({ onMenu }) {
  const location = useLocation();
  const titles = { "/": "Overview", "/alerts": "Alerts", "/investigations": "Investigations", "/threat-intel": "Threat intelligence", "/attack-map": "MITRE ATT&CK", "/settings": "Settings" };
  const [search, setSearch] = useState("");
  return <header className="topbar">
    <div className="topbar-left"><button className="icon-btn menu-btn" onClick={onMenu} aria-label="Open menu"><Menu size={19}/></button><div className="breadcrumbs"><span>SentraAI</span><span className="crumb-slash">/</span><strong>{titles[location.pathname] || "Investigation"}</strong></div></div>
    <div className="topbar-actions">
      <label className="global-search"><Search size={16}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search anything..." aria-label="Search"/><kbd>⌘ K</kbd></label>
      <div className="env-pill"><span className="status-dot"></span>Demo environment</div>
      <button className="icon-btn notification-btn" aria-label="Notifications"><Bell size={18}/><i></i></button>
      <div className="topbar-avatar">SA</div>
    </div>
  </header>;
}

function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return <div className="app-shell"><Sidebar open={menuOpen} onClose={()=>setMenuOpen(false)}/>{menuOpen && <button className="mobile-scrim" onClick={()=>setMenuOpen(false)} aria-label="Close navigation"/>}<div className="main-shell"><Topbar onMenu={()=>setMenuOpen(true)}/><main className="page-content">{children}</main><footer className="footer"><span>SentraAI <span className="footer-sep">•</span> Security intelligence workspace</span><span><span className="status-dot"></span> Mock data active</span></footer></div></div>;
}

function PageHeading({ eyebrow, title, description, actions }) {
  return <div className="page-heading"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div><div className="heading-actions">{actions}</div></div>;
}
function Button({ children, variant="secondary", onClick, icon: Icon, ...props }) {
  return <button className={`btn btn-${variant}`} onClick={onClick} {...props}>{Icon && <Icon size={16}/>}<span>{children}</span></button>;
}
function Severity({ value }) {
  return <span className={`severity severity-${value.toLowerCase()}`}><span className="severity-dot"></span>{value}</span>;
}
function StatusPill({ value }) {
  const cls = value.toLowerCase().replaceAll(" ", "-");
  return <span className={`status-pill status-${cls}`}><span className="status-dot"></span>{value}</span>;
}
function StatCard({ label, value, delta, trend="up", icon: Icon, tone="cyan", note }) {
  return <div className="stat-card"><div className="stat-top"><span>{label}</span><div className={`stat-icon tone-${tone}`}><Icon size={18}/></div></div><div className="stat-value">{value}</div><div className="stat-bottom"><span className={`stat-delta ${trend==="down"?"trend-down":""}`}>{trend==="down"?<ArrowDownRight size={14}/>:<ArrowUpRight size={14}/>} {delta}</span><span>{note}</span></div></div>;
}
function MiniBars() {
  const bars = [32,44,36,58,48,68,54,74,63,86,70,58,78,68,94,72,83,60,76,50,67,88,70,98,79,64,84,73,91,67,80,59,73,87,68,95];
  return <div className="mini-bars" aria-label="Alert volume trend">{bars.map((h,i)=><div key={i} style={{height:`${h}%`}} className={i>29?"bar-highlight":""}/>)}</div>;
}
function Overview() {
  const navigate = useNavigate();
  const high = alerts.filter(a=>a.severity==="Critical"||a.severity==="High").length;
  return <>
    <PageHeading eyebrow="SECURITY OVERVIEW" title="Good morning, Analyst" description="Here's what's happening across your security environment today." actions={<><Button icon={Download} onClick={()=>window.print()}>Export report</Button><Button variant="primary" icon={Sparkles} onClick={()=>alert("Demo: AI investigation workflow will be connected to your backend later.")}>New investigation</Button></>}/>
    <div className="banner"><div className="banner-icon"><BrainCircuit size={22}/></div><div className="banner-copy"><strong>Your AI analyst is ready</strong><span>Correlate alerts, enrich indicators, and build evidence-backed investigation dossiers.</span></div><div className="banner-tag"><span className="status-dot"></span>System ready</div><button className="banner-arrow" onClick={()=>navigate("/investigations")} aria-label="View investigations"><ArrowRight size={18}/></button></div>
    <div className="stats-grid">
      <StatCard label="Total alerts" value="1,284" delta="12.8%" note="vs. previous 7 days" icon={Activity} tone="cyan"/>
      <StatCard label="Critical / high" value={String(high+7).padStart(2,"0")} delta="8.2%" trend="down" note="vs. previous 7 days" icon={ShieldAlert} tone="red"/>
      <StatCard label="Open investigations" value="04" delta="2 new" note="in the last 24 hours" icon={FileSearch} tone="amber"/>
      <StatCard label="Mean time to triage" value="4.2m" delta="18.4%" trend="down" note="faster than last week" icon={Clock3} tone="green"/>
    </div>
    <div className="dashboard-grid">
      <section className="panel chart-panel"><div className="panel-heading"><div><h2>Alert activity</h2><p>Alert volume across your environment</p></div><select className="select-small" defaultValue="7d" aria-label="Alert activity period"><option value="24h">Last 24 hours</option><option value="7d">Last 7 days</option><option value="30d">Last 30 days</option></select></div><div className="chart-summary"><strong>8,492</strong><span className="chart-summary-label">events processed</span><span className="chart-legend"><i></i>Alerts</span></div><MiniBars/><div className="chart-x-axis"><span>Oct 21</span><span>Oct 22</span><span>Oct 23</span><span>Oct 24</span><span>Oct 25</span><span>Oct 26</span><span>Oct 27</span></div></section>
      <section className="panel health-panel"><div className="panel-heading"><div><h2>Environment health</h2><p>Connected security services</p></div><span className="health-score">98<span>/100</span></span></div><div className="health-meter"><div/></div><div className="service-list">{[{name:"Wazuh SIEM",detail:"Alert ingestion",state:"Connected",icon:ShieldCheck},{name:"Threat intelligence",detail:"IOC enrichment",state:"Connected",icon:Globe2},{name:"Knowledge graph",detail:"Entity correlation",state:"Connected",icon:Network},{name:"AI investigation",detail:"Analyst reasoning",state:"Ready",icon:BrainCircuit}].map(s=>{const I=s.icon;return <div className="service-row" key={s.name}><div className="service-icon"><I size={16}/></div><div className="service-copy"><strong>{s.name}</strong><small>{s.detail}</small></div><StatusPill value={s.state}/></div>})}</div><div className="panel-footnote"><CheckCircle2 size={14}/> All demo services are reporting normally</div></section>
    </div>
    <div className="lower-grid">
      <section className="panel"><div className="panel-heading"><div><h2>Recent alerts</h2><p>Latest signals requiring analyst attention</p></div><NavLink className="text-link" to="/alerts">View all <ArrowRight size={14}/></NavLink></div><AlertTable compact/></section>
      <section className="panel activity-panel"><div className="panel-heading"><div><h2>Investigation activity</h2><p>Recent analyst and AI actions</p></div><button className="icon-btn" aria-label="More activity options"><MoreHorizontal size={18}/></button></div><div className="activity-feed">{activityFeed.map((a,i)=>{const I=a.icon;return <div className="feed-item" key={i}><div className={`feed-icon feed-${a.tone}`}><I size={15}/></div><div className="feed-content"><p>{a.text}</p><small>{a.detail}</small><span>{a.time}</span></div></div>})}</div></section>
    </div>
  </>;
}
function AlertTable({ compact=false }) {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const [query,setQuery] = useState("");
  const rows = alerts.filter(a=>(filter==="All"||a.severity===filter) && `${a.title} ${a.host} ${a.source}`.toLowerCase().includes(query.toLowerCase())).slice(0,compact?5:alerts.length);
  return <><div className="table-toolbar">{!compact && <label className="table-search"><Search size={15}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search alerts..." /></label>}<div className="filter-tabs">{["All","Critical","High","Medium"].map(f=><button key={f} className={filter===f?"selected":""} onClick={()=>setFilter(f)}>{f}</button>)}</div>{!compact && <Button icon={Filter} onClick={()=>setFilter("All")}>Reset filters</Button>}</div><div className="table-wrap"><table><thead><tr><th>ALERT</th><th>SEVERITY</th><th>SOURCE / HOST</th><th>TIME</th><th>STATUS</th><th></th></tr></thead><tbody>{rows.map(a=><tr key={a.id}><td><div className="table-primary">{a.title}</div><div className="table-secondary">{a.id}</div></td><td><Severity value={a.severity}/></td><td><div className="table-primary">{a.source}</div><div className="table-secondary">{a.host}</div></td><td className="time-cell">{a.time}</td><td><StatusPill value={a.status}/></td><td><button className="row-arrow" title="View alert details" onClick={()=>navigate("/investigations")}><ArrowRight size={16}/></button></td></tr>)}</tbody></table>{rows.length===0&&<div className="empty-state"><Search size={24}/><strong>No matching alerts</strong><span>Try a different search or severity filter.</span></div>}</div></>;
}
function AlertsPage() {
  return <><PageHeading eyebrow="DETECTION & RESPONSE" title="Alerts" description="Review and prioritize security signals from across your environment." actions={<Button icon={Download} onClick={()=>downloadCsv("sentraai-alerts.csv", alerts)}>Export CSV</Button>}/><div className="stats-strip"><div><span>Unassigned</span><strong>08</strong></div><div><span>Under investigation</span><strong>04</strong></div><div><span>Resolved today</span><strong>126</strong></div><div><span>Avg. confidence</span><strong>87.4%</strong></div></div><section className="panel table-panel"><div className="panel-heading"><div><h2>All alerts <span className="heading-count">{alerts.length}</span></h2><p>Mock security telemetry for demonstration</p></div><span className="updated-label"><span className="status-dot"/>Updated just now</span></div><AlertTable/></section></>;
}
function InvestigationsPage() {
  return <><PageHeading eyebrow="AI-ASSISTED ANALYSIS" title="Investigations" description="Turn disconnected signals into evidence-backed security cases." actions={<Button variant="primary" icon={Sparkles} onClick={()=>alert("Demo only: backend workflow is not connected yet.")}>Create investigation</Button>}/><div className="investigation-summary"><div><span className="summary-icon tone-red"><ShieldAlert size={18}/></span><span>High priority</span><strong>02</strong></div><div><span className="summary-icon tone-amber"><Clock3 size={18}/></span><span>In progress</span><strong>04</strong></div><div><span className="summary-icon tone-green"><CheckCircle2 size={18}/></span><span>Resolved this week</span><strong>18</strong></div></div><div className="investigation-grid">{investigations.map(inv=><article className="investigation-card" key={inv.id}><div className="inv-card-top"><span className={`case-icon case-${inv.tone}`}><FileSearch size={18}/></span><span className="case-id">{inv.id}</span><button className="icon-btn" aria-label="More case options"><MoreHorizontal size={18}/></button></div><div className="inv-title-row"><h3>{inv.title}</h3><Severity value={inv.severity}/></div><p className="inv-description">{inv.description}</p><div className="inv-meta"><span><UserRound size={14}/>{inv.owner}</span><span><Clock3 size={14}/>{inv.updated}</span></div><div className="inv-progress-label"><span>Evidence collected</span><strong>{inv.evidence}%</strong></div><div className="progress-track"><div style={{width:`${inv.evidence}%`}}/></div><div className="inv-card-footer"><div className="entity-stack"><span title="Host"><Server size={13}/></span><span title="Network"><Globe2 size={13}/></span><span title="Technique"><Target size={13}/></span><small>{inv.entities} entities</small></div><NavLink to={`/investigations/${inv.id}`} className="open-case">Open dossier <ArrowRight size={15}/></NavLink></div></article>)}</div></>;
}
function InvestigationDetail() {
  const { pathname } = useLocation();
  const id = pathname.split("/").pop();
  const inv = investigations.find(x=>x.id===id) || investigations[0];
  return <><div className="back-row"><NavLink to="/investigations" className="back-link">← All investigations</NavLink><span className="case-id">{inv.id}</span><StatusPill value="In progress"/></div><PageHeading eyebrow="INVESTIGATION DOSSIER" title={inv.title} description={inv.description} actions={<><Button icon={Download} onClick={()=>window.print()}>Export dossier</Button><Button variant="primary" icon={CheckCircle2} onClick={()=>alert("Demo only: case status is not persisted.")}>Mark resolved</Button></>}/><div className="verdict-banner"><div className="verdict-symbol"><BrainCircuit size={24}/></div><div className="verdict-main"><span>AI ASSESSMENT · MOCK RESULT</span><h2>Likely malicious activity</h2><p>Multiple signals are correlated. Review the evidence and validate the conclusion before taking action.</p></div><div className="confidence"><strong>87%</strong><span>Confidence</span></div></div><div className="detail-grid"><div className="detail-main"><section className="panel"><div className="panel-heading"><div><h2><Waypoints size={17}/> Evidence timeline</h2><p>Chronological sequence of correlated events</p></div><span className="heading-count">04 events</span></div><div className="timeline">{[{time:"09:41:08",title:"Suspicious PowerShell execution",desc:"Encoded command launched by an unusual parent process.",tag:"EDR ALERT",tone:"red"},{time:"09:41:15",title:"Outbound connection observed",desc:"Host initiated a connection to an unfamiliar external IP address.",tag:"NETWORK",tone:"amber"},{time:"09:42:02",title:"Indicator enriched",desc:"IP reputation returned a suspicious classification in demo data.",tag:"THREAT INTEL",tone:"cyan"},{time:"09:42:19",title:"ATT&CK technique suggested",desc:"Activity pattern resembles command and scripting interpreter usage.",tag:"MITRE ATT&CK",tone:"purple"}].map((e,i)=><div className="timeline-item" key={e.time}><div className={`timeline-marker marker-${e.tone}`}></div><div className="timeline-time">{e.time}</div><div className="timeline-event"><div className="timeline-title-row"><strong>{e.title}</strong><span className={`evidence-tag tag-${e.tone}`}>{e.tag}</span></div><p>{e.desc}</p></div></div>)}</div></section><section className="panel"><div className="panel-heading"><div><h2><Network size={17}/> Entity relationship map</h2><p>Illustrative links between entities · not live graph data</p></div><span className="graph-legend"><i/> Related entity</span></div><div className="entity-graph"><svg className="graph-lines" viewBox="0 0 600 250" preserveAspectRatio="none" aria-hidden="true"><line x1="110" y1="125" x2="300" y2="70"/><line x1="110" y1="125" x2="300" y2="185"/><line x1="300" y1="70" x2="490" y2="125"/><line x1="300" y1="185" x2="490" y2="125"/></svg><div className="graph-node node-host"><Server size={17}/><strong>WS-042</strong><small>Endpoint</small></div><div className="graph-node node-process"><Cpu size={17}/><strong>powershell.exe</strong><small>Process</small></div><div className="graph-node node-user"><UserRound size={17}/><strong>j.smith</strong><small>User</small></div><div className="graph-node node-ip"><Globe2 size={17}/><strong>185.XX.24.9</strong><small>External IP · redacted</small></div></div></section></div><div className="detail-side"><section className="panel"><div className="panel-heading"><div><h2>Case summary</h2></div><MoreHorizontal size={18}/></div><div className="summary-list"><div><span>Severity</span><Severity value={inv.severity}/></div><div><span>Case status</span><StatusPill value="In progress"/></div><div><span>Assigned to</span><strong>{inv.owner}</strong></div><div><span>Created</span><strong>Oct 27, 2026</strong></div><div><span>Evidence items</span><strong>12 artifacts</strong></div></div></section><section className="panel"><div className="panel-heading"><div><h2><Target size={17}/> ATT&CK mapping</h2><p>Suggested techniques</p></div></div><div className="technique-list"><div className="technique-item"><span className="technique-id">T1059.001</span><strong>PowerShell</strong><small>Execution</small></div><div className="technique-item"><span className="technique-id">T1071</span><strong>Application Layer Protocol</strong><small>Command and Control</small></div></div></section><section className="panel"><div className="panel-heading"><div><h2><Zap size={17}/> Recommended next steps</h2></div></div><ul className="recommendations"><li>Validate the process tree and command-line evidence.</li><li>Confirm whether the outbound destination is expected.</li><li>Review related endpoint activity before containment.</li></ul><div className="notice"><LockKeyhole size={15}/> Recommendations only. No automated remediation is performed.</div></section></div></div></>;
}
function ThreatIntelPage() {
  const [query,setQuery]=useState("");
  const filtered=iocs.filter(i=>`${i.indicator} ${i.type} ${i.context}`.toLowerCase().includes(query.toLowerCase()));
  return <><PageHeading eyebrow="THREAT INTELLIGENCE" title="Threat intelligence" description="Inspect indicators and their contextual enrichment." actions={<Button icon={Download} onClick={()=>downloadCsv("sentraai-indicators.csv", iocs)}>Export indicators</Button>}/><div className="intel-cards"><div className="intel-card"><div className="intel-card-icon tone-red"><AlertTriangle size={18}/></div><span>Malicious indicators</span><strong>23</strong><small>Across current cases</small></div><div className="intel-card"><div className="intel-card-icon tone-amber"><Globe2 size={18}/></div><span>Needs review</span><strong>07</strong><small>Unverified reputation</small></div><div className="intel-card"><div className="intel-card-icon tone-cyan"><Layers3 size={18}/></div><span>Sources correlated</span><strong>04</strong><small>Demo connectors</small></div></div><section className="panel table-panel"><div className="panel-heading"><div><h2>Indicator repository</h2><p>Fictional sample indicators — not real threat findings</p></div><label className="table-search"><Search size={15}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search indicators..."/></label></div><div className="table-wrap"><table><thead><tr><th>INDICATOR</th><th>TYPE</th><th>REPUTATION</th><th>CONFIDENCE</th><th>RELATED CASE</th></tr></thead><tbody>{filtered.map(i=><tr key={i.indicator}><td><code className="indicator-code">{i.indicator}</code><div className="table-secondary">{i.context}</div></td><td>{i.type}</td><td><span className={`reputation rep-${i.reputation.toLowerCase()}`}><span className="severity-dot"/>{i.reputation}</span></td><td><div className="confidence-cell"><div className="progress-track"><div style={{width:`${i.confidence}%`}}/></div><strong>{i.confidence}%</strong></div></td><td><span className="case-id">{i.case}</span></td></tr>)}</tbody></table>{filtered.length===0&&<div className="empty-state">No indicators match your search.</div>}</div></section></>;
}
function AttackMapPage() {
  return <><PageHeading eyebrow="ADVERSARY KNOWLEDGE" title="MITRE ATT&CK" description="Explore techniques suggested by the current mock investigation data." actions={<Button icon={ExternalLink} onClick={()=>window.open("https://attack.mitre.org/","_blank","noopener,noreferrer")}>Official framework</Button>}/><div className="attack-banner"><div className="attack-brand"><Target size={23}/></div><div><strong>ATT&CK technique coverage</strong><p>These are illustrative mappings for the demo, not confirmed detections.</p></div><div className="attack-total"><strong>06</strong><span>Techniques</span></div></div><div className="technique-grid">{techniques.map(t=><article className="technique-card" key={t.id}><div className="technique-card-top"><span className="technique-id">{t.id}</span><span className={`coverage-dot coverage-${t.level.toLowerCase()}`}></span></div><h3>{t.name}</h3><p>{t.tactic}</p><div className="technique-card-bottom"><span className={`coverage-label coverage-text-${t.level.toLowerCase()}`}>{t.level} coverage</span><span>{t.cases} related cases</span></div></article>)}</div></>;
}
function SettingsPage() {
  const [notifications,setNotifications]=useState(true);
  const [weekly,setWeekly]=useState(false);
  return <><PageHeading eyebrow="WORKSPACE PREFERENCES" title="Settings" description="Manage local demo preferences and workspace details."/><div className="settings-grid"><section className="panel settings-panel"><div className="panel-heading"><div><h2>Workspace</h2><p>Basic information for this demo environment</p></div></div><label className="field-label">Workspace name<input defaultValue="Sentra workspace"/></label><label className="field-label">Environment<select defaultValue="demo"><option value="demo">Demo environment</option><option value="staging">Staging</option><option value="production">Production</option></select></label><div className="settings-note"><LockKeyhole size={15}/> Changes here are local UI examples and are not saved to a server.</div><Button variant="primary" onClick={()=>alert("Demo: settings are not persisted.")}>Save preferences</Button></section><section className="panel settings-panel"><div className="panel-heading"><div><h2>Notifications</h2><p>Choose what you want to see in this interface</p></div></div><ToggleRow title="Critical alert notifications" desc="Show a notification for new critical alerts" checked={notifications} onChange={setNotifications}/><ToggleRow title="Weekly security summary" desc="Receive a weekly overview in the demo" checked={weekly} onChange={setWeekly}/><div className="settings-note"><CircleHelp size={15}/> Notification delivery is not connected in this version.</div></section><section className="panel settings-panel"><div className="panel-heading"><div><h2>Data & integrations</h2><p>Connection status for planned services</p></div></div>{[{name:"Wazuh",desc:"SIEM and endpoint telemetry"},{name:"VirusTotal",desc:"Indicator reputation enrichment"},{name:"Neo4j",desc:"Entity relationship graph"},{name:"n8n",desc:"Workflow orchestration"}].map(x=><div className="integration-row" key={x.name}><div className="integration-mark"><Layers3 size={16}/></div><div><strong>{x.name}</strong><small>{x.desc}</small></div><span className="coming-soon">Not connected</span></div>)}<div className="settings-note"><LockKeyhole size={15}/> Never place API secrets in frontend environment variables.</div></section></div></>;
}
function ToggleRow({title,desc,checked,onChange}) {
  return <div className="toggle-row"><div><strong>{title}</strong><small>{desc}</small></div><button className={`toggle ${checked?"toggle-on":""}`} role="switch" aria-checked={checked} onClick={()=>onChange(!checked)}><span/></button></div>;
}
function NotFound() { return <div className="not-found"><Shield size={32}/><h1>Page not found</h1><p>This route isn't part of the demo workspace.</p><NavLink className="btn btn-primary" to="/">Return to overview</NavLink></div>; }

export default function App() {
  return <Layout><Routes>
    <Route path="/" element={<Overview/>}/>
    <Route path="/alerts" element={<AlertsPage/>}/>
    <Route path="/investigations" element={<InvestigationsPage/>}/>
    <Route path="/investigations/:id" element={<InvestigationDetail/>}/>
    <Route path="/threat-intel" element={<ThreatIntelPage/>}/>
    <Route path="/attack-map" element={<AttackMapPage/>}/>
    <Route path="/settings" element={<SettingsPage/>}/>
    <Route path="*" element={<NotFound/>}/>
  </Routes></Layout>;
}