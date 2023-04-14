import { Input } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useCallback } from 'react';

import styles from './styles.module.css';

function ColorInput(props) {
	const { colorKey, component, setComponent, selectedItem } = props;

	const [color, setColor] = useState(component.style?.[colorKey] || '#ffffff');

	const isRootComponent = isEmpty(selectedItem);

	const handleChange = useCallback(
		(key, value) => {
			if (isRootComponent) {
				setComponent((prev) => ({
					...prev,
					style: {
						...component.style,
						[key]: value,
					},
				}));
			} else {
				const { id: selectedItemId } = selectedItem;

				const selectedComponent = component.layouts.find((layout) => layout.id === selectedItemId);

				const modifiedComponent = {
					...selectedComponent,
					style: {
						...selectedComponent.style,
						[key]: value,
					},
				};

				setComponent((prev) => ({
					...prev,
					layouts: prev.layouts.map((layout) => {
						if (layout.id === selectedItemId) {
							return modifiedComponent;
						}
						return layout;
					}),
				}));
			}

			setColor(value);
		},
		[component.layouts, selectedItem, setComponent, component.style, isRootComponent],
	);

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
