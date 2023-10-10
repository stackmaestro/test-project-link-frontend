export const arePresent = (links) => {
  let flag = false;
  for (const key in links) {
    if (links[key]) {
      flag = true;
      break;
    }
  }
  return flag;
};
