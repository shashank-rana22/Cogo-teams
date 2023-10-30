import { Checkbox, cl } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function CheckboxGroup({
	id,
	style,
	className,
	options,
	onChange = () => null,
	value = [],
}) {
	const handleChange = (event) => {
		let newValues = [...value];
		if (newValues?.includes(event.target.value)) {
			newValues = newValues.filter((val) => val !== event.target.value);
		} else {
			newValues.push(event.target.value);
		}
		onChange(newValues);
	};

	return (
		<div
			id={id}
			className={cl`
				${className}
				${styles.container}
				${cl.ns('checkbox_group_container')}
			`}
			style={style}

		>
			{options?.map((labels) => {
				const {
					label, disabled, value:optionvalue, name,
				} = labels;
				return (
					<Checkbox
						key={optionvalue}
						label={label}
						name={name}
						checked={value?.includes(optionvalue)}
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
