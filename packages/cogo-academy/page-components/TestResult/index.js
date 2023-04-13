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
		query: { test_id, view, id, name: userName },
		user: { id: user_id, name },
	} = useSelector(({ general, profile }) => ({
		query : general.query,
		user  : profile.user,
	}));

	const { back } = useRouter();

	const [{ data, loading }] = useRequest({
		method : 'GET',
		url    : '/get_user_performance',
		params : {
			test_id,
			user_id: view === 'admin' ? id : user_id,
		},
	}, { manual: false });

	const { data: summaryData } = data || {};

	const handleGoBack = () => {
		back();
	};

	if (loading) {
		return <LoadingState />;
	}

	return (
		<div>
			<div role="presentation" onClick={handleGoBack} className={styles.go_back}>
				<IcMArrowBack />

				<p className={styles.go_back_text}>{view === 'admin' ? 'Test Results' : 'Dashboard'}</p>
			</div>

			{view !== 'admin'
				? <TestResultMessage stats_data={summaryData} />
				: (
					<div className={styles.test_user_name}>
						{summaryData.test_name}
						{' '}
						:
						{' '}
						<span><b>{userName}</b></span>
					</div>
				)}

			<Summary summaryData={summaryData} />

			<QnA
				user_name={view === 'admin' ? userName : name}
				test_id={test_id}
				user_id={view === 'admin' ? id : user_id}
			/>
		</div>
	);
}

export default TestResult;
