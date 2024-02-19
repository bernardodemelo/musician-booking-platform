import { FC, useState } from "react";
import StyledHeading from "../components/elements/headings/styledHeading";
import { MusicianResponse } from "../utils/types/types";

import MusiciansList from "../containers/lists/MusiciansList";
import MusiciansForm from "../containers/forms/MusiciansForm";
import SessionsList from "../containers/lists/SessionsList";

const BookingPlatform:FC = () => {
  const [chosenMusician, setChosenMusician] = useState<MusicianResponse | null>(
    null
  );

  return (
    <main className="py-7 px-36">
      <StyledHeading type={"app"} />
      <section className={chosenMusician? "flex justify-between": "w-full"}>
        <MusiciansList
          chosenMusician={chosenMusician}
          setChosenMusician={setChosenMusician}
        />
        {chosenMusician && <MusiciansForm chosenMusician={chosenMusician} setChosenMusician = {setChosenMusician}/>}
      </section>
      <section>
        <StyledHeading type="session" />
        <SessionsList />
      </section>
    </main>
  );
}

export default BookingPlatform;
