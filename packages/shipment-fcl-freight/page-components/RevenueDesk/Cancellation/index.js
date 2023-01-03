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

	const [show, setShow] = useState(false);

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
		onClose,
	});

	const handleCancelSubmit = () => {
		ref?.current?.handleSubmit();
	};

	const showOptions = () => {
		setShow(!show);
	};

	const renderBody = (
		<div>
			<button
				onClick={() => { setShowCancel(true); }}
				className={styles.button_text}
			>
				Cancel Shipment
			</button>
		</div>
	);

	return (
		<div>
			<Popover
				placement="left"
				visible={show && !showCancel}
				show={show}
				onClickOutside={() => setShow(false)}
				render={renderBody}
			>
				<Button
					themeType="tertiary"
					onClick={showOptions}
				>
					<IcMOverflowDot />
				</Button>
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
								themeType="secondary"
								onClick={onClose}
								// disabled={loading}
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
