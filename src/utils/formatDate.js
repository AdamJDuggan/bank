const formatDate = (ts) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dateToString = parseInt(ts);
  const date = new Date(dateToString);
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} `;
};

const formatTime = (ts) => {
  const dateToString = parseInt(ts);
  const date = new Date(dateToString);
  let amPm = "";
  if (date.getHours() < 13) amPm = "AM";
  else {
    amPm = "PM";
  }
  const minutes = date.getMinutes();
  if (minutes < 10) return `${date.getHours()}:0${date.getMinutes()}${amPm}`;
  else {
    return `${date.getHours()}:${date.getMinutes()}${amPm}`;
  }
};

const differenceInTime = (start, end) => {
  const startStr = parseInt(start);
  const endStr = parseInt(end);
  const differenceInMinutes =
    Math.abs(new Date(endStr) - new Date(startStr)) / 1000 / 60;
  let hours = differenceInMinutes / 60;
  let remainingHours = Math.floor(hours);
  let minutes = (hours - remainingHours) * 60;
  let remainingMinutes = Math.round(minutes);
  if (remainingMinutes < 10) remainingMinutes = `0${remainingMinutes}`;

  return `${remainingHours}:${remainingMinutes}`;
};

const differenceInTimeHours = (start, end) => {
  const startStr = parseInt(start);
  const endStr = parseInt(end);
  let differenceInMinutes = Math.abs(
    new Date(endStr) - new Date(startStr) / 1000 / 60
  );
  differenceInMinutes = Math.round(differenceInMinutes / 1000 / 60);
  let hours = differenceInMinutes / 60;
  let remainingHours = Math.floor(hours);
  let minutes = (hours - remainingHours) * 60;
  let remainingMinutes = Math.floor(minutes);
  if (remainingMinutes < 10) remainingMinutes = `0${remainingMinutes}`;
  if (hours < 1) return `${minutes} minutes`;
  else {
    return `${remainingHours}.${remainingMinutes} hours`;
  }
};

export { formatDate, formatTime, differenceInTime, differenceInTimeHours };
