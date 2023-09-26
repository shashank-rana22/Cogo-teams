import { cl, Tabs, TabPanel, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMCall, IcMShip, IcMSettings } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import FormLayout from '../../../../../../common/FormLayout';
import scheduleEvents from '../../../../../../configurations/schedule_event';

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
	} = useForm();

	const formValues = watch();

	const { organization_id = '' } = formValues || {};
	const controls = scheduleEvents({ orgId: organization_id });

	const { category = '', event_type: eventType = '' } = eventDetails || {};

	const handleEvents = (val) => {
		console.log('val:', val);
	};

	return (
		<div className={styles.container}>
			<div className={styles.form}>
				<div className={styles.label}>Select Category</div>
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
						<TabPanel name={item?.key} icon={item?.icon} title={startCase(item?.key)} key={item?.key} />
					))}

				</Tabs>
				<div className={styles.form_container}>
					<FormLayout
						control={control}
						controls={controls}
						errors={errors}
					/>
				</div>
				<div className={styles.button_styles}>
					<Button
						size="md"
						themeType="primary"
						onClick={handleSubmit(handleEvents)}
					>
						Save
					</Button>
				</div>
			</div>

		</div>
	);
}

export default CreateEvent;
