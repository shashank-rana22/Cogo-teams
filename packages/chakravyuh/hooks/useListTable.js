import { Button } from '@cogoport/components';
import { IcMAir, IcMShip } from '@cogoport/icons-react';

import styles from '../page-components/AccuracyDashboard/RatesList/styles.module.css';

const COMMON_START_COLUMNS = [
	{
		Header   : 'ORIGIN',
		accessor : ({ origin }) => {
			const { code = '', name = '' } = origin;
			return (
				<div className={styles.row_port_cell}>
					<div className={styles.row_port_code}>{code}</div>
					<div className={styles.row_port_name}>{name}</div>
				</div>
			);
		},
	},
	{
		Header   : 'DESTINATION',
		accessor : ({ destiantion }) => {
			const { code = '', name = '' } = destiantion;
			return (
				<div className={styles.row_port_cell}>
					<div className={styles.row_port_code}>{code}</div>
					<div className={styles.row_port_name}>{name}</div>
				</div>
			);
		},
	},
	{
		Header   : 'CLUSTER',
		accessor : ({ cluster }) => {
			const { mf = '', name = '' } = cluster;
			return (
				<div className={styles.row_default_cell}>
					<div>{name}</div>
					<div className={styles.row_cell_subtitle}>{mf}</div>
				</div>
			);
		},
	},
];

const SEA_COLUMNS = [
	{
		Header   : 'SHIPPING LINE',
		accessor : ({ shipping_line }) => {
			const { name = '' } = shipping_line;
			return (
				<div className={styles.row_shipping_cell}>
					<IcMShip className={styles.ship_icon} />
					{name}
				</div>
			);
		},
	},
	{
		Header   : 'COMMODITY',
		accessor : ({ commodity = '' }) => (
			<div className={styles.row_commodity_cell}>
				<div>{commodity}</div>
			</div>
		),
	},
	{
		Header   : 'CONTAINER DETAIL',
		accessor : ({ container_details = '' }) => {
			const { type = '', cap = '' } = container_details;
			return (
				<div className={styles.row_default_cell}>
					<div>{type}</div>
					<div className={styles.row_cell_subtitle}>{cap}</div>
				</div>
			);
		},
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
				<div className={styles.chip}>{rate_type}</div>
			</div>
		),
	},
	{
		Header   : 'DEVIATION',
		accessor : ({ deviation = '' }) => (
			<div className={styles.row_commodity_cell}>
				<div className={styles.percent}>{deviation}</div>
			</div>
		),
	},
	{
		Header   : 'ACTION',
		accessor : () => (
			<div className={styles.row_commodity_cell}>
				<Button
					onClick={(e) => e.stopPropagation()}
					themeType="secondary"
					className={styles.trigger_button}
				>
					<p>Trigger</p>
					<p className={styles.arrow_right}>&gt;</p>
				</Button>
			</div>
		),
	},
];
function useSupplyRatesListTable(CLASS_TYPE) {
	if (CLASS_TYPE === 'fcl') {
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

export default useSupplyRatesListTable;
