import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useState } from 'react';

// import useGetGenerateExitCode from '../../hooks/useGetGenerateExitCode';
import useUpdateAppliationProcessDetails from '../../hooks/useUpdateAppliationProcessDetails';
import ExitHeading from '../ExitInterview/ExitHeading';

import InterviewComplete from './InterviewCompletion';
import ReasonsToLeave from './Reasons';
import styles from './styles.module.css';

const REASONS_LIST = [
	'Lack of Career Growth and Development Opportunities',
	'Inadequate Compensation and Benefits',
	'Work-Life Balance Issues',
	'Company Culture and Values Misalignment',
	'Lack of Recognition and Appreciation',
	'Poor Communication',
	'Unchallenging tasks No job satisfaction',
	'Conflict and Workplace/ Team Issues',
	'Personal Reasons'];

function ExitReasons({ refetch = () => {}, handleNext = () => {}, handleBack = () => {}, data = {} }) {
	const [code, setCode] = useState(null);
	const [complete, setComplete] = useState(false);
	const {
		control,
		reset,
		handleSubmit,
	} = useForm();
	const { off_boarding_application_id } = data || '';
	const { exit_interview } = data || {};
	const { exit_interview_completed } = exit_interview || {};
	const { sub_process_detail_id } = exit_interview_completed || {};

	const { updateApplication } = useUpdateAppliationProcessDetails({ refetch, handleNext });

	const onSubmit = (values) => {
		const REASONSARRAY = [];
		REASONS_LIST.map((item) => (
			REASONSARRAY.push({
				reason : item,
				status : values?.item || false,
			})
		));
		const payload = {
			sub_process_data: {
				reasons      : REASONSARRAY,
				reason_by_hr : values.reason,
				remarks      : values.remarks,

			},
			sub_process_detail_id,
			process_name: 'exit_interview',
		};
		//	console.log(off_boarding_application_id);
		updateApplication({
			payload,
		});
		reset();
	};
	return (
		<div>

			{
				!complete
					? (
						<>
							<ExitHeading title="EXIT INTERVIEW" subTitle="Schedule interview the the employee" />
							<ReasonsToLeave
								setComplete={setComplete}
								setCode={setCode}
								control={control}
								off_boarding_application_id={off_boarding_application_id}
								REASONS_LIST={REASONS_LIST}
							/>
						</>
					)
					:						(
						<>
							<ExitHeading title="EXIT INTERVIEW" subTitle="complete the interview" />
							<InterviewComplete code={code} control={control} />
							<div className={styles.footer}>
								<Button
									themeType="secondary"
									style={{ marginRight: '12px' }}
									onClick={handleBack}
								>
									Back

								</Button>
								<Button themeType="primary" onClick={() => handleSubmit(onSubmit)()}>
									Complete Interview
								</Button>
							</div>
						</>
					)
			}

		</div>

	);
}

export default ExitReasons;
