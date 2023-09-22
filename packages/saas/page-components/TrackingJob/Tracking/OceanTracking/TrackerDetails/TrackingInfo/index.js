import useGetCurrentInfo from '../../../../hooks/useCurrentInfo';
import useGetContainerMilestones from '../../../../hooks/useGetContainerMilestones';

import Loader from './Loader';
import MilestoneStepper from './MilestoneStepper';
import styles from './styles.module.css';

function TrackingInfo({ id = null }) {
	const { loading, data } = useGetContainerMilestones({ id });

	const {
		combineMileStoneList,
	} = useGetCurrentInfo({ data, trackingType: 'ocean' });

	if (loading) {
		return <Loader type="air" />;
	}

	return (
		<div className={styles.container}>
			<div className={styles.info_container}>
				<p>{data?.shipment_details?.[0]?.container_no}</p>
				<div className={styles.milestone_container}>
					<MilestoneStepper combineMileStoneList={combineMileStoneList} trackingType="ocean" />
				</div>

			</div>
		</div>
	);
}

export default TrackingInfo;
