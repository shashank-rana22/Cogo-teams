import { ShipmentDetailContext } from '@cogoport/context';
import { useContext } from 'react';

import ShipmentHeader from '../ShipmentHeader';
import ShipmentInfo from '../ShipmentInfo';
import TimeLine from '../TimeLine';

import styles from './styles.module.css';

function DefaultView() {
	const { shipment_data = {}, stakeholderConfig = {} } = useContext(ShipmentDetailContext) || {};

	const { features = [] } = stakeholderConfig || {};

	const conditionMapping = {
		shipment_info       : !!features.includes('shipment_info'),
		shipment_header     : !!features.includes('shipment_header'),
		poc_sop             : !!(features.includes('poc') || features.includes('sop')),
		chat                : !!features.includes('chat'),
		cancelDetails       : !!(features.includes('cancel_details') && shipment_data?.state === 'cancelled'),
		documentHoldDetails : !!features.includes('document_hold_details'),
		timeline            : !!features.includes('timeline'),
	};

	return (
		<div>
			<div className={styles.top_header}>
				<ShipmentInfo />
			</div>

			<div className={styles.header}>
				{conditionMapping.shipment_header ? <ShipmentHeader /> : null}
			</div>

			{conditionMapping.timeline ? <TimeLine /> : null}
		</div>
	);
}

export default DefaultView;
