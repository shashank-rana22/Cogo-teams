import { Modal, Button } from '@cogoport/components';
import React from 'react';

import TrackingInfo from '../TrackingInfo';

import styles from './styles.module.css';

function ViewTracking({ showUpdate = {}, setShowUpdate = () => {} }) {
	const { show = false, data = {} } = showUpdate || {};

	const handleCloseModal = () => setShowUpdate({ show: false, data: {} });

	return show ?		(
		<Modal
			show={show}
			onClose={() => handleCloseModal()}
			onOuterClick={() => handleCloseModal()}
			size="xl"
			placement="top"
		>
			<Modal.Header title="View Tracking Status" />

			<Modal.Body>
				<div className={styles.details}>
					<div>
						<div>Service Provider : </div>
						<b>{data?.service_provider?.short_name}</b>
					</div>
					<div className={styles.truck_no}>
						<div>Truck Number : </div>
						<b>{data?.truck_number}</b>
					</div>
				</div>

				<TrackingInfo id={data?.trip_id} />
			</Modal.Body>

			<Modal.Footer>
				<Button onClick={() => handleCloseModal()}>Close</Button>
			</Modal.Footer>
		</Modal>
	) : null;
}

export default React.memo(ViewTracking);
