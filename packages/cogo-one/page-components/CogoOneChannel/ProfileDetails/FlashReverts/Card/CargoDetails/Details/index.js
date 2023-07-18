import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { differenceInDays } from '@cogoport/utils';
import React from 'react';

import { DETENTION_INFO_KEY_MAPPING } from '../../../../../../../constants/flashRatesMapping';

import styles from './styles.module.css';

function Details({ serviceType, serviceDetails }) {
	const {
		cargo_readiness_date,
		schedule_departure,
		selected_schedule_departure,
		selected_schedule_arrival,
		service,
	} = serviceDetails || {};

	const { label, key } = DETENTION_INFO_KEY_MAPPING[serviceType] || DETENTION_INFO_KEY_MAPPING.default;

	const transitTime = differenceInDays(
		new Date(selected_schedule_arrival || new Date()),
		new Date(selected_schedule_departure || new Date()),
	);

	const shipmentType = service?.number_of_stops ? 'Indirect Shipment'
		: 'Direct Shipment';

	const INFO_MAPPING = [
		{
			label : 'Cargo Ready',
			value : formatDate({
				date       : cargo_readiness_date,
				formatType : 'date',
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			}),
		},
		{
			label : 'Expected Departure',
			value : formatDate({
				date       : schedule_departure || selected_schedule_departure,
				formatType : 'date',
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			}),
		},
		{
			label,
			value: serviceDetails?.[key] || '0',
		},
		{
			label : 'Transit Time',
			value : `${transitTime} Days`,
		},
		{
			label : 'Shipment Type',
			value : shipmentType,
		},
	];

	return (
		<div className={styles.container}>
			{INFO_MAPPING.map((eachItem) => (
				<div key={eachItem?.label} className={styles.label}>
					{eachItem?.label}
					-
					<span>{eachItem?.value}</span>
				</div>
			))}
		</div>
	);
}

export default Details;
