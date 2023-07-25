import { Tooltip } from '@cogoport/components';

import { DEFAULT_INDEX, TOTAL_PERCENT } from '../../../constants';

import styles from './styles.module.css';

const VALUE_TWENTY = 20;
const VALUE_TEN = 10;

const KEY_MAPPING = {
	kam_insights      : 'KAM / Sales Agent',
	customer_insights : 'Customer',
};

const getOrdinalNumber = (number) => {
	const suffix = ['th', 'st', 'nd', 'rd'];
	const quotient = number % TOTAL_PERCENT;
	const ordinal = suffix[(quotient - VALUE_TWENTY) % VALUE_TEN] || suffix[quotient] || suffix[DEFAULT_INDEX];
	return (
		<>
			<div className={styles.bold}>{number}</div>
			<div className={styles.sup}>{ordinal}</div>
		</>
	);
};

function InsightComponent({ insightData = {}, data = {}, type = '' }) {
	const {
		shipment_type = '',
	} = data;

	const {
		name = '',
		service_port_pair_shipment_count = 0,
		service_shipment_count = 0,
		service_trade_type_shipment_count = 0,
		total_shipment_count = 0,
	} = insightData;
	return (
		<div className={styles.single_column}>
			<div className={styles.heading}>
				{name ? (
					<div style={{ display: 'flex' }}>
						<div>
							{KEY_MAPPING[type]}
							:
						</div>
						<Tooltip content={name}>
							<div className={styles.text}>
								{name}
							</div>
						</Tooltip>

					</div>
				) : null}
			</div>
			<div className={styles.single_box}>
				<div style={{ display: 'flex' }}>
					{getOrdinalNumber(service_shipment_count)}
				</div>
			</div>

			{!['fcl_freight', 'air_freight', 'lcl_freight'].includes(shipment_type) && (
				<div className={styles.single_box}>
					<div style={{ display: 'flex' }}>
						{getOrdinalNumber(service_trade_type_shipment_count)}
					</div>
				</div>
			)}

			{['fcl_freight', 'air_freight', 'lcl_freight'].includes(shipment_type) && (
				<div className={styles.port_pair_container}>
					<div style={{ display: 'flex' }}>
						{getOrdinalNumber(service_port_pair_shipment_count)}
					</div>

				</div>
			)}
			<div className={styles.single_box}>
				<div style={{ display: 'flex' }}>
					<div>{total_shipment_count}</div>
				</div>
			</div>

		</div>
	);
}

export default InsightComponent;
