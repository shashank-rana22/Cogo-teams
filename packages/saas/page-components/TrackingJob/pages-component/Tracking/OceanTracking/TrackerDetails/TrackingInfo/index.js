import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import useGetCurrentInfo from '../../../../../hooks/useCurrentInfo';
import useGetContainerMilestones from '../../../../../hooks/useGetContainerMilestones';
import Loader from '../../../Loader';

import MilestoneStepper from './MilestoneStepper';
import styles from './styles.module.css';

function TrackingInfo({ id = null }) {
	const { loading, data, refetch } = useGetContainerMilestones({ id });

	const {
		combineMileStoneList,
	} = useGetCurrentInfo({ data, trackingType: 'ocean' });

	if (loading) {
		return <Loader type="air" />;
	}

	return (
		<div className={styles.container}>
			<div className={styles.info_container}>
				<p>
					Container No:
					{' '}
					{data?.shipment_details?.[GLOBAL_CONSTANTS.zeroth_index]?.container_no}
				</p>
				<div className={styles.milestone_container}>
					<MilestoneStepper
						combineMileStoneList={combineMileStoneList}
						trackingType="ocean"
						refetch={refetch}
					/>
				</div>

			</div>
		</div>
	);
}

export default TrackingInfo;
