import { useRouter } from '@cogoport/next';

import BackButton from '../../common/BackButtom';
import useGetSailingSchedule from '../hooks/useGetSailingSchedule';

import Details from './Details';
import Header from './Header';
import styles from './styles.module.css';

function SailingScheduleDetails() {
	const { query } = useRouter();
	const { id = '' } = query;
	const { data, loading } = useGetSailingSchedule({ id });
	return (
		<div className={styles.container}>
			<BackButton title="Back To Sailing Schedules" key="sailing-schedules" />
			<Header sailingSchedule={data} loading={loading} />
			<Details data={data} loading={loading} />
		</div>
	);
}

export default SailingScheduleDetails;
