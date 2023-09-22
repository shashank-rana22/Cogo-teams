import { Modal, Table } from '@cogoport/components';
import React, { useState } from 'react';

import { columns } from '../../config/truck-tracking-columns';

import styles from './styles.module.css';
import TrackingInfo from './TrackerDetails/TrackingInfo';

function TruckTracking({
	list = [],
}) {
	const [showUpdate, setShowUpdate] = useState({ show: false, data: {} });

	const handleShowModal = (item) => {
		setShowUpdate({ show: true, data: item });
	};

	const handleCloseModal = () => {
		setShowUpdate({ show: false, data: {} });
	};
	const column = columns({
		handleShowModal,
	});

	return (
		<div>

			<Table columns={column} data={list || []} className={styles.table} />
			<Modal
				show={showUpdate.show}
				onClose={() => handleCloseModal()}
				onOuterClick={() => handleCloseModal()}
			>
				<Modal.Body>
					<TrackingInfo
						id={showUpdate?.data?.trip_id}
						trackingType="surface"
					/>
				</Modal.Body>
			</Modal>
		</div>
	);
}

export default TruckTracking;
