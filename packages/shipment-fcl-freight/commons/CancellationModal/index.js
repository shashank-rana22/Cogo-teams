import { useForm, SelectController, InputController } from '@cogoport/forms';
import React, { useImperativeHandle, forwardRef } from 'react';

import CancellationOptions from './get-cancellation-options';
import styles from './styles.module.css';

function CancellationModal(props, ref) {
	const { control, handleSubmit } = useForm();

	const onSubmit = (val) => {
		console.log({ val });
	};

	useImperativeHandle(ref, () => ({
		handleSubmit: handleSubmit(onSubmit),
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
