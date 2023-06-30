import { Input, Button } from '@cogoport/components';
import React from 'react';

import styles from '../styles.module.css';

import useUpdateEmployeeManualTarget from './useUpdateEmployeeManualTarget';

function InputEmployeeManualTarget({ item }) {
	const {
		loading: updateLoading,
		updateEmployeeManualTarget,
		inputValue,
		setInputValue,
	} = useUpdateEmployeeManualTarget({ item });

	return (
		<div className={styles.input_display}>
			<Input
				value={inputValue}
				onChange={(val) => setInputValue(val)}
				placeholder="Input Rating"
			/>

			<Button
				size="sm"
				style={{ marginLeft: '12px' }}
				loading={updateLoading}
				onClick={() => updateEmployeeManualTarget(inputValue)}
			>
				Submit
			</Button>
		</div>
	);
}

export default InputEmployeeManualTarget;
