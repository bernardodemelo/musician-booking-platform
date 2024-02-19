import { FC } from "react";
import { StyledButtonProps } from "../../../utils/types/types";

const StyledButton:FC <StyledButtonProps> = ({ type, setChosenMusician }) => {
  switch (type) {
    case "submit":
      return (
        <button
          role="submit"
          className="transition ease-in-out delay-150 w-full p-4 bg-strongBgOrange shadow-lg shadow-orange-600/50 text-white rounded-xl hover:-translate-y-1 hover:scale-110 hover:bg-orange-500 duration-300"
          type="submit"
        >
          Book Session
        </button>
      );
    case "close":
      return (
        <button
          className="w-full p-4 bg-white text-mdTextGray rounded-xl border-2 border-gray-400"
          onClick={() => setChosenMusician && setChosenMusician(null)}
        >
          Close
        </button>
      );
  }
}

export default StyledButton
