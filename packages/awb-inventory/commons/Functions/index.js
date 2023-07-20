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
	handleDestLocation    : (singleItem) => singleItem?.destinationAirport,
	handleAgent           : (singleItem) => singleItem?.procuredByName,
	handleServiceProvider : (singleItem) => singleItem?.serviceProviderName,
	handleDate            : (singleItem) => {
		const { procuredDate } = singleItem || {};
		return (
			<div className={styles.overflow_text}>
				{formatDate({
					date       : procuredDate,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					formatType : 'date',
				}) || '-'}
			</div>
		);
	},
	handleValidityDate: (singleItem) => {
		const { validityExpiryDate } = singleItem || {};
		return (
			<div className={styles.overflow_text}>
				{formatDate({
					date       : validityExpiryDate,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					formatType : 'date',
				}) || '-'}
			</div>
		);
	},
	handleTotalStock          : (singleItem) => singleItem?.totalStock,
	handleUsedStock           : (singleItem) => singleItem?.usedStock,
	handleUnusedStock         : (singleItem) => singleItem?.unusedStock,
	handleCancelledStock      : (singleItem) => singleItem?.cancelledStock,
	handleCustomClearanceDate : (singleItem) => {
		const { customClearanceDate } = singleItem || {};
		return (
			<div className={styles.overflow_text}>
				{formatDate({
					date       : customClearanceDate,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					formatType : 'date',
				}) || '-'}
			</div>
		);
	},
	handleBookingDate: (singleItem) => {
		const { bookingDate } = singleItem || {};
		return (
			<div className={styles.overflow_text}>
				{formatDate({
					date       : bookingDate,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					formatType : 'date',
				}) || '-'}
			</div>
		);
	},
	handleAwbNumber : (singleItem) => singleItem?.awbNumber,
	handleIataCode  : (singleItem) => singleItem?.iataCode,
	handleAwbType   : (singleItem) => singleItem?.awbType,
};
