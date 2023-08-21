import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import AddPrimaryPocModal from '../../../../../common/AddPrimaryPocModal';
import EmptyState from '../../../../../common/EmptyState';
import ShipmentsCard from '../../../../../common/ShipmentsCard';

import styles from './styles.module.css';

function ShipmentActivities({ transactional = {} }) {
	const [showPopover, setShowPopover] = useState('');
	const [showPocModal, setShowPocModal] = useState({ show: false, shipmentData: {} });

	const { list = [] } = transactional;

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
					/>
				</div>
			))}

			{showPocModal?.show
				? (
					<AddPrimaryPocModal
						showPocModal={showPocModal}
						setShowPocModal={setShowPocModal}
					/>
				) : null}
		</>
	);
}

export default ShipmentActivities;
