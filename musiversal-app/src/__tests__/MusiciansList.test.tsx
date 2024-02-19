import { vi, test, describe, afterEach, expect } from "vitest";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import MusiciansList from "../containers/lists/MusiciansList";
import apiService from "../services/api";
import { AxiosResponse } from "axios";
import { musician } from "../utils/data/for-tests";

describe("When Movie List is Rendered", () => {
  afterEach(() => {
    cleanup();
  });

  test("it should return a list of musicians", async () => {
    vi.spyOn(apiService, "getMusicians").mockImplementation(() => {
      return Promise.resolve({
        status: 200,
        statusText: "OK",
        headers: {},
        config: {},
        data: [musician],
      } as AxiosResponse);
    });

    render(
      <MusiciansList chosenMusician={null} setChosenMusician={() => {}} />
    );

    const list = screen.getByTestId("musicians-list");

    await waitFor(() => expect(list.children.length).toBe([musician].length));
  });

  test("it should adapt css, when there is a chosen musician", async () => {
    render(
      <MusiciansList chosenMusician={musician} setChosenMusician={() => {}} />
    );

    const list = screen.getByTestId("musicians-list");
    expect(list.classList).toContain("grid-cols-2");
    expect(list.classList).toContain("w-5/6");
  });
});
