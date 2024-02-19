import { FC } from "react";
import { StyledDropdownProps } from "../../../utils/types/types";

const StyledDropdown:FC<StyledDropdownProps> = ({label, chosenMusician, setService}) => {
    return (
      <div role="dropdown" className="mt-12">
        <p className="text-xl font-semibold text-primary">
          {label}
        </p>
        <select
          className="mt-3 p-3 w-full rounded-lg bg-layout text-gray-400 cursor-pointer focus:outline-orange-400"
          required
          onChange={(e) => setService(parseInt(e.target.value))}
        >
          <option disabled selected>
            Select instrument...
          </option>
          {chosenMusician?.services &&
            chosenMusician.services.map(
              (service, index:number) => {
                return <option key={index} value={service.id}>{service.name}</option>;
              }
            )}
        </select>
      </div>
    );
}

export default StyledDropdown