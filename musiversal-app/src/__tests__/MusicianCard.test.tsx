import { test, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MusicianCard from "../components/blocks/cards/MusicianCard";
import { musician } from "../utils/data/for-tests";

describe("When MusicianCard is Rendered", () => {
  test("it should return musicians data", async () => {
    const { container } = render(
      <MusicianCard
        musician={musician}
        chosenMusician={musician}
        setChosenMusician={() => {}}
      />
    );

    const heading = container.querySelector("h3");
    expect(heading?.innerHTML).toBe(musician.name);
    const img = container.querySelector("img");
    expect(img?.src).toBe(musician.avatar);
    const services = screen.getByTestId("services");
    expect(services.innerHTML).toBe(
      `<span>${musician.services[0].name}</span> | <span>${musician.services[1].name}</span>`
    );
  });
});
