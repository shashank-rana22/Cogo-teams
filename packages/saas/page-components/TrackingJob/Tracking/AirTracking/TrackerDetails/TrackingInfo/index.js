import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../common/EmptyState';
import useGetCurrentInfo from '../../../../hooks/useCurrentInfo';
import useGetAirMilestones from '../../../../hooks/useGetAirMilestones';

import Loader from './Loader';
import MilestoneStepper from './MilestoneStepper';
import styles from './styles.module.css';

function TrackingInfo({ id = null, trackingType }) {
	const { loading, data, refetch } = useGetAirMilestones({ id, trackingType });

	const {
		combineMileStoneList,
	} = useGetCurrentInfo({ data, trackingType });
	if (loading) {
		return <Loader type="air" />;
	}
	if (!loading && isEmpty(combineMileStoneList)) {
		return (
			<EmptyState />
		);
	}
	return (
		<div className={styles.container}>
			<div className={styles.info_container}>
				<div className={styles.milestone_container}>
					<MilestoneStepper
						combineMileStoneList={combineMileStoneList}
						trackingType="air"
						refetch={refetch}
					/>
				</div>

			</div>
		</div>
	);
}

export default TrackingInfo;
