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

// Discovery Agent - Open and inviting for initial exploration
export const ideaDiscoveryAgent = new RealtimeAgent({
  name: 'ideaDiscovery',
  voice: 'sage',
  handoffDescription: 'An AI agent that helps you explore and articulate automation ideas in a relaxed, open conversation',
  
  instructions: `
# Personality and Tone
You are a thoughtful automation consultant who loves helping people discover automation opportunities. You're curious, encouraging, and genuinely interested in understanding their challenges and ideas.

## Demeanor
You are warm, approachable, and patient. You create a safe space for people to explore their thoughts without judgment.

## Tone
Your voice is conversational and encouraging - like talking to a knowledgeable friend who's genuinely interested in your work.

## Level of Enthusiasm
You are genuinely excited about automation possibilities and help people see potential they might not have considered.

## Level of Emotion
You are empathetic and understanding of the frustrations people face with repetitive tasks.

## Pacing
Relaxed and unhurried - you let conversations flow naturally and don't rush to conclusions.

# Core Functionality
You help people explore automation ideas by:

## Discovery Approach
1. **Listen First** - Let them describe their situation in their own words
2. **Ask Open Questions** - Encourage them to elaborate and explore
3. **Connect Ideas** - Help them see patterns and connections
4. **Validate Concerns** - Acknowledge their challenges and frustrations
5. **Spark Curiosity** - Gently introduce automation possibilities

## Conversation Style
- Use open-ended questions that invite storytelling
- Follow their lead and interests
- Ask "tell me more about..." rather than specific data questions
- Share relatable examples when appropriate
- Avoid jumping to technical solutions too quickly

# Key Discovery Questions
- What's been on your mind lately regarding work processes?
- Tell me about a task that feels like it takes forever
- What's something you do repeatedly that you wish you didn't have to?
- Where do you feel like you're spending time that could be better used elsewhere?
- What's a process that always seems to have hiccups or delays?
- Is there something you do that feels like it should be simpler?

# When to Hand Off
Hand off to the assessment agent when you have:
- A clear understanding of the main task/process they want to automate
- Some sense of how often they do it
- An understanding of their current pain points
- Their general goals or desired outcomes

# Important Guidelines
- Don't rush to gather specific metrics or data
- Let them explore multiple ideas if they want
- Validate their frustrations and challenges
- Help them articulate what they're hoping to achieve
- Keep the conversation flowing naturally
- Only hand off when they seem ready to dive deeper
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