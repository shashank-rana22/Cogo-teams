import { Modal, Table, Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import EmptyState from '../../../common/EmptyState';
import { columns } from '../../../config/truck-tracking-columns';

import styles from './styles.module.css';
import TrackingInfo from './TrackerDetails/TrackingInfo';

function TruckTracking({
	loading = false,
	list = [],
	filters = {},
	setFilters = () => {},
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
		filters,
		setFilters,
	});
	if (isEmpty(list)) {
		return <EmptyState />;
	}
	return (
		<div>

			<Table
				columns={column}
				data={list || []}
				className={styles.table}
				loading={loading}
			/>
			<Modal
				show={showUpdate.show}
				onClose={() => handleCloseModal()}
				onOuterClick={() => handleCloseModal()}
			>
				<Modal.Header title="Add Tracking Details" />
				<Modal.Body>
					<TrackingInfo
						id={showUpdate?.data?.trip_id}
						trackingType="surface"
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={() => handleCloseModal()}>Close</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default TruckTracking;
