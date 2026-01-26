import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CoursesPage from "../pages/CoursesPage";

test("CoursesPage renders quickly", async () => {
  const start = performance.now();

  render(
    <MemoryRouter>
      <CoursesPage />
    </MemoryRouter>
  );

  // Wait for courses to load
  await screen.findByText(/Introduction aux Mathématiques/i);

  const end = performance.now();
  console.log("CoursesPage render time:", end - start, "ms");

  expect(end - start).toBeLessThan(2000); // example threshold
});
