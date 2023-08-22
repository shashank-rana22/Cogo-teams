import { Button } from '@cogoport/components';
import {
	AsyncSelectController,
	CheckboxController,
	DatepickerController,
	InputController,
	SelectController,
	TextAreaController,
} from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import FeedbackComponent from '../FeedbackComponent';

import styles from './styles.module.css';

const callOptions = [
	{ label: 'Call', value: 'call' },
	{ label: 'Email', value: 'email' },
	{ label: 'Meeting', value: 'meeting' },
	{ label: 'Platform Demo', value: 'platformDemo' },
];

const communicationOptions = [
	{ label: 'Answered', value: 'answered' },
	{ label: 'Not Answered', value: 'not_answered' },
	{ label: 'Wrong Number', value: 'wrong_number' },
	{ label: 'Invalid Number', value: 'invalid_number' },
	{ label: 'Not Reachable', value: 'not_reachable' },
	{ label: 'Busy', value: 'Busy' },
	{ label: 'Does not exist', value: 'Does not exist' },
	{
		label : 'Does not belong to this user',
		value : 'Does not belong to this user',
	},
	{
		label : 'Belongs to the user who has left the company',
		value : 'Belongs to the user who has left the company',
	},

];

function ActivityLog({
	formData = {},
	feedback = [],
	remove = () => { },
	append = () => { },
	control,
	setValue = () => { },
	errors = {},
	watch,
	type,
	organizationId = '',
}) {
	return (
		<div>
			<CheckboxController
				label="Reminder?"
				value={false}
				disabled={false}
				name="reminder"
				control={control}
			/>
			<div className={styles.single_form_row}>
				<div className={styles.input}>
					<div className={styles.label}>Select Reminder Type *</div>
					<SelectController
						options={callOptions}
						name="reminderType"
						control={control}
						value={type}
					/>
					<div className={styles.error}>{errors?.reminderType ? '*required' : null}</div>
				</div>

				<div className={styles.input}>
					<div className={styles.label}>Attendee from Cogoport *</div>
					<AsyncSelectController
						name="attendee"
						asyncKey="partner_users_ids"
						placeholder="Type to search..."
						control={control}
						valueKey="user_id"
						initialCall={false}
						size="md"
						isClearable
						rules={{ required: true }}
					/>
					<div className={styles.error}>{errors?.attendee ? '*required' : null}</div>
				</div>
			</div>

			<div className={styles.single_form_row}>
				<div className={styles.input}>
					<div className={styles.label}>Title *</div>
					<InputController
						name="title"
						rules={{ required: true }}
						size="md"
						placeholder="Enter title"
						control={control}
					/>
					<div className={styles.error}>{errors?.title ? '*required' : null}</div>
				</div>

				<div className={styles.input}>
					{!formData?.reminder
						? (
							<div>
								<div className={styles.label}>Communication Response *</div>
								<SelectController
									control={control}
									name="communicationResponse"
									options={communicationOptions}
									rules={{ required: true }}
								/>
								<div className={styles.error}>{errors?.communicationResponse ? '*required' : null}</div>
							</div>
						)
						: (
							<div>
								<div className={styles.label}>Reminder Date and Time *</div>
								<DatepickerController
									placeholder="Select Date"
									showTimeSelect
									dateFormat="dd/MM/yyyy HH:mm"
									name="reminderDateTime"
									isPreviousDaysAllowed
									control={control}
									rules={{ required: true }}
								/>
								<div className={styles.error}>{errors?.reminderDateTime ? '*required' : null}</div>
							</div>
						)}
				</div>

			</div>

			{!formData?.reminder && (
				<div className={styles.single_form_row}>
					<div className={styles.input}>
						<div>
							<div className={styles.label}>Start Date and Time *</div>
							<DatepickerController
								placeholder="Select Date"
								showTimeSelect
								dateFormat="dd/MM/yyyy HH:mm"
								name="startDateTime"
								isPreviousDaysAllowed
								control={control}
								rules={{ required: true }}
							/>
							<div className={styles.error}>{errors?.startDateTime ? '*required' : null}</div>
						</div>
					</div>

					<div className={styles.input}>
						<div>
							<div className={styles.label}>End Date and Time *</div>
							<DatepickerController
								placeholder="Select Date"
								showTimeSelect
								dateFormat="dd/MM/yyyy HH:mm"
								name="endDateTime"
								isPreviousDaysAllowed
								control={control}
								rules={{ required: true }}
							/>
							<div className={styles.error}>{errors?.endDateTime ? '*required' : null}</div>
						</div>
					</div>
				</div>
			)}

			<div className={styles.single_form_row}>
				<div className={styles.input}>
					<div className={styles.label}>Primary Attendee from Organization *</div>
					<AsyncSelectController
						name="primaryAttendeeFromOrg"
						asyncKey="list_organization_users"
						placeholder="Type to search..."
						valueKey="user_id"
						initialCall={false}
						control={control}
						params={{
							filters: {
								status          : 'active',
								organization_id : organizationId,
							},
						}}
						size="md"
						isClearable
						rules={{ required: true }}
					/>
					<div className={styles.error}>{errors?.primaryAttendeeFromOrg ? '*required' : null}</div>
				</div>

				<div className={styles.input}>
					<div className={styles.label}>
						Additional Attendee from Organization
						<span style={{ color: '#f68b21' }}>(Optional)</span>
					</div>
					<AsyncSelectController
						name="additionalAttendeeFromOrg"
						asyncKey="list_organization_users"
						placeholder="Type to search..."
						valueKey="user_id"
						initialCall={false}
						control={control}
						multiple
						params={{
							filters: {
								status          : 'active',
								organization_id : organizationId,
							},
						}}
						size="md"
						isClearable
					/>
				</div>

			</div>

			{(feedback || []).map((feedbackData, index) => (
				<div style={{ margin: '12px 0px' }} key={feedbackData?.id}>

					<FeedbackComponent
						index={index}
						feedbackData={feedbackData}
						remove={remove}
						control={control}
						setValue={setValue}
						watch={watch}
						errors={errors}
					/>
				</div>
			))}

			<div style={{ margin: '12px 0px' }}>
				<Button
					themeType="secondary"
					onClick={() => append({})}
					className={styles.add_feedback}
				>
					+ Add
					{' '}
					{!isEmpty(feedback) ? 'more' : null}
					{' '}
					Feedback
				</Button>
			</div>

			<div style={{ margin: '12px 0px' }}>
				<div className={styles.label}>
					Add Summary
					<span style={{ color: '#f68b21' }}>(Optional)</span>
				</div>
				<TextAreaController
					name="summary"
					size="md"
					control={control}
					placeholder="Enter Remarks..."
					style={{ height: '100px' }}
				/>
			</div>
		</div>

	);
}

export default ActivityLog;
