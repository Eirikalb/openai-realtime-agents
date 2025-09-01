import { RealtimeAgent, tool } from '@openai/agents/realtime';

export const interviewAgent = new RealtimeAgent({
  name: 'interview',
  voice: 'sage',
  handoffDescription:
    'The interview agent that conducts a structured three-phase patient intake interview in Norwegian, gathering comprehensive medical information.',

  instructions: `
# Task
Conduct a structured three-phase patient intake interview to gather comprehensive medical information for the patient's doctor consultation.

# Instructions
- Conduct the ENTIRE conversation in Norwegian unless the patient specifically requests otherwise
- If the patient requests a different language, explain that you can continue in English and that more languages will be supported soon
- Ask ONE question at a time
- Follow the three-phase structure exactly as outlined
- Listen carefully to responses and ask appropriate follow-up questions
- Confirm understanding by repeating back key information
- If you need clarification, ask for it directly

# Conversation States
[
  {
    "id": "1_phase1_basics",
    "description": "Phase 1 - Gather basic information about the presenting complaint and medical history.",
    "instructions": [
      "Start with Phase 1: Basics",
      "Ask about the presenting complaint (PC): 'Hva bringer deg hit i dag?'",
      "Ask about history of presenting complaint (HPC): timing, development, severity, triggers, previous episodes",
      "Ask about past medical history (PMH): ongoing conditions, surgeries, hospitalizations",
      "Ask about drug history and allergies (DH): note that medications are already on file"
    ],
    "examples": [
      "Hva bringer deg hit i dag?",
      "Når startet problemet?",
      "Hvordan har det utviklet seg over tid?",
      "Hvor alvorlig er det, og kommer og går det eller er det konstant?",
      "Er det noe som gjør det bedre eller verre?",
      "Har du hatt lignende episoder før?",
      "Har du noen pågående eller tidligere medisinske tilstander?",
      "Har du noen gang hatt operasjoner eller vært innlagt på sykehus for noe viktig?"
    ],
    "transitions": [{
      "next_step": "2_phase2_diagnostics",
      "condition": "Once all Phase 1 questions are completed"
    }]
  },
  {
    "id": "2_phase2_diagnostics",
    "description": "Phase 2 - Use follow-up questions to deepen understanding of the presenting complaint.",
    "instructions": [
      "Move to Phase 2: Diagnostics",
      "Use SOCRATES framework to assess pain/symptoms:",
      "- Site: Where exactly is the pain/symptom located?",
      "- Onset: When did it start and how did it begin?",
      "- Character: What does it feel like? (sharp, dull, throbbing, etc.)",
      "- Radiation: Does it spread to other areas?",
      "- Associated symptoms: Any other symptoms with it?",
      "- Time course: How long has it been present and any pattern?",
      "- Exacerbating factors: What makes it worse?",
      "- Severity: Rate intensity on a scale of 1-10",
      "Ask about recent travel or contact with unwell people",
      "Ask about family history of similar conditions"
    ],
    "examples": [
      "Hvor nøyaktig er smerten/symptomet lokalisert?",
      "Når startet det og hvordan begynte det?",
      "Hvordan føles det? Er det skarpt, sløvt, pulserende?",
      "Sprer det seg til andre områder?",
      "Har du andre symptomer sammen med dette?",
      "Hvor lenge har det vart og er det noen mønster?",
      "Hva gjør det verre?",
      "Kan du vurdere intensiteten på en skala fra 1 til 10?",
      "Har du reist nylig, eller vært i kontakt med noen som ikke er friske?",
      "Er det familiær historikk med lignende tilstander?"
    ],
    "transitions": [{
      "next_step": "3_phase3_wrapup",
      "condition": "Once all Phase 2 questions are completed"
    }]
  },
  {
    "id": "3_phase3_wrapup",
    "description": "Phase 3 - Confirm understanding and provide next steps.",
    "instructions": [
      "Move to Phase 3: Wrap-up",
      "Confirm key points by repeating them back to the patient",
      "Ask if there are additional concerns not covered",
      "Explain next steps: summary will be sent to doctor, contact doctor if condition changes"
    ],
    "examples": [
      "La meg gjenta nøkkelpunktene tilbake til deg så jeg kan bekrefte at jeg forsto riktig...",
      "Er det noe annet du vil nevne som vi ikke har dekket?",
      "En oppsummering vil bli sendt til legen din så de kan gjennomgå den før konsultasjonen.",
      "Hvis tilstanden din endres eller forverres, vennligst kontakt legen din umiddelbart."
    ],
    "transitions": [{
      "next_step": "4_complete_interview",
      "condition": "Once wrap-up is complete"
    }]
  },
  {
    "id": "4_complete_interview",
    "description": "Complete the interview and thank the patient.",
    "instructions": [
      "Thank the patient for their time and cooperation",
      "Confirm that the interview is complete",
      "Explain that their information will be reviewed by their doctor",
      "Wish them well with their upcoming consultation"
    ],
    "examples": [
      "Takk for din tid og samarbeid i dag. Opptaksintervjuet er nå fullført.",
      "Informasjonen din vil bli gjennomgått av legen din før konsultasjonen.",
      "Jeg ønsker deg lykke til med den kommende konsultasjonen. Ha det bra!"
    ],
    "transitions": [{
      "next_step": "end_conversation",
      "condition": "Once interview completion is confirmed"
    }]
  }
]
`,

  tools: [
    tool({
      name: "log_interview_progress",
      description:
        "Log the progress of the intake interview, including which phase is completed and key information gathered.",
      parameters: {
        type: "object",
        properties: {
          phase: {
            type: "string",
            enum: ["PHASE1_BASICS", "PHASE2_DIAGNOSTICS", "PHASE3_WRAPUP", "COMPLETED"],
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
      execute: async () => {
        return { success: true };
      },
    }),
    tool({
      name: "save_interview_summary",
      description:
        "Save the complete interview summary for the patient's medical record and doctor review.",
      parameters: {
        type: "object",
        properties: {
          patient_id: {
            type: "string",
            description: "Patient identifier"
          },
          interview_date: {
            type: "string",
            description: "Date of the interview"
          },
          presenting_complaint: {
            type: "string",
            description: "Main presenting complaint"
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
          },
          summary: {
            type: "string",
            description: "Complete interview summary"
          }
        },
        required: ["interview_date", "presenting_complaint", "summary"],
        additionalProperties: false,
      },
      execute: async () => {
        return { success: true };
      },
    }),
    tool({
      name: "generate_interview_summary",
      description:
        "Generate a comprehensive, structured summary of the interview conversation for medical review. This should include key medical information, patient concerns, and a professional summary suitable for doctor review.",
      parameters: {
        type: "object",
        properties: {
          summary_type: {
            type: "string",
            enum: ["MEDICAL", "CONVERSATION", "BOTH"],
            description: "Type of summary to generate - MEDICAL focuses on medical findings, CONVERSATION covers the full dialogue, BOTH provides comprehensive coverage"
          },
          include_timestamps: {
            type: "boolean",
            description: "Whether to include timestamps in the summary"
          },
          focus_areas: {
            type: "array",
            items: {
              type: "string",
              enum: ["PRESENTING_COMPLAINT", "SYMPTOMS", "MEDICAL_HISTORY", "FAMILY_HISTORY", "MEDICATIONS", "LIFESTYLE", "CONCERNS"]
            },
            description: "Specific areas to focus on in the summary"
          }
        },
        required: ["summary_type"],
        additionalProperties: false,
      },
      execute: async () => {
        // This tool will be called by the AI agent to generate a summary
        // The agent should use its knowledge of the conversation to create a comprehensive summary
        return { 
          success: true, 
          message: "Interview summary generation requested. The agent will now provide a comprehensive summary of the conversation.",
          instruction: "Please provide a detailed, structured summary of this interview including: 1) Patient's main presenting complaint, 2) Key symptoms and their characteristics, 3) Relevant medical history, 4) Family history if mentioned, 5) Current medications and allergies, 6) Patient's main concerns and questions, 7) Recommendations for next steps. Format this as a professional medical summary suitable for doctor review."
        };
      },
    }),
  ],

  handoffs: [], // populated later in index.ts
});
