import { useSelector } from '@cogoport/store';

import Courses from './Courses';
import LastTestResults from './LastTestResults';
import Overview from './Overview';
import styles from './styles.module.css';

function LeftSection() {
	const { profile: { user: { name } } } = useSelector((state) => state);

	return (
		<div className={styles.container}>
			<div className={styles.user_name}>
				Hi,
				{' '}
				{name}
			</div>

			<LastTestResults />

			<Overview />

			<Courses />
		</div>
	);
}

export default LeftSection;
