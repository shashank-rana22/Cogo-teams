import { Popover, Button, Modal } from '@cogoport/components';
import { IcMOverflowDot } from '@cogoport/icons-react';
import React, { useState, useRef } from 'react';

import CancellationModal from '../../../commons/CancellationModal';
import useUpdateCancelShipment from '../../../hooks/revenueDeskHooks/useUpdateCancelShipment';

import styles from './styles.module.css';

function Cancellation({
	data = {},
	refetch = () => {},
	setShowBookingOption = () => {},
}) {
	const { id } = data;
	const [showCancel, setShowCancel] = useState(false);
	const ref = useRef(null);

	const onClose = () => {
		setShowCancel(false);
	};

	const {
		loading,
		errors,
		onError,
		onSubmit,
	} = useUpdateCancelShipment({
		id,
		setShowCancel,
		refetch,
		setShowBookingOption,
	});

	const handleCancelSubmit = () => {
		ref?.current?.handleSubmit();
		onClose();
	};

	return (
		<div>
			<Popover
				placement="bottom"
				render={(
					<div>
						<Button
							onClick={() => { setShowCancel(true); }}
							className={styles.button_text}
						>
							Cancel Shipment
						</Button>
					</div>
				)}
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
						<CancellationModal
							ref={ref}
							loading={loading}
							errors={errors}
							onSubmit={onSubmit}
							onError={onError}

						/>
					</Modal.Body>
					<Modal.Footer>
						<div className={styles.button_div}>
							<Button
								onClick={onClose}
								disabled={loading}
								style={{ marginRight: '8px' }}
							>
								Cancel
							</Button>
							<Button onClick={handleCancelSubmit}>
								{ !loading ? 'Confirm Cancellation' : 'Confirming...' }
							</Button>
						</div>
					</Modal.Footer>
				</Modal>
			) : null}
		</div>
	);
}

export default Cancellation;
