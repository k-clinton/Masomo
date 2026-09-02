"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QuoteState } from "@/lib/pricing";
import { QuoteProgress } from "./QuoteProgress";
import { QuoteStep } from "./QuoteStep";
import { QuoteOption } from "./QuoteOption";
import { QuoteSummary } from "./QuoteSummary";
import { QuoteResult } from "./QuoteResult";
import { QuoteForm } from "./QuoteForm";
import { Button } from "@/components/ui/Button";
import { RotateCcw, Upload, FileText, X } from "lucide-react";

const INITIAL_STATE: QuoteState = {
  subject: "Computer Sciences",
  educationLevel: "Bachelor's Degree",
  isSelfPaced: false,
  durationWeeks: 8,
  hasStarted: false,
  currentWeek: 0,
  startDate: "",
  serviceType: "Take my entire class",
  courseName: "",

  discussionsRequired: true,
  weeklyDiscussionsCount: 1,
  discussionWordCount: 250,
  peerResponsesCount: 2,
  peerResponseWordCount: 150,
  weeklyDiscussionSubmissionRequired: true,
  totalDiscussionsCount: 8,

  examsRequired: true,
  examsRemaining: 2,
  examsTotal: 2,
  questionsPerExam: 30,
  examsProctored: false,
  examsLockdownBrowser: false,

  quizzesRequired: true,
  quizzesRemaining: 8,
  quizzesTotal: 8,
  questionsPerQuiz: 15,
  quizzesProctored: false,
  quizzesLockdownBrowser: false,

  essaysRequired: true,
  essaysRemaining: 4,
  essaysTotal: 4,
  essayWordCount: 750,

  groupWorkRequired: false,

  labsRequired: false,
  labsCount: 0,

  homeworkRequired: true,
  homeworkCount: 8,

  negotiationRequested: false,
  proposedBudget: undefined,
};

const SUBJECT_OPTIONS = [
  "Biological and Biomedical Sciences",
  "Computer Sciences",
  "Engineering",
  "Physical Sciences",
  "Medical and Health",
  "Liberal Arts and Humanities",
  "Education",
  "Legal",
  "Architecture",
  "Agriculture",
  "Transportation and Distribution",
  "Visual and Performing Arts",
  "Mechanic Repair and Technologies",
  "Other",
];

const LEVEL_OPTIONS = [
  "Associate Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctoral Degree",
  "Other",
];

const SERVICE_OPTIONS = [
  { title: "Take my entire class", desc: "Includes discussions, writing, labs, quizzes, and exams" },
  { title: "Complete my writing assignments", desc: "Essays, reports, research proposals, and case studies" },
  { title: "Write my discussion posts", desc: "Main forum contributions and peer replies" },
  { title: "Take my exams/tests", desc: "Proctored or unproctored midterms and final exams" },
  { title: "Take my quizzes", desc: "Weekly portal quizzes and quick check-ins" },
  { title: "Complete my laboratory exercises/games/simulations", desc: "Interactive experiments and lab reports" },
  { title: "Complete my homework exercises", desc: "Chapter problems, worksheets, and online platform assignments" },
];

