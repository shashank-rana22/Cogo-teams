import { Button } from '@cogoport/components';
import {
	useForm,
	TextAreaController,
	AsyncSelectController,
	CheckboxController,
	SelectController,
} from '@cogoport/forms';
import { useEffect, useState } from 'react';

import scheduleEvents from '../../../../../../configurations/schedule_event';
import useCreateCogooneCalendar from '../../../../../../hooks/useCreateCogooneCalendar';

import CommonDatePicker from './CommonDatePicker';
import EventOccurence from './EventOccurence';
import EventTypes from './EventTypes';
import Header from './Header';
import styles from './styles.module.css';

function CreateEvent({
	eventDetails = {},
	setEventDetails = () => {},
	getEvents = () => {},
	month = '',
	updateEventDetails = {},
}) {
	const {
		category: updateCategory = '', subject = '', id = '',
		validity_start = '', validity_end = '', description = '',
		is_important = false, metadata = {}, participants = [],
		frequency = '', schedule_id = '',
	} = updateEventDetails || {};

	const { organization_id: orgId = '', user_id = '' } = metadata || {};

	const [eventOccurence, setEventOccurence] = useState({
		showModal     : false,
		eventData     : {},
		frequencyType : '',
	});

	const { frequencyType = '', eventData = {} } = eventOccurence || {};

	const {
		control,
		handleSubmit,
		watch,
		formState : { errors = {} },
		reset,
		setValue,
	} = useForm({
		defaultValues: {
			start_date : new Date(),
			end_date   : new Date(),
			start_time : new Date(),
			end_time   : new Date(),
		},
	});

	const formValues = watch();

	const { category = '', event_type: eventType = '' } = eventDetails || {};

	const { createEvent = () => {}, loading = false } = useCreateCogooneCalendar({
		setEventDetails,
		eventDetails,
		reset,
		getEvents,
		month,
		schedule_id,
	});
	const { organization_id = '', start_date: startDateField } = formValues || {};

	const controls = scheduleEvents({ orgId: organization_id, category, startDateField, watch });

	const {
		start_date, start_time, end_date, end_time,
		participants_users,
		organization, organization_user, remarks, mark_important_event,
		title, occurence_event,
	} = controls;

	const handleEvents = (values) => {
		createEvent({ values, eventData });
	};

	useEffect(() => {
		reset();
	}, [category, reset]);

	useEffect(() => {
		const formatParticipant = (participants || []).map((itm) => ([itm?.user_id]))?.flat();

		if (id) {
			setEventDetails(() => ({
				event_type : subject,
				category   : updateCategory === 'reminder' ? 'event' : 'meeting',
			}));
			setValue('start_date', new Date(validity_start));
			setValue('start_time', new Date(validity_start));
			setValue('end_date', new Date(validity_end));
			setValue('end_time', new Date(validity_end));
			setValue('remarks', description);
			setValue('mark_important_event', is_important);
			setValue('organization_id', orgId);
			setValue('organization_user_id', user_id);
			setValue('title', subject);
			setValue('participants_users', formatParticipant);
			setValue('occurence_event', frequency);
		}
	}, [id, setEventDetails, updateCategory, subject, setValue,
		description, is_important, validity_end, validity_start,
		orgId, user_id, participants, frequency]);

	return (
		<div className={styles.container}>
			<Header setEventDetails={setEventDetails} setEventOccurence={setEventOccurence} category={category} />
			<div className={styles.form}>
				<EventTypes
					eventType={eventType}
					setEventDetails={setEventDetails}
					category={category}
					title={title}
					control={control}
					errors={errors}
				/>

				<div className={styles.form_container}>
					<CommonDatePicker
						start_date={start_date}
						start_time={start_time}
						control={control}
						end_date={end_date}
						end_time={end_time}
					/>
					{category === 'meeting' ? (
						<div className={styles.error_container}>
							<div className={styles.label}>{participants_users?.label}</div>
							<AsyncSelectController
								{...participants_users}
								control={control}
							/>
							<div className={styles.error_text}>
								{errors?.participants_users?.message}
							</div>
							<div className={styles.label}>{occurence_event?.label}</div>
							<SelectController
								{...occurence_event}
								control={control}
								onChange={(val) => setEventOccurence((pre) => ({
									...pre,
									showModal     : true,
									frequencyType : val,
								}))}
							/>
							<div className={styles.error_text}>
								{errors?.occurence_event?.message}
							</div>
						</div>
					) : null}

					{category === 'event' ? (
						<>
							<div className={styles.error_container}>
								<div className={styles.label}>{organization?.label}</div>
								<AsyncSelectController
									{...organization}
									control={control}
								/>
								<div className={styles.error_text}>
									{errors?.organization_id?.message}
								</div>
							</div>

							<div className={styles.error_container}>
								<div className={styles.label}>{organization_user?.label}</div>
								<AsyncSelectController
									{...organization_user}
									control={control}
								/>
								<div className={styles.error_text}>
									{errors?.organization_user_id?.message}
								</div>
							</div>
						</>
					) : null}

					<div className={styles.error_container}>
						<div className={styles.label}>{remarks?.label}</div>
						<TextAreaController
							{...remarks}
							control={control}
						/>
						<div className={styles.error_text}>
							{errors?.remarks?.message}
						</div>
					</div>
					<div className={styles.error_container}>
						<CheckboxController
							{...mark_important_event}
							control={control}
						/>
					</div>
				</div>

				<div className={styles.button_styles}>
					<Button
						size="sm"
						themeType="primary"
						onClick={handleSubmit(handleEvents)}
						loading={loading}
					>
						{id ? 'Update' : 'Save'}
					</Button>
				</div>
			</div>

			{!frequencyType || frequencyType === 'one_time' ? null : (
				<EventOccurence
					eventOccurence={eventOccurence}
					setEventOccurence={setEventOccurence}
					startDateField={startDateField}
				/>
			)}
		</div>
	);
}

export default CreateEvent;
