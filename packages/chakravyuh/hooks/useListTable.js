import { Button } from '@cogoport/components';
import { IcMShip } from '@cogoport/icons-react';

import styles from '../page-components/AccuracyDashboard/RatesList/styles.module.css';

function useSupplyRatesListTable() {
	const CLASS_TYPE = 'sea';

	const COLUMNS = [
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
		{
			Header   : `${CLASS_TYPE === 'sea' ? 'SHIPPING LINE' : 'Airline'}`,
			accessor : ({ shipping_line, airline }) => {
				if (CLASS_TYPE === 'air') {
					const { name = '' } = airline;
					return (
						<div>
							<div>{name}</div>
						</div>
					);
				}

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

	return {
		COLUMNS,
	};
}

export default useSupplyRatesListTable;
