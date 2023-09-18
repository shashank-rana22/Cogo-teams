import { Button } from '@cogoport/components';
import {
	CheckboxController,
	InputController,
} from '@cogoport/forms';
import { IcMArrowDown } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useGetGenerateExitCode from '../../../hooks/useGetGenerateExitCode';

import styles from './styles.module.css';

function ReasonsToLeave({ setComplete, setCode, control, off_boarding_application_id, REASONS_LIST }) {
	const [show, setShow] = useState(true);

	const { getExitCode } = useGetGenerateExitCode();

	const handleGetCode = async () => {
		const exitcode = await getExitCode(off_boarding_application_id);
		setCode(exitcode?.exit_code);
		setComplete(true);
	};

	return (
		<>
			<div className={styles.container}>
				<div className={styles.heading} aria-hidden onClick={() => setShow(!show)}>
					<span>
						Reasons for Leaving
					</span>
					<div className={styles.button_add_service_container}>
						<IcMArrowDown
							width={16}
							height={16}
							className={show ? styles.caret_active : styles.caret_arrow}
						/>
					</div>
				</div>
				<div className={show ? styles.item_container : styles.item_container_closed}>
					{REASONS_LIST.map((val) => (
						<div className={styles.checkboxdiv} key={val}>
							<CheckboxController name={val} control={control} />
							<div>{val}</div>
						</div>
					))}

					<div className={styles.inputcontainer}>
						<div className={styles.label}>Additional Remarks (if any)</div>
						<InputController
							className={styles.inputfield}
							name="remarks"
							control={control}
							placeholder="Enter your Remarks"
						/>
					</div>
				</div>
			</div>

			<div className={styles.container}>
				<div className={styles.heading}>Interview Completion Code</div>
				<div className={styles.info}>
					Click
					on
					{' '}
					<q>Generate Code</q>
					{' '}
					button once the interview is completed.
					Share it with the employee only after the interview.
				</div>
			</div>

			<div className={styles.footer}>
				<Button themeType="primary" onClick={handleGetCode}>
					Generate Code
				</Button>
			</div>
		</>
	);
}

export default ReasonsToLeave;
