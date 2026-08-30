import React from "react";
import { Edit2 } from "lucide-react";
import { QuoteState } from "@/lib/pricing";

interface QuoteSummaryProps {
  state: QuoteState;
  onEditStep: (stepIndex: number) => void;
}

export function QuoteSummary({ state, onEditStep }: QuoteSummaryProps) {
  const isEntireClass = state.serviceType === "Take my entire class";

  const renderItem = (label: string, value: string | number | boolean, stepIdx: number) => {
    let displayValue = String(value);
    if (typeof value === "boolean") {
      displayValue = value ? "Yes" : "No";
    }

    return (
      <div className="flex items-center justify-between py-3 border-b border-foreground/5 hover:bg-foreground/[0.01] px-2 transition-colors duration-200">
        <div>
          <span className="block text-[10px] uppercase tracking-wider text-foreground/40 font-medium">
            {label}
          </span>
          <span className="text-sm font-sans font-medium text-foreground">
            {displayValue}
          </span>
        </div>
        <button
          type="button"
          onClick={() => onEditStep(stepIdx)}
          className="text-foreground/30 hover:text-accent p-1.5 transition-colors duration-200"
          aria-label={`Edit ${label}`}
        >
          <Edit2 size={13} />
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="bg-[#fafaf6] dark:bg-[#111111] border border-foreground/10 p-5 rounded-none">
        <h4 className="font-serif text-base font-normal mb-3 border-b border-foreground/10 pb-2">
          Course Specifications
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
          {renderItem("Subject Area", state.subject, 0)}
          {renderItem("Course Name", state.courseName || "Not Specified", 0)}
          {renderItem("Educational Level", state.educationLevel, 1)}
          {renderItem("Self-Paced Class", state.isSelfPaced, 2)}
          {renderItem("Class Duration", `${state.durationWeeks} Weeks`, 3)}
          {renderItem("Has Started", state.hasStarted, 4)}
          {state.hasStarted && renderItem("Current Week", `Week ${state.currentWeek}`, 4)}
          {!state.hasStarted && state.startDate && renderItem("Start Date", state.startDate, 4)}
        </div>
      </div>

      <div className="bg-[#fafaf6] dark:bg-[#111111] border border-foreground/10 p-5 rounded-none">
        <h4 className="font-serif text-base font-normal mb-3 border-b border-foreground/10 pb-2">
          Service & Scope Details
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
          {renderItem("Required Service", state.serviceType, 5)}

          {/* Show details for discussions */}
          {(isEntireClass ? state.discussionsRequired : state.serviceType === "Write my discussion posts") && (
            <>
              {renderItem("Weekly Discussion", state.weeklyDiscussionSubmissionRequired, 6)}
              {state.weeklyDiscussionSubmissionRequired && renderItem("Discussions/Week", state.weeklyDiscussionsCount, 6)}
              {!state.weeklyDiscussionSubmissionRequired && renderItem("Total Discussions", state.totalDiscussionsCount, 6)}
              {renderItem("Discussion Word Count", state.discussionWordCount, 6)}
              {renderItem("Peer Responses/Post", state.peerResponsesCount, 6)}
              {renderItem("Peer Response Word Count", state.peerResponseWordCount, 6)}
            </>
          )}

          {/* Show details for exams */}
          {(isEntireClass ? state.examsRequired : state.serviceType === "Take my exams/tests") && (
            <>
              {state.hasStarted ? renderItem("Exams Remaining", state.examsRemaining, 7) : renderItem("Total Exams", state.examsTotal, 7)}
              {renderItem("Questions per Exam", state.questionsPerExam, 7)}
              {renderItem("Proctored Exams", state.examsProctored, 7)}
              {renderItem("Lockdown Browser Required", state.examsLockdownBrowser, 7)}
            </>
          )}

          {/* Show details for quizzes */}
          {(isEntireClass ? state.quizzesRequired : state.serviceType === "Take my quizzes") && (
            <>
              {state.hasStarted ? renderItem("Quizzes Remaining", state.quizzesRemaining, 8) : renderItem("Total Quizzes", state.quizzesTotal, 8)}
              {renderItem("Questions per Quiz", state.questionsPerQuiz, 8)}
              {renderItem("Proctored Quizzes", state.quizzesProctored, 8)}
              {renderItem("Lockdown Browser Required", state.quizzesLockdownBrowser, 8)}
            </>
          )}

          {/* Show details for writing assignments */}
          {(isEntireClass ? state.essaysRequired : state.serviceType === "Complete my writing assignments") && (
            <>
              {state.hasStarted ? renderItem("Essays Remaining", state.essaysRemaining, 9) : renderItem("Total Essays", state.essaysTotal, 9)}
              {renderItem("Average Essay Words", state.essayWordCount, 9)}
            </>
          )}

          {/* Labs */}
          {(isEntireClass ? state.labsRequired : state.serviceType === "Complete my laboratory exercises/games/simulations") && (
            renderItem("Labs / Simulations", state.labsCount, 10)
          )}

          {/* Homework */}
          {(isEntireClass ? state.homeworkRequired : state.serviceType === "Complete my homework exercises") && (
            renderItem("Homework Assignments", state.homeworkCount, 11)
          )}

          {/* Group work */}
          {isEntireClass && renderItem("Group Activities Required", state.groupWorkRequired, 12)}
        </div>
      </div>

      {(state.negotiationRequested || state.proposedBudget) && (
        <div className="bg-[#fafaf6] dark:bg-[#111111] border border-foreground/10 p-5 rounded-none">
          <h4 className="font-serif text-base font-normal mb-3 border-b border-foreground/10 pb-2">
            Negotiation & Budget
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
            {renderItem("Negotiation Requested", state.negotiationRequested, 13)}
            {state.negotiationRequested && state.proposedBudget && renderItem("Proposed Budget", `$${state.proposedBudget} USD`, 13)}
          </div>
        </div>
      )}
    </div>
  );
}
