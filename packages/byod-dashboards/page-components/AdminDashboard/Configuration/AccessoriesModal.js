import { Modal, Select, Button, Input } from '@cogoport/components';
import React from 'react';

import useUpdateDeviceDetails from '../../../hooks/useUpdateDeviceDetails';

import styles from './styles.module.css';

const ACCESSORIES_OPTIONS = [
	{ value: 'printer', label: 'Printer' },
	{ value: 'headset', label: 'Headset' },
	{ value: 'wireless_keyboard', label: 'Wireless Keyboard' },
];
const SOURCE = 'AddonDetails';
const NOT_MATCHED = -1;

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
	id = '',
	addon_details = [],
	getEmployeeReimbursementGroup = () => {},

}) {
	const {	btnloading, updateDeviceDetails } = useUpdateDeviceDetails(
		{ id, SOURCE, setShowAccessories, getEmployeeReimbursementGroup },
	);

	const onSubmit = () => {
		const newData = {
			addon_type               : accessoriesValue,
			reimbursement_percentage : reimbusableValue,
			max_reimbursement_amount : maxAmount,

		};
		const finalData = [...addon_details];
		const existingIndex = addon_details.findIndex((item) => item.addon_type === newData.addon_type);

		if (existingIndex !== NOT_MATCHED) {
			addon_details[existingIndex].reimbursement_percentage = newData.reimbusableValue;
			addon_details[existingIndex].max_reimbursement_amount = newData.maxAmount;
		}

		finalData.push(newData);

		updateDeviceDetails({ addon_details: finalData });
	};

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
							onChange={(val) => setReimbusableValue(parseFloat(val))}
							value={reimbusableValue}
						/>

					</div>
					<div>
						<div className={styles.text_container}>Set Max Amount</div>

						<Input
							placeHolder="Max Amount"
							onChange={(val) => setMaxAmount(parseFloat(val))}
							value={maxAmount}
						/>
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button loading={btnloading} onClick={() => onSubmit()}>save</Button>
			</Modal.Footer>
		</Modal>
	);
}
export default AccessoriesModal;
