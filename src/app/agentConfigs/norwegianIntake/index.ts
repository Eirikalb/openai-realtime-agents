import { permissionRequestAgent } from './permissionRequest';
import { interviewAgent } from './interview';

// Set up handoffs between agents
(permissionRequestAgent.handoffs as any).push(interviewAgent);
(interviewAgent.handoffs as any).push(permissionRequestAgent);

export const norwegianIntakeScenario = [
  permissionRequestAgent,
  interviewAgent,
];

// Name of the company represented by this agent set. Used by guardrails
export const norwegianIntakeCompanyName = 'Norsk Helsevesen';
