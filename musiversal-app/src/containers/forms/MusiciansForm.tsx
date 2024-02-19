import { FormEvent, useState, FC } from "react";
import { useSWRConfig } from "swr";

import apiService from "../../services/api";
import { MusicianFormProps } from "../../utils/types/types";

import StyledInput from "../../components/elements/inputs/StyledInput";
import StyledDropdown from "../../components/elements/dropdowns/StyledDropdown";
import SchedulesList from "../lists/SchedulesList";
import StyledButton from "../../components/elements/buttons/styledButton";
import StyledHeading from "../../components/elements/headings/styledHeading";

const MusiciansForm: FC<MusicianFormProps> = ({
  chosenMusician,
  setChosenMusician,
}) => {
  const [name, setName] = useState("");
  const [schedule, setSchedule] = useState("");
  const [service, setService] = useState(0);
  const [viewForm, setViewForm] = useState(true);

  const { mutate } = useSWRConfig();

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const { bookSession } = apiService;

      if (chosenMusician) {
        const reqBody = {
          client: name,
          musicianId: chosenMusician.id,
          schedule,
          serviceId: service,
        };

        console.log(reqBody);

        await bookSession("/api/session", reqBody);

        setViewForm(false);
        setName("");
        setSchedule("");
        setService(0);

        mutate("/api/musicians");
        mutate("/api/sessions");
      } else {
        console.error("No chosen Musician");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <aside className="w-1/3 mt-10 ml-8">
      <div className="bg-white h-full">
        <div className="px-8 py-12 h-full">
          {viewForm ? (
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="flex flex-col justify-between h-full"
            >
              <article>
                <StyledInput
                  label={"What's your Name?"}
                  name={name}
                  setName={setName}
                />
                <SchedulesList
                  label={"When?"}
                  chosenMusician={chosenMusician}
                  schedule={schedule}
                  setSchedule={setSchedule}
                />
                <StyledDropdown
                  label={"Which Instrument?"}
                  chosenMusician={chosenMusician}
                  setService={setService}
                />
              </article>
              <article className="w-full">
                <StyledButton type="submit" />
              </article>
            </form>
          ) : (
            <div className="h-full flex flex-col justify-between">
              <StyledHeading type="close-form" />
              <StyledButton
                type="close"
                setChosenMusician={setChosenMusician}
              />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default MusiciansForm;
