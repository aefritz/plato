const convertErrorToBool = (value) => {
  try {
    if (JSON.parse(value)) return true;
  } catch (e) {
    return false;
  }
};

export default convertErrorToBool;
