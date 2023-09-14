import { ShipmentDetailContext } from '@cogoport/context';
import { isEmpty } from '@cogoport/utils';
import { useMemo, useState } from 'react';

import AddPrimaryPocModal from '../../../../../common/AddPrimaryPocModal';
import EmptyState from '../../../../../common/EmptyState';
import PocContainer from '../../../../../common/PocContainer';
import ShipmentChatModal from '../../../../../common/ShipmentChatModal';
import ShipmentsCard from '../../../../../common/ShipmentsCard';

import styles from './styles.module.css';

function ShipmentActivities({
	transactional = {}, viewType = '', fetchActivityLogs = () => {},
	setActiveTab = () => {},
	mailProps = {},
}) {
	const [showPopover, setShowPopover] = useState('');
	const [showPocModal, setShowPocModal] = useState({ show: false, shipmentData: {} });
	const [shipmentChat, setShipmentChat] = useState(null);
	const [showPocDetails, setShowPocDetails] = useState({});

	const { list = [] } = transactional;

	const contextValues = useMemo(() => ({
		shipment_data: shipmentChat,
	}), [shipmentChat]);

	const handleShipmentChat = ({ shipmentDetails }) => {
		setShipmentChat(shipmentDetails);
	};

	if (isEmpty(list)) {
		return (
			<EmptyState type="activities" />
		);
	}

	return (
		<>
			{(list || []).map((shipmentItem) => {
				const {
					serial_id = '',
				} = shipmentItem || {};

				if (!isEmpty(showPocDetails) && showPocDetails?.serial_id === serial_id) {
					return (
						<div className={styles.container} key={shipmentItem?.id}>
							<PocContainer
								showPocDetails={showPocDetails}
								setShowPocDetails={setShowPocDetails}
								setActiveTab={setActiveTab}
								handleShipmentChat={handleShipmentChat}
								mailProps={mailProps}
							/>
						</div>
					);
				}

				return (
					<div
						key={shipmentItem.id}
						className={styles.container}
					>
						<ShipmentsCard
							setShowPocDetails={setShowPocDetails}
							shipmentItem={shipmentItem}
							type="user_shipments"
							setShowShipmentChat={setShipmentChat}
							setShowPopover={setShowPopover}
							showPopover={showPopover}
							setShowPocModal={setShowPocModal}
							viewType={viewType}
							handleShipmentChat={handleShipmentChat}
						/>
					</div>
				);
			})}

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
