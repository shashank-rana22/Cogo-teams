import { Button, Toast, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowRight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import EmployeeDetail from '../../commons/EmployeeDetail';
import useUpdateAppliationProcessDetails from '../../hooks/useUpdateAppliationProcessDetails';
import CancellationRequest from '../CancellationRequest';

import DatePicker from './DatePicker';
import Heading from './Heading';
import InterviewQuestions from './InterviewQuestions';
import JoiningBonus from './JoiningBonus';
import NotesForManager from './NotesForManager';
import styles from './styles.module.css';

const THIRD_INDEX = 3;
const FOURTH_INDEX = 4;
function HRMeeting({ data = {}, refetch = () => {}, handleNext = () => {}, loading = false }) {
	const [show, setShow] = useState(false);
	const {
		control,
		watch,
		reset,
		handleSubmit,
		formState:{ errors = {} },
		setValue,
	} = useForm();

	const { hr_meet, application_status, applicant_details, application_process_details } = data || {};
	const { last_working_day } = applicant_details || {};
	const { hr_meet:hrMeet, process_user_details } = hr_meet || {};
	const { name } = process_user_details || {};
	const { sub_process_detail_id, sub_process_data = {}, is_complete, is_ignored } = hrMeet || {};
	const { lastWorkingDay } = sub_process_data || {};
	const { updateApplication } = useUpdateAppliationProcessDetails({ refetch, handleNext });
	const compulsory_question_1 = watch('your_notes');
	const joiningBonusCb = watch('joining_bonus_clawback');

	useEffect(() => {
		if (joiningBonusCb === 'no') {
			setValue('joining_bonus_amount', GLOBAL_CONSTANTS.zeroth_index);
		}
	}, [joiningBonusCb, setValue]);

	const toggleModal = () => {
		setShow(!show);
	};
	const onSubmit = (values) => {
		if (!compulsory_question_1) {
			Toast.error('Please answer Questions for Interview');
			return;
		}
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
		setShow(!show);
	};

	useEffect(() => {
		if (!isEmpty(data)) {
			setValue('date', lastWorkingDay ? new Date(sub_process_data?.lastWorkingDay) : undefined);
			setValue('suggested_date', last_working_day ? new Date(last_working_day) : undefined);
			setValue('joining_bonus_amount', sub_process_data?.joiningBonus);
			setValue('joining_bonus_clawback', sub_process_data?.joiningBonusApplicable);
			setValue('your_notes', sub_process_data?.notes?.[GLOBAL_CONSTANTS.zeroth_index].value);
			setValue('your_notes_cb', sub_process_data?.notes?.[GLOBAL_CONSTANTS.zeroth_index].is_shared_with_manager);
			setValue('your_notes_2', sub_process_data?.notes?.[GLOBAL_CONSTANTS.one].value);
			setValue('your_notes_cb_2', sub_process_data?.notes?.[GLOBAL_CONSTANTS.one].is_shared_with_manager);
			setValue('your_notes_3', sub_process_data?.notes?.[GLOBAL_CONSTANTS.two].value);
			setValue('your_notes_cb_3', sub_process_data?.notes?.[GLOBAL_CONSTANTS.two].is_shared_with_manager);
			setValue('your_notes_4', sub_process_data?.notes?.[THIRD_INDEX].value);
			setValue('your_notes_cb_4', sub_process_data?.notes?.[THIRD_INDEX].is_shared_with_manager);
			setValue('your_notes_manager', sub_process_data?.notes?.[FOURTH_INDEX].value);
		}
	}, [setValue, data, sub_process_data, last_working_day, lastWorkingDay]);

	if (is_ignored) {
		return (
			<Heading
				title="HR MEETING"
				subTitle="Summary of application"
				application_process_details={application_process_details}
				refetch={refetch}
				isComplete={is_complete}
				isIgnored={is_ignored}
				name={name}
			/>
		);
	}
	return (
		<>
			{/* <div className={styles.header}>
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
			</div> */}
			<Heading
				title="HR MEETING"
				subTitle="Summary of application"
				application_process_details={application_process_details}
				refetch={refetch}
				isComplete={is_complete}
				isIgnored={is_ignored}
				name={name}
			/>
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
				suggestedLastday={last_working_day}
			/>
			<JoiningBonus control={control} errors={errors} data={sub_process_data} watch={watch} />
			<InterviewQuestions control={control} errors={errors} data={sub_process_data} watch={watch} />
			<NotesForManager control={control} watch={watch} data={sub_process_data} />
			<div className={styles.button}>
				{is_complete ?	(
					<Button size="md" onClick={handleNext}>
						<span style={{ fontSize: '16px' }}>Next</span>
						<IcMArrowRight width={16} height={16} />
					</Button>
				) : (
					<Button size="md" onClick={handleSubmit(toggleModal)}>
						Submit Notes
						<Modal size="md" show={show} onClose={() => { setShow(!show); }} placement="center">
							<Modal.Header title="Are you sure?" />
							<Modal.Body>
								The above enteries cannot be changed again.
							</Modal.Body>
							<Modal.Footer>
								<Button size="md" onClick={handleSubmit(onSubmit)}>
									<span style={{ fontSize: '16px' }}>Submit Notes</span>
									<IcMArrowRight width={25} height={25} />
								</Button>
							</Modal.Footer>
						</Modal>
					</Button>

				)}
			</div>

		</>
	);
}

export default HRMeeting;
