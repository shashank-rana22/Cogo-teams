import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../common/EmptyState';
import useGetCurrentInfo from '../../../../../hooks/useCurrentInfo';
import useGetTruckMilestones from '../../../../../hooks/useGetTruckMilestones';
import Loader from '../../../Loader';

import MilestoneStepper from './MilestoneStepper';
import styles from './styles.module.css';

function TrackingInfo({ id = null, trackingType = 'surface' }) {
	const { loading, data } = useGetTruckMilestones({ id, trackingType });
	const { truck_number = '', status = '', intugine_eta } = data?.tripinfo || {};

	const {
		combineMileStoneList,
	} = useGetCurrentInfo({ data, trackingType });

	if (loading) {
		return <Loader type="surface" />;
	}
	if (isEmpty(combineMileStoneList)) {
		return (
			<EmptyState />
		);
	}
	return (

		<div className={styles.info_container}>
			<p>

				Expected Arrival Time
				{' '}
				{formatDate({
					date       : intugine_eta,
					formatType : 'dateTime',
					separator  : ' ',
				})}

			</p>
			<div className={styles.milestone_container}>
				<MilestoneStepper
					combineMileStoneList={combineMileStoneList}
					trackingType="surface"
					status={status}
					truck_number={truck_number}
				/>
			</div>

		</div>

	);
}

export default TrackingInfo;
