import { isEmpty } from '@cogoport/utils';

import useGetCurrentInfo from '../../../hooks/useCurrentInfo';
import useGetTruckMilestones from '../../../hooks/useGetTruckMilestones';

import InfoContainer from './InfoContainer';
import Loader from './Loader';
import MilestoneStepper from './MilestoneStepper';
import styles from './styles.module.css';

// import EmptyState from '@/ui/page-components/air-ocean-tracking/common/EmptyState';

function TrackingInfo({ id = null, trackingType }) {
	const { loading, data } = useGetTruckMilestones({ id, trackingType });
	console.log(data, 'data');
	const {
		container_details = [], shipment_info, poc_details = [], airway_bill_no = '', data: trackingInfo = [],
		commodity_details, tracking_status = '',
	} = data || {};

	const {
		combineMileStoneList,
		currContainerDetails,
		setCurrContainerDetails,
	} = useGetCurrentInfo({ data, trackingType });

	if (loading) {
		return <Loader type="air" />;
	}

	return (
		<div className={styles.container}>
			<div className={styles.info_container}>
				<InfoContainer
					airwayBillNo={airway_bill_no}
					containerDetails={container_details}
					// currContainerDetails={currContainerDetails}
					shipmentInfo={shipment_info || commodity_details}
					// setCurrContainerDetails={setCurrContainerDetails}
					trackingType="air"
					poc_details={poc_details}
				/>
				<div className={styles.milestone_container}>
					{/* <MilestoneStepper combineMileStoneList={combineMileStoneList} trackingType="air" /> */}
				</div>

			</div>
		</div>
	);
}

export default TrackingInfo;
