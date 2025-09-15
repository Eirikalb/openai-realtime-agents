# Idea Evaluator Agent

An AI agent that evaluates automation opportunities and creates comprehensive scoring matrices to determine the best automation approach for any business process or idea.

## Overview

The Idea Evaluator Agent helps businesses and individuals assess whether their processes are worth automating and what tier of solution would be most appropriate. It uses a data-driven approach to evaluate automation opportunities across multiple dimensions.

## Key Features

### Comprehensive Scoring Matrix
- **Frequency & Burden**: How often is this done and how painful is it?
- **Time Impact**: How much time is spent on this task?
- **Complexity**: How complex is the task and what integrations are needed?
- **Risk Assessment**: What happens if automation fails?
- **AI Feasibility**: Can current AI technology handle this well?
- **Value & ROI**: What's the financial impact and return on investment?

### Tier Recommendations
- **Low Tier (DIY/Template)**: Simple tasks, low complexity, quick wins
- **Mid Tier (Custom Automation)**: Moderate complexity, clear ROI, custom solutions  
- **Premium Tier (Managed AI Agent)**: High complexity, high value, enterprise solutions

### Detailed Implementation Roadmaps
- Phase-by-phase implementation plans
- Timeline estimates
- Budget ranges
- Tool recommendations
- Risk mitigation strategies

## Tools

### `calculateAutomationScore`
Calculates a comprehensive automation scoring matrix based on:
- Task description and frequency
- Time spent and skill level required
- Error tolerance and integration complexity
- Outcome KPIs and hourly value
- Current pain points

**Returns:**
- Detailed scorecard with all dimensions
- ROI analysis (time and money saved)
- Tier recommendation with confidence level
- Strengths and concerns analysis

### `generateAutomationRoadmap`
Generates detailed implementation roadmaps based on tier recommendations:
- Phase-by-phase activities
- Timeline and budget estimates
- Tool and technology recommendations
- Next steps for implementation

## Usage Examples

### High-Value Automation (Premium Tier)
```
Task: Customer support email categorization
Frequency: Daily
Time: 2 hours per day
Skill Level: Medium
Risk Tolerance: Medium
Result: 7.6/10 score, €3,460/month savings, 6-8 week implementation
```

### Medium-Value Automation (Mid Tier)
```
Task: Monthly report generation
Frequency: Monthly
Time: 4 hours per month
Skill Level: Medium
Risk Tolerance: Low
Result: 5.8/10 score, €400/month savings, 3-4 week implementation
```

### Low-Value Automation (Low Tier)
```
Task: Occasional document formatting
Frequency: Rarely
Time: 30 minutes per occurrence
Skill Level: Low
Risk Tolerance: Low
Result: 4.2/10 score, €50/month savings, 1-2 week implementation
```

## Conversation Flow

1. **Discovery Phase**: Understand the task/process they want to automate
2. **Assessment Phase**: Ask detailed questions about each evaluation dimension
3. **Analysis Phase**: Generate scoring matrix and calculations
4. **Recommendation Phase**: Present results and tier recommendation
5. **Roadmap Phase**: Provide detailed implementation plan

## Key Questions Asked

- What specific task or process are you looking to automate?
- How often do you or your team perform this task?
- How much time does it typically take?
- What skill level is required to do this task well?
- What would happen if an automated system made a mistake?
- How many different systems or tools are involved?
- What's the main benefit you're hoping to achieve?
- What's your approximate hourly value or cost?
- What are the current pain points with this process?

## Sample Data

See `sampleData.ts` for:
- Example automation ideas across different categories
- Sample scoring results for different tiers
- Example conversation flows

## Integration

The agent is integrated into the main application via `src/app/agentConfigs/index.ts` and can be accessed by selecting the "ideaEvaluator" scenario in the application interface.
