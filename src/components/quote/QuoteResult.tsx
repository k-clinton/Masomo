import React from "react";
import { QuoteState, calculateQuote } from "@/lib/pricing";
import { Check } from "lucide-react";

interface QuoteResultProps {
  state: QuoteState;
}

export function QuoteResult({ state }: QuoteResultProps) {
  const result = calculateQuote(state);

  // Identify primary price drivers
  const drivers: string[] = [];
  if (state.educationLevel === "Master's Degree") {
    drivers.push("Master's Level academic support standards (x1.5 multiplier)");
  } else if (state.educationLevel === "Doctoral Degree") {
    drivers.push("Doctoral/Ph.D. Level specialization standards (x1.75 multiplier)");
  }

  if (state.serviceType === "Take my entire class") {
    drivers.push("Full-class management including all homework, discussions, quizzes and exams");
  } else {
    drivers.push(`Dedicated singular service assistance: ${state.serviceType}`);
  }

  const examsActive = state.serviceType === "Take my entire class" ? state.examsRequired : state.serviceType === "Take my exams/tests";
  const quizzesActive = state.serviceType === "Take my entire class" ? state.quizzesRequired : state.serviceType === "Take my quizzes";

  // Check for proctored tasks
  if (examsActive && state.examsProctored) {
    drivers.push("Exams require secure remote invigilation / proctoring (+20%)");
  }
  if (quizzesActive && state.quizzesProctored) {
    drivers.push("Quizzes require proctoring assistance (+20%)");
  }

  // Check for Lockdown Browser
  if (examsActive && state.examsLockdownBrowser) {
    drivers.push("Respondus LockDown Browser environment configuration (+20%)");
  }
  if (quizzesActive && state.quizzesLockdownBrowser) {
    drivers.push("Respondus LockDown Browser environment configuration (+10%)");
  }

  // Check word counts
  const discussionActive = state.serviceType === "Take my entire class" ? state.discussionsRequired : state.serviceType === "Write my discussion posts";
  if (discussionActive && (state.discussionWordCount > 300 || state.peerResponseWordCount > 200)) {
    drivers.push("Higher volume word count parameters for discussion responses");
  }

  const essaysActive = state.serviceType === "Take my entire class" ? state.essaysRequired : state.serviceType === "Complete my writing assignments";
  if (essaysActive && state.essayWordCount > 1000) {
    drivers.push(`Long-form academic writing requirements (${state.essayWordCount} words average per essay)`);
  }

  // Weeks remaining
  const weeks = state.isSelfPaced
    ? state.durationWeeks
    : Math.max(1, state.durationWeeks - (state.hasStarted ? state.currentWeek : 0));
  if (weeks <= 4) {
    drivers.push("Accelerated class timeline (completed within 4 weeks or less)");
  } else {
    drivers.push(`Extended support plan spanning ${weeks} weeks`);
  }

  return (
    <div className="space-y-6">
      {/* Estimation Callout */}
      <div className="bg-[transparent] dark:bg-[transparent] border border-[#c5a059]/30 p-8 text-center relative overflow-hidden">
        {/* Subtle decorative background detail */}
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:16px_16px]" />

        <span className="block text-[10px] uppercase tracking-[0.2em] text-[#c5a059] font-medium mb-3">
          Estimated Project Cost
        </span>
        <h2 className="font-serif text-[clamp(28px,4vw,44px)] font-normal text-foreground leading-none mb-3">
          KSh {result.rangeMinKSh.toLocaleString()} – KSh {result.rangeMaxKSh.toLocaleString()}
        </h2>
        <p className="text-xs text-foreground/50 font-sans max-w-md mx-auto leading-relaxed">
          Based on your course specification, this is the projected price range.
          Weekly installments are available at approximately <strong className="text-foreground">KSh {result.weeklyKSh.toLocaleString()}/week</strong>.
        </p>

        {state.negotiationRequested && state.proposedBudget && (
          <div className="mt-4 pt-4 border-t border-foreground/5 text-xs text-[#c5a059] font-medium">
            Negotiation requested Proposed Budget: ${state.proposedBudget} USD
          </div>
        )}
      </div>

      {/* Explanatory breakdown */}
      <div>
        <h4 className="font-serif text-sm font-medium tracking-tight text-foreground mb-4">
          What influenced your estimate:
        </h4>
        <ul className="space-y-3 font-sans" role="list">
          {drivers.map((driver, i) => (
            <li key={i} className="flex items-start gap-3 text-xs text-foreground/60 leading-relaxed">
              <span className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                <Check size={10} />
              </span>
              {driver}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-[transparent] dark:bg-[transparent] p-4 text-[11px] text-foreground/40 leading-relaxed border border-foreground/5">
        <strong>Important Notice:</strong> This cost is a preliminary calculation estimate. The final quote will be confirmed by an academic coordinator after reviewing your course syllabus and specific portal requirements. Payments are structured in weekly installments after your grades are posted. We guarantee an A or B grade.
      </div>
    </div>
  );
}
