/* Import Packages */
import { FC } from "react";

const StyledHeading:FC<{type:string}> = ({type}) =>{
  switch(type){
    case "app":
    return (
      <div>
        <h3 className="text-2xl font-semibold">Musician Booking Platform </h3>
        <p className="mt-3 text-mdTextGray">Select a musician</p>
      </div>
    );
    case "close-form": 
    return (
      <div>
        <h3 className="text-2xl font-semibold text-primary">All good! </h3>
        <p className="mt-3 text-primary">
          Your session was added to the list
        </p>
      </div>
    );
    case "session": 
    return(
     <div className="my-12">
       <h3 className="text-2xl font-semibold text-primary">Sessions booked by people</h3>
     </div>);
  }
}

export default StyledHeading  