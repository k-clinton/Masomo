export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageQuery: string;
  size: "large" | "medium" | "small";
}

export const projects: Project[] = [
  {
    id: "oxford-distinction",
    title: "Oxford Distinction Programme",
    category: "University Preparation",
    description:
      "A structured 12-week programme preparing students for Oxford entrance examinations and interviews.",
    imageQuery: "university library books study academic",
    size: "large",
  },
  {
    id: "stem-accelerator",
    title: "STEM Accelerator",
    category: "Subject Mastery",
    description:
      "Intensive mathematics and sciences curriculum designed for A-Level students targeting top universities.",
    imageQuery: "mathematics science laboratory research",
    size: "medium",
  },
  {
    id: "dissertation-success",
    title: "Dissertation Success Initiative",
    category: "Postgraduate Support",
    description:
      "End-to-end dissertation support that guided over 200 postgraduate students to first-class submissions.",
    imageQuery: "writing research desk academic papers",
    size: "medium",
  },
  {
    id: "international-foundation",
    title: "International Foundation Year",
    category: "Language & Academics",
    description:
      "Comprehensive academic and language programme for international students entering UK universities.",
    imageQuery: "diverse students studying campus global",
    size: "large",
  },
];
