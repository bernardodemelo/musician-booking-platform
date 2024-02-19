export const musician = {
  id: 16,
  name: "Alicia Cooper",
  avatar:
    "https://s3-alpha-sig.figma.com/img/6891/b163/706b318f4281f7751f15952875b3da85?Expires=1708300800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=p3PNN-MTyGv7wgD1HyZksTYzfkkH5CsmO1HWxzMICnX-K6ARvCvHQcuRiIQlyhYsli5X--vv6YLq2fLykN4-w5Tbol8FkvRo1lK9-ti~mEYP26bWwIEjxyOmd~Wl5ESWTXTd1U~0MifgwVrL9gRfrkCrfJ9e4UYk~i9DmE6KlC5uBu2TjCiPjR8FxKMr5HMjIO~eLZfKwlq1PTqS6Qtjr1wd-~Hcy-Xu17d24QNmp~AnsMGJFkLMtIDtKLqsB~NSt9QMPRvvmHK4Xn3Mk8Ra-N5LjruhSEuhsdZA2qHaj6gyTRMJoAlDdnbgpgo3agszYBYuAwD3kx0UoIrfYD46BA__",
  enabled: true,
  availability: ["01:00", "11:15", "05:30", "14:00"],
  services: [
    {
      id: 31,
      name: "Guitar",
    },
    {
      id: 32,
      name: "Bass",
    },
  ],
  bookedSessions: [
    {
      date: "Wed Aug 14 2024 05:30:00 GMT+0100 (Western European Summer Time)",
    },
  ],
};

export const session = {
  date: "Sat Feb 17 2024 19:00:00 GMT+0000 (Western European Standard Time)",
  client: "john doe",
  musician: {
    name: "Alicia Cooper",
  },
  service: {
    name: "Guitar",
  },
  hours: "19:00",
};
