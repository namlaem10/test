export const types = {
  GET_DATA: 'GET_DATA',
};

export const actions = {
  get_data: () => {
    return async (dispatch) => {
      try {
        const response = await fetch(
          'https://gist.githubusercontent.com/nvthai/65dc75b2a575498d782748d4d0fabee4/raw/5742d9f7bb71abf4a1cc422c332b75a92e4ffad4/radio_songs.json',
        );
        if (response.status === 200) {
          const responseJson = await response.json();
          dispatch({
            type: types.GET_DATA,
            payload: {data: responseJson},
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
  },
};
const initialState = {
  data: null,
  type: null,
  error: null,
};
export const contentReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case types.GET_DATA: {
      return {
        type: types.GET_DATA,
        data: payload.data,
      };
    }
    default: {
      return state;
    }
  }
};
