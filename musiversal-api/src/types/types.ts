interface MusicianData {
  name: string;
  avatar: string;
  enabled: true | false;
  services: {name: string}[];
  availability: {dayOfWeek: number, timeSlots: string[]}[];
}

interface SessionData {
  client: string;
  musicianId: number;
  schedule: string;
  serviceId: number
}


export {MusicianData, SessionData}