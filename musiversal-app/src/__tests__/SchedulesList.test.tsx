import { vi, test, describe, afterEach, expect } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import SchedulesList from "../containers/lists/SchedulesList";
import { musician } from "../utils/data/for-tests";

describe("When Schedules List is Rendered", () => {
  afterEach(() => {
    cleanup();
  });

  test("it should render schedules", async () => {
    render(
      <SchedulesList
        label="Test"
        chosenMusician={musician}
        schedule="19:00"
        setSchedule={() => {}}
      />
    );

    const schedulesList = screen.queryByTestId("schedules-list");

    expect(schedulesList?.children[0].innerHTML).toEqual(
      musician.availability[0]
    );
    expect(schedulesList?.children[1].innerHTML).toEqual(
      musician.availability[1]
    );
  });

  test("if the schedule happens after current hour, is clickable", async () => {
    const date = new Date(2024, 7, 14, 2, 30);

    vi.useFakeTimers();
    vi.setSystemTime(date);

    render(
      <SchedulesList
        label="Test"
        chosenMusician={musician}
        schedule="19:00"
        setSchedule={() => {}}
      />
    );

    const sched = screen.getByText(musician.availability[1]); //11:15

    // elements who have cursor-pointer and layout background are clickable elements
    expect(sched.classList).toContain("bg-layout");
    expect(sched.classList).toContain("cursor-pointer");

    const oldSched = screen.getByText(musician.availability[0]); //01:00

    // expect to have different, if it's current before hour
    expect(oldSched.classList).not.toContain("bg-layout");
    expect(oldSched.classList).not.toContain("cursor-pointer");

    vi.useRealTimers();
  });

  test("if the schedule was booked, it's not clickable", async () => {
    const date = new Date(2024, 7, 14, 2, 30);

    vi.useFakeTimers();
    vi.setSystemTime(date);

    render(
      <SchedulesList
        label="Test"
        chosenMusician={musician}
        schedule="19:00"
        setSchedule={() => {}}
      />
    );

    expect(screen.getByText("05:30")).toBeTruthy; // Musician has bookedSession at 05:30

    const sched = screen.getByText("05:30");

    // expect to have different, if it's current before hour
    expect(sched.classList).not.toContain("bg-layout");
    expect(sched.classList).not.toContain("cursor-pointer");
  });
});
