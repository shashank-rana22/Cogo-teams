import { useRouter } from '@cogoport/next';

import useGetSailingSchedule from '../hooks/useGetSailingSchedule';

import Header from './Header';
import styles from './styles.module.css';

function SailingScheduleDetails() {
	const { query } = useRouter();
	const { id = '' } = query;
	const { data } = useGetSailingSchedule({ id });
	return (
		<div className={styles.container}>
			<Header sailingSchedule={data} />
		</div>
	);
}

export default SailingScheduleDetails;
