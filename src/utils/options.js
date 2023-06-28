export const DataSetOptions = [
  {
    value: "first",
    label: "First Set",
  },
  {
    value: "second",
    label: "Second Set",
  },
  {
    value: "third",
    label: "Third Set",
  },
];

const minuteIntervalsInSeconds = {
  1: 60,
  5: 300,
  10: 600,
  30: 1800,
  60: 3600,
};

export const IntervalOptions = [
  {
    value: 5,
    label: "5 Seconds",
  },
  {
    value: 10,
    label: "10 Seconds",
  },
  {
    value: 30,
    label: "30 Seconds",
  },
  {
    value: minuteIntervalsInSeconds[1],
    label: "1 Minute",
  },
  {
    value: minuteIntervalsInSeconds[5],
    label: "5 Minutes",
  },
  {
    value: minuteIntervalsInSeconds[10],
    label: "10 Minutes",
  },
  {
    value: minuteIntervalsInSeconds[30],
    label: "30 Minutes",
  },

  {
    value: minuteIntervalsInSeconds[60],
    label: "1 Hour",
  },
];
