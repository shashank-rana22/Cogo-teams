import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import {
	IcCFtick, IcMArrowRight,
} from '@cogoport/icons-react';
import React, { useState, useEffect } from 'react';

import useUpdateAppliationProcessDetails from '../../hooks/useUpdateAppliationProcessDetails';

import ExitHeading from './ExitHeading';
import ScheduleInterview from './Schedule';
import styles from './styles.module.css';

function ExitInterview({ refetch = () => {}, handleNext = () => {}, handleBack = () => {}, data = {} }) {
	const {
		control,
		reset,
		handleSubmit,
		formState:{ errors = {} },
		setValue,
	} = useForm();

	const { exit_interview } = data || {};

	const { exit_interview_scheduled } = exit_interview || {};
	const { sub_process_detail_id, is_complete, sub_process_data } = exit_interview_scheduled || {};
	const [visible, setVisible] = useState(is_complete || false);
	const complete = exit_interview?.exit_interview_scheduled == null;

	const { updateApplication } = useUpdateAppliationProcessDetails({ refetch, handleNext });

	const onSubmit = (values) => {
		const payload = {
			sub_process_data: {
				interview_date     : values?.date,
				interview_time     : values?.interviewTime,
				interview_location : values?.location,
				info               : values?.info,
			},
			sub_process_detail_id,
			process_name: 'exit_interview',
		};
		updateApplication({
			payload,
		});
	};

	useEffect(() => {
		if (is_complete) {
			setValue('interviewTime', sub_process_data?.interview_time && new Date(sub_process_data?.interview_time));
			setValue('date', sub_process_data?.interview_date && new Date(sub_process_data?.interview_date));
			setValue('location', sub_process_data?.interview_location);
			setValue('info', sub_process_data?.info);
		}
	}, [is_complete, setValue, sub_process_data]);

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

			<ScheduleInterview
				is_complete={visible}
				setEdit={setVisible}
				control={control}
				reset={reset}
				complete={complete}
				errors={errors}
			/>

			<div className={styles.footer}>
				<Button themeType="secondary" style={{ marginRight: '12px' }} onClick={handleBack}>Back</Button>
				<Button
					themeType="primary"
					onClick={handleSubmit(onSubmit)}
					disabled={complete}
				>
					Notify Employee
					<IcMArrowRight width={16} height={16} style={{ marginLeft: '12px' }} />
				</Button>
			</div>
		</>

	);
}

export default ExitInterview;