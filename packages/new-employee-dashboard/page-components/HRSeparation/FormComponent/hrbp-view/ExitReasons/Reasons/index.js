import { Button } from '@cogoport/components';
import {
	CheckboxController,
	InputController,
	useForm,
} from '@cogoport/forms';
import { IcMArrowDown } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useGetGenerateExitCode from '../../../hooks/useGetGenerateExitCode';

import styles from './styles.module.css';
// { onSubmit, control, handleSubmit }
function ReasonsToLeave({ setComplete, setCode }) {
	const [show, setShow] = useState(true);
	const {
		control,
		watch,
		reset,
		handleSubmit,
	} = useForm();

	const OFF_BOARDING_APPLICATION_ID = '9e0f52c9-da4a-43fb-bd16-772cdc8f8bda';

	const v1 = watch();
	console.log('v1:', v1);
	//	const { updateApplication } = useUpdateAppliationProcessDetails({ refetch });
	const { getExitCode } = useGetGenerateExitCode();

	const onSubmit = async (values) => {
		console.log(values, 'formValues');
		// const payload = {
		// 	sub_process_data: values,
		// 	// sub_process_detail_id : '50adeb65-d63c-4c99-9a16-cd724ee4ca35',
		// 	// process_name          : 'admin_clearance',
		// };
		//	console.log(off_boarding_application_id);
		const data = await getExitCode({ OFF_BOARDING_APPLICATION_ID });
		console.log(data.exit_code);
		setCode(data.exit_code);
		setComplete(true);
		// updateApplication({
		// 	payload,
		// });
		reset();
	};
	// const onSubmit = () => {
	// 	reset();
	// };
	const REASONS_LIST = [
		' Lack of Career Growth and Development Opportunities',
		' Inadequate Compensation and Benefits',
		'Work-Life Balance Issues',
		'Company Culture and Values Misalignment',
		'Lack of Recognition and Appreciation',
		'Poor Communication',
		'Unchallenging tasks: No job satisfaction',
		'Conflict and Workplace/ Team Issues',
		'Personal Reasons'];

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

					)) }
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
					on ‘Generate Code’ button once the interview is completed.
					Share it with the employee only after the interview.

				</div>
			</div>
			<div className={styles.footer}>
				<Button themeType="secondary" style={{ marginRight: '12px' }}>Back</Button>
				<Button themeType="primary" onClick={() => handleSubmit(onSubmit)()}>
					Generate Code
				</Button>
			</div>
		</>
	);
}

export default ReasonsToLeave;
