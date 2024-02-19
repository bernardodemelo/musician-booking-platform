import { FC } from "react";
import { MusicianCardProps } from "../../../utils/types/types";

const MusicianCard: FC<MusicianCardProps> = ({
  musician,
  chosenMusician,
  setChosenMusician,
}) => {
  return (
    /* Change Background Color when Hovered ||  When Selected */
    <article
      className={`bg-white flex justify-center rounded-lg w-full drop-shadow-xl hover:bg-lightBgOrange cursor-pointer ${
        chosenMusician && chosenMusician.id === musician.id
          ? "border-2 border-orange-400"
          : ""
      }`}
      key={musician.id}
      /* Sets Chosen Musician, When Clicked */
      onClick={() => setChosenMusician(musician)}
    >
      <div className="py-12 px-18">
        <img
          className="w-[150px] h-[150px] bg-cover rounded-[50px] object-cover"
          src={musician.avatar}
        />
        <div className="mt-6 text-center">
          <h3 className="text-xl font-semibold">{musician.name}</h3>
          <div data-testid="services" className="text-strongTextOrange">
            {/* Returns the Name of Services. Did Reduce, in order to have them reduced in the same line, separated by a '|'  */}
            {musician.services
              ?.map((service, index) => {
                return <span key={index}>{service.name}</span>;
              })
              .reduce((prev, curr) => (
                <>{[prev, " | ", curr]}</>
              ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default MusicianCard;
