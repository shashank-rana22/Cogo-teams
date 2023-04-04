import { RadioGroup, Input } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

// import Layout from '../../Layout';
// import getShowElements from '../helpers/getShowElements';

import styles from './styles.module.css';

function CancellationModal({
	isIE = '',
	showRequest = '',
	formValues = {},
	handleSubmit = () => {},
	onSubmit = () => {},
	loading = false,
	// fields = { fields },
	modifiedControls = [],
	disabledButton = false,
	onErrors = () => {},
	errors = {},
	handleClose = () => {},
}) {
	// const showElements = getShowElements(formValues);
	const [value, onChange] = useState('');

	const options = [
		{ name: 'R1', value: 'R1', label: 'Got a better offer' },
		{ name: 'R2', value: 'R2', label: 'Have not received a confirmation for this service yet' },
		{ name: 'R3', value: 'R3', label: 'I have changed by mind' },
		{ name: 'R4', value: 'R4', label: 'Other issues' },
	];

	return (
		// <div className={isIE ? 'ie' : ''}>
		<div className={styles.container}>
			<div className={styles.form}>
				<div>Please select a reason for cancelling the shipment</div>
				<div className={styles.radio_container}>
					<RadioGroup options={options} onChange={onChange} value={value} />
				</div>
				{!isEmpty(value) ? (
					<div>
						<div>
							Could you share with us the cost difference? (We&apos;ll try to get a better rate next time)
						</div>
						<Input className={styles.input} size="sm" />
					</div>
				) : null}
			</div>
		</div>
	);
}

export default CancellationModal;
