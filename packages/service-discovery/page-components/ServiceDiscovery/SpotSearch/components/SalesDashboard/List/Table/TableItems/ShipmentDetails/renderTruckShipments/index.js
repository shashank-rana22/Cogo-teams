import { Tooltip } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

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
				<span>
					<div>
						<div>
							Commodity :
							{startCase(finalCommodity)}
						</div>

						<div>
							Trade Type :
							{startCase(tradeType)}
						</div>

						{commodityDetails.truckType && (
							<div>
								Truck Type :
								{startCase(truckType)}
							</div>
						)}
					</div>
				</span>
			)}
		>
			<span>
				<div>
					<div>
						Commodity :
						{startCase(finalCommodity)}
					</div>

					<div>
						Trade Type :
						{startCase(tradeType)}
					</div>

					{truckType && (
						<div>
							Truck Type :
							{startCase(truckType)}
						</div>
					)}
				</div>
			</span>
		</Tooltip>
	);
}
export default RenderTruckShipments;
