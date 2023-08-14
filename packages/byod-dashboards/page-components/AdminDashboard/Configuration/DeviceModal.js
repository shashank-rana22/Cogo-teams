import { Modal, Select, Button, Input } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const DEVICE_OPTIONS = [
	{ value: 'macbook', label: 'MacBook' },
	{ value: 'windows_laptop', label: 'DELL' },
];

function DeviceModal({
	source,
	setReimbusableValue = () => {},
	reimbusableValue,
	setMaxAmount = () => {},
	maxAmount,
	deviceValue,
	setDeviceValue = () => {},
	showDevice = true,
	setShowDevice = () => {},
	setShowModal = () => {},

}) {
	return (
		<Modal
			size="md"
			closeOnOuterClick
			show={showDevice}
			onClose={() => {
				setShowDevice(false);
				setShowModal('');
			}}
			placement="center"
		>
			<Modal.Header title={source} />
			<Modal.Body>
				<div>
					<div className={styles.modal_content}>
						<div className={styles.text_container}>
							Select Device
						</div>

						<Select
							options={DEVICE_OPTIONS}
							value={deviceValue}
							onChange={(e) => {
								setDeviceValue(e);
							}}
						/>
					</div>

					<div>
						<div className={styles.text_container}>Set Reimbursable %</div>

						<Input
							placeHolder="Reimbursable %"
							onChange={(val) => setReimbusableValue(val)}
							value={reimbusableValue}
						/>

					</div>
					<div>
						<div className={styles.text_container}>Set Max Amount</div>

						<Input placeHolder="Max Amount" onChange={(val) => setMaxAmount(val)} value={maxAmount} />
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button>save</Button>
			</Modal.Footer>
		</Modal>
	);
}
export default DeviceModal;
