import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMTaskCompleted, IcMArrowRight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect } from 'react';

import EmployeeDetail from '../../commons/EmployeeDetail';
import useUpdateAppliationProcessDetails from '../../hooks/useUpdateAppliationProcessDetails';
import CancellationRequest from '../CancellationRequest';

import DatePicker from './DatePicker';
import InterviewQuestions from './InterviewQuestions';
import JoiningBonus from './JoiningBonus';
import NotesForManager from './NotesForManager';
import styles from './styles.module.css';

const FIRST_INDEX = 1;
const SECOND_INDEX = 2;
const THIRD_INDEX = 3;
const FOURTH_INDEX = 4;
function HRMeeting({ data = {}, refetch = () => {}, handleNext = () => {}, loading = false }) {
	const {
		control,
		watch,
		reset,
		handleSubmit,
		formState:{ errors = {} },
		setValue,
	} = useForm();

	const { hr_meet, application_status } = data || {};
	const { hr_meet:hrMeet } = hr_meet || {};
	const { sub_process_detail_id, sub_process_data = {}, is_complete } = hrMeet || {};
	const { last_working_day } = sub_process_data || {};

	const { updateApplication } = useUpdateAppliationProcessDetails({ refetch, handleNext });

	const onSubmit = (values) => {
		const payload = {
			process_name     : 'hr_meet',
			sub_process_detail_id,
			sub_process_data : {
				joiningBonusApplicable : values.joining_bonus_clawback,
				joiningBonus           : values.joining_bonus_amount,
				lastWorkingDay         : values.date,
				notes                  : [
					{
						label                  : 'the factors that led to your decision to resign?',
						value                  : values.your_notes,
						is_shared_with_manager : values.your_notes_cb,
					},
					{
						label                  : 'Any professional aspirations that you feel are not being fulfilled?',
						value                  : values.your_notes_2,
						is_shared_with_manager : values.your_notes_cb_2 || false,
					},
					{
						label                  : 'responsibilities that you believe hinder your professional growth?',
						value                  : values.your_notes_3,
						is_shared_with_manager : values.your_notes_cb_3 || false,
					},
					{
						label                  : 'Any other thing that you want to share with me?',
						value                  : values.your_notes_4,
						is_shared_with_manager : values.your_notes_cb_4,
					},
					{
						label                  : 'Note for Manager',
						value                  : values.your_notes_manager,
						is_shared_with_manager : true,
					},
				],
			},

		};

		updateApplication({ payload });
		reset();
	};

	useEffect(() => {
		if (!isEmpty(data)) {
			setValue('date', last_working_day ? new Date(sub_process_data?.lastWorkingDay) : undefined);
			setValue('joining_bonus_amount', sub_process_data?.joiningBonus);
			setValue('joining_bonus_clawback', sub_process_data?.joiningBonusApplicable);
			setValue('your_notes', sub_process_data?.notes[GLOBAL_CONSTANTS.zeroth_index].value);
			setValue('your_notes_cb', sub_process_data?.notes[GLOBAL_CONSTANTS.zeroth_index].is_shared_with_manager);
			setValue('your_notes_2', sub_process_data?.notes[FIRST_INDEX].value);
			setValue('your_notes_cb_2', sub_process_data?.notes[FIRST_INDEX].is_shared_with_manager);
			setValue('your_notes_3', sub_process_data?.notes[SECOND_INDEX].value);
			setValue('your_notes_cb_3', sub_process_data?.notes[SECOND_INDEX].is_shared_with_manager);
			setValue('your_notes_4', sub_process_data?.notes[THIRD_INDEX].value);
			setValue('your_notes_cb_4', sub_process_data?.notes[THIRD_INDEX].is_shared_with_manager);
			setValue('your_notes_manager', sub_process_data?.notes[FOURTH_INDEX].value);
		}
	}, [setValue, data, sub_process_data, last_working_day]);

	return (
		<>
			<div className={styles.header}>
				<div className={styles.left_header}>
					<span className={styles.upper_text}>HR MEETING</span>
					<span className={styles.lower_text}>Summary of application</span>
				</div>
				<div className={styles.logs_button}>
					<Button size="md" themeType="accent">
						<IcMTaskCompleted />
						<span style={{ marginLeft: '4px' }}>Notes & Logs</span>
					</Button>
				</div>
			</div>
			{application_status === 'cancellation_requested' ? (
				<CancellationRequest
					data={data}
					refetch={refetch}
				/>
			) : null}
			<EmployeeDetail data={data} loading={loading} />
			<DatePicker
				control={control}
				watch={watch}
				reset={reset}
				errors={errors}
				lastWorkingDay={sub_process_data?.lastWorkingDay}
			/>
			<JoiningBonus control={control} errors={errors} data={sub_process_data} />
			<InterviewQuestions control={control} errors={errors} data={sub_process_data} watch={watch} />
			<NotesForManager control={control} watch={watch} data={sub_process_data} />
			<div className={styles.button}>
				{is_complete ?	(
					<Button size="md" onClick={handleNext}>
						<span style={{ fontSize: '16px' }}>Next</span>
						<IcMArrowRight width={16} height={16} />
					</Button>
				) : (
					<Button size="md" onClick={handleSubmit(onSubmit)}>
						<span style={{ fontSize: '16px' }}>Submit Notes</span>
						<IcMArrowRight width={25} height={25} />
					</Button>
				)}
			</div>

		</>
	);
}

export default HRMeeting;
