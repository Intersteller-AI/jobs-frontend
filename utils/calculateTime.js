export const calculateTime = (timestamp) => {
  const now = new Date();
  const pastDate = new Date(timestamp);
  const timeDifference = now - pastDate;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (seconds < 10) {
    return "just now";
  } else if (minutes < 1) {
    return "just now";
  } else if (minutes < 60) {
    return minutes + " minutes ago";
  } else if (hours < 1 && pastDate.getHours() === now.getHours()) {
    return "just now";
  } else if (hours < 1) {
    return minutes + " minutes ago";
  } else if (hours < 24) {
    return hours + " hours ago";
  } else if (days < 7) {
    return days + " days ago";
  } else {
    return weeks + " weeks ago";
  }
};
