import { useForm, SelectController, InputController } from '@cogoport/forms';
import React, { useImperativeHandle, forwardRef } from 'react';

import CancellationOptions from './get-cancellation-options';
import styles from './styles.module.css';

function CancellationModal({
	onSubmit = () => {},
	onError = () => {},
}, ref) {
	const { control, handleSubmit } = useForm();

	useImperativeHandle(ref, () => ({
		handleSubmit: handleSubmit(onSubmit, onError),
	}));

	return (
		<div className={styles.container}>
			<form className={styles.form}>

				<label>Please select Cancellation Reason</label>
				<SelectController
					control={control}
					name="cancellation_reason"
					options={CancellationOptions}

				/>

				<label>Remarks</label>
				<InputController name="cancellation_subreason" placeholder="Type here..." control={control} />

			</form>
			<div className={styles.line} />
		</div>
	);
}

export default forwardRef(CancellationModal);
