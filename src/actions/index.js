export const increment = (number) => {
  return {
    type: "INCREMENT",
    payload: number,
  };
};

export const signin = () => {
  return {
    type: "SIGN_IN",
  };
};
