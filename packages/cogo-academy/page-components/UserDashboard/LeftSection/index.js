import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import LoadingState from '../../../commons/LoadingState';

import Courses from './Courses';
import LastTestResults from './LastTestResults';
import Overview from './Overview';
import styles from './styles.module.css';

function LeftSection() {
	const {
		user: { name, id: user_id },
	} = useSelector(({ profile }) => ({
		user: profile.user,
	}));

	const [{ data, loading }] = useRequest({
		method : 'GET',
		url    : '/get_user_performance',
		params : {
			user_id,
		},
	}, { manual: false });

	const { data: usePerformanceData = {} } = data || {};

	return (
		<div className={styles.container}>
			{!loading ? (
				<>
					<div className={styles.user_name}>
						Hi,
						{' '}
						{name}
					</div>

					<LastTestResults data={usePerformanceData} />

					<Overview data={usePerformanceData} />
				</>
			) : (
				<div style={{ marginBottom: '44px' }}>
					<LoadingState rowsCount={2} />
				</div>
			)}

			<Courses />
		</div>
	);
}

export default LeftSection;
