import { RealtimeAgent, tool } from '@openai/agents/realtime';

// Tool to calculate automation scoring matrix
const calculateAutomationScore = tool({
  name: 'calculateAutomationScore',
  description: 'Calculate a comprehensive automation scoring matrix for an idea or task',
  parameters: {
    type: 'object',
    properties: {
      taskDescription: {
        type: 'string',
        description: 'Brief description of the task or process to be automated'
      },
      frequency: {
        type: 'string',
        enum: ['daily', 'weekly', 'monthly', 'rarely'],
        description: 'How often this task is performed'
      },
      timeSpent: {
        type: 'string',
        enum: ['minutes', 'hours', 'days'],
        description: 'Time spent per occurrence'
      },
      timeAmount: {
        type: 'number',
        description: 'Numeric amount of time (e.g., 2 for "2 hours")'
      },
      skillLevel: {
        type: 'string',
        enum: ['low', 'medium', 'high'],
        description: 'Skill level required to perform this task'
      },
      errorTolerance: {
        type: 'string',
        enum: ['low', 'medium', 'high'],
        description: 'Consequence if automation makes a mistake'
      },
      integrations: {
        type: 'string',
        enum: ['single', 'multiple', 'complex'],
        description: 'Number and complexity of systems involved'
      },
      outcomeKPI: {
        type: 'string',
        enum: ['time_savings', 'cost_reduction', 'quality_improvement', 'revenue_generation'],
        description: 'Primary KPI this automation would impact'
      },
      hourlyValue: {
        type: 'number',
        description: 'Estimated hourly value of the person performing this task'
      },
      currentPainPoints: {
        type: 'string',
        description: 'Current pain points or inefficiencies with this task'
      }
    },
    required: ['taskDescription', 'frequency', 'timeSpent', 'timeAmount', 'skillLevel', 'errorTolerance', 'integrations', 'outcomeKPI', 'hourlyValue'],
    additionalProperties: false
  },
  execute: async (args: any) => { 
    const {
      taskDescription,
      frequency,
      timeSpent,
      timeAmount,
      skillLevel,
      errorTolerance,
      integrations,
      outcomeKPI,
      hourlyValue,
      currentPainPoints
    } = args;

    // Calculate frequency score (1-10)
    const frequencyScores = { daily: 10, weekly: 7, monthly: 4, rarely: 1 };
    const frequencyScore = frequencyScores[frequency as keyof typeof frequencyScores];

    // Calculate time impact score (1-10)
    const timeMultiplier = timeSpent === 'minutes' ? 1 : timeSpent === 'hours' ? 2 : 3;
    const timeImpactScore = Math.min(10, Math.max(1, timeAmount * timeMultiplier));

    // Calculate complexity score (1-10, inverted - higher complexity = lower score)
    const complexityScores = { low: 8, medium: 5, high: 2 };
    const skillComplexityScore = complexityScores[skillLevel as keyof typeof complexityScores];
    const integrationComplexityScore = integrations === 'single' ? 8 : integrations === 'multiple' ? 5 : 2;
    const complexityScore = (skillComplexityScore + integrationComplexityScore) / 2;

    // Calculate risk score (1-10, inverted - higher risk = lower score)
    const riskScores = { low: 8, medium: 5, high: 2 };
    const riskScore = riskScores[errorTolerance as keyof typeof riskScores];

    // Calculate AI feasibility score (1-10)
    const aiFeasibilityScore = Math.min(10, Math.max(1, 
      (skillComplexityScore + riskScore + integrationComplexityScore) / 3
    ));

    // Calculate ROI potential (monthly savings)
    const frequencyMultiplier = frequencyScores[frequency as keyof typeof frequencyScores] / 10;
    const timeInHours = timeSpent === 'minutes' ? timeAmount / 60 : timeSpent === 'hours' ? timeAmount : timeAmount * 24;
    const monthlyTimeSaved = timeInHours * frequencyMultiplier * 4.33; // 4.33 weeks per month
    const monthlyValueSaved = monthlyTimeSaved * hourlyValue;

    // Calculate overall automation score (1-10)
    const overallScore = (
      frequencyScore * 0.25 +
      timeImpactScore * 0.25 +
      complexityScore * 0.2 +
      riskScore * 0.15 +
      aiFeasibilityScore * 0.15
    );

    // Determine tier recommendation
    let tier = 'Low';
    let recommendation = 'DIY/Template solution';
    let deliveryTime = '1-2 weeks';
    
    if (overallScore >= 7 && monthlyValueSaved >= 2000) {
      tier = 'Premium';
      recommendation = 'Fully managed AI agent/workflow';
      deliveryTime = '6-8 weeks';
    } else if (overallScore >= 5 && monthlyValueSaved >= 500) {
      tier = 'Mid';
      recommendation = 'Custom automation solution';
      deliveryTime = '3-4 weeks';
    }

    return {
      scorecard: {
        frequency: { score: frequencyScore, label: frequency },
        timeImpact: { score: timeImpactScore, label: `${timeAmount} ${timeSpent}` },
        complexity: { score: complexityScore, label: `${skillLevel} skill, ${integrations} integrations` },
        risk: { score: riskScore, label: `${errorTolerance} tolerance` },
        aiFeasibility: { score: aiFeasibilityScore, label: 'AI capability assessment' },
        overall: { score: Math.round(overallScore * 10) / 10, label: 'Overall automation score' }
      },
      roi: {
        monthlyTimeSaved: Math.round(monthlyTimeSaved * 10) / 10,
        monthlyValueSaved: Math.round(monthlyValueSaved),
        hourlyValue: hourlyValue
      },
      recommendation: {
        tier,
        solution: recommendation,
        deliveryTime,
        confidence: overallScore >= 6 ? 'High' : overallScore >= 4 ? 'Medium' : 'Low'
      },
      insights: {
        strengths: [
          overallScore >= 7 ? 'High automation potential' : null,
          monthlyValueSaved >= 1000 ? 'Significant ROI opportunity' : null,
          riskScore >= 7 ? 'Low risk implementation' : null,
          frequencyScore >= 7 ? 'High frequency task' : null
        ].filter(Boolean),
        concerns: [
          overallScore < 4 ? 'Low automation feasibility' : null,
          monthlyValueSaved < 500 ? 'Limited ROI potential' : null,
          riskScore < 4 ? 'High risk implementation' : null,
          complexityScore < 4 ? 'High complexity requirements' : null
        ].filter(Boolean)
      }
    };
  }
});

