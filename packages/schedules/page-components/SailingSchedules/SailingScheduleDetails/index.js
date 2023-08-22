import { useRouter } from '@cogoport/next';

import BackButton from '../../common/BackButtom';
import useGetSailingSchedule from '../hooks/useGetSailingSchedule';

import Details from './Details';
import Header from './Header';

function SailingScheduleDetails() {
	const { query } = useRouter();
	const { id = '' } = query;
	const { data, loading } = useGetSailingSchedule({ id });
	return (
		<div>
			<BackButton title="Back To Sailing Schedules" toPush="sailing-schedules" />
			<Header sailingSchedule={data} loading={loading} />
			<Details data={data} loading={loading} />
		</div>
	);
}

export default SailingScheduleDetails;
