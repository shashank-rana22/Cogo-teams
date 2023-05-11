import { Checkbox } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function CheckboxGroup({
	id,
	style,
	options,
	onChange = () => null,
	value = [],
}) {
	const handleChange = (e) => {
		let newValues = [];
		if (newValues.includes(e.target.value)) {
			newValues = newValues.filter((val) => val !== e.target.value);
		} else {
			newValues.push(e.target.value);
		}
		onChange(newValues);
	};

	return (
		<div
			id={id}
			className={styles.container}
			style={style}
		>
			{options?.map((labels) => {
				const {
					label, disabled, value:optionvalue, name,
				} = labels;
				return (
					<Checkbox
						className={styles.checkbox_class}
						label={label}
						name={name}
						checked={value.includes(optionvalue)}
						value={optionvalue}
						onChange={handleChange}
						disabled={disabled}
					/>
				);
			})}

		</div>
	);
}

export default CheckboxGroup;
