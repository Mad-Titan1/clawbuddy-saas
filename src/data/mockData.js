import { subDays, subHours, subMinutes } from 'date-fns';

export const agents = [
  {
    id: 'agent-alpha',
    name: 'Agent Alpha',
    emoji: '🤖',
    type: 'Code Agent',
    role: 'Lead Engineer',
    color: '#10b981',
    status: 'active',
    tasksCompleted: 427,
    accuracy: '99.4%',
    level: 42,
    xp: 840,
    maxXp: 1000,
    skills: ['TypeScript', 'Node.js', 'PostgreSQL', 'System Architecture'],
    activity: 'Optimizing database queries',
    lastSeen: 'just now',
    usage: {
      model: 'GPT-4o',
      inputTokens: 1245000,
      outputTokens: 450000,
      avgCostPerMillion: 5.00
    },
    browsingState: {
      active: true,
      url: 'https://github.com/microsoft/autogen/issues/142',
      title: 'AutoGen: Issue #142 - Protocol implementation for multi-agent sync',
      action: 'Extracting comment thread for task correlation',
      step: 4
    }
  },
  {
    id: 'dispatch-bot',
    name: 'Dispatch Bot',
    emoji: '📋',
    type: 'Coordinator',
    role: 'Operations Director',
    color: '#f59e0b',
    status: 'idle',
    tasksCompleted: 892,
    accuracy: '98.2%',
    level: 56,
    xp: 210,
    maxXp: 1200,
    skills: ['Resource Allocation', 'Priority Management', 'Cross-Agent Sync'],
    activity: 'Assigning new triage tickets',
    lastSeen: '5m ago',
    usage: {
      model: 'Claude 3.5 Sonnet',
      inputTokens: 850000,
      outputTokens: 120000,
      avgCostPerMillion: 3.00
    },
    browsingState: {
      active: false,
      url: '',
      title: '',
      action: '',
      step: 0
    }
  },
  {
    id: 'audit-bot',
    name: 'Audit Bot',
    emoji: '🛡️',
    type: 'Quality Agent',
    role: 'Compliance Officer',
    color: '#06b6d4',
    status: 'active',
    tasksCompleted: 156,
    accuracy: '100%',
    level: 28,
    xp: 750,
    maxXp: 800,
    skills: ['Security Auditing', 'Code Review', 'SLA Monitoring'],
    activity: 'Scanning PR #452 for security vulnerabilities',
    lastSeen: '2m ago',
    usage: {
      model: 'GPT-4o-mini',
      inputTokens: 4200000,
      outputTokens: 980000,
      avgCostPerMillion: 0.15
    },
    browsingState: {
      active: true,
      url: 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-38112',
      title: 'CVE-2024-38112: Windows MSHTML Platform Spoofing Vulnerability',
      action: 'Verifying dependency patch status against CVE database',
      step: 2
    }
  }
];

export const consumptionHistory = [
  { date: '03/28', cost: 12.4 },
  { date: '03/29', cost: 15.8 },
  { date: '03/30', cost: 9.2 },
  { date: '03/31', cost: 22.1 },
  { date: '04/01', cost: 18.5 },
  { date: '04/02', cost: 14.8 },
  { date: '04/03', cost: 11.2 },
];

export const activities = [
  { id: 1, agent: '🤖', action: 'Deployed hotfix for auth module', time: subMinutes(new Date(), 2) },
  { id: 2, agent: '📋', action: 'Reassigned 3 high-priority tasks to Agent Alpha', time: subMinutes(new Date(), 15) },
  { id: 3, agent: '🛡️', action: 'Approved security audit for v2.1.0', time: subHours(new Date(), 1) },
  { id: 4, agent: '🤖', action: 'Refactored state management logic', time: subHours(new Date(), 3) },
  { id: 5, agent: '📋', action: 'Scheduled weekly standup for tomorrow', time: subHours(new Date(), 5) },
  { id: 6, agent: '🛡️', action: 'Detected anomalous login attempt (Blocked)', time: subHours(new Date(), 8) }
];

