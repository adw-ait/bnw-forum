export const postReducer = (state, action) => {
  switch (action.type) {
    case "CREATE_POST":
      console.log("create post");
      break;
    default:
      console.log("default case");
  }
};
