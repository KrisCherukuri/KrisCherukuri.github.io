window.SITE_DATA = {
  seo: {
    title: 'Data Analytics Portfolio | Payments & Financial Services',
    description:
      'Data analytics portfolio focused on payments and financial services: case studies, measurable outcomes, and proof-first work.',
    canonical: 'https://www.krishnacherukuri.com/'
  },
  hero: {
    headline: 'Driving measurable business outcomes through payment and financial services analytics.',
    subheadline:
      'Product-focused analytics spanning KPI design, experimentation, reporting automation, and decision-ready storytelling.',
    linkedinUrl: 'https://www.linkedin.com/in/krischerukuri/',
    resumeUrl: '/assets/resume.pdf'
  },
  impactTiles: [
    {
      metric: 'XX+', // REPLACE_ME
      label: 'Dashboards shipped',
      note: 'Replace with validated number'
    },
    {
      metric: 'XX%', // REPLACE_ME
      label: 'Reporting cycle reduction',
      note: 'Replace with validated number'
    },
    {
      metric: 'XX hrs/mo', // REPLACE_ME
      label: 'Manual effort saved',
      note: 'Replace with validated number'
    },
    {
      metric: 'XX%', // REPLACE_ME
      label: 'KPI accuracy improvement',
      note: 'Replace with validated number'
    },
    {
      metric: '$ XX', // REPLACE_ME
      label: 'Estimated business impact',
      note: 'Replace with validated number'
    },
    {
      metric: 'XXM+', // REPLACE_ME
      label: 'Transactions analyzed',
      note: 'Replace with validated number'
    }
  ],
  caseStudies: [
    {
      id: 'dashboard-redesign',
      title: 'KPI Dashboard Redesign for Decision Velocity',
      problem:
        'Leaders relied on fragmented weekly reports with inconsistent KPI definitions, delaying decisions.',
      approach:
        'Redefined KPI taxonomy, rebuilt dashboards with role-specific views, and introduced usage instrumentation.',
      result:
        'Higher dashboard adoption and faster decision cycles with a single source of metric truth.',
      metrics: ['XX% increase in dashboard adoption', 'XX% reduction in decision turnaround'], // REPLACE_ME
      tools: ['SQL', 'BI dashboards', 'Metrics design', 'Stakeholder workshops'],
      detail: [
        'Aligned product and business teams on a tiered KPI model: health, growth, and risk indicators.',
        'Added data quality checks for upstream tables before dashboard refreshes.',
        'Introduced weekly review rituals tied directly to dashboard views and documented actions.'
      ]
    },
    {
      id: 'cohort-funnel-analysis',
      title: 'Cohort and Funnel Analysis for Product Recommendations',
      problem:
        'Drop-offs in the payment journey were visible but root causes and high-value interventions were unclear.',
      approach:
        'Built cohort definitions, analyzed funnel stages by segment, and evaluated intervention opportunities.',
      result:
        'Prioritized recommendation backlog around highest-impact bottlenecks and measurable conversion lift.',
      metrics: ['XX% improvement at key funnel step', 'XX bps increase in retained cohorts'], // REPLACE_ME
      tools: ['SQL', 'Experiment design', 'Product analytics', 'Statistical reasoning'],
      detail: [
        'Segmented users by tenure, product mix, and activity intensity to isolate behavior patterns.',
        'Built sensitivity analysis to estimate upside under conservative and aggressive rollout scenarios.',
        'Provided a clear recommendation matrix: implement now, test next, monitor later.'
      ]
    },
    {
      id: 'reporting-automation',
      title: 'Automation of Recurring Reporting and Data Pipeline Checks',
      problem:
        'Manual report preparation consumed analyst capacity and introduced inconsistency across reporting cycles.',
      approach:
        'Automated recurring extracts, validations, and dashboard refresh dependencies with exception alerts.',
      result:
        'Significant time savings, fewer reporting defects, and better reliability for leadership reporting.',
      metrics: ['XX hrs/month saved', 'XX% fewer reporting defects'], // REPLACE_ME
      tools: ['SQL', 'Data modeling', 'Reporting automation', 'Quality checks'],
      detail: [
        'Created standardized data contracts for recurring reports to avoid schema drift.',
        'Implemented lightweight checks for null spikes, outlier shifts, and delayed table refreshes.',
        'Documented runbook and ownership model to reduce single-point dependency risk.'
      ]
    }
  ],
  skills: {
    coreAnalytics: ['SQL', 'Metrics design', 'Experimentation and causal reasoning', 'Product analytics', 'Stakeholder storytelling'],
    biData: ['Power BI', 'Data modeling', 'Reporting automation', 'Data validation workflows'],
    methods: ['Descriptive statistics', 'Inferential statistics', 'Segmentation', 'Forecasting basics']
  },
  experience: [
    {
      role: 'Chief Manager',
      company: 'ICICI Bank',
      period: 'Apr 2025 - Present',
      bullets: [
        'Led KPI redesign across payment service lines, resulting in clearer executive prioritization and faster review cycles (replace with verified %).',
        'Standardized analytics definitions across reporting teams, reducing reconciliation effort (replace with verified hours).',
        'Directed dashboard governance and refresh quality checks, improving trust in weekly business reporting (replace with verified quality metric).',
        'Partnered with product stakeholders on analysis-to-action workflows, increasing implementation rate of insights (replace with verified %).'
      ]
    },
    {
      role: 'Analyst',
      company: 'ICICI Bank',
      period: 'May 2019 - Present',
      bullets: [
        'Automated recurring performance reporting, reducing manual reporting effort (replace with verified hours/month).',
        'Built recurring product and service analytics views that enabled monthly tracking of conversion and retention metrics.',
        'Delivered funnel and cohort analysis to identify leakage points, informing feature and communication priorities.',
        'Improved KPI consistency by documenting metric logic and collaborating with business owners on adoption.'
      ]
    }
  ],
  certifications: [
    { name: 'Data Science for Business', issuer: 'LinkedIn Learning' },
    { name: 'Introduction to SQL', issuer: 'DataCamp' },
    { name: 'SCM Executive', issuer: 'Certification Provider' },
    { name: 'Delivering an Authentic Elevator Pitch', issuer: 'LinkedIn Learning' },
    { name: 'Tips for Working Remotely', issuer: 'LinkedIn Learning' }
  ],
  writing: {
    intro: 'Professional writing focused on analytics execution, decision quality, and communication.',
    posts: [
      {
        slug: 'sql-patterns-i-use-for-kpi-analysis',
        title: 'SQL patterns I use for KPI analysis',
        date: '2026-01-15',
        tags: ['SQL', 'KPI'],
        description: 'A practical set of reusable query patterns for clean, defensible KPI reporting.',
        file: '/content/posts/sql-patterns-i-use-for-kpi-analysis.md'
      },
      {
        slug: 'designing-dashboards-people-actually-use',
        title: 'Designing dashboards people actually use',
        date: '2026-01-10',
        tags: ['BI', 'Adoption'],
        description: 'How to design dashboard structure around decisions, not visuals.',
        file: '/content/posts/designing-dashboards-people-actually-use.md'
      },
      {
        slug: 'experimentation-pitfalls-in-product-analytics',
        title: 'Experimentation pitfalls in product analytics',
        date: '2026-01-05',
        tags: ['Experimentation', 'Product Analytics'],
        description: 'Common failure modes in experiments and how to keep decisions evidence-based.',
        file: '/content/posts/experimentation-pitfalls-in-product-analytics.md'
      },
      {
        slug: 'a-practical-framework-for-choosing-metrics',
        title: 'A practical framework for choosing metrics',
        date: '2025-12-28',
        tags: ['Metrics', 'Strategy'],
        description: 'A decision framework to choose metrics that track true progress.',
        file: '/content/posts/a-practical-framework-for-choosing-metrics.md'
      },
      {
        slug: 'how-i-validate-data-quality-fast',
        title: 'How I validate data quality fast',
        date: '2025-12-20',
        tags: ['Data Quality', 'Workflow'],
        description: 'A lightweight approach to quickly catch data issues before they reach stakeholders.',
        file: '/content/posts/how-i-validate-data-quality-fast.md'
      },
      {
        slug: 'stakeholder-ready-insights-structure-that-works',
        title: 'Stakeholder-ready insights: structure that works',
        date: '2025-12-12',
        tags: ['Communication', 'Insights'],
        description: 'A repeatable structure for turning analysis into business-ready narratives.',
        file: '/content/posts/stakeholder-ready-insights-structure-that-works.md'
      }
    ]
  },
  footer: {
    line: 'Building reliable analytics systems that turn data into product and business decisions.',
    linkedinUrl: 'https://www.linkedin.com/in/krischerukuri/',
    resumeUrl: '/assets/resume.pdf'
  }
};
