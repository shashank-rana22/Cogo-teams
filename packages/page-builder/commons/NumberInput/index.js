import { Input, Button } from '@cogoport/components';
import { IcMMinus, IcMPlus } from '@cogoport/icons-react';
import React, { useCallback } from 'react';

import styles from './styles.module.css';

function NumberInput(props) {
	const {
		NumberKey,
		component,
		setComponent,
		selectedItem,
		isRootComponent,
		setSelectedItem,
	} = props;

	const numberValue = isRootComponent ? component.style?.[NumberKey] : selectedItem.style?.[NumberKey];

	const handleChange = useCallback(
		(value) => {
			if (isRootComponent) {
				setComponent((prev) => ({
					...prev,
					style: {
						...prev.style,
						[NumberKey]: value,
					},
				}));
			} else {
				const { id: selectedItemId } = selectedItem;

				const selectedElement = component.layouts.find((layout) => layout.id === selectedItemId);

				const modifiedComponent = {
					...selectedElement,
					style: {
						...selectedElement?.style,
						[NumberKey]: value,
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
						[NumberKey]: value,
					},
				}));
			}
		},
		[component.layouts, selectedItem, setSelectedItem, setComponent, NumberKey, isRootComponent],
	);

	const handleInputChange = useCallback(
		(type) => {
			let modifiedValue = numberValue;

			if (type === 'add') {
				modifiedValue += 1;
			} else if (modifiedValue !== 0) {
				modifiedValue -= 1;
			}

			handleChange(modifiedValue);
		},
		[handleChange, numberValue],
	);

	return (
		<Input
			size="sm"
			placeholder="0"
			value={numberValue}
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
					onClick={() => handleInputChange('subtract')}
				>
					<IcMMinus width={18} height={18} />
				</Button>
			)}
		/>

	);
}

export default NumberInput;
