export interface Service {
  id: string;
  number: string;
  name: string;
  description: string;
  details: string[];
}

export const services: Service[] = [
  {
    id: "academic-tutoring",
    number: "01",
    name: "Academic Tutoring",
    description:
      "One-on-one and group tutoring sessions across all academic level from secondary school to postgraduate study.",
    details: [
      "Subject-specific expert tutors",
      "Personalised learning plans",
      "Flexible scheduling",
      "Progress tracking and reporting",
    ],
  },
  {
    id: "essay-writing",
    number: "02",
    name: "Essay & Assignment Support",
    description:
      "Expert guidance on structuring, researching, and writing compelling essays and assignments that meet academic standards.",
    details: [
      "Essay structure and argumentation",
      "Research methodology support",
      "Citation and referencing",
      "Proofreading and editing",
    ],
  },
  {
    id: "dissertation-thesis",
    number: "03",
    name: "Dissertation & Thesis",
    description:
      "Comprehensive support for undergraduate and postgraduate dissertations, from proposal to final submission.",
    details: [
      "Research proposal development",
      "Literature review guidance",
      "Data analysis support",
      "Chapter by chapter feedback",
    ],
  },
  {
    id: "exam-preparation",
    number: "04",
    name: "Exam Preparation",
    description:
      "Strategic exam preparation programmes designed to build confidence and maximise performance under pressure.",
    details: [
      "Past paper practice",
      "Revision strategy planning",
      "Time management techniques",
      "Mock exam sessions",
    ],
  },
  {
    id: "language-support",
    number: "05",
    name: "Academic Language Support",
    description:
      "English language and academic writing support for international students and non-native speakers.",
    details: [
      "Academic writing conventions",
      "Grammar and vocabulary",
      "Reading comprehension",
      "Presentation skills",
    ],
  },
];
