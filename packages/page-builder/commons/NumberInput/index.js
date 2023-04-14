import { Input, Button } from '@cogoport/components';
import { IcMMinus, IcMPlus } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useCallback } from 'react';

import styles from './styles.module.css';

function NumberInput(props) {
	const { NumberKey, component, setComponent, selectedItem } = props;

	const [number, setNumber] = useState(component.style?.[NumberKey] || 0);

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

			setNumber(value);
		},
		[component.layouts, selectedItem, setComponent, component.style, isRootComponent],
	);

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
					onClick={() => handleInputChange('subtract')}
				>
					<IcMMinus width={18} height={18} />
				</Button>
			)}
		/>

	);
}

export default NumberInput;
