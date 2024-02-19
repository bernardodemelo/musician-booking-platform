/* Packages */
import { FC, Fragment } from "react";
import useSWR from "swr";

/* Types */
import { MusicianListProps } from "../../utils/types/types";
import { MusicianResponse } from "../../utils/types/types";

/* API */
import apiService from "../../services/api";

/* Components */
import MusicianCard from "../../components/blocks/cards/MusicianCard";

const MusiciansList: FC<MusicianListProps> = ({chosenMusician, setChosenMusician}) => {

  const { getMusicians } = apiService;
  // Fetch data using useSWR. Converted returned data's name to musicians for better readability
  const {
    data: musicians
  } = useSWR("/api/musicians", getMusicians);


  return (
    <section
      data-testid="musicians-list"
      className={`grid gap-x-8 gap-y-8 mt-10 ${
        chosenMusician ? "grid-cols-2 w-5/6" : "grid-cols-3 w-full"
      }`}
    >
      {musicians &&
        musicians.data.map((musician: MusicianResponse) => {
          return (
            <Fragment key={musician.id}>
            <MusicianCard
              musician={musician}
              chosenMusician={chosenMusician}
              setChosenMusician={setChosenMusician}
            />
            </Fragment>
          );
        })}
    </section>
  );
};
export default MusiciansList;
