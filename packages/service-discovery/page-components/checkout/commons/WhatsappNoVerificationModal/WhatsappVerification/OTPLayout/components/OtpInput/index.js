import { Input } from '@cogoport/components';
import React, { memo, forwardRef } from 'react';

import useOtpInput from './hooks/useOtpInput';
import styles from './styles.module.css';

function OtpInput(props, ref) {
	const { otpLength = 0, inputSize = 'md', onChange = () => {}, verifyOtpNumber = () => {} } = props;

	const {
		values = {},
		otpContainerRef = null,
		otpInputElementsRef = null,
		handleChange = () => {},
	} = useOtpInput({
		otpLength,
		onChange,
		ref,
		verifyOtpNumber,
	});

	return (
		<div className={styles.container} ref={otpContainerRef}>
			{Object.keys(values).map((key, index) => (
				<div className={styles.input_item} key={key} style={{ marginLeft: !index ? '0px' : '16px' }}>
					<Input
						size={inputSize}
						value={values[key]}
						onChange={handleChange(index)}
						placeholder=" "
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
