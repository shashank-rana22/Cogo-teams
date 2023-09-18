import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useState, useEffect } from 'react';

import {
	REASONS_LIST,
} from '../../../../../utils/constants';
import useUpdateAppliationProcessDetails from '../../hooks/useUpdateAppliationProcessDetails';
import ExitHeading from '../ExitInterview/ExitHeading';

import InterviewComplete from './InterviewCompletion';
import ReasonsToLeave from './Reasons';
import styles from './styles.module.css';

function ExitReasons({ refetch = () => {}, handleNext = () => {}, handleBack = () => {}, data = {} }) {
	const {
		control,
		reset,
		handleSubmit,
		setValue,
	} = useForm();
	const { off_boarding_application_id } = data || '';
	const { exit_interview } = data || {};
	const { exit_interview_completed } = exit_interview || {};
	const { sub_process_detail_id, is_complete, sub_process_data } = exit_interview_completed || {};
	const { exitCode } = sub_process_data || {};
	const [code, setCode] = useState(exitCode);
	const { updateApplication } = useUpdateAppliationProcessDetails({ refetch, handleNext });
	const [complete, setComplete] = useState(is_complete || false);

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
				exitCode     : code,

			},
			sub_process_detail_id,
			process_name: 'exit_interview',
		};
		updateApplication({
			payload,
		});
		reset();
	};

	useEffect(() => {
		if (is_complete) {
			setValue('reason', sub_process_data?.reason_by_hr);
		}
	}, [is_complete, setValue, sub_process_data]);
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
							<InterviewComplete complete={is_complete} code={code} control={control} />
							<div className={styles.footer}>
								<Button
									themeType="secondary"
									style={{ marginRight: '12px' }}
									onClick={handleBack}
								>
									Back

								</Button>
								<Button
									disabled={is_complete}
									themeType="primary"
									onClick={() => handleSubmit(onSubmit)()}
								>
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
