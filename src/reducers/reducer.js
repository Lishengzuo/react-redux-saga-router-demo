import { combineReducers } from 'redux';
const intailUserinf = {
	data: []
}
function getUserInfor(state = intailUserinf, action) {
	switch(action.type) {
		case 'request_success':
			return Object.assign({}, state, { data: action.data })
		default:
			return state;
	}
}
export default combineReducers({
	getUserInfor
});