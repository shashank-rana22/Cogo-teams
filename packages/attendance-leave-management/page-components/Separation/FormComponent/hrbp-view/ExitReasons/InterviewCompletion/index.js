import { Input } from '@cogoport/components';
import { SelectController } from '@cogoport/forms';
import React from 'react';

import styles from './styles.module.css';

const ZEROTOCOMPARE = 0;
const options = [
	{ label: 'Termination', value: 'Termination' },
	{ label: 'Termination - Fraud', value: 'Termination - Fraud' },
	{ label: 'Absconding', value: 'Absconding' },
	{ label: 'Security Reasons', value: 'Security Reasons' },
	{ label: 'Death', value: 'Death' },
	{ label: 'Harassment Case', value: 'Harassment Case' },
	{ label: 'Others', value: 'Others' },
];
function InterviewComplete({ code, control, complete }) {
	const OTP = code || '';
	const otparray = OTP.split('');
	// const [value, setValue] = useState('');

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Interview Completion Code</div>
			<div className={styles.subparagraph}>
				Share the code below with the employee to end the interview.
				Once the employee enters the code on their admin platform,
				the access to the admin platform will be removed.
			</div>
			<div className={styles.containerotp}>
				{otparray.map((key, index) => (
					<div
						className={styles.input_item}
						key={key}
						style={{ marginLeft: `${index === ZEROTOCOMPARE ? ZEROTOCOMPARE : '16px'}` }}
					>
						<Input
							size="sm"
							value={key}
							style={{ width: '30px' }}
							disabled
						/>
					</div>
				))}
			</div>

			<div className={styles.dividercontainer}>
				<hr className={styles.divider} />
				OR
				{' '}
				<hr className={styles.divider} />
			</div>

			<div className={styles.heading}>Complete Interview without code</div>
			<div className={styles.subparagraph}>
				In certain circumstances the interview can be closed without the completion code.
				Please be sure to use this method in case of those circumstances.
			</div>
			<div className={styles.label}>
				Select Reasons
				<SelectController
					style={{ maxWidth: '350px', minWidth: '300px' }}
					size="sm"
					name="reason"
					placeholder="Select reason"
					disabled={complete}
					control={control}
					options={options}
				/>
			</div>

		</div>
	);
}

export default InterviewComplete;
