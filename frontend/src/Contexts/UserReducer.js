const UserReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN": {
        console.log("Login Invoked")
        return {
          user: true,
        };
      }
      case "LOGOUT": {
        console.log("Logged Out");
        return {
          user: false,
        };
      }
      default:
        return state;
    }
  };
  
  export default UserReducer;