import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import CoursesPage from "../pages/CoursesPage";
import { I18nextProvider } from "react-i18next";
import type { Course } from "../types";
import i18n from "../locales/i18n";
import { vi } from "vitest";

// Vitest mock
vi.mock("../courses/CourseCard", () => ({
  default: ({ course }: { course: Course }) => (
    <div data-testid="course-card">{course.title}</div>
  ),
}));

vi.mock("../components/utils/Spinner", () => ({
  default: () => <div data-testid="spinner">Loading...</div>,
}));

describe("CoursesPage", () => {
  test("renders loading spinner initially", () => {
    render(
      <I18nextProvider i18n={i18n}>
        <CoursesPage />
      </I18nextProvider>
    );

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  test("renders list of courses after loading", async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <CoursesPage />
      </I18nextProvider>
    );

    await waitFor(() => expect(screen.queryByTestId("spinner")).not.toBeInTheDocument());

    const courseCards = screen.getAllByTestId("course-card");
    expect(courseCards.length).toBeGreaterThan(0);
    expect(courseCards[0]).toHaveTextContent("Introduction aux Mathématiques");
  });

  test("filters courses by subject", async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <CoursesPage />
      </I18nextProvider>
    );

    await waitFor(() => expect(screen.queryByTestId("spinner")).not.toBeInTheDocument());

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "physics" } });

    const courseCards = screen.getAllByTestId("course-card");
    expect(courseCards.length).toBe(1);
    expect(courseCards[0]).toHaveTextContent("Physique Fondamentale");
  });

  test("search filters courses", async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <CoursesPage />
      </I18nextProvider>
    );

    await waitFor(() => expect(screen.queryByTestId("spinner")).not.toBeInTheDocument());

    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: "chimie" } });

    const courseCards = screen.getAllByTestId("course-card");
    expect(courseCards.length).toBe(1);
    expect(courseCards[0]).toHaveTextContent("Chimie Organique");
  });

  test("shows no courses message when filter yields no results", async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <CoursesPage />
      </I18nextProvider>
    );

    await waitFor(() => expect(screen.queryByTestId("spinner")).not.toBeInTheDocument());

    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: "non-existent course" } });

    expect(screen.getByText(/aucun cours trouvé/i)).toBeInTheDocument();
  });

  test("reset filters button works", async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <CoursesPage />
      </I18nextProvider>
    );

    await waitFor(() => expect(screen.queryByTestId("spinner")).not.toBeInTheDocument());

    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: "chimie" } });

   const button = await screen.findByRole("button", { name: /réinitialiser les filtres/i });
fireEvent.click(button);



    const courseCards = screen.getAllByTestId("course-card");
    expect(courseCards.length).toBe(4); // all mockCourses
  });
});
