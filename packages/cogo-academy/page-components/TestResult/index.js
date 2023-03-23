import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import Header from './Header';
import QnA from './QnA';
import Summary from './Summary';

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

	const { data:summaryData } = data || {};

	return (
		<div>
			<Header />
			<Summary summaryData={summaryData} loading={loading} />
			<QnA />
		</div>
	);
}

export default TestResult;
