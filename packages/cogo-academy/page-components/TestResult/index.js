import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import TestResultMessage from '../../commons/TestResultMessage';

import LoadingState from './LoadingState';
import QnA from './QnA';
import styles from './styles.module.css';
import Summary from './Summary';

function TestResult() {
	const {
		query: { test_id },
		user: { id: user_id, name },
	} = useSelector(({ general, profile }) => ({
		query : general.query,
		user  : profile.user,
	}));

	const { push } = useRouter();

	const [{ data, loading }] = useRequest({
		method : 'GET',
		url    : '/get_user_performance',
		params : {
			test_id,
			user_id,
		},
	}, { manual: false });

	const { data: summaryData } = data || {};

	const handleGoBack = () => {
		push('/learning/tests/dashboard');
	};

	if (loading) {
		return <LoadingState />;
	}

	return (
		<div>
			<div role="presentation" onClick={handleGoBack} className={styles.go_back}>
				<IcMArrowBack />

				<p className={styles.go_back_text}>Dashboard</p>
			</div>

			<TestResultMessage stats_data={summaryData} />

			<Summary summaryData={summaryData} />

			<QnA user_name={name} />
		</div>
	);
}

export default TestResult;
