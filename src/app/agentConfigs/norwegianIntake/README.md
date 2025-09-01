# Norwegian Intake Scenario

This scenario implements a Norwegian healthcare patient intake system with two agents working together to conduct a structured medical interview.

## Overview

The Norwegian intake scenario consists of two specialized agents:

1. **Permission Request Agent** (`permissionRequest`) - Initiates the conversation, explains the process, and obtains patient consent
2. **Interview Agent** (`interview`) - Conducts the structured three-phase medical intake interview

## Agent Flow

```
Permission Request Agent → Interview Agent
```

### 1. Permission Request Agent

**Purpose**: Greet the patient, explain the intake process, and obtain informed consent.

**Key Features**:
- Conducts conversation entirely in Norwegian
- Explains the three-phase interview structure
- Obtains explicit patient consent before proceeding
- Handles language preferences gracefully
- Logs consent status for compliance

**Conversation States**:
1. **Greeting** - Warm Norwegian welcome and introduction
2. **Process Explanation** - Detailed explanation of the intake interview
3. **Permission Request** - Explicit consent request
4. **Response Handling** - Route to interview or handle concerns

### 2. Interview Agent

**Purpose**: Conduct a comprehensive, structured three-phase medical intake interview.

**Key Features**:
- Follows the exact three-phase structure from the provided prompt
- Conducts conversation entirely in Norwegian
- Asks one question at a time for clarity
- Logs interview progress and findings
- Saves complete interview summary for medical records

**Three Phases**:

#### Phase 1: Basics
- **Presenting Complaint (PC)**: "Hva bringer deg hit i dag?"
- **History of Presenting Complaint (HPC)**: Timing, development, severity, triggers, previous episodes
- **Past Medical History (PMH)**: Ongoing conditions, surgeries, hospitalizations
- **Drug History & Allergies (DH)**: Note that medications are already on file

#### Phase 2: Diagnostics
- Symptom intensity on 1-10 scale
- Associated symptoms
- Recent travel or contact with unwell people
- Family history of similar conditions

#### Phase 3: Wrap-up
- Confirm understanding by repeating key points
- Ask for additional concerns
- Explain next steps (summary sent to doctor)
- Provide emergency contact instructions

## Language Support

- **Primary Language**: Norwegian (Bokmål)
- **Fallback**: English (with explanation that more languages will be supported soon)
- **Medical Terminology**: Appropriate Norwegian healthcare terminology
- **Natural Speech**: Includes Norwegian filler words for authenticity

## Tools

### Permission Request Agent Tools
- `log_permission_granted` - Logs patient consent status and timestamp

### Interview Agent Tools
- `log_interview_progress` - Tracks interview phases and key findings
- `save_interview_summary` - Saves complete interview for medical records

## Usage

To use this scenario in your application:

1. Import the scenario:
```typescript
import { norwegianIntakeScenario } from './agentConfigs/norwegianIntake';
```

2. Add it to your agent sets:
```typescript
export const allAgentSets = {
  // ... other scenarios
  norwegianIntake: norwegianIntakeScenario,
};
```

3. Set it as the default scenario (optional):
```typescript
export const defaultAgentSetKey = 'norwegianIntake';
```

## Customization

The scenario can be customized by:

- Modifying the conversation states in each agent's instructions
- Adjusting the medical terminology or question structure
- Adding additional tools for specific healthcare systems
- Modifying the voice settings (currently set to 'sage')

## Compliance Notes

- Patient consent is explicitly obtained and logged
- All medical information is treated as confidential
- Interview structure follows established medical intake protocols
- Language preferences are respected and documented

## Example Conversation Flow

1. **Permission Request Agent**: "God dag! Jeg heter [navn] og jeg er koordinator for pasientopptak her..."
2. **Process Explanation**: Explains the three-phase interview structure
3. **Consent Request**: "Kan jeg få din tillatelse til å starte opptaksintervjuet?"
4. **Handoff**: Transfers to Interview Agent
5. **Interview Agent**: Conducts structured three-phase interview in Norwegian
6. **Completion**: Provides summary and next steps

This scenario provides a comprehensive, culturally appropriate, and medically sound approach to patient intake in the Norwegian healthcare system.
