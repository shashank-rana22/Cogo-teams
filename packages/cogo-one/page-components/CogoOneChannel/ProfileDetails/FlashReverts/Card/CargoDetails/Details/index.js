import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { differenceInDays } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const DETENTION_INFO_KEY_MAPPING = {
	air_freight : { label: 'Destination Detention Storage Free Hours', key: 'destination_storage_free_days' },
	lcl_freight : { label: 'Destination Detention Storage Free Days', key: 'destination_storage_free_days' },
	default     : { label: 'Destination Detention Free Days', key: 'free_days_detention_destination' },
};

function Details({ serviceType, serviceDetails }) {
	const {
		cargo_readiness_date,
		schedule_departure,
		selected_schedule_departure,
		selected_schedule_arrival,
		service,
	} = serviceDetails || {};

	const { label, key } = DETENTION_INFO_KEY_MAPPING[serviceType || 'default'];

	const INFO_MAPPING = [
		{
			key   : 'Cargo Ready',
			value : formatDate({
				date       : cargo_readiness_date,
				formatType : 'date',
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			}),
		},
		{
			key   : 'Expected Departure',
			value : formatDate({
				date       : schedule_departure || selected_schedule_departure,
				formatType : 'date',
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			}),
		},
		{
			key   : label,
			value : serviceDetails?.[key] || '0',
		},
	];

	const transitTime = differenceInDays(
		new Date(selected_schedule_arrival || new Date()),
		new Date(selected_schedule_departure || new Date()),
	);

	const { refer_temprature, refer_humidity } = service || {};

	const shipment_type = service?.number_of_stops ? 'Indirect Shipment'
		: 'Direct Shipment';

	return (
		<div className={styles.container}>
			ss
		</div>
	);
}

export default Details;
