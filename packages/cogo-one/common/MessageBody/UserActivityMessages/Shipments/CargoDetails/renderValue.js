import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase, upperCase } from '@cogoport/utils';

const COUNT = 1;
const DFAULT_VALUE = 0;
const ROUND_VALUE = 2;
const NEED_TO_ASK = 166.67;

export const renderValue = ({ label, detail }) => {
	const isAir =		detail?.service_type === 'air_freight_service'
		|| detail?.service_type === 'domestic_air_freight_service'
		|| detail?.shipment_type === 'air_freight';

	const isLTL = detail?.service_type === 'ltl_freight_service';

	const isFTL = detail?.service_type === 'ftl_freight_service';

	const commodityDataDetails = detail.commodity_details?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	const volume = ` ${detail.volume} ${isLTL ? 'cc' : 'cbm'}`;

	const chargableWeight = isLTL
		? detail?.chargable_weight || detail?.weight
		: Number(detail?.chargeable_weight)
		|| Math.max((detail?.volume || DFAULT_VALUE) * NEED_TO_ASK, detail?.weight || DFAULT_VALUE);

	const commodityDetails = () => {
		if (isAir) {
			return (
				<div>
					{`${startCase(detail?.commodity)}, ${startCase(
						commodityDataDetails?.commodity_type || detail?.commodity_type,
					)}, ${startCase(
						commodityDataDetails?.commodity_subtype || detail?.commodity_sub_type,
					)}`}
				</div>
			);
		}
		return startCase(detail.commodity);
	};

	switch (label) {
		case 'commodity':
			return commodityDetails();
		case 'container_size':
			if (detail.container_size.includes('HC')) {
				return detail.container_size.replace('HC', 'ft HC');
			}
			return `${detail.container_size || '--'}ft`;

		case 'containers_count':
			if (!detail.containers_count) {
				return null;
			}

			if (detail.containers_count === COUNT) {
				return '1 Container';
			}
			return `${detail.containers_count} Containers`;
		case 'container_type':
			return startCase(detail.container_type || '');
		case 'inco_term':
			return `Inco - ${upperCase(detail.inco_term || '')}`;

		case 'trucks_count':
			if (!detail.trucks_count) {
				return null;
			}

			if (detail.trucks_count === COUNT) {
				return '1 Truck';
			}

			return `${detail.trucks_count} Trucks`;

		case 'trade_type':
			return startCase(detail.trade_type || '');

		case 'cargo_weight_per_container':
			return `${detail.cargo_weight_per_container} MT`;

		case 'volume':
			return ` ${volume} ${
				detail.service_type === 'ftl_freight_service'
					|| detail.service_type === 'haulage_freight_service'
					? ''
					: `, Chargeable Weight: ${chargableWeight.toFixed(ROUND_VALUE)} kg`
			}`;
		case 'weight':
			return ` ${detail.weight} ${isFTL ? 'Ton' : 'Kgs'}`;
		default:
			return detail[label] || null;
	}
};
