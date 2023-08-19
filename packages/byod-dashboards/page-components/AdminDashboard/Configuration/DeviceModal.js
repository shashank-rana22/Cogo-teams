import { Modal, Select, Button, Input } from '@cogoport/components';
import React from 'react';

import useUpdateDeviceDetails from '../../../hooks/useUpdateDeviceDetails';

import styles from './styles.module.css';

const DEVICE_OPTIONS = [
	{ value: 'macbook', label: 'MacBook' },
	{ value: 'windows_laptop', label: 'Windows Laptop' },
];
const SOURCE = 'DeviceDetails';
const NOT_MATCHED = -1;

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
	id = '',
	device_details = [],
	getEmployeeReimbursementGroup = () => {},

}) {
	const {	btnloading, updateDeviceDetails } = useUpdateDeviceDetails(
		{ id, SOURCE, setShowDevice, getEmployeeReimbursementGroup },
	);
	const onSubmit = () => {
		const newData = {
			device_type              : deviceValue,
			reimbursement_percentage : reimbusableValue,
			max_reimbursement_amount : maxAmount,

		};
		const finalData = [...device_details];

		const existingIndex = device_details.findIndex((item) => item.device_type === newData.device_type);

		if (existingIndex !== NOT_MATCHED) {
			device_details[existingIndex].reimbursement_percentage = newData.reimbusableValue;
			device_details[existingIndex].max_reimbursement_amount = newData.maxAmount;
		}

		finalData.push(newData);

		updateDeviceDetails({ device_details: finalData });
	};

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
							onChange={(val) => setReimbusableValue(parseFloat(val))}
							value={reimbusableValue}
							type="number"
						/>

					</div>
					<div>
						<div className={styles.text_container}>Set Max Amount</div>

						<Input
							placeHolder="Max Amount"
							onChange={(val) => setMaxAmount(parseFloat(val))}
							value={maxAmount}
							type="number"
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
export default DeviceModal;