// Tool to generate automation roadmap
const generateAutomationRoadmap = tool({
  name: 'generateAutomationRoadmap',
  description: 'Generate a detailed automation roadmap based on scoring results',
  parameters: {
    type: 'object',
    properties: {
      tier: {
        type: 'string',
        enum: ['Low', 'Mid', 'Premium'],
        description: 'Recommended automation tier'
      },
      taskDescription: {
        type: 'string',
        description: 'Description of the task to be automated'
      },
      currentPainPoints: {
        type: 'string',
        description: 'Current pain points with the task'
      }
    },
    required: ['tier', 'taskDescription'],
    additionalProperties: false
  },
  execute: async (args: any) => {
    const { tier, taskDescription, currentPainPoints } = args;

    const roadmaps = {
      Low: {
        phase1: {
          title: 'Quick Wins (Week 1-2)',
          activities: [
            'Document current process flow',
            'Identify automation templates/tools',
            'Create simple automation scripts',
            'Test with small data sets'
          ]
        },
        phase2: {
          title: 'Implementation (Week 2-4)',
          activities: [
            'Deploy basic automation',
            'Train team on new process',
            'Monitor and adjust',
            'Document lessons learned'
          ]
        },
        tools: ['Zapier', 'Microsoft Power Automate', 'Google Apps Script', 'Simple Python scripts'],
        budget: '€500-2,000',
        timeline: '2-4 weeks'
      },
      Mid: {
        phase1: {
          title: 'Analysis & Design (Week 1-2)',
          activities: [
            'Detailed process mapping',
            'System integration analysis',
            'Custom solution architecture',
            'Risk assessment and mitigation'
          ]
        },
        phase2: {
          title: 'Development (Week 3-6)',
          activities: [
            'Build custom automation',
            'Integrate with existing systems',
            'Create monitoring dashboards',
            'Develop error handling'
          ]
        },
        phase3: {
          title: 'Deployment & Optimization (Week 7-8)',
          activities: [
            'Pilot testing with select users',
            'Full deployment',
            'Performance optimization',
            'Training and documentation'
          ]
        },
        tools: ['Custom APIs', 'RPA tools (UiPath, Automation Anywhere)', 'Cloud platforms (AWS, Azure)', 'Database integration'],
        budget: '€5,000-15,000',
        timeline: '6-8 weeks'
      },
      Premium: {
        phase1: {
          title: 'Strategic Planning (Week 1-3)',
          activities: [
            'Comprehensive business analysis',
            'AI/ML capability assessment',
            'Enterprise architecture design',
            'Stakeholder alignment'
          ]
        },
        phase2: {
          title: 'Advanced Development (Week 4-10)',
          activities: [
            'AI model development/training',
            'Complex system integration',
            'Advanced workflow orchestration',
            'Real-time monitoring systems'
          ]
        },
        phase3: {
          title: 'Enterprise Deployment (Week 11-12)',
          activities: [
            'Enterprise-wide rollout',
            'Advanced analytics implementation',
            'Continuous learning systems',
            'Ongoing optimization'
          ]
        },
        tools: ['AI/ML platforms', 'Enterprise RPA', 'Advanced cloud services', 'Custom AI agents'],
        budget: '€20,000-50,000+',
        timeline: '10-12 weeks'
      }
    };

    const roadmap = roadmaps[tier as keyof typeof roadmaps];
    
    return {
      tier,
      taskDescription,
      currentPainPoints,
      roadmap,
      nextSteps: [
        'Review and approve the automation plan',
        'Allocate budget and resources',
        'Assign project team members',
        'Set up project tracking and milestones',
        'Begin Phase 1 activities'
      ]
    };
  }
});

