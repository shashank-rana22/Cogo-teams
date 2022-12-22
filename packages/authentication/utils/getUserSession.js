import { request } from '@cogoport/request/helpers/request';

const getUserSession = (ctx) => request.get('/get_user_session', { ctx });

export default getUserSession;
