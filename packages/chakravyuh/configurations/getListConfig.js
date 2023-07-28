import { IcMAir, IcMShip } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from '../page-components/AccuracyDashboard/RatesList/styles.module.css';

const COMMON_START_COLUMNS = [
	{
		Header   : 'ORIGIN',
		accessor : ({ origin_port = {} }) => {
			const { port_code = '', name = '' } = origin_port;
			return (
				<div className={styles.row_port_cell}>
					<div className={styles.row_port_code}>{port_code}</div>
					<div className={styles.row_port_name}>{name}</div>
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
					<div className={styles.row_port_name}>{name}</div>
				</div>
			);
		},
	},
	// {
	// 	Header   : 'CLUSTER',
	// 	accessor : ({ cluster }) => {
	// 		const { mf = '', name = '' } = cluster;
	// 		return (
	// 			<div className={styles.row_default_cell}>
	// 				<div>{name}</div>
	// 				<div className={styles.row_cell_subtitle}>{mf}</div>
	// 			</div>
	// 		);
	// 	},
	// },
];

const SEA_COLUMNS = [
	{
		Header   : 'SHIPPING LINE',
		accessor : ({ shipping_line = {} }) => {
			const { business_name = '' } = shipping_line;
			return (
				<div className={styles.row_shipping_cell}>
					<IcMShip className={styles.ship_icon} />
					{business_name}
				</div>
			);
		},
	},
	{
		Header   : 'COMMODITY',
		accessor : ({ commodity = '' }) => (
			<div className={styles.row_commodity_cell}>
				<div>{startCase(commodity)}</div>
			</div>
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
		Header   : 'SHIPPING LINE',
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
		Header   : 'DEVIATION',
		accessor : ({ deviation = '' }) => (
			<div className={styles.row_commodity_cell}>
				<div className={styles.percent}>{`${deviation}%` }</div>
			</div>
		),
	},
];
function getListConfig(rate_type) {
	if (rate_type === 'fcl') {
		return {
			columns: [
				...COMMON_START_COLUMNS,
				...SEA_COLUMNS,
				...COMMON_END_COLUMNS,
			],
		};
	}
	return {
		columns: [
			...COMMON_START_COLUMNS,
			...AIR_COLUMNS,
			...COMMON_END_COLUMNS,
		],
	};
}

export default getListConfig;
