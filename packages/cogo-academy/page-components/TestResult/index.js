import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import QnA from './QnA';

function TestResult() {
	const {
		profile: { user: { id: user_id } },
		general: { query: { test_id } },
	} = useSelector((state) => state);

	const [{ data, loading }] = useRequest({
		method : 'GET',
		url    : 'get_user_performance',
		params : {
			test_id,
			user_id,
		},
	}, { manual: false });

	return (
		<QnA />
	);
}

export default TestResult;
