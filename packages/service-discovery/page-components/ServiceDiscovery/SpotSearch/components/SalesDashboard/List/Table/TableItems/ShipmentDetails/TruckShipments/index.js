import { Tooltip, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const SERVICE_TYPE_MAPPING = {
	ftl_freight : 'ftl_freight_services',
	ltl_freight : 'ltl_freight_services',
};

function TruckShipments({
	itemData = {},
	commodityKey = '',
	shipment_type = '',
}) {
	const services = itemData[SERVICE_TYPE_MAPPING[shipment_type]];

	let commodityDetails = {};

	if (commodityKey === 'shipment_cargo_details') {
		const {
			commodity = '',
			trade_type = '',
			truck_type = '',
			volume = 0,
			weight = 0,
		} = services[GLOBAL_CONSTANTS.zeroth_index] || {};

		commodityDetails = {
			finalCommodity : commodity,
			tradeType      : trade_type,
			truckType      : truck_type,
			weight,
			volume,
		};
	}

	if (
		['spot_search_cargo_details', 'quotation_cargo_details'].includes(
			commodityKey,
		)
	) {
		const {
			commodity = '',
			trade_type = '',
			truck_type = '',
			volume = 0,
			weight = 0,
		} = itemData || {};

		commodityDetails = {
			finalCommodity : commodity,
			tradeType      : trade_type,
			truckType      : truck_type,
			weight,
			volume,
		};
	}

	const {
		finalCommodity = 'General',
		tradeType = '-',
		truckType,
		weight,
		volume,
	} = commodityDetails || {};

	function Content() {
		return (
			<div className={styles.container}>
				{weight || volume ? (
					<div className={styles.flex}>
						{volume && (
							<Pill
								size="md"
								color="#F9F9F9"
								className={styles.pill}
							>
								{volume}
								{' '}
								CBM Vol.
							</Pill>
						)}
						{weight && (
							<Pill
								size="md"
								color="#F9F9F9"
								className={styles.pill}
							>
								{weight}
								{' '}
								Tons WT.
							</Pill>
						)}
					</div>
				) : null}

				{truckType && (
					<Pill
						size="md"
						color="#F9F9F9"
						className={styles.pill}
					>
						{startCase(truckType)}
					</Pill>
				)}

				{tradeType && (
					<Pill
						size="md"
						color="#F9F9F9"
						className={styles.pill}
					>
						{startCase(tradeType)}
					</Pill>
				)}

				<Pill
					size="md"
					color="#F9F9F9"
					className={styles.pill}
				>
					{startCase(finalCommodity || 'all_commodities')}
				</Pill>
			</div>
		);
	}

	return (
		<Tooltip
			placement="top"
			content={<Content />}
		>
			<Content />
		</Tooltip>
	);
}
export default TruckShipments;
