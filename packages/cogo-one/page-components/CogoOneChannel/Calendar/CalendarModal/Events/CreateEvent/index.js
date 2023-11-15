import { Button } from '@cogoport/components';
import {
	useForm,
	TextAreaController,
	AsyncSelectController,
	CheckboxController,
	SelectController,
} from '@cogoport/forms';
import { useSelector } from '@cogoport/store';
import { useEffect, useState, useMemo } from 'react';

import scheduleEvents from '../../../../../../configurations/schedule-event';
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
	setMonth = () => {},
	setAddEvents = () => {},
	setMyEvents = () => {},
	firestore = {},
}) {
	const { userId = '' } = useSelector(({ profile }) => ({ userId: profile?.user?.id }));

	const {
		category: updateCategory = '', subject = '', id = '',
		validity_start = '', validity_end = '', description = '',
		is_important = false, metadata = {}, participants = [],
		frequency = '', recurrence_rule = {},
	} = updateEventDetails || {};

	const { organization_id: orgId = '', user_id = '' } = metadata || {};

	const [eventOccurence, setEventOccurence] = useState({
		showModal     : false,
		eventData     : {},
		frequencyType : '',
	});

	const [updatedIds, setUpdateIds] = useState({
		addedIds   : [],
		removedIds : [],
	});

	const { frequencyType = '', eventData = {}, showModal = false } = eventOccurence || {};

	const selectedIds = useMemo(() => (
		(participants || []).map((itm) => ([itm?.source_id]))?.flat()
	), [participants]);

	const participantIds = (selectedIds.filter((item) => item !== userId));

	const {
		control,
		handleSubmit,
		watch,
		formState : { errors = {} },
		reset,
	} = useForm({
		defaultValues: {
			start_date           : id ? new Date(validity_start) : new Date(),
			end_date             : id ? new Date(validity_end) : new Date(),
			start_time           : id ? new Date(validity_start) : new Date(),
			end_time             : id ? new Date(validity_end) : new Date(),
			title                : subject,
			remarks              : description,
			mark_important_event : is_important,
			organization_id      : orgId,
			organization_user_id : user_id,
			occurence_event      : frequency,
			participants_users   : participantIds,
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
		id,
		updatedIds,
		setMonth,
		setAddEvents,
		setMyEvents,
		updateEventDetails,
		firestore,
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

	const handleChange = (val) => {
		const addedIds = val.filter((newId) => !participantIds.includes(newId));
		const removedIds = participantIds.filter((oldId) => !val?.includes(oldId));

		setUpdateIds((pre) => ({
			...pre,
			addedIds   : addedIds || [],
			removedIds : removedIds || [],
		}));
	};

	useEffect(() => {
		reset();
	}, [category, reset]);

	useEffect(() => {
		if (id) {
			setEventDetails(() => ({
				event_type : subject,
				category   : updateCategory === 'reminder' ? 'event' : 'meeting',
			}));
		}
	}, [id, setEventDetails, updateCategory, subject]);

	return (
		<>
			<div className={styles.container}>
				<Header
					setEventDetails={setEventDetails}
					id={id}
					setEventOccurence={setEventOccurence}
					category={category}
				/>
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
							startDate={start_date}
							startTime={start_time}
							control={control}
							endDate={end_date}
							endTime={end_time}
							errors={errors}
						/>
						{category === 'meeting' ? (
							<div className={styles.error_container}>
								<div className={styles.label}>{participants_users?.label}</div>
								<AsyncSelectController
									{...participants_users}
									control={control}
									onChange={(val) => handleChange(val)}
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
			</div>
			{((showModal && (!frequencyType || frequencyType === 'one_time'))) ? null : (
				<EventOccurence
					eventOccurence={eventOccurence}
					setEventOccurence={setEventOccurence}
					startDateField={startDateField}
					validity_start={validity_start}
					validity_end={validity_end}
					id={id}
					recurrence_rule={recurrence_rule}
				/>
			)}
		</>
	);
}

export default CreateEvent;
