import { ShipmentDetailContext } from '@cogoport/context';
import { isEmpty } from '@cogoport/utils';
import { useMemo, useState } from 'react';

import EmptyState from '../../../../../common/EmptyState';
import ShipmentChatModal from '../../../../../common/ShipmentChatModal';
import ShipmentsCard from '../../../../../common/ShipmentsCard';

import styles from './styles.module.css';

function ShipmentActivities({ transactional = {} }) {
	const [shipmentChat, setShipmentChat] = useState(null);

	const { list = [] } = transactional;

	const contextValues = useMemo(() => ({
		shipment_data: shipmentChat,
	}), [shipmentChat]);

	if (isEmpty(list)) {
		return (
			<EmptyState type="activities" />
		);
	}

	return (
		<>
			{(list || []).map((shipmentItem) => (
				<div
					key={shipmentItem.id}
					className={styles.container}
				>
					<ShipmentsCard
						shipmentItem={shipmentItem}
						type="user_shipments"
						setShowShipmentChat={setShipmentChat}
					/>
				</div>
			))}

			<ShipmentDetailContext.Provider value={contextValues}>
				<ShipmentChatModal
					showShipmentChat={shipmentChat}
					setShowShipmentChat={setShipmentChat}
				/>
			</ShipmentDetailContext.Provider>
		</>

	);
}

export default ShipmentActivities;
