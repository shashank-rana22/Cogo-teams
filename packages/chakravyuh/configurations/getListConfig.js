import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMAir, IcMShip } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from '../page-components/AccuracyDashboard/RatesList/styles.module.css';
import { formatBigNumbers } from '../utils/formatBigNumbers';

const COMMON_START_COLUMNS = [
	{
		Header   : 'ORIGIN',
		accessor : ({ origin_port = {} }) => {
			const { port_code = '', name = '' } = origin_port;
			return (
				<div className={styles.row_port_cell}>
					<div className={styles.row_port_code}>{port_code}</div>
					<Tooltip content={name} placement="bottom">
						<div className={styles.row_port_name}>{name}</div>
					</Tooltip>
				</div>
			);
		},
	},
	{
		Header   : 'DESTINATION',
		accessor : ({ destination_port = {} }) => {
			const { port_code = '', name = '' } = destination_port;
			return (
				<div className={styles.row_port_cell}>
					<div className={styles.row_port_code}>{port_code}</div>
					<Tooltip content={name} placement="bottom">
						<div className={styles.row_port_name}>{name}</div>
					</Tooltip>
				</div>
			);
		},
	},
];
const SHIPPING_LINES = [
	{
		Header   : 'SHIPPING LINE',
		accessor : ({ shipping_line = {} }) => {
			const { business_name = '' } = shipping_line;
			return (
				<Tooltip content={business_name} placement="bottom">
					<div className={styles.row_shipping_cell}>
						<IcMShip className={styles.ship_icon} />
						<p>{business_name}</p>
					</div>
				</Tooltip>
			);
		},
	},
];

const SEA_COLUMNS = [
	{
		Header   : 'COMMODITY',
		accessor : ({ commodity = '' }) => (
			<Tooltip content={commodity} placement="bottom">
				<div className={styles.row_commodity_cell}>
					<p>{startCase(commodity)}</p>
				</div>
			</Tooltip>
		),
	},
	{
		Header   : 'CONTAINER DETAIL',
		accessor : ({ container_size = '', container_type = '' }) => (
			<div className={styles.row_default_cell}>
				<div className={styles.row_cell_subtitle}>{startCase(container_type)}</div>
				<div>{container_size}</div>
			</div>
		),
	},
];

const AIR_COLUMNS = [
	{
		Header   : 'AIR LINE',
		accessor : ({ airline }) => {
			const { name = '' } = airline;
			return (
				<div className={styles.row_shipping_cell}>
					<IcMAir className={styles.ship_icon} />
					{name}
				</div>
			);
		},
	},
	{
		Header   : 'WEIGHT SLAB',
		accessor : ({ weight_slab = '' }) => (
			<div className={styles.row_commodity_cell}>
				<div>{weight_slab}</div>
			</div>
		),
	},
	{
		Header   : 'COMMODITY',
		accessor : ({ commodity = '' }) => (
			<div className={styles.row_commodity_cell}>
				<div>{commodity}</div>
			</div>
		),
	},
];

const COMMON_END_COLUMNS = [
	{
		Header   : 'RATE TYPE',
		accessor : ({ rate_type = '' }) => (
			<div className={styles.row_commodity_cell}>
				<div className={styles.chip}>{startCase(rate_type)}</div>
			</div>
		),
	},
	{
		Header   : 'BOOKINGS',
		accessor : ({ aggregate_bookings_created = '' }) => {
			const value = aggregate_bookings_created || GLOBAL_CONSTANTS.zeroth_index;
			return (
				<div className={styles.row_commodity_cell}>
					<Tooltip content={value} placement="bottom">
						<div className={styles.percent}>
							{`${formatBigNumbers(value)}` }
						</div>
					</Tooltip>
				</div>
			);
		},
	},
	{
		Header   : 'CHECKOUT COUNT',
		accessor : ({ aggregate_checkout_count = '' }) => {
			const value = aggregate_checkout_count || GLOBAL_CONSTANTS.zeroth_index;
			return (
				<div className={styles.row_commodity_cell}>
					<Tooltip content={value} placement="bottom">
						<div className={styles.percent}>
							{`${formatBigNumbers(value)}` }
						</div>
					</Tooltip>
				</div>
			);
		},
	},
	{
		Header   : 'DEVIATION',
		accessor : ({ aggregate_rate_deviation_from_booking_rate = '' }) => {
			const value = aggregate_rate_deviation_from_booking_rate || GLOBAL_CONSTANTS.zeroth_index;
			return (
				<div className={styles.row_commodity_cell}>
					<Tooltip content={`$ ${value}`} placement="bottom">
						<div className={styles.percent}>
							{`$ ${formatBigNumbers(value)}` }
						</div>
					</Tooltip>
				</div>
			);
		},
	},
	{
		Header   : 'SPOT SEARCH',
		accessor : ({ aggregate_spot_search_count = '' }) => {
			const value = aggregate_spot_search_count || GLOBAL_CONSTANTS.zeroth_index;
			return (
				<div className={styles.row_commodity_cell}>
					<Tooltip content={value} placement="bottom">
						<div className={styles.percent}>
							{`${formatBigNumbers(value)}` }
						</div>
					</Tooltip>
				</div>
			);
		},
	},
];

function getListConfig(rate_type = 'fcl', activeParent = '') {
	if (rate_type === 'fcl') {
		return {
			columns: [
				...COMMON_START_COLUMNS,
				...activeParent !== 'missing_rates' ? SHIPPING_LINES : [],
				...SEA_COLUMNS,
				...activeParent !== 'missing_rates' ? COMMON_END_COLUMNS : [],
			],
		};
	}
	return {
		columns: [
			...COMMON_START_COLUMNS,
			...AIR_COLUMNS,
			...activeParent !== 'missing_rates' ? COMMON_END_COLUMNS : [],
		],
	};
}

export default getListConfig;
