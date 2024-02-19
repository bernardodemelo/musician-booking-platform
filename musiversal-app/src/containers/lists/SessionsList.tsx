import { FC } from "react";
import useSWR from "swr";

import apiService from "../../services/api";
import { BookedSessionResponse } from "../../utils/types/types";

const SessionsList:FC = () => {
  
  const { getSessions } = apiService;

  const { data : {data:sessions} = {}} = useSWR("/api/sessions", getSessions);
  
  return (
    <div data-testid="sessions-list">
      {sessions?.length > 0 ? (
        sessions.map((session: BookedSessionResponse, index: number) => {
          return (
            <div
              key={index}
              className="py-6 px-4 bg-lightBgOrange my-4 rounded-lg border-2 border-orange-400"
            >
              <p>
                <span className="font-semibold">{session.client}</span> booked{" "}
                <span className="font-semibold">{session.musician.name}</span>{" "}
                at {session.hours} for a{" "}
                <span className="text-orange-600">
                  {session.service.name} Session
                </span>
              </p>
            </div>
          );
        })
      ) : (
        <div className="p-6 bg-white my-3 rounded-lg text-mdTextGray italic">
          <p>Nobody booked a session so far</p>
        </div>
      )}
    </div>
  );
}

export default SessionsList;
