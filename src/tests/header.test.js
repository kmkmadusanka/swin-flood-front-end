import { render, screen } from "@testing-library/react";
import Header from "../components/Headers/Header";

test("Temperature value existence", () => {
  render(<Header />);
  const val = screen.getByTestId("temp-val");
  expect(val).toBeDefined();
});

test("Humidity value existence", () => {
  render(<Header />);
  const val = screen.getByTestId("humidity-val");
  expect(val).toBeDefined();
});

test("Wind value existence", () => {
  render(<Header />);
  const val = screen.getByTestId("wind-val");
  expect(val).toBeDefined();
});

test("Pressure value existence", () => {
  render(<Header />);
  const val = screen.getByTestId("pressure-val");
  expect(val).toBeDefined();
});
