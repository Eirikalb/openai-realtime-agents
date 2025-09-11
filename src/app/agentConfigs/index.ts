import { simpleHandoffScenario } from './simpleHandoff';
import { customerServiceRetailScenario } from './customerServiceRetail';
import { chatSupervisorScenario } from './chatSupervisor';
import { norwegianIntakeScenario, unifiedNorwegianIntakeScenario } from './norwegianIntake';

import type { RealtimeAgent } from '@openai/agents/realtime';

// Map of scenario key -> array of RealtimeAgent objects
export const allAgentSets: Record<string, RealtimeAgent[]> = {
  simpleHandoff: simpleHandoffScenario,
  customerServiceRetail: customerServiceRetailScenario,
  chatSupervisor: chatSupervisorScenario,
  norwegianIntake: norwegianIntakeScenario,
  unifiedNorwegianIntake: unifiedNorwegianIntakeScenario,
};

export const defaultAgentSetKey = 'chatSupervisor';
