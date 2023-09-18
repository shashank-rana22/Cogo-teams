import { TimepickerController } from '@cogoport/forms';
import React from 'react';

import { validateTime } from '../../../../../../../helpers/shiftConfigurationHelpers';

import styles from './styles.module.css';

const handleValidate = ({ value, name, formValues }) => {
	const [phase, type] = name.split('_shift_');

	if (type === 'start_time') {
		return validateTime({
			start_time : value,
			end_time   : formValues[`${phase}_shift_end_time`],
		});
	}

	return validateTime({
		start_time : formValues[`${phase}_shift_start_time`],
		end_time   : value,
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
					<div key={name}>
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

						{errors && errors[name]
							? <div className={styles.error}>{errors[name]?.message || 'Required'}</div>
							: null}
					</div>
				),
			)}

		</>
	);
}

export default ElementFields;
