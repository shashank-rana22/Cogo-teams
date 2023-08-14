import { Modal, Select, Button, Input } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const ACCESSORIES_OPTIONS = [
	{ value: 'printer', label: 'Printer' },
	{ value: 'headset', label: 'Headset' },
	{ value: 'wireless_keyboard', label: 'Wireless Keyboard' },
];

function AccessoriesModal({
	source,
	setReimbusableValue = () => {},
	reimbusableValue,
	setMaxAmount = () => {},
	maxAmount,
	accessoriesValue,
	setAccessoriesValue = () => {},
	showAccessories = true,
	setShowAccessories = () => {},
	setShowModal = () => {},

}) {
	return (
		<Modal
			size="md"
			closeOnOuterClick
			show={showAccessories}
			onClose={() => {
				setShowAccessories(false);
				setShowModal('');
			}}
			placement="center"
		>
			<Modal.Header title={source} />
			<Modal.Body>
				<div>
					<div className={styles.modal_content}>
						<div className={styles.text_container}>
							Select Computer Accessories
						</div>

						<Select
							options={ACCESSORIES_OPTIONS}
							value={accessoriesValue}
							onChange={(e) => {
								setAccessoriesValue(e);
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
export default AccessoriesModal;
