import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMAirport } from '@cogoport/icons-react';

import styles from './styles.module.css';

export const functions = {
	handleAirline: (singleItem) => {
		const { airlineName, airlineLogo } = singleItem || {};

		return (
			<div className={styles.tooltip_container}>
				<Tooltip
					content={airlineName}
					placement="top"
					interactive
				>
					<div className={styles.airline_name}>
						{airlineLogo ? (
							<img
								src={airlineLogo}
								alt="Airline Logo"
								style={{ maxWidth: '20px', marginRight: '8px' }}
							/>
						) : (
							<IcMAirport
								width={18}
								height={16}
								fill="#888888"
								style={{ marginRight: '8px' }}
							/>
						)}
						{airlineName}
					</div>
				</Tooltip>
			</div>
		);
	},
	handleAirport: (singleItem) => {
		const { originAirport, originAirportCode } = singleItem || {};
		return (
			`(${originAirportCode}) ${originAirport}`
		);
	},
	handleDestLocation: (singleItem) => {
		const { destinationAirport } = singleItem || {};
		return (destinationAirport);
	},
	handleAgent: (singleItem) => {
		const { procuredByName = {} } = singleItem || {};
		return procuredByName;
	},
	handleServiceProvider: (singleItem) => {
		const { serviceProviderName } = singleItem || {};
		return serviceProviderName;
	},
	handleDate: (singleItem) => {
		const { procuredDate } = singleItem || {};
		return (
			<div className={styles.overflow_text}>
				{formatDate({
					date       : procuredDate,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					formatType : 'date',
				})}
			</div>
		);
	},
	handleTotalStock: (singleItem) => {
		const { totalStock } = singleItem || {};
		return totalStock;
	},
	handleUsedStock: (singleItem) => {
		const { usedStock } = singleItem || {};
		return usedStock;
	},
	handleUnusedStock: (singleItem) => {
		const { unusedStock } = singleItem || {};
		return unusedStock;
	},
	handleCancelledStock: (singleItem) => {
		const { cancelledStock } = singleItem || {};
		return cancelledStock;
	},
	handleCustomClearanceDate: (singleItem) => {
		const { customClearanceDate } = singleItem || {};
		return customClearanceDate;
	},
	handleBookingDate: (singleItem) => {
		const { bookingDate } = singleItem || {};
		return bookingDate;
	},
	handleAwbNumber: (singleItem) => {
		const { awbNumber } = singleItem || {};
		return awbNumber;
	},
	handleIataCode: (singleItem) => {
		const { iataCode } = singleItem || {};
		return iataCode;
	},
};