export function QuoteFlow() {
  const [state, setState] = useState<QuoteState>(INITIAL_STATE);
  const [stepIdx, setStepIdx] = useState(0);
  const [validationError, setValidationError] = useState("");
  const [mockFileName, setMockFileName] = useState("");

  const updateState = (fields: Partial<QuoteState>) => {
    setState((prev) => ({ ...prev, ...fields }));
    setValidationError("");
  };

  type Step = {
    id: string;
    title: string;
    description: string;
    check: (s: QuoteState) => boolean;
    validate: () => string;
  };

  const steps: Step[] = [
    {
      id: "subject",
      title: "Course Subject & Name",
      description: "Select the academic area and specify the name of the course.",
      check: (_s: QuoteState) => true,
      validate: () => {
        if (!state.subject) return "Please select a subject area.";
        if (!state.courseName.trim()) return "Please enter the name of the course.";
        return "";
      },
    },
    {
      id: "level",
      title: "Educational Level",
      description: "Select the level of study for your course.",
      check: (_s: QuoteState) => true,
      validate: () => (state.educationLevel ? "" : "Please select an educational level."),
    },
    {
      id: "self-paced",
      title: "Self Paced Class",
      description: "Does your class allow you to complete assignments at your own pace?",
      check: (_s: QuoteState) => true,
      validate: () => "",
    },
    {
      id: "duration",
      title: "Course Duration",
      description: "What is the total duration of the class in weeks?",
      check: (_s: QuoteState) => true,
      validate: () => {
        if (state.durationWeeks <= 0) return "Duration must be at least 1 week.";
        return "";
      },
    },
    {
      id: "started",
      title: "Course Status & Schedule",
      description: "Let us know if your class has already started.",
      check: (_s: QuoteState) => true,
      validate: () => {
        if (state.hasStarted) {
          if (state.currentWeek < 0 || state.currentWeek > state.durationWeeks) {
            return `Current week must be between 0 and ${state.durationWeeks}.`;
          }
        } else {
          if (!state.startDate) return "Please select a projected start date.";
        }
        return "";
      },
    },
    {
      id: "service",
      title: "Required Service",
      description: "What type of academic help do you need?",
      check: (_s: QuoteState) => true,
      validate: () => (state.serviceType ? "" : "Please select a service type."),
    },
    {
      id: "discussions",
      title: "Discussions & Forums",
      description: "Provide details about the discussion posts and peer replies required.",
      check: (_s: QuoteState) =>
        state.serviceType === "Take my entire class" ||
        state.serviceType === "Write my discussion posts",
      validate: () => {
        if (state.discussionWordCount < 50) return "Word count must be at least 50 words.";
        if (state.weeklyDiscussionSubmissionRequired) {
          if (state.weeklyDiscussionsCount <= 0) return "Weekly discussion count must be at least 1.";
        } else {
          if (state.totalDiscussionsCount <= 0) return "Total discussions count must be at least 1.";
        }
        return "";
      },
    },
    {
      id: "exams",
      title: "Exams & Tests",
      description: "Provide details about exams required in the course.",
      check: (_s: QuoteState) =>
        state.serviceType === "Take my entire class" ||
        state.serviceType === "Take my exams/tests",
      validate: () => {
        if (state.hasStarted) {
          if (state.examsRemaining < 0) return "Exams remaining cannot be negative.";
        } else {
          if (state.examsTotal <= 0) return "Total exams must be at least 1.";
        }
        if (state.questionsPerExam <= 0) return "Questions per exam must be at least 1.";
        return "";
      },
    },
    {
      id: "quizzes",
      title: "Quizzes & Evaluations",
      description: "Provide details about quizzes required in the course.",
      check: (_s: QuoteState) =>
        state.serviceType === "Take my entire class" ||
        state.serviceType === "Take my quizzes",
      validate: () => {
        if (state.hasStarted) {
          if (state.quizzesRemaining < 0) return "Quizzes remaining cannot be negative.";
        } else {
          if (state.quizzesTotal <= 0) return "Total quizzes must be at least 1.";
        }
        if (state.questionsPerQuiz <= 0) return "Questions per quiz must be at least 1.";
        return "";
      },
    },
    {
      id: "essays",
      title: "Writing & Essay Assignments",
      description: "Provide details about the written projects or essay requirements.",
      check: (_s: QuoteState) =>
        state.serviceType === "Take my entire class" ||
        state.serviceType === "Complete my writing assignments",
      validate: () => {
        if (state.hasStarted) {
          if (state.essaysRemaining < 0) return "Essays remaining cannot be negative.";
        } else {
          if (state.essaysTotal <= 0) return "Total essays must be at least 1.";
        }
        if (state.essayWordCount <= 0) return "Average essay word count must be at least 1.";
        return "";
      },
    },
    {
      id: "labs",
      title: "Labs & Simulations",
      description: "How many lab or simulation assignments do you need help with?",
      check: (_s: QuoteState) =>
        state.serviceType === "Take my entire class" ||
        state.serviceType === "Complete my laboratory exercises/games/simulations",
      validate: () => {
        if (state.labsCount < 0) return "Labs count cannot be negative.";
        return "";
      },
    },
    {
      id: "homework",
      title: "Homework Assignments",
      description: "How many weekly or platform homework assignments are required?",
      check: (_s: QuoteState) =>
        state.serviceType === "Take my entire class" ||
        state.serviceType === "Complete my homework exercises",
      validate: () => {
        if (state.homeworkCount < 0) return "Homework count cannot be negative.";
        return "";
      },
    },
    {
      id: "group-work",
      title: "Group Work Collaboration",
      description: "Does your class include group projects or joint assignments?",
      check: (_s: QuoteState) => state.serviceType === "Take my entire class",
      validate: () => "",
    },
    {
      id: "syllabus",
      title: "Course Syllabus & Notes",
      description: "Upload your syllabus and enter any additional notes.",
      check: (_s: QuoteState) => true,
      validate: () => "",
    },
    {
      id: "negotiation",
      title: "Budget & Pricing Option",
      description: "Do you have a specific budget you would like to request negotiation for?",
      check: (_s: QuoteState) => true,
      validate: () => {
        if (state.negotiationRequested && (!state.proposedBudget || state.proposedBudget <= 0)) {
          return "Please enter a valid budget in USD.";
        }
        return "";
      },
    },
    {
      id: "summary",
      title: "Estimated Quote & Summary",
      description: "Review your options and cost estimate below.",
      check: (_s: QuoteState) => true,
      validate: () => "",
    },
    {
      id: "contact",
      title: "Submit Quote Request",
      description: "Provide your details to register this quote request.",
      check: (_s: QuoteState) => true,
      validate: () => "",
    },
  ];

  // Active steps count based on condition filters
  const visibleSteps = steps.filter((s) => s.check(state));
  const activeStepIdx = visibleSteps.findIndex((s) => s.id === steps[stepIdx].id);

  const handleNext = () => {
    const error = steps[stepIdx].validate();
    if (error) {
      setValidationError(error);
      return;
    }

    setValidationError("");
    let nextIdx = stepIdx + 1;
    while (nextIdx < steps.length && !steps[nextIdx].check(state)) {
      nextIdx++;
    }
    if (nextIdx < steps.length) {
      setStepIdx(nextIdx);
    }
  };

  const handleBack = () => {
    setValidationError("");
    let prevIdx = stepIdx - 1;
    while (prevIdx >= 0 && !steps[prevIdx].check(state)) {
      prevIdx--;
    }
    if (prevIdx >= 0) {
      setStepIdx(prevIdx);
    }
  };

  const handleEditStep = (targetStepIdx: number) => {
    setValidationError("");
    setStepIdx(targetStepIdx);
  };

  const handleRestart = () => {
    setState(INITIAL_STATE);
    setStepIdx(0);
    setValidationError("");
    setMockFileName("");
  };

  const handleMockFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMockFileName(e.target.files[0].name);
    }
  };

  const currentStep = steps[stepIdx];

  const inputClass =
    "w-full bg-transparent border-b border-foreground/10 focus:border-accent outline-none py-3 text-sm text-foreground placeholder:text-foreground/30 transition-colors duration-300 font-sans";

  return (
    <div className="max-w-[800px] mx-auto bg-transparent p-6 md:p-12 border border-foreground/5 min-h-[500px] flex flex-col justify-between">
      {/* Progress Bar (hide on success state) */}
      {stepIdx < steps.length && (
        <QuoteProgress
          currentStep={activeStepIdx + 1}
          totalSteps={visibleSteps.length}
        />
      )}

      {/* Restart trigger */}
      {stepIdx > 0 && stepIdx < steps.length - 1 && (
        <div className="flex justify-end mb-4">
          <Button
            type="button"
            variant="ghost"
            onClick={handleRestart}
            className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-foreground/40 hover:text-accent font-medium h-auto p-0 bg-transparent shadow-none"
          >
            <RotateCcw size={10} />
            Restart Quote
          </Button>
        </div>
      )}

      {/* Main wizard step views */}
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <QuoteStep
              title={currentStep.title}
              description={currentStep.description}
              onNext={handleNext}
              onBack={stepIdx > 0 && stepIdx < steps.length - 1 ? handleBack : undefined}
              canNext={!currentStep.validate()}
              nextLabel={
                stepIdx === steps.length - 2
                  ? "Continue to Request"
                  : stepIdx === steps.length - 1
                  ? "Submit"
                  : "Next"
              }
              errorMessage={validationError}
            >
              {/* Render dynamic inputs depending on current step ID */}

              {currentStep.id === "subject" && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="course-name" className="text-[10px] uppercase tracking-wider text-foreground/40 font-medium block mb-2">
                      Course Name *
                    </label>
                    <input
                      id="course-name"
                      type="text"
                      value={state.courseName}
                      onChange={(e) => updateState({ courseName: e.target.value })}
                      placeholder="E.g., Business Law, Intro to Psychology, Calculus II"
                      className={inputClass}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="subject-select" className="text-[10px] uppercase tracking-wider text-foreground/40 font-medium block mb-2">
                      Subject Area *
                    </label>
                    <select
                      id="subject-select"
                      value={state.subject}
                      onChange={(e) => updateState({ subject: e.target.value })}
                      className={`${inputClass} cursor-pointer`}
                    >
                      {SUBJECT_OPTIONS.map((sub) => (
                        <option key={sub} value={sub} className="bg-background text-foreground font-sans">
                          {sub}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {currentStep.id === "level" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {LEVEL_OPTIONS.map((opt) => (
                    <QuoteOption
                      key={opt}
                      selected={state.educationLevel === opt}
                      onClick={() => updateState({ educationLevel: opt })}
                      title={opt}
                      description={`Pricing scale for ${opt} programs.`}
                    />
                  ))}
                </div>
              )}

              {currentStep.id === "self-paced" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <QuoteOption
                    selected={state.isSelfPaced === true}
                    onClick={() => updateState({ isSelfPaced: true })}
                    title="Yes, it is self-paced"
                    description="You can complete assignments at your own speed with no weekly deadlines (e.g. StraighterLine, Capella)."
                  />
                  <QuoteOption
                    selected={state.isSelfPaced === false}
                    onClick={() => updateState({ isSelfPaced: false })}
                    title="No, it has set weekly deadlines"
                    description="Standard syllabus structure with scheduled assignments, quizzes, and tests."
                  />
                </div>
              )}

              {currentStep.id === "duration" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-baseline mb-2">
                    <label htmlFor="duration-slider" className="text-[10px] uppercase tracking-wider text-foreground/40 font-medium block">
                      Weeks
                    </label>
                    <span className="text-xl font-serif text-accent font-medium">
                      {state.durationWeeks} Weeks
                    </span>
                  </div>
                  <input
                    id="duration-slider"
                    type="range"
                    min="1"
                    max="20"
                    step="1"
                    value={state.durationWeeks}
                    onChange={(e) => updateState({ durationWeeks: parseInt(e.target.value) })}
                    className="w-full accent-accent bg-foreground/10 cursor-pointer h-1.5"
                  />
                  <p className="text-[11px] text-foreground/40 leading-relaxed font-sans">
                    Adjust the slider to match the total weeks of the class. Typical classes range from 6 to 12 weeks.
                  </p>
                </div>
              )}

              {currentStep.id === "started" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <QuoteOption
                      selected={state.hasStarted === true}
                      onClick={() => updateState({ hasStarted: true })}
                      title="Yes, the class has started"
                      description="We can step in and take over starting from the current week."
                    />
                    <QuoteOption
                      selected={state.hasStarted === false}
                      onClick={() => updateState({ hasStarted: false })}
                      title="No, it has not started yet"
                      description="We can arrange setup to begin the class from Day 1."
                    />
                  </div>

                  {state.hasStarted ? (
                    <div className="pt-4 border-t border-foreground/5">
                      <div className="flex justify-between items-baseline mb-2">
                        <label htmlFor="current-week-input" className="text-[10px] uppercase tracking-wider text-foreground/40 font-medium block">
                          Current Week of Course
                        </label>
                        <span className="text-xl font-serif text-accent font-medium">
                          Week {state.currentWeek}
                        </span>
                      </div>
                      <input
                        id="current-week-input"
                        type="range"
                        min="0"
                        max={state.durationWeeks}
                        step="1"
                        value={state.currentWeek}
                        onChange={(e) => updateState({ currentWeek: parseInt(e.target.value) })}
                        className="w-full accent-accent bg-foreground/10 cursor-pointer h-1.5"
                      />
                      <span className="text-[10px] text-foreground/40 font-sans block mt-1">
                        If you have completed some assignments already, we will adjust the final quotation. Enter 0 if nothing has been submitted yet.
                      </span>
                    </div>
                  ) : (
                    <div className="pt-4 border-t border-foreground/5">
                      <label htmlFor="start-date-input" className="text-[10px] uppercase tracking-wider text-foreground/40 font-medium block mb-2">
                        Projected Class Start Date *
                      </label>
                      <input
                        id="start-date-input"
                        type="date"
                        value={state.startDate || ""}
                        onChange={(e) => updateState({ startDate: e.target.value })}
                        className={inputClass}
                        required
                      />
                    </div>
                  )}
                </div>
              )}

              {currentStep.id === "service" && (
                <div className="grid grid-cols-1 gap-3">
                  {SERVICE_OPTIONS.map((opt) => (
                    <QuoteOption
                      key={opt.title}
                      selected={state.serviceType === opt.title}
                      onClick={() => updateState({ serviceType: opt.title })}
                      title={opt.title}
                      description={opt.desc}
                    />
                  ))}
                </div>
              )}

              {currentStep.id === "discussions" && (
                <div className="space-y-6">
                  {state.serviceType === "Take my entire class" && (
                    <div className="flex items-center justify-between py-2 border-b border-foreground/5">
                      <span className="text-sm font-medium">Does the course require discussions?</span>
                      <input
                        type="checkbox"
                        checked={state.discussionsRequired}
                        onChange={(e) => updateState({ discussionsRequired: e.target.checked })}
                        className="w-4 h-4 accent-accent"
                      />
                    </div>
                  )}

                  {(state.serviceType === "Write my discussion posts" || state.discussionsRequired) && (
                    <div className="space-y-6 pt-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <QuoteOption
                          selected={state.weeklyDiscussionSubmissionRequired === true}
                          onClick={() => updateState({ weeklyDiscussionSubmissionRequired: true })}
                          title="Weekly Discussions"
                          description="Discussions are due on a recurring weekly schedule."
                        />
                        <QuoteOption
                          selected={state.weeklyDiscussionSubmissionRequired === false}
                          onClick={() => updateState({ weeklyDiscussionSubmissionRequired: false })}
                          title="Total Specific Discussions"
                          description="The class has a set total number of posts due overall."
                        />
                      </div>

                      {state.weeklyDiscussionSubmissionRequired ? (
                        <div>
                          <label htmlFor="weekly-discussions" className="text-[10px] uppercase tracking-wider text-foreground/40 font-medium block mb-1">
                            Discussions Required Per Week
                          </label>
                          <input
                            id="weekly-discussions"
                            type="number"
                            min="1"
                            value={state.weeklyDiscussionsCount}
                            onChange={(e) => updateState({ weeklyDiscussionsCount: Math.max(1, parseInt(e.target.value) || 0) })}
                            className={inputClass}
                          />
                        </div>
                      ) : (
                        <div>
                          <label htmlFor="total-discussions" className="text-[10px] uppercase tracking-wider text-foreground/40 font-medium block mb-1">
                            Total Discussions Required in Course
                          </label>
                          <input
                            id="total-discussions"
                            type="number"
                            min="1"
                            value={state.totalDiscussionsCount}
                            onChange={(e) => updateState({ totalDiscussionsCount: Math.max(1, parseInt(e.target.value) || 0) })}
                            className={inputClass}
                          />
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label htmlFor="discussion-wordcount" className="text-[10px] uppercase tracking-wider text-foreground/40 font-medium block mb-1">
                            Word Count / Post
                          </label>
                          <input
                            id="discussion-wordcount"
                            type="number"
                            min="50"
                            step="50"
                            value={state.discussionWordCount}
                            onChange={(e) => updateState({ discussionWordCount: Math.max(0, parseInt(e.target.value) || 0) })}
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label htmlFor="peer-responses" className="text-[10px] uppercase tracking-wider text-foreground/40 font-medium block mb-1">
                            Peer Replies per Post
                          </label>
                          <input
                            id="peer-responses"
                            type="number"
                            min="0"
                            value={state.peerResponsesCount}
                            onChange={(e) => updateState({ peerResponsesCount: Math.max(0, parseInt(e.target.value) || 0) })}
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label htmlFor="peer-wordcount" className="text-[10px] uppercase tracking-wider text-foreground/40 font-medium block mb-1">
                            Word Count / Reply
                          </label>
                          <input
                            id="peer-wordcount"
                            type="number"
                            min="0"
                            step="50"
                            value={state.peerResponseWordCount}
                            onChange={(e) => updateState({ peerResponseWordCount: Math.max(0, parseInt(e.target.value) || 0) })}
                            className={inputClass}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {currentStep.id === "exams" && (
                <div className="space-y-6">
                  {state.serviceType === "Take my entire class" && (
                    <div className="flex items-center justify-between py-2 border-b border-foreground/5">
                      <span className="text-sm font-medium">Does the course require exams?</span>
                      <input
                        type="checkbox"
                        checked={state.examsRequired}
                        onChange={(e) => updateState({ examsRequired: e.target.checked })}
                        className="w-4 h-4 accent-accent"
                      />
                    </div>
                  )}

                  {(state.serviceType === "Take my exams/tests" || state.examsRequired) && (
                    <div className="space-y-6 pt-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {state.hasStarted ? (
                          <div>
                            <label htmlFor="exams-remaining" className="text-[10px] uppercase tracking-wider text-foreground/40 font-medium block mb-1">
                              Exams Remaining
                            </label>
                            <input
                              id="exams-remaining"
                              type="number"
                              min="0"
                              value={state.examsRemaining}
                              onChange={(e) => updateState({ examsRemaining: Math.max(0, parseInt(e.target.value) || 0) })}
                              className={inputClass}
                            />
                          </div>
                        ) : (
                          <div>
                            <label htmlFor="exams-total" className="text-[10px] uppercase tracking-wider text-foreground/40 font-medium block mb-1">
                              Total Exams
                            </label>
                            <input
                              id="exams-total"
                              type="number"
                              min="1"
                              value={state.examsTotal}
                              onChange={(e) => updateState({ examsTotal: Math.max(1, parseInt(e.target.value) || 0) })}
                              className={inputClass}
                            />
                          </div>
                        )}
                        <div>
                          <label htmlFor="exam-questions" className="text-[10px] uppercase tracking-wider text-foreground/40 font-medium block mb-1">
                            Avg Questions per Exam
                          </label>
                          <input
                            id="exam-questions"
                            type="number"
                            min="1"
                            value={state.questionsPerExam}
                            onChange={(e) => updateState({ questionsPerExam: Math.max(1, parseInt(e.target.value) || 0) })}
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                        <div className="flex items-center justify-between py-2 border-b border-foreground/5">
                          <span className="text-sm font-medium">Are exams remotely proctored?</span>
                          <input
                            type="checkbox"
                            checked={state.examsProctored}
                            onChange={(e) => updateState({ examsProctored: e.target.checked })}
                            className="w-4 h-4 accent-accent"
                          />
                        </div>
                        <div className="flex items-center justify-between py-2 border-b border-foreground/5">
                          <span className="text-sm font-medium">Lockdown Browser required?</span>
                          <input
                            type="checkbox"
                            checked={state.examsLockdownBrowser}
                            onChange={(e) => updateState({ examsLockdownBrowser: e.target.checked })}
                            className="w-4 h-4 accent-accent"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {currentStep.id === "quizzes" && (
                <div className="space-y-6">
                  {state.serviceType === "Take my entire class" && (
                    <div className="flex items-center justify-between py-2 border-b border-foreground/5">
                      <span className="text-sm font-medium">Does the course require quizzes?</span>
                      <input
                        type="checkbox"
                        checked={state.quizzesRequired}
                        onChange={(e) => updateState({ quizzesRequired: e.target.checked })}
                        className="w-4 h-4 accent-accent"
                      />
                    </div>
                  )}

                  {(state.serviceType === "Take my quizzes" || state.quizzesRequired) && (
                    <div className="space-y-6 pt-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {state.hasStarted ? (
                          <div>
                            <label htmlFor="quizzes-remaining" className="text-[10px] uppercase tracking-wider text-foreground/40 font-medium block mb-1">
                              Quizzes Remaining
                            </label>
                            <input
                              id="quizzes-remaining"
                              type="number"
                              min="0"
                              value={state.quizzesRemaining}
                              onChange={(e) => updateState({ quizzesRemaining: Math.max(0, parseInt(e.target.value) || 0) })}
                              className={inputClass}
                            />
                          </div>
                        ) : (
                          <div>
                            <label htmlFor="quizzes-total" className="text-[10px] uppercase tracking-wider text-foreground/40 font-medium block mb-1">
                              Total Quizzes
                            </label>
                            <input
                              id="quizzes-total"
                              type="number"
                              min="1"
                              value={state.quizzesTotal}
                              onChange={(e) => updateState({ quizzesTotal: Math.max(1, parseInt(e.target.value) || 0) })}
                              className={inputClass}
                            />
                          </div>
                        )}
                        <div>
                          <label htmlFor="quiz-questions" className="text-[10px] uppercase tracking-wider text-foreground/40 font-medium block mb-1">
                            Avg Questions per Quiz
                          </label>
                          <input
                            id="quiz-questions"
                            type="number"
                            min="1"
                            value={state.questionsPerQuiz}
                            onChange={(e) => updateState({ questionsPerQuiz: Math.max(1, parseInt(e.target.value) || 0) })}
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                        <div className="flex items-center justify-between py-2 border-b border-foreground/5">
                          <span className="text-sm font-medium">Are quizzes remotely proctored?</span>
                          <input
                            type="checkbox"
                            checked={state.quizzesProctored}
                            onChange={(e) => updateState({ quizzesProctored: e.target.checked })}
                            className="w-4 h-4 accent-accent"
                          />
                        </div>
                        <div className="flex items-center justify-between py-2 border-b border-foreground/5">
                          <span className="text-sm font-medium">Lockdown Browser required?</span>
                          <input
                            type="checkbox"
                            checked={state.quizzesLockdownBrowser}
                            onChange={(e) => updateState({ quizzesLockdownBrowser: e.target.checked })}
                            className="w-4 h-4 accent-accent"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {currentStep.id === "essays" && (
                <div className="space-y-6">
                  {state.serviceType === "Take my entire class" && (
                    <div className="flex items-center justify-between py-2 border-b border-foreground/5">
                      <span className="text-sm font-medium">Are writing assignments/essays required?</span>
                      <input
                        type="checkbox"
                        checked={state.essaysRequired}
                        onChange={(e) => updateState({ essaysRequired: e.target.checked })}
                        className="w-4 h-4 accent-accent"
                      />
                    </div>
                  )}

                  {(state.serviceType === "Complete my writing assignments" || state.essaysRequired) && (
                    <div className="space-y-6 pt-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {state.hasStarted ? (
                          <div>
                            <label htmlFor="essays-remaining" className="text-[10px] uppercase tracking-wider text-foreground/40 font-medium block mb-1">
                              Writing Assignments Remaining
                            </label>
                            <input
                              id="essays-remaining"
                              type="number"
                              min="0"
                              value={state.essaysRemaining}
                              onChange={(e) => updateState({ essaysRemaining: Math.max(0, parseInt(e.target.value) || 0) })}
                              className={inputClass}
                            />
                          </div>
                        ) : (
                          <div>
                            <label htmlFor="essays-total" className="text-[10px] uppercase tracking-wider text-foreground/40 font-medium block mb-1">
                              Total Essays
                            </label>
                            <input
                              id="essays-total"
                              type="number"
                              min="1"
                              value={state.essaysTotal}
                              onChange={(e) => updateState({ essaysTotal: Math.max(1, parseInt(e.target.value) || 0) })}
                              className={inputClass}
                            />
                          </div>
                        )}
                        <div>
                          <label htmlFor="essay-wordcount" className="text-[10px] uppercase tracking-wider text-foreground/40 font-medium block mb-1">
                            Average Word Count / Essay
                          </label>
                          <input
                            id="essay-wordcount"
                            type="number"
                            min="250"
                            step="250"
                            value={state.essayWordCount}
                            onChange={(e) => updateState({ essayWordCount: Math.max(0, parseInt(e.target.value) || 0) })}
                            className={inputClass}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {currentStep.id === "labs" && (
                <div className="space-y-6">
                  {state.serviceType === "Take my entire class" && (
                    <div className="flex items-center justify-between py-2 border-b border-foreground/5">
                      <span className="text-sm font-medium">Are there simulation or laboratory assignments?</span>
                      <input
                        type="checkbox"
                        checked={state.labsRequired}
                        onChange={(e) => updateState({ labsRequired: e.target.checked })}
                        className="w-4 h-4 accent-accent"
                      />
                    </div>
                  )}

                  {(state.serviceType === "Complete my laboratory exercises/games/simulations" || state.labsRequired) && (
                    <div className="pt-2">
                      <label htmlFor="labs-count" className="text-[10px] uppercase tracking-wider text-foreground/40 font-medium block mb-1">
                        How many simulation/lab assignments?
                      </label>
                      <input
                        id="labs-count"
                        type="number"
                        min="0"
                        value={state.labsCount}
                        onChange={(e) => updateState({ labsCount: Math.max(0, parseInt(e.target.value) || 0) })}
                        className={inputClass}
                      />
                    </div>
                  )}
                </div>
              )}

              {currentStep.id === "homework" && (
                <div className="space-y-6">
                  {state.serviceType === "Take my entire class" && (
                    <div className="flex items-center justify-between py-2 border-b border-foreground/5">
                      <span className="text-sm font-medium">Does the course require homework exercises?</span>
                      <input
                        type="checkbox"
                        checked={state.homeworkRequired}
                        onChange={(e) => updateState({ homeworkRequired: e.target.checked })}
                        className="w-4 h-4 accent-accent"
                      />
                    </div>
                  )}

                  {(state.serviceType === "Complete my homework exercises" || state.homeworkRequired) && (
                    <div className="pt-2">
                      <label htmlFor="homework-count" className="text-[10px] uppercase tracking-wider text-foreground/40 font-medium block mb-1">
                        How many homework assignments total?
                      </label>
                      <input
                        id="homework-count"
                        type="number"
                        min="0"
                        value={state.homeworkCount}
                        onChange={(e) => updateState({ homeworkCount: Math.max(0, parseInt(e.target.value) || 0) })}
                        className={inputClass}
                      />
                    </div>
                  )}
                </div>
              )}

              {currentStep.id === "group-work" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <QuoteOption
                    selected={state.groupWorkRequired === true}
                    onClick={() => updateState({ groupWorkRequired: true })}
                    title="Yes, participation is required"
                    description="Course includes team projects, group forums, or peer review components."
                  />
                  <QuoteOption
                    selected={state.groupWorkRequired === false}
                    onClick={() => updateState({ groupWorkRequired: false })}
                    title="No group work required"
                    description="All assignments are submitted individually."
                  />
                </div>
              )}

              {currentStep.id === "syllabus" && (
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-foreground/40 font-medium block mb-2">
                      Course Syllabus / Grades Screenshot
                    </span>
                    <div className="border border-dashed border-foreground/15 p-8 text-center hover:border-accent/40 transition-colors duration-300 relative">
                      <input
                        type="file"
                        id="syllabus-file"
                        onChange={handleMockFile}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      <div className="flex flex-col items-center justify-center gap-2">
                        {mockFileName ? (
                          <>
                            <FileText size={24} className="text-accent" />
                            <span className="text-sm font-medium text-foreground">{mockFileName}</span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                setMockFileName("");
                              }}
                              className="text-xs text-red-500 hover:underline flex items-center gap-1 mt-1 z-10"
                            >
                              <X size={10} /> Remove file
                            </button>
                          </>
                        ) : (
                          <>
                            <Upload size={24} className="text-foreground/40" />
                            <span className="text-xs text-foreground/50">
                              Drag and drop your syllabus file here or <strong className="text-accent">browse</strong>
                            </span>
                            <span className="text-[10px] text-foreground/30">
                              PDF, PNG, JPG, or DOCX (Max 10MB)
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep.id === "negotiation" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <QuoteOption
                      selected={state.negotiationRequested === true}
                      onClick={() => updateState({ negotiationRequested: true })}
                      title="Yes, request negotiation"
                      description="I have a specific budget and would like to request price matching."
                    />
                    <QuoteOption
                      selected={state.negotiationRequested === false}
                      onClick={() => updateState({ negotiationRequested: false, proposedBudget: undefined })}
                      title="No negotiation needed"
                      description="Standard pricing quote is acceptable."
                    />
                  </div>

                  {state.negotiationRequested && (
                    <div className="pt-4 border-t border-foreground/5">
                      <label htmlFor="budget-input" className="text-[10px] uppercase tracking-wider text-foreground/40 font-medium block mb-2">
                        Your Budget (in USD) *
                      </label>
                      <input
                        id="budget-input"
                        type="number"
                        min="1"
                        value={state.proposedBudget || ""}
                        onChange={(e) => updateState({ proposedBudget: Math.max(1, parseInt(e.target.value) || 0) })}
                        placeholder="E.g., 300"
                        className={inputClass}
                        required
                      />
                      <span className="text-[10px] text-foreground/40 block mt-2 font-sans">
                        Our coordinators will review your budget and notify you if a matching plan can be structured.
                      </span>
                    </div>
                  )}
                </div>
              )}

              {currentStep.id === "summary" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <QuoteResult state={state} />
                  </div>
                  <div className="max-h-[400px] overflow-y-auto pr-2 border-l border-foreground/5 pl-2">
                    <QuoteSummary state={state} onEditStep={handleEditStep} />
                  </div>
                </div>
              )}

              {currentStep.id === "contact" && (
                <QuoteForm
                  state={state}
                  updateState={updateState}
                  onSubmitSuccess={() => setStepIdx(steps.length)} // Go to custom success step
                />
              )}
            </QuoteStep>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
