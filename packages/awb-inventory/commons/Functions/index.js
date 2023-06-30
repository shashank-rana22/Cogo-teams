import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMAirport } from '@cogoport/icons-react';

import styles from './styles.module.css';

export const functions = {
	handleAirline: (singleItem) => {
		const { airline } = singleItem || {};
		const { business_name, logo_url } = airline || {};
		return (
			<div className={styles.tooltip_container}>
				<Tooltip
					content={business_name}
					placement="top"
					interactive
				>
					<div className={styles.airline_name}>
						{logo_url ? (
							<img
								src={logo_url}
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
						{business_name}
					</div>
				</Tooltip>
			</div>
		);
	},
	handleAirport: (singleItem) => {
		const { airport } = singleItem || {};
		const { port_code, name } = airport || {};
		return (
			`(${port_code}) ${name}`
		);
	},
	handleDestLocation: (singleItem) => {
		const { destination_location } = singleItem || {};
		const { name } = destination_location || {};
		return (name);
	},
	handleIE: (singleItem) => {
		const { importer_exporter } = singleItem || {};
		const { business_name } = importer_exporter || {};
		return (
			business_name
		);
	},
	handleAgent: (singleItem) => {
		const { procured_by = {} } = singleItem || {};
		return (
			procured_by?.name
		);
	},
	handleServiceProvider: (singleItem) => {
		const { service_provider = {} } = singleItem || {};
		return (
			service_provider?.business_name
		);
	},
	handleDate: (singleItem) => {
		const { procured_date } = singleItem || {};
		return (
			<div className={styles.overflow_text}>
				{formatDate({
					date       : procured_date,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					formatType : 'date',
				})}
			</div>
		);
	},
};
