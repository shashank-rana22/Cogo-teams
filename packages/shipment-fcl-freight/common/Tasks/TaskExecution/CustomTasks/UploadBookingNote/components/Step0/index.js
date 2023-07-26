import { Button, Loader, Tabs, TabPanel } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Layout } from '@cogoport/ocean-modules';
import { useMemo, useState } from 'react';

import groupedSimilarServicesData from '../../../../helpers/groupSimilarServices';
import getStep0Controls from '../../helpers/getStep0Controls';

import BookingPreferenceCard from './BookingPreferenceCard';
import styles from './styles.module.css';

function Step0({ data = {}, onCancel = () => {}, setStep = () => {}, servicesList = [], task = {} }) {
	const ONE = 1;
	const { similarServiceIds, title } = groupedSimilarServicesData(servicesList, task.service_type, task.service_id);
	const [activeTab, setActiveTab] = useState(similarServiceIds[GLOBAL_CONSTANTS.zeroth_index]);
	const {
		formProps = {}, listBookingPreferences = [], bookingPreferenceLoading, shipment_data,
	} = data || {};

	const { control, formState :{ errors = {} } = {}, handleSubmit } = formProps || {};

	const { source = '' } = shipment_data || {};

	const getSource = () => {
		if (source) {
			return source
				.split('_')
				.map((ele) => ele.toUpperCase())
				.join(' ');
		}
		return 'NORMAL BOOKING';
	};
	const keysForPreference = useMemo(
		() => Array(listBookingPreferences.length).fill(null).map(() => Math.random()),
		[listBookingPreferences.length],
	);

	return (
		<div>
			<div className={styles.tab_container}>
				{bookingPreferenceLoading ? <div><Loader /></div>
					: (
						<Tabs activeTab={activeTab} onChange={setActiveTab} themeType="primary">
							{(similarServiceIds || []).map((service_id) => (
								<TabPanel
									name={service_id}
									title={title[service_id]}
									key={service_id}
								>
									{(listBookingPreferences || []).map((item, i) => (
										item?.service_id === service_id ? (
											<BookingPreferenceCard
												item={item}
												step0_data={data}
												key={keysForPreference[i]}
												similarServiceIds={similarServiceIds}
												setStep={setStep}
											/>
										) : null
									))}

								</TabPanel>
							))}
						</Tabs>
					)}
			</div>

			<div className={styles.custom_service_provider_container}>
				<div className={styles.sub_container}>
					<h6 className={styles.label}>Mode of Booking</h6>

					<div className={styles.value}>{getSource()}</div>
				</div>

				<div className={styles.layout_container}>
					<Layout
						fields={getStep0Controls}
						control={control}
						errors={errors}
						shipment_id={shipment_data?.id}
					/>
				</div>
			</div>

			<div className={styles.button_container}>
				<Button themeType="secondary" onClick={onCancel}>Cancel</Button>

				<Button themeType="primary" onClick={handleSubmit(() => setStep(ONE))}>Next</Button>
			</div>

		</div>
	);
}

export default Step0;
