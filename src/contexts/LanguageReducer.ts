/* eslint-disable default-case */
/* eslint-disable @typescript-eslint/no-unused-expressions */
const storage = language => {
  typeof window !== "undefined" &&
    window.localStorage.setItem("lg", JSON.stringify(language || {}));
};

export const LanguageReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_LANGUAGE":
      storage(action.payload);
      return {
        ...state.language,
      };

    default:
      return state;
  }
};
