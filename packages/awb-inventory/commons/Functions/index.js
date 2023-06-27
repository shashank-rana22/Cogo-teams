import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMAirport } from '@cogoport/icons-react';

import styles from './styles.module.css';

export const Functions = {
	handleAirline: (singleItem) => (
		<div className={styles.tooltip_container}>
			<Tooltip
				content={singleItem?.airline?.business_name}
				placement="top"
				interactive
			>
				<div className={styles.airline_name}>
					{singleItem?.airline?.logo_url ? (
						<img
							src={singleItem?.airline?.logo_url}
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
					{singleItem?.airline?.business_name}

				</div>
			</Tooltip>
		</div>
	),
	handleAirport: (singleItem) => (
		`(${singleItem?.airport?.port_code}) ${singleItem?.airport?.name}`
	),
	handleDestLocation: (singleItem) => (
		singleItem?.destination_location?.name
        && singleItem?.destination_location?.name
	),
	handleIE: (singleItem) => (
		singleItem?.importer_exporter?.business_name
            && singleItem?.importer_exporter?.business_name
	),
	handleAgent: (singleItem) => (
		singleItem?.procured_by?.name
	),
	handleIATACode: (singleItem) => (
		singleItem?.procured_by?.name
	),
	handleServiceProvider: (singleItem) => (
		singleItem?.service_provider?.business_name
	),
	handleDate: (singleItem) => (
		<div className={styles.overflow_text}>
			{formatDate({
				date       : singleItem.procured_date,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				formatType : 'date',
			})}
		</div>
	),
};
