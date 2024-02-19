import { test, describe, expect, afterEach } from "vitest";
import { render, cleanup} from "@testing-library/react";
import StyledButton from "../components/elements/buttons/styledButton";

describe("When Styled Button is Rendered", () => {
  afterEach(() => {
    cleanup();
  });

  test("it should return submit button, when sent type='submit' ", async () => {
     const { container } = render(
       <StyledButton type="submit" setChosenMusician={() => {}} />
     );
    
     const button = container.querySelector("button");
     expect(button?.innerHTML).toEqual("Book Session");
  });

  test("it should return close button, when sent type='close'", async () => {
     const { container } = render(
       <StyledButton type="close" setChosenMusician={() => {}} />
     );

     const button = container.querySelector("button");
     expect(button?.innerHTML).toEqual("Close");
  });
});
