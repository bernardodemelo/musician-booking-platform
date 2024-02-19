import { test, describe, afterEach, expect } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import MusiciansForm from "../containers/forms/MusiciansForm";
import { musician } from "../utils/data/for-tests";

describe("When Movie Form is Rendered", () => {
  afterEach(() => {
    cleanup();
  });

  test("it should render basic fields", async () => {
    render(
      <MusiciansForm chosenMusician={musician} setChosenMusician={() => {}} />
    );

    expect(
      screen.getByRole("input")
    ).toBeTruthy();
    expect(screen.getByRole("dropdown")).toBeTruthy();
    expect(screen.queryByTestId("schedules-list")).toBeTruthy();
    expect(screen.getByRole("submit")).toBeTruthy();
  });

  test("it should have musician's data", async () => {
    render(
      <MusiciansForm chosenMusician={musician} setChosenMusician={() => {}} />
    );

    expect(screen.queryByTestId("schedules-list")?.children.length).toEqual(musician.availability.length);
    expect(screen.getByRole('dropdown')?.children.length).toEqual(musician.services.length);
  });
});
