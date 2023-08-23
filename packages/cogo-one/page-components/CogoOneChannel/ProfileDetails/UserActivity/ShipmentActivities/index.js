import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import AddPrimaryPocModal from '../../../../../common/AddPrimaryPocModal';
import EmptyState from '../../../../../common/EmptyState';
import ShipmentsCard from '../../../../../common/ShipmentsCard';
import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../../../constants/viewTypeMapping';

import styles from './styles.module.css';

function ShipmentActivities({
	transactional = {}, viewType = '', fetchActivityLogs = () => {},
	setActiveTab = () => {},
}) {
	const [showPopover, setShowPopover] = useState('');
	const [showPocModal, setShowPocModal] = useState({ show: false, shipmentData: {} });

	const { list = [] } = transactional;

	const showAddPrimaryUserButton = VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions?.show_shipments_home_page;

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
						setShowPopover={setShowPopover}
						showPopover={showPopover}
						setShowPocModal={setShowPocModal}
						showAddPrimaryUserButton={showAddPrimaryUserButton}
					/>
				</div>
			))}

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
