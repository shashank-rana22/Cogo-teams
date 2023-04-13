import { Input } from '@cogoport/components';
import React, { useState, useCallback } from 'react';

import styles from './styles.module.css';

function ColorInput(props) {
	const { colorKey, component, setComponent } = props;

	const [color, setColor] = useState(component.style?.[colorKey] || '#ffffff');

	const handleChange = useCallback((key, value) => {
		setColor(value);
		setComponent((prev) => ({
			...prev,
			style: {
				...component.style,
				[key]: value,
			},
		}));
	}, [setComponent, component.style]);

	const handleInputChange = useCallback(
		(val, key) => {
			handleChange(key, val);
		},
		[handleChange],
	);

	return (
		<div className={styles.color_input}>
			<div className={styles.color_panel}>
				<Input
					className={`${styles.color_input} ${styles.ui_input_container}`}
					size="sm"
					type="color"
					value={color}
					onChange={(value) => handleInputChange(value, colorKey)}
				/>
			</div>
			<div>
				<Input
					className={styles.hex_input}
					size="sm"
					type="text"
					value={color}
					placeholder="Small"
					onChange={(value) => handleInputChange(value, colorKey)}
				/>
			</div>
		</div>
	);
}
export default ColorInput;
