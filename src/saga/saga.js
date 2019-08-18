import Axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
function* getUserData() {
	const data = yield call(Axios.get, "https://jsonplaceholder.typicode.com/users");
	yield put({ type: 'request_success', data: data.data });
}
function* watchSaga() {
	yield takeEvery('request_data', getUserData);
}
export default watchSaga;