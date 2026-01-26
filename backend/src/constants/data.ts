export interface Course {
  id: string;
  title: string;
  description: string;
  subject: string;
}

export const courses: Course[] = [
  {
    id: "1",
    title: "Introduction aux Mathématiques",
    description: "Cours complet couvrant les bases des mathématiques.",
    subject: "mathematics",
  },
  {
    id: "2",
    title: "Physique Fondamentale",
    description: "Découvrez les principes de la mécanique et de la thermodynamique.",
    subject: "physics",
  },
];
