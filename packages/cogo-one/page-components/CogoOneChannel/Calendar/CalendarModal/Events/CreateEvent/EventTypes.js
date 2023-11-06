import { Tabs, TabPanel } from '@cogoport/components';
import { InputController } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';

import { EVENT_TYPES } from '../../../../../../constants/calenderConstants';

import styles from './styles.module.css';

function EventTypes({
	eventType = '',
	setEventDetails = () => {},
	category = '',
	title = '',
	control = {},
	errors = {},
}) {
	return (
		<>
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
		</>
	);
}

export default EventTypes;
