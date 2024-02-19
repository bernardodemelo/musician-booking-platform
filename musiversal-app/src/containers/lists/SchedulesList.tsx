import { FC } from "react";
import { SchedulesListProps } from "../../utils/types/types";

const SchedulesList: FC<SchedulesListProps> = ({
  label,
  chosenMusician,
  schedule,
  setSchedule,
}) => {

  const checkScheduleAndBookedSessions = (sched: string) => {
    const [scheduleInTime, actualDate] = getDates(sched);
    if (chosenMusician) {
        return checkCollisionOrPastDate(scheduleInTime, actualDate)
    }
  };

  const getDates = (sched:string) =>{
    // Convert Schedule in Actual Date
    const scheduleArr = sched.split(":");
    const date = new Date();

    date.setHours(parseInt(scheduleArr[0]));
    date.setMinutes(parseInt(scheduleArr[1]));
    date.setSeconds(0);
    date.setMilliseconds(0);

    // get Schedule in milliseconds since epoch
    const scheduleInTime = date.getTime();
    // get Actual Date in milliseconds since epoch
    const actualDate = new Date().getTime();

    return [scheduleInTime, actualDate];
  }

  const checkCollisionOrPastDate = (sched:number, date:number) => {
    
    // To check either if it's a past date
    if (sched - date <= 0) {
      return false;
    } else if (chosenMusician?.bookedSessions?.length === 0) {
      return true;
    } else {
      let clashFound = true;
      chosenMusician?.bookedSessions?.forEach((session) => {
        const sessionDate = new Date(session.date).getTime();
        // Or if the schedule Time clashes with a session date
        if (sched == sessionDate) {
          clashFound = false;
        }
      });
      return clashFound;
    }
  }


  return (
    <div className="mt-12">
      <p className="text-xl font-semibold text-[#374151]">{label}</p>
      <div data-testid="schedules-list" className="w-full flex mt-3">
        {chosenMusician?.availability &&
          chosenMusician.availability.map((time: string, index:number) => {
            if (checkScheduleAndBookedSessions(time)) {
              /*! If I had more time, I would re-format the scheds boxes and transform them into a single react functional component */
              return (
                <div
                  key={index}
                  onClick={() => setSchedule(time)}
                  className={`py-2 px-4 rounded-lg ${
                    schedule && schedule === time
                      ? "bg-lightBgOrange text-strongTextOrange"
                      : "bg-layout text-mdTextGray"
                  } mr-4 cursor-pointer`}
                >
                  {time}
                </div>
              );
            } else {
              return (
                <div
                  key={index}
                  className={
                    "py-2 px-4 rounded-lg bg-lightBgGray text-lightTextGray mr-4 cursor-default"
                  }
                >
                  {time}
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

export default SchedulesList;
