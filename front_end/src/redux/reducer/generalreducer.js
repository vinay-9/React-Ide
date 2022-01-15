import { generalstate } from '../gvariables'

const GeneralReducer = (state = generalstate, action) => {
	// eslint-disable-next-line default-case
	switch (action.type) {
		case 'ADD_ID':
			state = {
				...state,
				id: action.id
			}
			break;
		
	}

	return state
}

export default GeneralReducer
