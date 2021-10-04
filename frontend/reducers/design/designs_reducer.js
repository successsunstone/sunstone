import { RECEIVE_DESIGNS, RECEIVE_DESIGN, REMOVE_DESIGN } from '../../actions/design_actions';
import { RECEIVE_FOLDER } from '../../actions/folder_actions';
import { CREATE_ELEMENT } from '../../actions/element_actions';

const designsReducer = (state = {}, action) => {
  Object.freeze(state);
  const nextState = { ...state };
  switch (action.type) {
    case RECEIVE_DESIGNS:
      return { ...state, ...action.designs };
    case RECEIVE_DESIGN:
      if (action.payload.design)
        return { ...state, ...{ [action.payload.design.id]: action.payload.design } };
      else
        console.log(action)
    case REMOVE_DESIGN:
      delete nextState[action.payload.design.id];
      return nextState;
    case CREATE_ELEMENT:
      const newDesign = { ...nextState[action.designId] };
      newDesign.elements = [...nextState[action.designId].elements, action.element.id];
      return { ...state, [newDesign.id]: newDesign };
    case RECEIVE_FOLDER:
      return { ...state, ...action.payload.designs };
    default:
      return state;
  }
  return state;
};

export default designsReducer;