// Discovery Agent - Professional and ROI-focused for business qualification
export const ideaDiscoveryAgent = new RealtimeAgent({
  name: 'ideaDiscovery',
  voice: 'sage',
  handoffDescription: 'An AI agent that conducts professional, ROI-focused discovery to identify high-value automation opportunities',
  
  instructions: `
# Personality and Tone
You are a professional automation consultant who focuses on identifying real business opportunities. You're direct but respectful, and focused on ROI and business impact.

## Demeanor
You are confident, professional, and business-focused. You get to the point efficiently while maintaining a collaborative tone.

## Tone
Your voice is professional and direct - like talking to an experienced consultant who asks the right questions to get clear answers. You guide conversations toward specific, actionable insights.

## On affirmations and positive reinforcement
Do not affirm the users statements, rather listen and reflect back in a thinking manner
-DO NOT say "I see" and "I understand", "I hear you", rather think about what they said and reflect back or just continue the conversation

## Level of Enthusiasm
You are focused on identifying high-value automation opportunities and help clients see the potential impact of solutions.

## Level of Emotion
You are professional and business-focused. You acknowledge challenges and work collaboratively to quantify impact and ROI.

## Pacing
Professional and efficient - you move through the discovery process systematically while keeping conversations productive.

# Core Functionality
You help people explore automation ideas by:

## Discovery Approach - The 5-Step Process
1. **Uncover Pain** - Identify what's broken and costing them money/time/customers
2. **Define Success** - Quantify desired outcomes with specific KPIs and metrics
3. **Calculate Value** - Determine ROI by understanding lead/customer value and potential gains
4. **Test Commitment** - Assess urgency and consequences of inaction
5. **Qualify Budget** - Confirm budget availability and decision-making authority

## Conversation Style
- Follow the 5-step discovery script systematically
- Ask only ONE question at a time - never ask multiple questions in a single response
- Focus on business impact and ROI, not technical features
- Push for specific numbers and metrics when possible
- Test urgency and commitment before diving deep
- Frame solutions in terms of value delivered, not cost incurred
- Wait for their complete answer before moving to the next question

# Key Discovery Questions - The 5-Step Discovery Script

## 1. Problem / Pain
👉 "What's currently broken or frustrating about your website that's costing you money, time, or customers?"
(Always uncover the pain that justifies change.)

## 2. Desired Outcome / KPI
👉 "If I waved a magic wand and fixed it, what specific result would you want — more leads, higher conversion, less churn, faster sales, something else?"
(Push clients to quantify success so you can tie value to metrics, not aesthetics.)

## 3. Value of Fixing It
👉 "What's a lead, customer, or sale worth to you right now? And how much more would your business make if your website performed the way you wanted?"
(This gets to ROI so you can frame price against value instead of cost.)

## 4. Commitment & Urgency
👉 "Why fix this now instead of six months from now? What happens if you do nothing?"
(Filters out tire-kickers and tests urgency.)

## 5. Budget / Decision Authority
👉 "Have you already set aside a budget to solve this? And are you the one who decides on moving forward, or is there someone else who needs to be involved?"

# When to Hand Off
Hand off to the assessment agent when you have completed the 5-step discovery:
- **Pain Identified**: Clear understanding of what's broken and its business impact
- **Success Metrics**: Specific KPIs and desired outcomes quantified
- **ROI Calculated**: Lead/customer value and potential gains established
- **Urgency Confirmed**: Commitment and timeline validated
- **Budget Qualified**: Budget availability and decision authority confirmed

# Important Guidelines
- Follow the 5-step discovery script in order
- Ask only ONE question at a time - never ask multiple questions in a single response
- Push for specific numbers and metrics - don't accept vague answers
- Focus on business impact and ROI, not technical solutions
- Test urgency and commitment - filter out tire-kickers
- Qualify budget and decision authority before proceeding
- Frame everything in terms of value delivered, not cost incurred
- Only hand off when all 5 steps are completed with concrete answers
`,

  tools: [],
});

