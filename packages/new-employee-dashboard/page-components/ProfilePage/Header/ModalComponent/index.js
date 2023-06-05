import { Input } from '@cogoport/components';
import React from 'react';

import getControls from '../../../../utils/ctc-modal-form-controls';
import { getElementController } from '../../../../utils/get-element-controls';

import styles from './styles.module.css';

function ModalComponent({
	ctcStructure,
	initialQuestion,
	setInitialQuestion,
	// formProps,
	control,
}) {
	// const { control } = formProps;

	const finalControls = getControls(initialQuestion);
	return (
		<div>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<div className={styles.control_label}>
					Input Target Annual Gross Salary (Fixed component)
				</div>
				<Input
					placeholder="Set Offered CTC"
					value={initialQuestion}
					onChange={(e) => setInitialQuestion(e)}
					type="number"
					className={styles.field_controller}
				/>
			</div>

			<div className={styles.table_container}>
				<div className={styles.heading}>
					<h4 style={{ width: '60%' }}>Components</h4>
					<h4 style={{ width: '20%' }}>Annual Salary</h4>
					<h4 style={{ width: '20%' }}>Monthly Salary</h4>
				</div>

				{Object.entries(ctcStructure).map(([key, value]) => {
					console.log(ctcStructure?.total_targeted_compensation,'ejkfb')
        	const { heading, yearlyValue, monthlyValue } = value;
        	return (
	<div className={styles.list} key={key}>
		<div style={{ width: '60%' }}>{heading ?? '___'}</div>
		<div style={{ width: '20%' }}>
			{Number(yearlyValue || 0).toFixed(2) ?? '___'}
		</div>
		<div style={{ width: '20%' }}>
			{(Number(monthlyValue || 0).toFixed(2)) ?? '___'}
		</div>
	</div>
        	);
				})}
			</div>

			{finalControls.map((controlItem) => {
      	const { yearly, monthly } = controlItem;

      	const Element = getElementController(controlItem?.yearly.type);

      	if (!Element) return null;

      	return (
	<div key={yearly.name} className={styles.control_container}>
		<span className={styles.control_label}>{yearly.label}</span>
		<Element
			{...yearly}
			size="sm"
			key={yearly.name}
			control={control}
			className={styles.field_controller}
		/>
		<Element
			{...monthly}
			size="sm"
			key={monthly.name}
			control={control}
			className={styles.field_controller}
		/>
	</div>
      	);
			})}
		</div>
	);
}

export default ModalComponent;
