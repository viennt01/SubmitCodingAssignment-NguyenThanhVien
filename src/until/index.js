export const formatTime = (time) => {
  const seconds = (time / 1000).toFixed(1);
  return `${seconds}s`;
};

export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
