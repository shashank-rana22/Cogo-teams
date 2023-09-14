import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import {
	IcCFtick, IcMArrowRight,
} from '@cogoport/icons-react';
import React, { useState } from 'react';

import useUpdateAppliationProcessDetails from '../../hooks/useUpdateAppliationProcessDetails';
// import InterviewComplete from '../ExitInterviewComplete/InterviewCompletion';
// import ReasonsToLeave from '../ExitReasons/Reasons';

import ExitHeading from './ExitHeading';
import ScheduleInterview from './Schedule';
import styles from './styles.module.css';

function ExitInterview({ refetch = () => {}, handleNext = () => {}, handleBack = () => {}, data = {} }) {
	const [visible, setvisible] = useState(false);
	const {
		control,
		watch,
		reset,
		handleSubmit,
		formState:{ errors = {} },
	} = useForm();

	const { exit_interview } = data || {};

	const { exit_interview_scheduled } = exit_interview || {};
	const { sub_process_detail_id } = exit_interview_scheduled || {};
	console.log('Data', sub_process_detail_id);

	const v1 = watch();
	console.log('v1:', v1);
	const { updateApplication } = useUpdateAppliationProcessDetails({ refetch, handleNext });

	const onSubmit = (values) => {
		console.log(values, 'formValues');
		setvisible(true);
		const payload = {
			sub_process_data : values,
			sub_process_detail_id,
			process_name     : 'admin_clearance',
		};
		updateApplication({
			payload,
		});
		reset();
	};
	return (
		<>
			<ExitHeading title="EXIT INTERVIEW" subTitle="Schedule interview the the employee" />
			{
			visible
				? (
					<div className={styles.tickdiv}>
						<IcCFtick
							className={styles.tickicon}
						/>
						<span>Interview details are shared with the employee</span>
					</div>
				)
				: 			null
		}
			{/* <InterviewComplete /> */}

			<ScheduleInterview visible={visible} control={control} watch={watch} reset={reset} errors={errors} />

			<div className={styles.footer}>
				<Button themeType="secondary" style={{ marginRight: '12px' }} onClick={handleBack}>Back</Button>
				<Button themeType="primary" onClick={() => handleSubmit(onSubmit)()}>
					Notify Employee
					<IcMArrowRight width={16} height={16} style={{ marginLeft: '12px' }} />
				</Button>
			</div>
		</>

	);
}

export default ExitInterview;
