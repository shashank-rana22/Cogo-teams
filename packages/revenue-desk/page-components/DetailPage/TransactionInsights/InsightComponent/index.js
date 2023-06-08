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
		destination_airport = {},
		origin_airport = {},
		origin_port = {},
		destination_port = {},
	} = data;

	const { port_code: desAirPortCode = '' } = destination_airport || {};
	const { port_code: orgAirPortCode = '' } = origin_airport || {};
	const { port_code: orgFclPortCode = '' } = origin_port || {};
	const { port_code: desFclPortCode = '' } = destination_port || {};

	const {
		name = '',
		service_port_pair_shipment_count = 0,
		service_shipment_count = 0,
		service_trade_type_shipment_count = 0,
		total_shipment_count = 0,
	} = insightData;
	return (
		<div className={styles.mainContainer}>
			<div className={styles.container}>
				{name ? (
					<div style={{ display: 'flex' }}>
						<div className={styles.text}>
							{KEY_MAPPING[type]}
							{' '}
							:
						</div>
						{' '}
						<Tooltip content={name}>
							<div className={styles.text}>
								{' '}
								{name}
							</div>
						</Tooltip>
					</div>
				) : null}

				{total_shipment_count ? (
					<div style={{ display: 'flex' }}>
						<div className={styles.text}>Total Transactions :</div>
						{' '}
						<div className={styles.text}>{total_shipment_count}</div>
					</div>
				) : null}
			</div>

			<div className={styles.subContainer}>
				{service_shipment_count ? (
					<div style={{ display: 'flex' }}>
						{getOrdinalNumber(service_shipment_count)}
						<div className={styles.bold}>
							{' '}
							{LABEL_MAPPING[shipment_type]}
						</div>
					</div>
				) : null}

				{!['ftl_freight', 'ltl_freight'].includes(shipment_type)
				&& service_trade_type_shipment_count ? (
					<div style={{ display: 'flex' }}>
						{getOrdinalNumber(service_trade_type_shipment_count)}
						{' '}
						{LABEL_MAPPING[shipment_type]}
						{' '}
						<div className={styles.bold}>
							{' '}
							{trade_type.toUpperCase()}
						</div>
					</div>
					) : null}

				{service_port_pair_shipment_count ? (
					<div style={{ display: 'flex' }}>
						{getOrdinalNumber(service_port_pair_shipment_count)}
						{' '}
						{LABEL_MAPPING[shipment_type]}
						-
						{trade_type.toUpperCase() || incoTermMapping[data?.inco_term].toUpperCase()}
						{' '}
						-
						<div className={styles.bold}>
							{orgAirPortCode || orgFclPortCode}
							{' '}
							-
							{' '}
							{desAirPortCode || desFclPortCode}
						</div>
					</div>
				) : null}
			</div>
		</div>
	);
}

export default InsightComponent;
