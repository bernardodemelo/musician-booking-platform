import { ReactNode } from "react";
import { AxiosError, AxiosResponse } from "axios";

/* MUSICIAN DATA */
export interface MusicianResponse {
  id: number;
  name: string;
  avatar: string;
  enabled: boolean;
  services: { name: string; id: number }[];
  availability: string[];
  bookedSessions?: {
    date: string;
  }[];
}

export interface BookedSessionResponse {
  client: string;
  musician: { name: string };
  hours: string;
  service: { name: string };
}

export interface FetchData {
  isLoading: boolean | undefined;
  error: AxiosError | undefined;
  data: AxiosResponse | undefined;
}

type MusicianData = Omit<FetchData, "data">;

export interface MusicianDataProps extends MusicianData {
  musicians: MusicianResponse[] | undefined;
  services: string[] | undefined;
}

export interface ReactChildrenProps {
  children: ReactNode;
}

export interface StyledButtonProps {
  type: string;
  setChosenMusician?: React.Dispatch<
    React.SetStateAction<MusicianResponse | null>
  >;
}

export interface StyledInputProps {
  label: string;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}

export interface StyledDropdownProps {
  label: string;
  chosenMusician: MusicianResponse | null;
  setService: React.Dispatch<React.SetStateAction<number>>;
}

export interface MusicianCardProps {
  musician: MusicianResponse;
  chosenMusician: MusicianResponse | null;
  setChosenMusician: React.Dispatch<
    React.SetStateAction<MusicianResponse | null>
  >;
}

export interface MusicianListProps {
  chosenMusician: MusicianResponse | null;
  setChosenMusician: React.Dispatch<
    React.SetStateAction<MusicianResponse | null>
  >;
}

export interface SchedulesListProps {
  label: string;
  chosenMusician: MusicianResponse | null;
  schedule: string;
  setSchedule: React.Dispatch<React.SetStateAction<string>>;
}

export interface MusicianFormProps {
  chosenMusician: MusicianResponse | null;
  setChosenMusician: React.Dispatch<
    React.SetStateAction<MusicianResponse | null>
  >;
}
