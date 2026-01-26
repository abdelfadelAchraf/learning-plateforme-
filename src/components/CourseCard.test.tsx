import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import type { Course } from "../types";
import { vi } from "vitest";
import CourseCard from "../courses/CourseCard";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const mockCourse: Course = {
  id: "123",
  title: "React Basics",
  description: "Learn React from scratch",
  subject: "computerScience",
  chapters: [],
};

const renderCard = () =>
  render(
    <MemoryRouter>
      <CourseCard course={mockCourse} />
    </MemoryRouter>
  );

describe("CourseCard", () => {
  it("renders title", () => {
    renderCard();
    expect(screen.getByText("React Basics")).toBeInTheDocument();
  });

  it("renders description", () => {
    renderCard();
    expect(screen.getByText("Learn React from scratch")).toBeInTheDocument();
  });

  it("renders correct link", () => {
    renderCard();
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/courses/123");
  });

  it("shows computer science icon", () => {
    renderCard();
    expect(screen.getByText("💻")).toBeInTheDocument();
  });
});
