import { render, screen } from "@testing-library/react";
import Skeleton from "./utils/Skelton";

describe("Skeleton", () => {
  it("renders correct number of skeletons", () => {
    render(<Skeleton count={3} />);
    const elements = screen.getAllByRole("presentation");
    expect(elements.length).toBe(3);
  });
});
