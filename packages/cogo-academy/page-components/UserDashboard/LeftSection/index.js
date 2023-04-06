import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

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

	const [{ data }] = useRequest({
		method : 'GET',
		url    : '/get_user_performance',
		params : {
			user_id,
		},
	}, { manual: false });

	const { data: usePerformanceData = {} } = data || {};

	return (
		<div className={styles.container}>
			<div className={styles.user_name}>
				Hi,
				{' '}
				{name}
			</div>

			<LastTestResults data={usePerformanceData} />

			<Overview data={usePerformanceData} />

			<Courses />
		</div>
	);
}

export default LeftSection;
