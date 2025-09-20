export const getCurrentArgentinaTime = () => {
  const now = new Date();
  const offset = -3 * 60; // UTC-3
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utc + offset * 60000);
};