export const tasks = [
  { id: 't1', title: 'Implement OAuth2 integration', agent: '🤖', priority: 'urgent', column: 'doing', progress: 65 },
  { id: 't2', title: 'Update documentation for API v3', agent: '📋', priority: 'medium', column: 'todo' },
  { id: 't3', title: 'Security audit of payment gateway', agent: '🛡️', priority: 'high', column: 'doing', progress: 20 },
  { id: 't4', title: 'Bug fix: CSS overflow in dashboard', agent: '🤖', priority: 'medium', column: 'done' },
  { id: 't5', title: 'Onboard new marketing team agent', agent: '📋', priority: 'low', column: 'todo' },
  { id: 't6', title: 'Prepare compliance report Q1', agent: '🛡️', priority: 'high', column: 'needs-input' },
  { id: 't7', title: 'Optimize image processing pipeline', agent: '🤖', priority: 'high', column: 'todo' },
  { id: 't8', title: 'Weekly server maintenance', agent: '📋', priority: 'medium', column: 'done' },
  { id: 't9', title: 'Review third-party library licenses', agent: '🛡️', priority: 'medium', column: 'todo' },
  { id: 't10', title: 'Refactor old legacy middleware', agent: '🤖', priority: 'low', column: 'needs-input' }
];

export const logs = [
  { id: 1, agent: 'Agent Alpha', text: 'Optimized PostgreSQL connection pooling. Average latency reduced by 15ms.', category: 'observation' },
  { id: 2, agent: 'Dispatch Bot', text: 'Detected potential resource bottleneck in CPU-3. Redirecting load...', category: 'fyi' },
  { id: 3, agent: 'Audit Bot', text: 'Security scan complete. 0 critical vulnerabilities found in production.', category: 'general' },
  { id: 4, agent: 'Agent Alpha', text: 'Notice: Third-party API rate limit is approaching 80%.', category: 'reminder' },
  { id: 5, agent: 'Dispatch Bot', text: 'Agent Beta onboarding has been paused due to missing credentials.', category: 'fyi' },
  { id: 6, agent: 'Audit Bot', text: 'Reminder: Monthly security policy review due in 3 days.', category: 'reminder' }
];

export const councilSessions = [
  {
    id: 1,
    question: "Should we migrate the frontend to a server-side rendered framework for better SEO?",
    status: "active",
    participants: [
      { name: "Agent Alpha", emoji: "🤖", sent: 3, limit: 5, status: "thinking" },
      { name: "Dispatch Bot", emoji: "📋", sent: 1, limit: 3, status: "idle" },
      { name: "Audit Bot", emoji: "🛡️", sent: 2, limit: 3, status: "watching" }
    ],
    messages: [
      { id: 1, agentName: "Agent Alpha", agentEmoji: "🤖", msgNum: 1, text: "I believe Next.js would significantly improve our Core Web Vitals.", time: "12m ago" },
      { id: 2, agentName: "Audit Bot", agentEmoji: "🛡️", msgNum: 1, text: "What are the security implications of server-side data fetching?", time: "10m ago" },
      { id: 3, agentName: "Agent Alpha", agentEmoji: "🤖", msgNum: 2, text: "As long as we use secure environment variables, the risk is minimal.", time: "5m ago" }
    ]
  },
  {
    id: 2,
    question: "How should we handle the upcoming API versioning?",
    status: "pending",
    participants: [
      { name: "Agent Alpha", emoji: "🤖", sent: 1, limit: 5, status: "idle" },
      { name: "Dispatch Bot", emoji: "📋", sent: 0, limit: 3, status: "idle" }
    ],
    messages: [
      { id: 1, agentName: "Agent Alpha", agentEmoji: "🤖", msgNum: 1, text: "Wait, I proposed we use header-based versioning. Any objections?", time: "45m ago" }
    ]
  }
];

