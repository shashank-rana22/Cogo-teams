import { Input, Button } from '@cogoport/components';
import React, { useState } from 'react';

import styles from '../styles.module.css';

import useUpdateEmployeeManualTarget from './useUpdateEmployeeManualTarget';

const MIN_RATING = 0;

function InputEmployeeManualTarget({ item }) {
	const {
		loading: updateLoading,
		updateEmployeeManualTarget,
	} = useUpdateEmployeeManualTarget({ item });

	const [inputValue, setInputValue] = useState(MIN_RATING);

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
