export interface QuoteState {
  subject: string;
  educationLevel: string;
  isSelfPaced: boolean;
  durationWeeks: number;
  hasStarted: boolean;
  currentWeek: number;
  startDate?: string;
  serviceType: string;
  courseName: string;

  // Components (only applicable for "Entire Class" or their respective standalone service types)
  discussionsRequired: boolean;
  weeklyDiscussionsCount: number;
  discussionWordCount: number;
  peerResponsesCount: number;
  peerResponseWordCount: number;
  weeklyDiscussionSubmissionRequired: boolean;
  totalDiscussionsCount: number;

  examsRequired: boolean;
  examsRemaining: number;
  examsTotal: number;
  questionsPerExam: number;
  examsProctored: boolean;
  examsLockdownBrowser: boolean;

  quizzesRequired: boolean;
  quizzesRemaining: number;
  quizzesTotal: number;
  questionsPerQuiz: number;
  quizzesProctored: boolean;
  quizzesLockdownBrowser: boolean;

  essaysRequired: boolean;
  essaysRemaining: number;
  essaysTotal: number;
  essayWordCount: number;

  groupWorkRequired: boolean;

  labsRequired: boolean;
  labsCount: number;

  homeworkRequired: boolean;
  homeworkCount: number;

  negotiationRequested: boolean;
  proposedBudget?: number;
}

export const USD_TO_KSH_RATE = 130;

export interface ComponentPrices {
  discussions: number;
  exams: number;
  quizzes: number;
  essays: number;
  groupWork: number;
  labs: number;
  homework: number;
  totalUSD: number;
  totalKSh: number;
  weeklyUSD: number;
  weeklyKSh: number;
  rangeMinKSh: number;
  rangeMaxKSh: number;
}

export function calculateQuote(state: QuoteState): ComponentPrices {
  const isEntireClass = state.serviceType === "Take my entire class";
  const weeksRemaining = state.isSelfPaced
    ? state.durationWeeks
    : Math.max(1, state.durationWeeks - (state.hasStarted ? state.currentWeek : 0));

  // 1. Discussions
  let discussionsPrice = 0;
  const discussionsActive = isEntireClass ? state.discussionsRequired : state.serviceType === "Write my discussion posts";
  if (discussionsActive) {
    const postWords = state.discussionWordCount || 0;
    const peerResponses = state.peerResponsesCount || 0;
    const peerWords = state.peerResponseWordCount || 0;
    const wordsPerUnit = postWords + (peerResponses * peerWords);

    if (state.weeklyDiscussionSubmissionRequired) {
      const weeklyPosts = state.weeklyDiscussionsCount || 0;
      discussionsPrice = weeksRemaining * ((weeklyPosts * wordsPerUnit) / 250) * 16.7;
    } else {
      const totalPosts = state.totalDiscussionsCount || 0;
      discussionsPrice = (totalPosts * wordsPerUnit / 250) * 16.7;
    }
  }

  // 2. Exams
  let examsPrice = 0;
  const examsActive = isEntireClass ? state.examsRequired : state.serviceType === "Take my exams/tests";
  if (examsActive) {
    const examCount = state.hasStarted ? state.examsRemaining : state.examsTotal;
    const questions = state.questionsPerExam || 0;
    const modifierProctored = state.examsProctored ? 1.2 : 1.0;
    const modifierBrowser = state.examsLockdownBrowser ? 1.2 : 1.0;
    examsPrice = (examCount * questions * 1.45) * modifierProctored * modifierBrowser;
  }

  // 3. Quizzes
  let quizzesPrice = 0;
  const quizzesActive = isEntireClass ? state.quizzesRequired : state.serviceType === "Take my quizzes";
  if (quizzesActive) {
    const quizCount = state.hasStarted ? state.quizzesRemaining : state.quizzesTotal;
    const questions = state.questionsPerQuiz || 0;
    const modifierProctored = state.quizzesProctored ? 1.2 : 1.0;
    const modifierBrowser = state.quizzesLockdownBrowser ? 1.1 : 1.0;
    quizzesPrice = (quizCount * questions * 1.55) * modifierProctored * modifierBrowser;
  }

  // 4. Writing Assignments
  let essaysPrice = 0;
  const essaysActive = isEntireClass ? state.essaysRequired : state.serviceType === "Complete my writing assignments";
  if (essaysActive) {
    const essayCount = state.hasStarted ? state.essaysRemaining : state.essaysTotal;
    const wordCount = state.essayWordCount || 0;
    essaysPrice = essayCount * (wordCount / 250) * 16;
  }

  // 5. Group Work
  let groupWorkPrice = 0;
  const groupWorkActive = isEntireClass && state.groupWorkRequired;
  if (groupWorkActive) {
    groupWorkPrice = 200; // Flat USD 200 for group work requirement
  }

  // 6. Simulation/Lab-based assignments
  let labsPrice = 0;
  const labsActive = isEntireClass ? state.labsRequired : state.serviceType === "Complete my laboratory exercises/games/simulations";
  if (labsActive) {
    const count = state.labsCount || 0;
    labsPrice = count * 40;
  }

  // 7. Homework
  let homeworkPrice = 0;
  const homeworkActive = isEntireClass ? state.homeworkRequired : state.serviceType === "Complete my homework exercises";
  if (homeworkActive) {
    const count = state.homeworkCount || 0;
    homeworkPrice = count * 30;
  }

  // Sum raw component prices
  let totalUSD = discussionsPrice + examsPrice + quizzesPrice + essaysPrice + groupWorkPrice + labsPrice + homeworkPrice;

  // Apply Educational Level Multiplier
  let levelMultiplier = 1.0;
  if (state.educationLevel === "Master's Degree") {
    levelMultiplier = 1.5;
  } else if (state.educationLevel === "Doctoral Degree") {
    levelMultiplier = 1.75;
  }
  totalUSD *= levelMultiplier;

  // Calculate weekly rate
  const weeklyUSD = totalUSD / Math.max(1, weeksRemaining);

  // Convert to KSh
  const totalKSh = totalUSD * USD_TO_KSH_RATE;
  const weeklyKSh = weeklyUSD * USD_TO_KSH_RATE;

  // Calculate range for final user presentation
  const rangeMinKSh = Math.round((totalKSh * 0.9) / 100) * 100;
  const rangeMaxKSh = Math.round((totalKSh * 1.15) / 100) * 100;

  return {
    discussions: Math.round(discussionsPrice * 100) / 100,
    exams: Math.round(examsPrice * 100) / 100,
    quizzes: Math.round(quizzesPrice * 100) / 100,
    essays: Math.round(essaysPrice * 100) / 100,
    groupWork: Math.round(groupWorkPrice * 100) / 100,
    labs: Math.round(labsPrice * 100) / 100,
    homework: Math.round(homeworkPrice * 100) / 100,
    totalUSD: Math.round(totalUSD * 100) / 100,
    totalKSh: Math.round(totalKSh),
    weeklyUSD: Math.round(weeklyUSD * 100) / 100,
    weeklyKSh: Math.round(weeklyKSh),
    rangeMinKSh,
    rangeMaxKSh,
  };
}
