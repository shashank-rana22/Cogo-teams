import { Button } from '@cogoport/components';
import { InputController, useForm, AsyncSelectController, DatepickerController } from '@cogoport/forms';
import { IcMCalendar, IcMArrowDown, IcMArrowRight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect } from 'react';

import CancellationRequest from '../CancellationRequest';
import Heading from '../HRMeeting/Heading';

import styles from './styles.module.css';

function ManagerClearance({ data = {}, refetch = () => {}, handleBack = () => {}, handleNext = () => {} }) {
	const { manager_clearance, application_status, application_process_details } = data || {};
	const { review_request, assign_hoto, process_user_details } = manager_clearance || {};
	let { name } = process_user_details || {};
	const { sub_process_data, is_complete, is_ignored } = review_request || {};
	const { notes_shared_with_you, name:approver_name } = sub_process_data || {};
	name = approver_name === undefined ? name : approver_name;

	const {
		control,
		setValue,
		formState:{ errors = {} },
	} = useForm();

	useEffect(() => {
		if (!isEmpty(data)) {
			setValue('feedback_rating', sub_process_data?.feedback_rating);
			setValue('handover_by', assign_hoto?.sub_process_data?.handover_by);
			setValue('takeover_by', assign_hoto?.sub_process_data?.takeover_by);
			setValue('last_working_day', new Date(assign_hoto?.sub_process_data?.last_working_day));
			setValue('additional_remarks', assign_hoto?.sub_process_data?.additional_remark);
		}
	}, [assign_hoto?.sub_process_data?.additional_remark, assign_hoto?.sub_process_data?.handover_by,
		assign_hoto?.sub_process_data?.last_working_day, assign_hoto?.sub_process_data?.takeover_by,
		data, setValue, sub_process_data]);

	if (is_ignored) {
		return (
			<Heading
				title="MANAGER CLEARANCE"
				subTitle="Summary from manager interaction"
				isComplete={is_complete}
				name={name}
				refetch={refetch}
				application_process_details={application_process_details}
				isIgnored={is_ignored}
			/>
		);
	}
	return (
		<>
			<Heading
				title="MANAGER CLEARANCE"
				subTitle="Summary from manager interaction"
				isComplete={is_complete}
				name={name}
				refetch={refetch}
				application_process_details={application_process_details}
				isIgnored={is_ignored}
			/>
			{application_status === 'cancellation_requested' ? (
				<CancellationRequest
					data={data}
					refetch={refetch}
				/>
			) : null}

			{is_complete ? (
				<>
					<div className={styles.container}>
						<div className={styles.heading}>
							Feedback Rating
						</div>
						<InputController
							control={control}
							name="feedback_rating"
							size="md"
							style={{ marginRight: '8px' }}
							placeholder="Typed"
							disabled={review_request?.is_complete}
						/>
					</div>
					<div className={styles.container}>
						<div className={styles.heading}>
							Status
						</div>

						<div className={styles.input_fields}>
							<div className={styles.inputs}>
								<div className={styles.status}>
									<span>Handover By</span>
									<span className={styles.star}>*</span>
								</div>
								<AsyncSelectController
									name="handover_by"
									asyncKey="list_employees"
									placeholder="Type to search..."
									initialCall={false}
									control={control}
									params={{
										filters: {
											status: 'active',
										},
									}}
									size="md"
									isClearable
									prefix={<IcMCalendar />}
									disabled={assign_hoto?.is_complete}
								/>
								{errors.handover_by && (
									<span className={styles.error}>*This field is Required</span>
								)}
							</div>
							<div className={styles.inputs}>
								<div className={styles.status}>
									<span>Takeover By</span>
									<span className={styles.star}>*</span>
								</div>
								<AsyncSelectController
									name="takeover_by"
									asyncKey="list_employees"
									placeholder="Type to search..."
									initialCall={false}
									control={control}
									params={{
										filters: {
											employee_status: ['probation', 'confirmed'],
										},
									}}
									size="md"
									isClearable
									prefix={<IcMCalendar />}
									disabled={assign_hoto?.is_complete}
								/>
								{errors.takeover_by && (
									<span className={styles.error}>*This field is Required</span>
								)}

							</div>

						</div>

						<div className={styles.status}>
							<span>
								Additional Remarks
							</span>
							<span className={styles.manager_text}>
								(if any)
							</span>
						</div>

						<InputController
							control={control}
							name="additional_remarks"
							size="md"
							style={{ marginRight: '8px' }}
							placeholder="Typed"
							disabled={assign_hoto?.is_complete}
						/>
					</div>

					<div className={styles.container}>
						<div className={styles.heading}>
							Suggest Last Working Day
						</div>
						<DatepickerController
							control={control}
							name="last_working_day"
							size="md"
							style={{ marginRight: '8px' }}
							placeholder="Select Date"
							suffix={<IcMArrowDown />}
							disabled={assign_hoto?.is_complete}
						/>
					</div>

					<div className={styles.container}>
						<div className={styles.heading}>
							Notes shared with you
						</div>
						{(notes_shared_with_you || []).map((item) => (
							<div key={item} className={styles.upper_text}>
								<div>
									Q.
									{' '}
									{item?.label}
								</div>
								<div className={styles.lower_text}>
									Ans.
									{' '}
									{item?.value || '-'}
								</div>
							</div>
						))}
					</div>
				</>
			) : null}
			<div className={styles.footer}>
				<Button
					themeType="secondary"
					style={{ marginRight: '4px' }}
					onClick={handleBack}
				>
					Back

				</Button>
				<Button themeType="primary" onClick={handleNext}>
					Proceed
					<IcMArrowRight width={16} height={16} style={{ marginLeft: '4px' }} />

				</Button>
			</div>
		</>
	);
}

export default ManagerClearance;
