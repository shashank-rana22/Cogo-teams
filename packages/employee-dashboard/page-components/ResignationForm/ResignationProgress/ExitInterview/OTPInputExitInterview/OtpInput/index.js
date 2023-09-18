import { Input } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { memo, forwardRef } from 'react';

import useOtpInput from './hooks/useOtpInput';
import styles from './styles.module.css';

function OtpInput(props, ref) {
	const { otpLength = 0, inputSize = 'md', onChange = () => {}, placeholder } = props;

	const {
		values = {},
		otpContainerRef = null,
		otpInputElementsRef = null,
		handleChange = () => {},
	} = useOtpInput({
		otpLength,
		onChange,
		ref,
	});

	const appliedPlaceholder = placeholder || ' ';

	return (
		<div className={styles.container} ref={otpContainerRef}>
			{Object.keys(values).map((key, index) => (
				<div
					className={styles.input_item}
					key={key}
					style={{
						marginLeft: `${index === GLOBAL_CONSTANTS.zeroth_index
							? GLOBAL_CONSTANTS.zeroth_index : '16px'}`,
					}}
				>
					<Input
						size={inputSize}
						value={values[key]}
						onChange={handleChange(index)}
						placeholder={appliedPlaceholder}
						ref={(element) => {
							otpInputElementsRef.current[index] = element;
						}}
					/>
				</div>
			))}
		</div>
	);
}

export default memo(forwardRef(OtpInput));
