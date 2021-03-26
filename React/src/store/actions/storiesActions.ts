export const addStories = (stories: any) => {
  return (dispatch: any, getState: any) => {
    //make calls
    dispatch({ type: 'ADD_STORIES', stories });
  };
};