export const meetings = [
  {
    id: 1,
    type: "standup",
    title: "Weekly Standup with Engineering",
    date: subHours(new Date(), 2).toISOString(),
    duration_minutes: 30,
    duration_display: "30m",
    attendees: ["Alice", "Bob", "Charlie", "Dave"],
    summary: "### Summary\nDiscussed sprint progress. Backend API 80% complete. frontend team waiting on mock data.",
    action_items: [
      { task: "Review PR #42", assignee: "Alice", done: false },
      { task: "Update docs", assignee: "Bob", done: true }
    ],
    ai_insights: "Short, productive meeting with clear next steps.",
    sentiment: "positive",
    has_external_participants: false,
    external_domains: []
  },
  {
    id: 2,
    type: "sales",
    title: "Project Alpha: Final Client Review",
    date: subDays(new Date(), 1).toISOString(),
    duration_minutes: 75,
    duration_display: "1h 15m",
    attendees: ["Eve", "Frank", "Grace (Client)"],
    summary: "### Client Review\nPresented the final dashboard. Client requested two small UI changes in the analytics tab.",
    action_items: [
      { task: "Refine analytics charts", assignee: "Frank", done: false },
      { task: "Send invoice for Phase 1", assignee: "Eve", done: true }
    ],
    ai_insights: "Client seems satisfied. Retention risk is low.",
    sentiment: "positive",
    has_external_participants: true,
    external_domains: ["clientcorp.com"]
  },
  {
    id: 3,
    type: "interview",
    title: "Candidate Interview: Senior Dev",
    date: subDays(new Date(), 2).toISOString(),
    duration_minutes: 60,
    duration_display: "1h",
    attendees: ["Alice", "Bob", "Joe (Candidate)"],
    summary: "### Evaluation\nCandidate showed strong technical skills but lacked experience with our specific stack.",
    action_items: [
      { task: "Send follow-up email", assignee: "Alice", done: true }
    ],
    ai_insights: "Candidate is a strong 'maybe'. Second interview recommended.",
    sentiment: "neutral",
    has_external_participants: true,
    external_domains: ["gmail.com"]
  },
  {
    id: 4,
    type: "planning",
    title: "Roadmap Planning 2026 Q2",
    date: subDays(new Date(), 3).toISOString(),
    duration_minutes: 90,
    duration_display: "1h 30m",
    attendees: ["Management Team"],
    summary: "### Roadmap\nDefined key priorities for next quarter: Scalability, Security, and Mobile App.",
    action_items: [
      { task: "Finalize budget allocation", assignee: "Director", done: false }
    ],
    ai_insights: "Ambitious roadmap. Resource plan needs revision.",
    sentiment: "positive",
    has_external_participants: false,
    external_domains: []
  }
];
export const neuralRepositories = [
  {
    id: 'repo-alpha-auth',
    name: 'Secure-Gate-v2',
    agentId: 'agent-alpha',
    emoji: '🔐',
    lastSync: 'just now',
    status: 'deployed',
    vps: 'aws-node-742',
    files: [
      { 
        id: 'f1', name: 'auth_middleware.ts', language: 'typescript', 
        content: `import { Request, Response, NextFunction } from 'express';
import { NeuralToken } from '@clawmatrix/security';

export const protectNode = (req: Request, res: Response, next: NextFunction) => {
  const sentinelId = req.headers['x-sentinel-id'];
  
  if (!sentinelId) {
    return res.status(401).json({ error: 'Sentinel signature missing' });
  }

  const isValid = NeuralToken.verify(sentinelId);
  if (!isValid) {
    return res.status(403).json({ error: 'Neural verification failed' });
  }

  next();
};`
      },
      { 
        id: 'f2', name: 'package.json', language: 'json', 
        content: `{
  "name": "secure-gate-v2",
  "version": "2.1.0",
  "dependencies": {
    "express": "^4.18.2",
    "@clawmatrix/security": "latest"
  }
}`
      }
    ]
  },
  {
    id: 'repo-dispatch-db',
    name: 'Logistics-Core',
    agentId: 'dispatch-bot',
    emoji: '🚚',
    lastSync: '5m ago',
    status: 'optimizing',
    vps: 'digital-node-12',
    files: [
      { 
        id: 'f3', name: 'triage_logic.py', language: 'python', 
        content: `class Dispatcher:
    def __init__(self, node_id):
        self.node_id = node_id
        self.priority_queue = []

    def assign_ticket(self, agent_id, priority):
        """Neural priority allocation logic"""
        if priority > 0.8:
            return f"Fast-tracking ticket to {agent_id}"
        return "Queueing standard request"`
      }
    ]
  }
];
