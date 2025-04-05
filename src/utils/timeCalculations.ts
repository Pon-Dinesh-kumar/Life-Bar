export const calculateAge = (birthDate: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

export const calculateTimeUnits = (birthDate: Date) => {
  const now = new Date();
  const diff = now.getTime() - birthDate.getTime();
  
  const seconds = diff / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const months = days / 30.436875; // Average month length
  const years = days / 365.25; // Account for leap years
  
  return {
    years: years,
    months: months % 12,
    days: days % 30.436875,
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: seconds % 60,
    total: {
      seconds,
      minutes,
      hours,
      days,
      months,
      years
    }
  };
};