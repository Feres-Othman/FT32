import * as actionType from '../../constants/actionTypes';

const ajoutReducer = (state = { ajouthData: null }, action) => {
  switch (action.type) {
    case actionType.AJOUT:
      localStorage.setItem('ajout', JSON.stringify({ ...action?.data }));

      return { ...state, ajouthData: action.data, loading: false, errors: null };
      case actionType.DELETE:
        return { ...state, items: state.items.filter((item) => item._id !== action.payload) };
    default:
      return state;

  }
};

export default ajoutReducer;
