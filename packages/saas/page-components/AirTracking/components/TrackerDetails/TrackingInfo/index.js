import { isEmpty } from '@cogoport/utils';

import useGetCurrentInfo from '../../../hooks/useGetCurrentInfo';
import useGetShipmentInfo from '../../../hooks/useGetTrackingInfo';

import InfoContainer from './InfoContainer';
import Loader from './Loader';
import Maps from './Map';
import MilestoneStepper from './MilestoneStepper';
import styles from './styles.module.css';

import EmptyState from '@/ui/page-components/air-ocean-tracking/common/EmptyState';

function TrackingInfo() {
	const { loading, data, trackingType } = useGetShipmentInfo();
	const {
		container_details = [], shipment_info, poc_details = [], data: trackingInfo = [], airway_bill_no = '',
		commodity_details, tracking_status = '',
	} = data || {};

	const {
		combineMileStoneList,
		currContainerDetails,
		setCurrContainerDetails,
	} = useGetCurrentInfo({ data, trackingType });

	if (loading) {
		return <Loader type={trackingType} />;
	}

	if (tracking_status !== 'Found' || isEmpty(trackingInfo)) {
		return (
			<EmptyState />
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.info_container}>
				<InfoContainer
					airwayBillNo={airway_bill_no}
					containerDetails={container_details}
					currContainerDetails={currContainerDetails}
					shipmentInfo={shipment_info || commodity_details}
					setCurrContainerDetails={setCurrContainerDetails}
					trackingType={trackingType}
					poc_details={poc_details}
				/>
				<div className={styles.milestone_container}>
					<MilestoneStepper combineMileStoneList={combineMileStoneList} trackingType={trackingType} />
				</div>

			</div>
			<div className={styles.section}>
				<Maps
					data={data}
					trackingInfo={trackingInfo}
					trackingType={trackingType}
					currContainerDetails={currContainerDetails}
					height="83vh"
				/>

			</div>
		</div>
	);
}

export default TrackingInfo;
