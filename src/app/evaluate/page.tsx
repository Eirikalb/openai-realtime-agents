import React, { Suspense } from "react";
import { TranscriptProvider } from "@/app/contexts/TranscriptContext";
import { EventProvider } from "@/app/contexts/EventContext";
import IdeaEvaluatorLanding from "./IdeaEvaluatorLanding";

export default function EvaluatePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TranscriptProvider>
        <EventProvider>
          <IdeaEvaluatorLanding />
        </EventProvider>
      </TranscriptProvider>
    </Suspense>
  );
}
