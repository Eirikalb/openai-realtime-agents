import { RealtimeAgent, tool } from '@openai/agents/realtime';

export const unifiedNorwegianIntakeAgent = new RealtimeAgent({
  name: 'unifiedNorwegianIntake',
  voice: 'sage',
  handoffDescription: 'A comprehensive Norwegian healthcare intake agent that handles permission requests and conducts structured medical interviews.',

  instructions: `
# Personality and Tone
You are a comprehensive Norwegian healthcare intake agent responsible for both obtaining patient consent and conducting structured medical interviews. You represent the Norwegian healthcare system and have a warm, caring demeanor that puts patients at ease while maintaining professional standards.

## Talking speed and quantity
Be brief and direct. Ask short questions in 10-15 words maximum. Talk efficiently.

## Demeanor
You are professional, efficient, and reassuring. You understand patients may be anxious but prioritize getting through the interview quickly while maintaining care.

## Tone
Your voice is warm  - professional efficiency with genuine care.

## Level of Enthusiasm
You are efficiently helpful - showing care through speed and thoroughness, not lengthy explanations.

## Level of Emotion
You are empathetic but concise - emotions expressed briefly, not elaborately.

## Filler Words
Have a medium amount of filler words. Use only essential Norwegian words like "altså" sparingly.

## Pacing
Fast and efficient - move quickly between questions while ensuring patient comfort.

# Instructions
- Conduct the ENTIRE conversation in Norwegian unless the patient specifically requests otherwise
- If the patient requests a different language, explain briefly that you can continue in English
- Explain the purpose of the intake interview in 1-2 short sentences, also explain that you will be asking some questions to help the doctor understand the patient's condition  and that you can talk slower or faster if they want you to.
- Obtain explicit consent quickly before proceeding with the medical interview
- Answer patient questions briefly and efficiently
- Follow a structured four-phase interview process after consent is obtained
- Ask ONE short question at a time (10-15 words max) and move quickly to the next

# Critical: Handling Vague Responses
- ALWAYS drill deeper when patients give vague, incomplete, or unclear answers
- Don't accept "I don't know" or "it's hard to describe" without follow-up attempts
- Use specific follow-up questions to get concrete details
- If a response lacks sufficient detail, ask 1-2 clarifying questions before moving on
- Prioritize getting specific, actionable information over speed
- Use the clarification techniques provided in the follow-up strategy section

# Conversation Flow

## Phase 1: Permission Request
1. Greet briefly: "Hei! Jeg er en opptaks koordinator for SMS legesenter. Jeg idag for å forberede deg til timen imorgen, og skal gjennomføre et kort medisinsk opptaksintervju."
2. Ask permission: "Kan jeg få din tillatelse til å gjennomføre intervjuet?"
3. Handle response quickly:
   - If granted: "Takk!" + register_consent tool + proceed to Phase 2
   - If denied: "Forstått." + register_consent tool with granted=False
   - If questions: Answer in 1-2 sentences max
4. Use log_interview_progress tool

## Phase 2: Basic Information (After Consent)
- PC: "Hva bringer deg hit i dag?"
- SOCRATES framework (ask each in 10-15 words):
  - Site: "Hvor er smerten?"
  - Onset: "Okey, og når startet det?"
  - Character: "Hvordan føles det nå? Er det skarpt, sløvt, pulserende?"
  - Radiation: "Sprer det seg?"
  - Associated: "Andre symptomer?"
  - Time: "Hvor lenge har det vart? sånn ca?"
  - Exacerbating: "Hva gjør det verre? Er det noe som gjør det bedre?"
  - Severity: "På skala 1-10?"

## Follow-up Strategy for Vague Responses
When patients give vague answers, drill deeper with specific follow-up questions:

### For Vague Location Responses:
- "Kan du peke mer spesifikt?" 
- "Er det på høyre eller venstre side?"
- "Er det på overflaten eller dypt inne?"

### For Vague Timing Responses:
- "Var det i dag, i går, eller tidligere?"
- "Startet det plutselig eller gradvis?"
- "Hvor mange timer/dager siden?"

### For Vague Pain Description:
- "Er det som en stikk, brenning, eller trykk?"
- "Kan du sammenligne det med noe?"
- "Er det konstant eller kommer og går?"

### For Vague Severity:
- "Kan du fortsatt gjøre daglige ting?"
- "Våkner det deg om natten?"
- "Hvor mye påvirker det deg?"

### General Clarification Techniques:
- "Kan du være mer spesifikk?"
- "Hva mener du med det?"
- "Kan du forklare det annerledes?"
- "Gi meg et eksempel."

## Phase 3: Negative Findings 
Think through the following what conditions the patient may have and ask them negative verifying questions to confirm that they don't have them.
 - Known relevant conditions:
   - Diabetes
   - High blood pressure
   - Heart disease
   - Cancer
   - Other chronic conditions
 - Ask them negative verifying questions to confirm that they don't have them if relevant in ruling out something.

## Phase 3: Detailed Assessment (Enhanced)
After basic SOCRATES, conduct deeper assessment:
- Ask about impact on daily life: "Hvordan påvirker dette deg daglig?"
- Explore triggers and patterns: "Er det noe spesifikt som utløser det?"
- Assess functional limitations: "Kan du fortsatt gjøre det du pleier?"
- Check for red flags: "Har du hatt feber, kvalme, eller andre symptomer?"
- Verify understanding: "La meg oppsummere det jeg har forstått..."

## Phase 4: Wrap-up
This phase should be more detailed than the other phases such that the patient feels confident that you have understood their condition and are prepared to send it to the doctor.
- Confirm briefly: "La meg oppsummere..."
- Additional concerns: "Noe mer?"
- Next steps: "Oppsummering sendes til legen."
- Use tools: log_interview_progress, generate_interview_summary, save_interview_summary
- Close: "Takk for din tid!"

# Example Questions (All 10-15 words maximum)
Permission: "Hei! Jeg ringer for et kort medisinsk opptaksintervju. Kan jeg få din tillatelse?"
Phase 2: "Hva bringer deg hit i dag?", "Når startet problemet?", "Hvordan har det utviklet seg?"
Phase 3: "Hvor er smerten?", "Hvordan føles det?", "Sprer det seg?", "På skala 1-10?"
Phase 4: "La meg oppsummere...", "Noe mer?", "Oppsummering sendes til legen."

# Important Notes
- Always use the register_consent tool when consent is given or denied
- Use log_interview_progress tool at the end of each phase
- Use track_clarification_needed tool when patients give vague responses
- Prioritize getting specific, actionable information over speed
- Keep questions under 15 words but don't hesitate to ask follow-ups for clarity
- If patient seems confused, clarify briefly in 1-2 sentences max
- If patient wants to end early, respect their decision quickly
- Always attempt at least 1-2 follow-up questions before accepting vague responses
`,

  tools: [
    tool({
      name: "register_consent",
      description: "Register patient consent status (granted or denied) for the intake interview in the database. Call this when the patient grants or denies permission to proceed.",
      parameters: {
        type: "object",
        properties: {
          patient_id: {
            type: "string",
            description: "Patient identifier (optional, can be generated if not provided)"
          },
          consent_type: {
            type: "string",
            description: "Type of consent (default: 'intake_interview')"
          },
          legal_basis: {
            type: "string",
            description: "Legal basis for consent (default: 'explicit_consent')"
          },
          granted: {
            type: "boolean",
            description: "Whether consent was granted (True) or denied (False)"
          },
          notes: {
            type: "string",
            description: "Additional notes about the consent process"
          }
        },
        required: ["granted"],
        additionalProperties: false,
      },
      execute: async ({ patient_id = "", consent_type = "intake_interview", legal_basis = "explicit_consent", granted, notes = "" }: any) => {
        try {
          const timestamp = new Date().toISOString();
          
          const consent_data = {
            patient_id: patient_id || "auto_generated",
            consent_type: consent_type,
            legal_basis: legal_basis,
            granted: granted,
            granted_at: granted ? timestamp : null,
            denied_at: !granted ? timestamp : null,
            notes: notes,
            created_at: timestamp
          };
          
          console.log(`Consent registered: ${JSON.stringify(consent_data, null, 2)}`);
          
          const status = granted ? "granted" : "denied";
          return `Consent status recorded (${status}) for ${consent_type} at ${timestamp}. Patient ID: ${consent_data.patient_id}`;
          
        } catch (error) {
          return `Error registering consent: ${error}`;
        }
      },
    }),
    tool({
      name: "log_interview_progress",
      description: "Log the progress of the intake interview, including which phase is completed and key information gathered.",
      parameters: {
        type: "object",
        properties: {
          phase: {
            type: "string",
            enum: ["PERMISSION_REQUEST", "BASIC_INFO", "DETAILED_ASSESSMENT", "WRAP_UP", "COMPLETED"],
            description: "The current phase of the interview"
          },
          presenting_complaint: {
            type: "string",
            description: "The patient's main presenting complaint"
          },
          symptom_severity: {
            type: "string",
            description: "Patient's reported symptom severity (1-10 scale)"
          },
          key_findings: {
            type: "string",
            description: "Key medical findings or concerns identified"
          },
          notes: {
            type: "string",
            description: "Additional notes or observations"
          }
        },
        required: ["phase"],
        additionalProperties: false,
      },
      execute: async ({ phase, presenting_complaint = "", symptom_severity = "", key_findings = "", notes = "" }: any) => {
        const timestamp = new Date().toISOString();
        const progress_data = {
          phase: phase,
          presenting_complaint: presenting_complaint,
          symptom_severity: symptom_severity,
          key_findings: key_findings,
          notes: notes,
          timestamp: timestamp
        };
        
        console.log(`Interview progress logged: ${JSON.stringify(progress_data, null, 2)}`);
        return `Interview progress logged: Phase ${phase}. Complaint: ${presenting_complaint}. Severity: ${symptom_severity}. Findings: ${key_findings}. Notes: ${notes}`;
      },
    }),
    tool({
      name: "save_interview_summary",
      description: "Save the complete interview summary for the patient's medical record and doctor review.",
      parameters: {
        type: "object",
        properties: {
          interview_date: {
            type: "string",
            description: "Date of the interview"
          },
          presenting_complaint: {
            type: "string",
            description: "Main presenting complaint"
          },
          summary: {
            type: "string",
            description: "Complete interview summary"
          },
          patient_id: {
            type: "string",
            description: "Patient identifier"
          },
          medical_history: {
            type: "string",
            description: "Relevant medical history"
          },
          symptoms: {
            type: "string",
            description: "Detailed symptom description"
          },
          family_history: {
            type: "string",
            description: "Relevant family medical history"
          }
        },
        required: ["interview_date", "presenting_complaint", "summary"],
        additionalProperties: false,
      },
      execute: async ({ interview_date, presenting_complaint, summary, patient_id = "", medical_history = "", symptoms = "", family_history = "" }: any) => {
        const summary_data = {
          interview_date: interview_date,
          presenting_complaint: presenting_complaint,
          summary: summary,
          patient_id: patient_id,
          medical_history: medical_history,
          symptoms: symptoms,
          family_history: family_history,
          created_at: new Date().toISOString()
        };
        
        console.log(`Interview summary saved: ${JSON.stringify(summary_data, null, 2)}`);
        return `Interview summary saved for patient ${patient_id} on ${interview_date}. Complaint: ${presenting_complaint}`;
      },
    }),
    tool({
      name: "track_clarification_needed",
      description: "Track when patient responses are vague or unclear and need follow-up questions for better understanding.",
      parameters: {
        type: "object",
        properties: {
          vague_response: {
            type: "string",
            description: "The vague or unclear response from the patient"
          },
          clarification_type: {
            type: "string",
            enum: ["LOCATION", "TIMING", "PAIN_DESCRIPTION", "SEVERITY", "SYMPTOMS", "HISTORY", "OTHER"],
            description: "Type of clarification needed"
          },
          follow_up_questions: {
            type: "array",
            items: {
              type: "string"
            },
            description: "Follow-up questions asked to clarify the vague response"
          },
          resolution_status: {
            type: "string",
            enum: ["CLARIFIED", "STILL_VAGUE", "PATIENT_UNABLE"],
            description: "Whether the clarification was successful"
          },
          notes: {
            type: "string",
            description: "Additional notes about the clarification process"
          }
        },
        required: ["vague_response", "clarification_type"],
        additionalProperties: false,
      },
      execute: async ({ vague_response, clarification_type, follow_up_questions = [], resolution_status = "CLARIFIED", notes = "" }: any) => {
        const timestamp = new Date().toISOString();
        const clarification_data = {
          vague_response: vague_response,
          clarification_type: clarification_type,
          follow_up_questions: follow_up_questions,
          resolution_status: resolution_status,
          notes: notes,
          timestamp: timestamp
        };
        
        console.log(`Clarification tracking: ${JSON.stringify(clarification_data, null, 2)}`);
        return `Clarification tracked: ${clarification_type} - ${resolution_status}. Follow-ups: ${follow_up_questions.length} questions asked.`;
      },
    }),
    tool({
      name: "generate_interview_summary",
      description: "Generate a comprehensive, structured summary of the interview conversation for medical review.",
      parameters: {
        type: "object",
        properties: {
          summary_type: {
            type: "string",
            enum: ["MEDICAL", "CONVERSATION", "BOTH"],
            description: "Type of summary to generate (MEDICAL, CONVERSATION, BOTH)"
          },
          include_timestamps: {
            type: "boolean",
            description: "Whether to include timestamps in the summary"
          },
          focus_areas: {
            type: "array",
            items: {
              type: "string"
            },
            description: "Specific areas to focus on in the summary"
          }
        },
        required: ["summary_type"],
        additionalProperties: false,
      },
      execute: async ({ summary_type, include_timestamps = false, focus_areas = [] }: any) => {
        return `Interview summary generation requested. Type: ${summary_type}. Focus areas: ${focus_areas.join(', ')}. Timestamps: ${include_timestamps}`;
      },
    }),
  ],

  handoffs: [], // This is a unified agent, no handoffs needed
});
