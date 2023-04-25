import { Input, Button } from '@cogoport/components';
import { IcMMinus, IcMPlus } from '@cogoport/icons-react';
import React, { useCallback } from 'react';

import styles from './styles.module.css';

function NumberInput(props) {
	const {
		NumberKey,
		component,
		selectedItem,
		isRootComponent,
		handleChange,
	} = props;

	const numberValue = isRootComponent ? component.style?.[NumberKey] : selectedItem.style?.[NumberKey];

	const handleInputChange = useCallback(
		(type) => {
			let modifiedValue = numberValue ? Number(numberValue) : 0;

			if (type === 'add') {
				modifiedValue += 1;
			} else if (modifiedValue !== 0) {
				modifiedValue -= 1;
			}

			handleChange(NumberKey, modifiedValue);
		},
		[handleChange, NumberKey, numberValue],
	);

	return (
		<Input
			size="sm"
			placeholder="0"
			value={numberValue}
			onChange={(val) => handleChange(NumberKey, Number(val))}
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
