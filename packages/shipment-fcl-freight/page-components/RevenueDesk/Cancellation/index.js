import { Popover, Button, Modal } from '@cogoport/components';
import { IcMOverflowDot } from '@cogoport/icons-react';
import React, { useState, useRef } from 'react';

import CancellationModal from '../../../commons/CancellationModal';

import CancelShipment from './CancelShipment';
import styles from './styles.module.css';

function Cancellation({
	data = {},
	refetch = () => {},
	setShowBookingOption = () => {},
}) {
	const { id } = data;
	const [showCancel, setShowCancel] = useState(false);
	const ref = useRef(null);

	const renderBody = () => (
		<CancelShipment
			setShowCancel={setShowCancel}
		/>

	);
	const onClose = () => {
		setShowCancel(false);
	};
	const handleCancelSubmit = () => {
		ref?.current?.handleSubmit();
	};
	return (
		<div>
			<Popover
				placement="bottom"
				render={renderBody}
			>
				<div>
					<IcMOverflowDot />
				</div>
			</Popover>
			{showCancel ? (
				<Modal
					size="md"
					show={showCancel}
					onClose={onClose}
					placement="center"
				>
					<Modal.Header title="Cancel Shipment" />
					<Modal.Body>
						<CancellationModal ref={ref} />
					</Modal.Body>
					<Modal.Footer>
						<div className={styles.button_div}>
							<Button
								onClick={onClose}
							// disabled={loading || disabledButton}
								style={{ marginRight: '8px' }}
							>
								Cancel
							</Button>
							<Button onClick={handleCancelSubmit}>
								Confirm Cancellation
							</Button>
						</div>
					</Modal.Footer>
				</Modal>
			) : null}
		</div>
	);
}

export default Cancellation;
