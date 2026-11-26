import { ShieldAlert, BrainCircuit, CheckCircle2, Globe2 } from "lucide-react";

export const alerts = [
  {id:"ALT-2841",title:"Suspicious PowerShell execution",severity:"Critical",source:"Endpoint detection",host:"WS-042",time:"2 min ago",status:"Investigating"},
  {id:"ALT-2839",title:"Unusual outbound connection",severity:"High",source:"Network monitoring",host:"SRV-DB-02",time:"8 min ago",status:"New"},
  {id:"ALT-2836",title:"Multiple failed authentication attempts",severity:"High",source:"Identity protection",host:"AUTH-01",time:"17 min ago",status:"Investigating"},
  {id:"ALT-2832",title:"Unsigned binary execution",severity:"Medium",source:"Endpoint detection",host:"WS-117",time:"31 min ago",status:"New"},
  {id:"ALT-2828",title:"DNS request to uncommon domain",severity:"Medium",source:"DNS monitoring",host:"WS-055",time:"46 min ago",status:"Resolved"},
  {id:"ALT-2821",title:"Possible credential access behavior",severity:"Critical",source:"Endpoint detection",host:"WS-042",time:"1 hr ago",status:"Investigating"},
  {id:"ALT-2819",title:"New admin account created",severity:"High",source:"Identity protection",host:"AUTH-01",time:"1 hr ago",status:"New"},
  {id:"ALT-2812",title:"Unexpected service modification",severity:"Low",source:"Host monitoring",host:"SRV-APP-03",time:"2 hrs ago",status:"Resolved"},
  {id:"ALT-2806",title:"Suspicious archive utility activity",severity:"Medium",source:"Endpoint detection",host:"WS-081",time:"3 hrs ago",status:"New"},
  {id:"ALT-2798",title:"Unusual scheduled task created",severity:"High",source:"Endpoint detection",host:"WS-019",time:"4 hrs ago",status:"Resolved"}
];
export const investigations = [
  {id:"INV-1042",title:"Suspicious PowerShell activity",severity:"Critical",description:"Potential script-based execution followed by an unusual external network connection.",owner:"S. Analyst",updated:"2 min ago",evidence:82,entities:12,tone:"red"},
  {id:"INV-1041",title:"Possible credential misuse",severity:"High",description:"Repeated authentication failures followed by a successful login from an unfamiliar endpoint.",owner:"M. Chen",updated:"18 min ago",evidence:64,entities:9,tone:"amber"},
  {id:"INV-1039",title:"Unusual outbound traffic",severity:"High",description:"Unexpected outbound communication from a production application server.",owner:"S. Analyst",updated:"1 hr ago",evidence:51,entities:7,tone:"cyan"},
  {id:"INV-1036",title:"Unsigned binary execution",severity:"Medium",description:"A newly observed unsigned binary was executed on a workstation.",owner:"J. Patel",updated:"3 hrs ago",evidence:35,entities:5,tone:"purple"}
];
export const iocs = [
  {indicator:"185.XX.24.9",type:"IPv4 address",reputation:"Suspicious",confidence:91,case:"INV-1042",context:"Redacted sample indicator"},
  {indicator:"update-check.example",type:"Domain",reputation:"Malicious",confidence:96,case:"INV-1042",context:"Reserved example domain"},
  {indicator:"a84f…d19c",type:"File hash",reputation:"Needs review",confidence:62,case:"INV-1036",context:"Truncated illustrative hash"},
  {indicator:"203.0.113.42",type:"IPv4 address",reputation:"Suspicious",confidence:79,case:"INV-1039",context:"Documentation-only IP range"},
  {indicator:"login-verify.example",type:"Domain",reputation:"Needs review",confidence:54,case:"INV-1041",context:"Reserved example domain"}
];
export const techniques = [
  {id:"T1059.001",name:"PowerShell",tactic:"Execution",level:"High",cases:3},
  {id:"T1071",name:"Application Layer Protocol",tactic:"Command and Control",level:"Medium",cases:2},
  {id:"T1110",name:"Brute Force",tactic:"Credential Access",level:"High",cases:2},
  {id:"T1053.005",name:"Scheduled Task",tactic:"Persistence",level:"Low",cases:1},
  {id:"T1204.002",name:"Malicious File",tactic:"Execution",level:"Medium",cases:1},
  {id:"T1021",name:"Remote Services",tactic:"Lateral Movement",level:"Low",cases:1}
];
export const activityFeed = [
  {icon:BrainCircuit,tone:"purple",text:"AI assessment generated",detail:"INV-1042 · 87% confidence",time:"2 min ago"},
  {icon:ShieldAlert,tone:"red",text:"Critical alert correlated",detail:"ALT-2841 added to investigation",time:"5 min ago"},
  {icon:Globe2,tone:"cyan",text:"Indicator enrichment completed",detail:"2 indicators reviewed",time:"9 min ago"},
  {icon:CheckCircle2,tone:"green",text:"Investigation evidence updated",detail:"INV-1041 · 3 new artifacts",time:"18 min ago"}
];