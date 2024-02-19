import { vi, test, describe, expect } from "vitest";
import { render, screen, waitFor} from "@testing-library/react";
import apiService from "../services/api";
import { AxiosResponse } from "axios";
import { session } from "../utils/data/for-tests";
import SessionsList from "../containers/lists/SessionsList";

describe("When Sessions List is Rendered", () => {
  test("it should return a list of sessions", async () => {
    vi.spyOn(apiService, "getSessions").mockImplementation(() => {
      return Promise.resolve({
        status: 200,
        statusText: "OK",
        headers: {},
        config: {},
        data: [session],
      } as AxiosResponse);
    });

    render(
     <SessionsList />
    );

    const list = screen.getByTestId("sessions-list");

    await waitFor(() => expect(list.children.length).toBe([session].length));
  });
});
