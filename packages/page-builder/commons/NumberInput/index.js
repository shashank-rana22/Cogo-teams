import { Input, Button } from '@cogoport/components';
import { IcMMinus, IcMPlus } from '@cogoport/icons-react';
import React, { useState, useCallback } from 'react';

import styles from './styles.module.css';

function NumberInput(props) {
	const { NumberKey, component, setComponent } = props;

	const [number, setNumber] = useState(component.style?.[NumberKey] || 0);

	const handleChange = useCallback((value) => {
		setNumber(value);
		setComponent((prev) => ({
			...prev,
			style: {
				...component.style,
				[NumberKey]: value,
			},
		}));
	}, [setComponent, NumberKey, component.style]);

	const handleInputChange = useCallback(
		(type) => {
			let modifiedValue = number;

			if (type === 'add') {
				modifiedValue += 1;
			} else if (modifiedValue !== 0) {
				modifiedValue -= 1;
			}

			handleChange(modifiedValue);
		},
		[handleChange, number],
	);

	return (
		<Input
			size="sm"
			placeholder="0"
			value={number}
			onChange={(val) => handleChange(Number(val))}
			className={styles.ui_input_container}
			prefix={(
				<Button
					size="sm"
					type="button"
					themeType="tertiary"
					onClick={() => handleInputChange('add')}
				>
					<IcMPlus width={18} height={18} />
				</Button>
			)}
			suffix={(
				<Button
					size="sm"
					type="button"
					themeType="tertiary"
					onClick={(e) => handleInputChange('subtract')}
				>
					<IcMMinus width={18} height={18} />
				</Button>
			)}
		/>

	);
}

export default NumberInput;
