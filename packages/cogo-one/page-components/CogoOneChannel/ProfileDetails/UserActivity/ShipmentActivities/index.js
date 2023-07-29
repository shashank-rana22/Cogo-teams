import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../common/EmptyState';
import ShipmentsCard from '../../../../../common/ShipmentsCard';

import styles from './styles.module.css';

function ShipmentActivities({ shipmentsData = {} }) {
	const { list = [] } = shipmentsData;

	if (isEmpty(list)) {
		return (
			<EmptyState type="activities" />
		);
	}

	return (
		<>
			{(list || []).map((shipmentItem) => (
				<div key={shipmentItem.id} className={styles.container}>
					<ShipmentsCard shipmentItem={shipmentItem} type="user_shipments" />
				</div>
			))}
		</>
	);
}

export default ShipmentActivities;
