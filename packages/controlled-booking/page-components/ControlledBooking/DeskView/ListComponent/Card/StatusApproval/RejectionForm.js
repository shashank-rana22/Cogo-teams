import { CheckboxGroupController, TextAreaController } from '@cogoport/forms';
import React from 'react';

import styles from './styles.module.css';

function RejectionForm({ control, errors }) {
	return (
		<>
			<div>Rejection category</div>
			<div className={styles.form_element}>
				<CheckboxGroupController
					name="rejection_category"
					control={control}
					size="md"
					options={[{
						label: 'Cargo Value', value: 'cargo_value',
					}, {
						label: 'Customer', value: 'customer',
					}, {
						label: 'Commodity', value: 'commodity',
					},
					]}
					className={styles.checkbox_controller}
					rules={{ required: 'This field is required' }}
				/>
				{errors?.rejection_category ? <div className={styles.error_message}>{errors.ids.message}</div> : null}
			</div>

			<div style={{ marginBottom: 8 }}>Rejection Reason</div>
			<div className={styles.form_element}>
				<TextAreaController
					name="rejection_reason"
					control={control}
					size="md"
					rows={4}
					placeholder="Please input your Rejection Reason."
					rules={{ required: 'This field is required' }}
				/>
				{errors?.rejection_category ? <div className={styles.error_message}>{errors.ids.message}</div> : null}
			</div>
		</>
	);
}

export default RejectionForm;
