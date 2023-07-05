import { Tooltip } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const SERVICE_TYPE_MAPPING = {
	ftl_freight : 'ftl_freight_services',
	ltl_freight : 'ltl_freight_services',
};

function RenderTruckShipments({
	itemData = {},
	commodityKey,
	shipment_type,
}) {
	const services = itemData[SERVICE_TYPE_MAPPING[shipment_type]];

	let commodityDetails = {};

	if (commodityKey === 'shipment_cargo_details') {
		const {
			commodity = '',
			trade_type = '',
			truck_type = '',
		} = services[0] || {};

		commodityDetails = {
			finalCommodity : commodity,
			tradeType      : trade_type,
			truckType      : truck_type,
		};
	}

	if (
		['spot_search_cargo_details', 'quotation_cargo_details'].includes(
			commodityKey,
		)
	) {
		const { commodity = '', trade_type = '', truck_type = '' } = itemData || {};

		commodityDetails = {
			finalCommodity : commodity,
			tradeType      : trade_type,
			truckType      : truck_type,
		};
	}

	const {
		finalCommodity = 'General',
		tradeType = '-',
		truckType,
	} = commodityDetails || {};

	return (
		<Tooltip
			theme="light"
			placement="top"
			content={(
				<div>
					<span>
						Commodity :
						{startCase(finalCommodity)}
					</span>

					<span>
						Trade Type :
						{startCase(tradeType)}
					</span>

					{commodityDetails.truckType && (
						<span>
							Truck Type :
							{startCase(truckType)}
						</span>
					)}
				</div>
			)}
		>
			<div className={styles.container}>
				<span>
					Commodity :
					{startCase(finalCommodity)}
				</span>

				<span>
					Trade Type :
					{startCase(tradeType)}
				</span>

				{truckType && (
					<span>
						Truck Type :
						{startCase(truckType)}
					</span>
				)}
			</div>
		</Tooltip>
	);
}
export default RenderTruckShipments;
