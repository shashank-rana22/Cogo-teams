import { Input } from '@cogoport/components';
import { memo, forwardRef } from 'react';

import useOtpInput from '../../../../../../../../../../hooks/useOtpInput';

import styles from './styles.module.css';

function OtpInput(props, ref) {
	const { otpLength = 0, inputSize = 'md', onChange = () => {} } = props || {};

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

	return (
		<div className={styles.container} ref={otpContainerRef}>
			{Object.keys(values).map((key, index) => (
				<div
					className={styles.input_item}
					key={key}
				>
					<Input
						size={inputSize}
						value={values[key]}
						onChange={handleChange(index)}
						ref={(element) => {
							otpInputElementsRef.current[index] = element;
						}}
						placeholder="0"
						className={styles.input}
					/>
				</div>
			))}
		</div>
	);
}

export default memo(forwardRef(OtpInput));
