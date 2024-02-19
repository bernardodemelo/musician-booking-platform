import { FC } from "react";
import { StyledInputProps } from "../../../utils/types/types";

const StyledInput:FC<StyledInputProps> = ({label, name, setName}) =>{
    return (
      <div>
        <p className="text-xl font-semibold text-primary">
          {label}
        </p>
        <input
          role="input"
          className="mt-3 p-3 w-full rounded-lg bg-layout focus:outline-orange-400"
          type="text"
          placeholder="John Sanchez"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
    );
}

export default StyledInput