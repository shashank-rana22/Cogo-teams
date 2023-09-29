import { cl, Tabs, TabPanel, Button } from '@cogoport/components';
import {
	useForm,
	DatepickerController,
	TextAreaController,
	AsyncSelectController,
	CheckboxController,
	TimepickerController,
	InputController,
} from '@cogoport/forms';
import { IcMCall, IcMShip, IcMSettings, IcMArrowNext } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import scheduleEvents from '../../../../../../configurations/schedule_event';
import useCreateCogooneCalendar from '../../../../../../hooks/useCreateCogooneCalendar';

import styles from './styles.module.css';

const TABS = ['event', 'meeting'];

const EVENT_TYPES = [
	{
		key  : 'call_customer',
		icon : <IcMCall width={12} height={12} />,
	},
	{
		key  : 'send_quotation',
		icon : <IcMShip width={12} height={12} />,
	},
	{
		key  : 'others',
		icon : <IcMSettings width={12} height={12} />,
	},
];

function CreateEvent({
	eventDetails = {},
	setEventDetails = () => {},
}) {
	const {
		control,
		handleSubmit,
		watch,
		formState : { errors = {} },
		reset,
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
	});
	const { organization_id = '' } = formValues || {};

	const controls = scheduleEvents({ orgId: organization_id, category });

	const {
		start_date, start_time, end_date, end_time,
		participants_users,
		organization, organization_user, remarks, mark_important_event,
		title,
	} = controls;

	const handleEvents = (values) => {
		createEvent(values);
	};

	useEffect(() => {
		reset();
	}, [category, reset]);

	return (
		<div className={styles.container}>
			<div className={styles.tabs}>
				{(TABS || []).map((itm) => (
					<div
						key={itm}
						className={cl`${styles.tab} ${category === itm ? styles.active_tab : ''}`}
						onClick={() => setEventDetails((prevEventDetails) => ({
							...prevEventDetails,
							category: itm,
						}))}
						role="presentation"
					>
						{startCase(itm)}
					</div>
				))}
			</div>
			<div className={styles.form}>
				{category === 'event' ? (
					<>
						<div className={styles.label}>Select Type of Event</div>
						<Tabs
							activeTab={eventType}
							themeType="tertiary"
							onChange={(val) => setEventDetails((prevEventDetails) => ({
								...prevEventDetails,
								event_type: val,
							}))}
						>
							{(EVENT_TYPES || []).map((item) => (
								<TabPanel
									name={item?.key}
									icon={item?.icon}
									title={startCase(item?.key)}
									key={item?.key}
								/>
							))}

						</Tabs>
					</>
				) : null}

				{category === 'meeting' ? (
					<div className={styles.error_container}>
						<div className={styles.label}>{title?.label}</div>
						<InputController
							{...title}
							control={control}
						/>
						<div className={styles.error_text}>
							{errors?.title?.message}
						</div>
					</div>
				) : null}

				<div className={styles.form_container}>
					<div className={styles.dates_container}>
						<DatepickerController
							{...start_date}
							control={control}
						/>
						<TimepickerController
							{...start_time}
							control={control}
						/>
					</div>
					<div className={styles.arrow_down}>
						<IcMArrowNext
							width={18}
							height={18}
							fill="#828282"
							className={styles.icon}
						/>
					</div>
					<div className={styles.dates_container}>
						<DatepickerController
							{...end_date}
							control={control}
						/>
						<TimepickerController
							{...end_time}
							control={control}
						/>
					</div>

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
						Save
					</Button>
				</div>
			</div>

		</div>
	);
}

export default CreateEvent;
