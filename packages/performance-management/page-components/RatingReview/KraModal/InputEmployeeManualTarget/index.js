import { Input, Button } from '@cogoport/components';
import React, { useState } from 'react';

import styles from './styles.module.css';
import useUpdateEmployeeManualTarget from './useUpdateEmployeeManualTarget';

function InputEmployeeManualTarget({ item }) {
	const [inputValue, setInputValue] = useState();

	const {
		loading: UpdateLoading,
		updateEmployeeManualTarget,
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
				loading={UpdateLoading}
				onClick={() => updateEmployeeManualTarget(inputValue)}
			>
				Submit
			</Button>
		</div>
	);
}

export default InputEmployeeManualTarget;
