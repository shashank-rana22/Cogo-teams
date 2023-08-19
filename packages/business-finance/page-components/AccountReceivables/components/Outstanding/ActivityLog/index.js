import { Checkbox, Input, Select, Datepicker, Textarea, Button } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';
import React, { useEffect } from 'react';

import FeedbackComponent from '../FeedbackComponent';

import styles from './styles.module.css';

// eslint-disable-next-line max-lines-per-function
function ActivityLog({ formData = {}, setFormData = () => {}, feedback = {}, setFeedback = () => {} }) {
	const { reminder } = formData || {};

	console.log({ feedback });

	useEffect(() => {
		if (reminder) {
			setFormData((p) => ({
				...p,
				communicationResponse : undefined,
				startDateTime         : undefined,
				endDateTime           : undefined,
			}));
		} else {
			setFormData((p) => ({
				...p,
				reminderDateTime: undefined,
			}));
		}
	}, [reminder, setFormData, setFeedback]);

	return (
		<div>
			<Checkbox
				label="Reminder?"
				value="reminder"
				disabled={false}
				onChange={(e) => setFormData((p) => ({ ...p, reminder: e?.target?.checked }))}
			/>
			<div className={styles.single_form_row}>
				<div className={styles.input}>
					<div className={styles.label}>Select Reminder Type</div>
					<Select
						value={formData?.reminderType || 'call'}
						options={[
							{ label: 'Call', value: 'call' },
							{ label: 'Email', value: 'email' },
							{ label: 'Meeting', value: 'meeting' },
							{ label: 'Platform Demo', value: 'platformDemo' },
						]}
						onChange={(val) => setFormData((prev) => ({ ...prev, reminderType: val }))}
					/>
				</div>

				<div className={styles.input}>
					<div className={styles.label}>Attendee from Cogoport</div>
					<AsyncSelect
						name="attendee"
						asyncKey="partner_users_ids"
						placeholder="Type to search..."
						valueKey="id"
						initialCall={false}
						onChange={(value) => {
							setFormData((p) => ({ ...p, attendee: value }));
						}}
						value={formData?.attendee}
						size="md"
						isClearable
					/>
				</div>
			</div>

			<div className={styles.single_form_row}>
				<div className={styles.input}>
					<div className={styles.label}>Title</div>
					<Input size="md" placeholder="Enter title" />
				</div>

				<div className={styles.input}>
					{!formData?.reminder
						? (
							<div>
								<div className={styles.label}>Communication Response</div>
								<Select
									value={formData?.communicationResponse}
									options={[
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

									]}
									onChange={(val) => setFormData((prev) => ({ ...prev, communicationResponse: val }))}
								/>
							</div>
						)
						: (
							<div>
								<div className={styles.label}>Reminder Date and Time</div>
								<Datepicker
									placeholder="Select Date"
									showTimeSelect
									dateFormat="dd/MM/yyyy HH:mm"
									name="reminderDateTime"
									onChange={(val) => setFormData((p) => ({ ...p, reminderDateTime: val }))}
									value={formData?.reminderDateTime}
									isPreviousDaysAllowed
								/>
							</div>
						)}
				</div>

			</div>

			{!formData?.reminder && (
				<div className={styles.single_form_row}>
					<div className={styles.input}>
						<div>
							<div className={styles.label}>Start Date and Time</div>
							<Datepicker
								placeholder="Select Date"
								showTimeSelect
								dateFormat="dd/MM/yyyy HH:mm"
								name="startDateTime"
								onChange={(val) => setFormData((p) => ({ ...p, startDateTime: val }))}
								value={formData?.startDateTime}
								isPreviousDaysAllowed
							/>
						</div>
					</div>

					<div className={styles.input}>
						<div>
							<div className={styles.label}>End Date and Time</div>
							<Datepicker
								placeholder="Select Date"
								showTimeSelect
								dateFormat="dd/MM/yyyy HH:mm"
								name="endDateTime"
								onChange={(val) => setFormData((p) => ({ ...p, endDateTime: val }))}
								value={formData?.endDateTime}
								isPreviousDaysAllowed
							/>
						</div>
					</div>
				</div>
			)}

			<div className={styles.single_form_row}>
				<div className={styles.input}>
					<div className={styles.label}>Primary Attendee from Organization</div>
					<AsyncSelect
						name="primaryAttendeeFromOrg"
						asyncKey="list_organization_users"
						placeholder="Type to search..."
						valueKey="id"
						initialCall={false}
						params={{
							filters: {
								status          : 'active',
								organization_id : 'demoId',
							},
						}}
						onChange={(value) => {
							setFormData((p) => ({ ...p, primaryAttendeeFromOrg: value }));
						}}
						value={formData?.primaryAttendeeFromOrg}
						size="md"
						isClearable
					/>
				</div>

				<div className={styles.input}>
					<div className={styles.label}>
						Additional Attendee from Organization
						<span style={{ color: '#f68b21' }}>(Optional)</span>
					</div>
					<AsyncSelect
						name="additionalAttendeeFromOrg"
						asyncKey="list_organization_users"
						placeholder="Type to search..."
						valueKey="id"
						initialCall={false}
						params={{
							filters: {
								status          : 'active',
								organization_id : 'demoId',
							},
						}}
						onChange={(value) => {
							setFormData((p) => ({ ...p, additionalAttendeeFromOrg: value }));
						}}
						value={formData?.additionalAttendeeFromOrg}
						size="md"
						isClearable
					/>
				</div>

			</div>

			{Object.keys(feedback)?.map((index) => (
				<div style={{ margin: '12px 0px' }} key={index}>

					<FeedbackComponent
						index={index}
						feedback={feedback}
						setFeedback={setFeedback}
					/>
				</div>
			))}

			<div style={{ margin: '12px 0px' }}>
				<Button
					themeType="secondary"
					onClick={() => setFeedback((p) => ({
						...p,
						[Object.keys(feedback)?.length]: {
							feedbackData: [{}],
						},
					}))}
				>
					+ Add Feedback
				</Button>
			</div>

			<div style={{ margin: '12px 0px' }}>
				<div className={styles.label}>
					Add Summary
					<span style={{ color: '#f68b21' }}>(Optional)</span>
				</div>
				<Textarea
					name="summary"
					size="md"
					placeholder="Enter Remarks..."
					style={{ height: '100px' }}
					value={formData?.summary}
					onChange={(value) => setFormData((p) => ({ ...p, summary: value }))}
				/>
			</div>
		</div>

	);
}

export default ActivityLog;
