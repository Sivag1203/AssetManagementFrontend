// export const setUserDetails = (dispatch) => (user) => {
//   dispatch({
//     type: "SET_USER_DETAILS",
//     payload: user
//   });
// };

// export const deleteUserDetails = (dispatch) => {
//   dispatch({
//     type: "DELETE_USER_DETAILS"
//   });
// };


export const setUserDetails = (user) => {
  return {
    type: "SET_USER_DETAILS",
    payload: user
  };
};

export const deleteUserDetails = () => {
  return {
    type: "DELETE_USER_DETAILS"
  };
};
