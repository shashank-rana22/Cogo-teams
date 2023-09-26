import { TimepickerController } from '@cogoport/forms';
import React from 'react';

import { validateTime } from '../../../../../../../helpers/shiftConfigurationHelpers';

import styles from './styles.module.css';

const handleValidate = ({ value, name, formValues }) => {
	const [phase, type] = name.split('_shift_');

	const startTime = type === 'start_time'
		? value
		: formValues[`${phase}_shift_start_time`];

	const endTime = type === 'start_time'
		? formValues[`${phase}_shift_end_time`]
		: value;

	return validateTime({
		startTime,
		endTime,
	});
};

function ElementFields({
	control = {},
	fields = [],
	errors = {},
	formValues = {},
}) {
	return (
		<>
			{fields.map(
				(name) => (
					<div key={name} className={styles.fields_styles}>
						<TimepickerController
							placeholder="Select time"
							control={control}
							name={name}
							maxDate={new Date()}
							rules={{
								validate: (value) => (
									handleValidate({ value, name, formValues })
										? true
										: 'Start Time should be less than End Time'
								),
							}}
						/>

						{(errors && errors[name])
							? (
								<div className={styles.error}>
									{errors[name]?.message || 'Required'}
								</div>
							)
							: null}
					</div>
				),
			)}
		</>
	);
}

export default ElementFields;
