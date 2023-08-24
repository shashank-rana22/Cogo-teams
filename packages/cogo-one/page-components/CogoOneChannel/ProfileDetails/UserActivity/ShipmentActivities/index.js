import { ShipmentDetailContext } from '@cogoport/context';
import { isEmpty } from '@cogoport/utils';
import { useMemo, useState } from 'react';

import AddPrimaryPocModal from '../../../../../common/AddPrimaryPocModal';
import EmptyState from '../../../../../common/EmptyState';
import ShipmentChatModal from '../../../../../common/ShipmentChatModal';
import ShipmentsCard from '../../../../../common/ShipmentsCard';
import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../../../constants/viewTypeMapping';

import styles from './styles.module.css';

function ShipmentActivities({
	transactional = {}, viewType = '', fetchActivityLogs = () => {},
	setActiveTab = () => {},
}) {
	const [showPopover, setShowPopover] = useState('');
	const [showPocModal, setShowPocModal] = useState({ show: false, shipmentData: {} });
	const [shipmentChat, setShipmentChat] = useState(null);

	const { list = [] } = transactional;

	const contextValues = useMemo(() => ({
		shipment_data: shipmentChat,
	}), [shipmentChat]);

	const showAddPrimaryUserButton = VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions?.show_shipments_home_page;

	const handleShipmentChat = ({ shipmentItem }) => {
		setShipmentChat(shipmentItem);
	};

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
						setShowPopover={setShowPopover}
						showPopover={showPopover}
						setShowPocModal={setShowPocModal}
						showAddPrimaryUserButton={showAddPrimaryUserButton}
						handleShipmentChat={handleShipmentChat}
					/>
				</div>
			))}

			<ShipmentDetailContext.Provider value={contextValues}>
				<ShipmentChatModal
					showShipmentChat={shipmentChat}
					setShowShipmentChat={setShipmentChat}
				/>
			</ShipmentDetailContext.Provider>

			{showPocModal?.show
				? (
					<AddPrimaryPocModal
						showPocModal={showPocModal}
						setShowPocModal={setShowPocModal}
						fetchActivityLogs={fetchActivityLogs}
						setActiveTab={setActiveTab}
					/>
				) : null}
		</>
	);
}

export default ShipmentActivities;
