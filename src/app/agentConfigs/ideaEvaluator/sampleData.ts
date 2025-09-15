// Sample data for testing the Idea Evaluator Agent

export const sampleAutomationIdeas = [
  {
    id: 'email-processing',
    title: 'Email Processing Automation',
    description: 'Automatically categorize and route incoming customer support emails',
    category: 'Customer Service',
    exampleQuestions: [
      'How many emails do you receive daily?',
      'How long does it take to manually categorize each email?',
      'What happens if an email gets misrouted?',
      'Do you use any existing email management tools?'
    ]
  },
  {
    id: 'invoice-processing',
    title: 'Invoice Processing',
    description: 'Extract data from invoices and enter into accounting system',
    category: 'Finance',
    exampleQuestions: [
      'How many invoices do you process monthly?',
      'What information needs to be extracted from each invoice?',
      'What accounting system do you use?',
      'How critical is accuracy for financial data?'
    ]
  },
  {
    id: 'lead-qualification',
    title: 'Lead Qualification',
    description: 'Automatically score and qualify sales leads from website forms',
    category: 'Sales',
    exampleQuestions: [
      'How many leads do you get per week?',
      'What criteria do you use to qualify leads?',
      'How much time does manual qualification take?',
      'What CRM system do you use?'
    ]
  },
  {
    id: 'content-moderation',
    title: 'Content Moderation',
    description: 'Automatically review and moderate user-generated content',
    category: 'Content Management',
    exampleQuestions: [
      'How much content needs moderation daily?',
      'What are your content guidelines?',
      'What happens if inappropriate content gets through?',
      'Do you have existing moderation tools?'
    ]
  },
  {
    id: 'data-entry',
    title: 'Data Entry Automation',
    description: 'Automatically extract and enter data from various documents',
    category: 'Operations',
    exampleQuestions: [
      'What types of documents need data extraction?',
      'How many documents do you process daily?',
      'What systems need the extracted data?',
      'How accurate does the data entry need to be?'
    ]
  }
];

export const sampleScoringResults = {
  highValue: {
    taskDescription: 'Customer support email categorization and routing',
    scorecard: {
      frequency: { score: 9, label: 'daily' },
      timeImpact: { score: 8, label: '2 hours' },
      complexity: { score: 6, label: 'medium skill, multiple integrations' },
      risk: { score: 7, label: 'medium tolerance' },
      aiFeasibility: { score: 8, label: 'AI capability assessment' },
      overall: { score: 7.6, label: 'Overall automation score' }
    },
    roi: {
      monthlyTimeSaved: 34.6,
      monthlyValueSaved: 3460,
      hourlyValue: 100
    },
    recommendation: {
      tier: 'Premium',
      solution: 'Fully managed AI agent/workflow',
      deliveryTime: '6-8 weeks',
      confidence: 'High'
    }
  },
  mediumValue: {
    taskDescription: 'Monthly report generation',
    scorecard: {
      frequency: { score: 4, label: 'monthly' },
      timeImpact: { score: 6, label: '4 hours' },
      complexity: { score: 5, label: 'medium skill, single integrations' },
      risk: { score: 8, label: 'low tolerance' },
      aiFeasibility: { score: 7, label: 'AI capability assessment' },
      overall: { score: 5.8, label: 'Overall automation score' }
    },
    roi: {
      monthlyTimeSaved: 4,
      monthlyValueSaved: 400,
      hourlyValue: 100
    },
    recommendation: {
      tier: 'Mid',
      solution: 'Custom automation solution',
      deliveryTime: '3-4 weeks',
      confidence: 'Medium'
    }
  },
  lowValue: {
    taskDescription: 'Occasional document formatting',
    scorecard: {
      frequency: { score: 2, label: 'rarely' },
      timeImpact: { score: 3, label: '30 minutes' },
      complexity: { score: 7, label: 'low skill, single integrations' },
      risk: { score: 9, label: 'low tolerance' },
      aiFeasibility: { score: 8, label: 'AI capability assessment' },
      overall: { score: 4.2, label: 'Overall automation score' }
    },
    roi: {
      monthlyTimeSaved: 0.5,
      monthlyValueSaved: 50,
      hourlyValue: 100
    },
    recommendation: {
      tier: 'Low',
      solution: 'DIY/Template solution',
      deliveryTime: '1-2 weeks',
      confidence: 'Low'
    }
  }
};

export const sampleConversationFlow = [
  {
    phase: 'Discovery',
    agentMessage: "Hi! I'm your automation evaluation specialist. I help businesses determine if their processes are worth automating and what type of solution would work best. What task or process are you thinking about automating?",
    userResponse: "I spend a lot of time manually categorizing customer support emails"
  },
  {
    phase: 'Assessment',
    agentMessage: "That sounds like a great candidate for automation! Let me ask you some questions to evaluate this properly. First, how many emails do you typically receive per day?",
    userResponse: "Around 50-100 emails daily"
  },
  {
    phase: 'Analysis',
    agentMessage: "Perfect! Now let me calculate your automation scoring matrix...",
    userResponse: "Sure, go ahead"
  },
  {
    phase: 'Recommendation',
    agentMessage: "Based on my analysis, here's your automation scorecard:\n\n**Frequency**: 9/10 (Daily)\n**Time Impact**: 8/10 (2 hours)\n**Complexity**: 6/10 (Medium skill, multiple integrations)\n**Risk**: 7/10 (Medium tolerance)\n**AI Feasibility**: 8/10\n**Overall Score**: 7.6/10\n\n**ROI Analysis**:\n- Monthly time saved: 34.6 hours\n- Monthly value saved: €3,460\n\n**Recommendation**: Premium tier - Fully managed AI agent/workflow\n**Delivery Time**: 6-8 weeks\n**Confidence**: High",
    userResponse: "That's really helpful! What would the implementation look like?"
  },
  {
    phase: 'Roadmap',
    agentMessage: "Let me generate a detailed roadmap for your Premium tier solution...",
    userResponse: "Great, I'd love to see the plan"
  }
];
