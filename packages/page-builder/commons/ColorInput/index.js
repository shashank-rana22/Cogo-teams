import { Input } from '@cogoport/components';
import React, { useCallback } from 'react';

import styles from './styles.module.css';

function ColorInput(props) {
	const {
		colorKey,
		component,
		setComponent,
		selectedItem,
		isRootComponent,
		setSelectedItem,
	} = props;

	const color = isRootComponent ? component.style?.[colorKey] : selectedItem.style?.[colorKey];

	const handleChange = useCallback(
		(key, value) => {
			if (isRootComponent) {
				setComponent((prev) => ({
					...prev,
					style: {
						...prev.style,
						[key]: value,
					},
				}));
			} else {
				const { id: selectedItemId } = selectedItem;

				const selectedElement = component.layouts.find(
					(layout) => layout.id === selectedItemId,
				);

				const modifiedComponent = {
					...selectedElement,
					style: {
						...selectedElement?.style,
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

				setSelectedItem((prev) => ({
					...prev,
					style: {
						...prev.style,
						[key]: value,
					},
				}));
			}
		},
		[component.layouts, selectedItem, setComponent, setSelectedItem, isRootComponent],
	);

	return (
		<div className={styles.color_input}>
			<div className={styles.color_panel}>
				<Input
					className={`${styles.color_input} ${styles.ui_input_container}`}
					size="sm"
					type="color"
					value={color}
					onChange={(value) => handleChange(colorKey, value)}
				/>
			</div>
			<div>
				<Input
					className={styles.hex_input}
					size="sm"
					type="text"
					value={color}
					placeholder="Small"
					onChange={(value) => handleChange(colorKey, value)}
				/>
			</div>
		</div>
	);
}
export default ColorInput;
