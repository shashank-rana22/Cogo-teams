import { Tooltip } from '@cogoport/components';

import incoTermMapping from '../../../../helper/incoTermMapping';

import styles from './styles.module.css';

const LABEL_MAPPING = {
	fcl_freight : 'FCL',
	lcl_freight : 'LCL',
	air_freight : 'AIR',
	ftl_freight : 'FTL',
	ltl_freight : 'LTL',
};

const KEY_MAPPING = {
	kam_insights      : 'KAM / Sales Agent',
	customer_insights : 'Customer',
};

const getOrdinalNumber = (number) => {
	const suffix = ['th', 'st', 'nd', 'rd'];
	const quotient = number % 100;
	const ordinal = suffix[(quotient - 20) % 10] || suffix[quotient] || suffix[0];
	return (
		<>
			<div className={styles.bold}>{number}</div>
			<div className={styles.sup}>{ordinal}</div>
		</>
	);
};

function InsightComponent({ insightData = {}, data = {}, type = '' }) {
	const {
		trade_type = '',
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
					<div style={{ marginLeft: '5px' }}>
						{LABEL_MAPPING[shipment_type]}
						{' '}
						Transaction
					</div>
				</div>
			</div>
			<div className={styles.single_box}>
				{!['ftl_freight', 'ltl_freight'].includes(shipment_type)
					? (
						<div style={{ display: 'flex' }}>
							{getOrdinalNumber(service_trade_type_shipment_count)}
							<div style={{ marginLeft: '5px' }}>
								{LABEL_MAPPING[shipment_type]}
							</div>
							<div style={{ marginLeft: '5px' }}>
								{trade_type.toUpperCase() || incoTermMapping[data?.inco_term].toUpperCase()}
								{' '}
								Transaction
							</div>
						</div>
					) : null}
			</div>
			<div className={styles.port_pair_container}>

				<div style={{ display: 'flex' }}>
					{getOrdinalNumber(service_port_pair_shipment_count)}
					<div style={{ marginLeft: '5px' }}>
						{LABEL_MAPPING[shipment_type]}
					</div>
					<div style={{ marginLeft: '5px' }}>
						{trade_type.toUpperCase() || incoTermMapping[data?.inco_term].toUpperCase()}
						{' '}
						Transaction
					</div>
				</div>

			</div>
			<div className={styles.single_box}>
				<div style={{ display: 'flex' }}>
					<div>{total_shipment_count}</div>
				</div>
			</div>

		</div>
	);
}

export default InsightComponent;