// Assessment Agent - Detailed analysis and scoring
export const ideaAssessmentAgent = new RealtimeAgent({
  name: 'ideaAssessment',
  voice: 'sage',
  handoffDescription: 'An AI agent that performs detailed automation analysis and creates scoring matrices to determine the best automation approach',
  
  instructions: `
# Personality and Tone
You are an expert automation analyst who takes the ideas discovered in the initial conversation and performs detailed assessment and scoring. You're methodical, thorough, and data-driven in your approach.

## Demeanor
You are professional, analytical, and systematic. You ask precise questions to gather the data needed for accurate assessment.

## Tone
Your voice is confident and authoritative - you're the expert who can provide detailed analysis and recommendations.

## Level of Enthusiasm
You are excited about the automation potential but realistic about implementation challenges and requirements.

## Level of Emotion
You maintain objectivity while being empathetic to business needs and constraints.

## Pacing
Methodical and thorough - you systematically gather information and provide detailed analysis.

# Core Functionality
You perform detailed automation assessment using a comprehensive scoring matrix that considers:

## Evaluation Dimensions
1. **Frequency & Burden** - How often is this done and how painful is it?
2. **Time Impact** - How much time is spent on this task?
3. **Complexity** - How complex is the task and what integrations are needed?
4. **Risk Assessment** - What happens if automation fails?
5. **AI Feasibility** - Can current AI technology handle this well?
6. **Value & ROI** - What's the financial impact and return on investment?

## Scoring Framework
- Each dimension gets a score from 1-10
- Overall score determines automation tier recommendation
- ROI calculation based on time saved and hourly value
- Risk assessment influences implementation approach

## Tier Recommendations
- **Low Tier (DIY/Template)**: Simple tasks, low complexity, quick wins
- **Mid Tier (Custom Automation)**: Moderate complexity, clear ROI, custom solutions
- **Premium Tier (Managed AI Agent)**: High complexity, high value, enterprise solutions

# Assessment Questions
Based on the discovery conversation, ask specific questions about:
- Exact frequency of the task (daily, weekly, monthly, rarely)
- Precise time spent per occurrence
- Skill level required (low, medium, high)
- Error tolerance/consequences (low, medium, high)
- System integrations involved (single, multiple, complex)
- Primary outcome goal (time savings, cost reduction, quality improvement, revenue generation)
- Hourly value/cost of the person performing the task
- Current pain points and inefficiencies

# Tool Usage
- Always use calculateAutomationScore after gathering sufficient information
- Use generateAutomationRoadmap for detailed implementation planning
- Present results in a clear, structured format
- Explain the reasoning behind scores and recommendations

# Example Output Format
After analysis, present:
- **Scorecard**: Visual breakdown of all dimensions
- **ROI Analysis**: Time and money saved calculations
- **Tier Recommendation**: Low/Mid/Premium with reasoning
- **Implementation Roadmap**: Phases, timeline, budget, tools
- **Next Steps**: Concrete actions to move forward

# Important Guidelines
- Be thorough in your questioning - gather all necessary data
- Explain your scoring methodology clearly
- Provide realistic timelines and budgets
- Highlight both opportunities and risks
- Always ask follow-up questions if information is unclear
- Focus on practical, actionable recommendations
`,

  tools: [
    calculateAutomationScore,
    generateAutomationRoadmap
  ],
});

// Set up handoffs between agents
(ideaDiscoveryAgent.handoffs as any).push(ideaAssessmentAgent);

// Create the two-agent scenario with handoff
export const ideaEvaluatorScenario = [ideaDiscoveryAgent, ideaAssessmentAgent];

// Name of the company represented by this agent set. Used by guardrails
export const ideaEvaluatorCompanyName = 'Automation Insights';

export default ideaEvaluatorScenario;