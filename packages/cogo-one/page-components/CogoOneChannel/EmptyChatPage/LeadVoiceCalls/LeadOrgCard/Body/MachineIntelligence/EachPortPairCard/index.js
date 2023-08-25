import { cl, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMPortArrow } from '@cogoport/icons-react';

import styles from './styles.module.css';

const MAX_DISPLAY = 99;

function PortName({ portName = '', countryName = '' }) {
	return (
		<Tooltip
			placement="bottom"
			content={(
				<div>
					<div>{portName}</div>
					<div>{countryName}</div>
				</div>
			)}
		>
			<div className={styles.port_container}>
				<div className={cl`${styles.overflow_div} ${styles.port_name}`}>
					{portName}
				</div>
				<div className={cl`${styles.overflow_div} ${styles.country_name}`}>
					{countryName}
				</div>
			</div>
		</Tooltip>
	);
}

function StatsTooltip({ statsData = {} }) {
	const { shipment_count = 0, total_spent = 0, percentage = '' } = statsData || {};

	const STATS_MAPPING = [{
		name  : 'Shipments done',
		value : shipment_count,
	},
	{
		name  : 'Amount spent',
		value : formatAmount({
			amount   : total_spent,
			currency : GLOBAL_CONSTANTS.currency_code.INR,
			options  : {
				currencyDisplay : 'symbol',
				notation        : 'compact',
			},
		}),
	},
	{
		name  : 'percentage',
		value : `${percentage}%`,
	},
	];

	return (
		<Tooltip
			placement="bottom"
			content={(
				<div>
					{STATS_MAPPING.map((eachStat) => (
						<div className={styles.stats_flex} key={eachStat?.name}>
							<div className={styles.title}>
								{eachStat?.name}
								:
							</div>
							<div className={styles.value}>
								{eachStat?.value}
							</div>
						</div>
					))}
				</div>
			)}
		>
			<div className={styles.no_of_shipments}>{shipment_count > MAX_DISPLAY ? '99+' : shipment_count}</div>
		</Tooltip>
	);
}
function EachPortPairCard({ eachItem = {} }) {
	const {
		origin_port = '',
		origin_country = '',
		destination_port = '',
		destination_country = '',
		...rest
	} = eachItem || {};

	return (
		<div className={styles.container}>
			{rest?.shipment_count ? <p className={styles.stats_div}><StatsTooltip statsData={rest} /></p> : null}
			<PortName portName={origin_port} countryName={origin_country} />
			<IcMPortArrow className={styles.icon_styles} />
			<PortName portName={destination_port} countryName={destination_country} />
		</div>
	);
}
export default EachPortPairCard;
