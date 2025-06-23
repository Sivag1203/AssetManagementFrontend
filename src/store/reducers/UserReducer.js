const initialState = {
  id: "",
  name: "",
  email: "",
  phone: "",
  department: "",
  address: "",
  role: ""
};

const UserReducer = (state = initialState, action) => {
  if (action.type === "SET_USER_DETAILS") {
    return {
      ...state,
      ...action.payload // Payload will include all fields
    };
  }
  if (action.type === "DELETE_USER_DETAILS") {
    return initialState;
  }
  return state;
};

export default UserReducer;
