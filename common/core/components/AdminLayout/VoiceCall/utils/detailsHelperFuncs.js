import { startCase } from '@cogoport/utils';

const CHECK_IF_COUNT_MORE_THAN_ONE = 1;

const AIR_SERVICES = ['air_freight', 'domestic_air_freight_service', 'air_freight_service', 'domestic_air_freight'];
const FTL_SERVICES = ['ftl_freight', 'haulage_freight', 'ftl_freight_service', 'haulage_freight_service'];
const LTL_SERVICES = ['ltl_freight', 'ltl_freight_service'];

export const RENDER_VALUE_MAPPING = {
	container_size: (detail) => {
		if (detail.container_size?.includes('HC')) {
			return detail.container_size.replace('HC', 'ft HC');
		}
		return `${detail.container_size || '--'}ft`;
	},
	containers_count: (detail) => {
		const { containers_count } = detail || {};
		if (!containers_count) {
			return null;
		}
		return containers_count > CHECK_IF_COUNT_MORE_THAN_ONE ? `${containers_count} Containers` : '1 Container';
	},
	packages_count: (detail) => {
		const { packages_count } = detail || {};
		if (!packages_count) {
			return null;
		}
		return packages_count > CHECK_IF_COUNT_MORE_THAN_ONE ? `${packages_count} Packages` : '1 Package';
	},
	trucks_count: (detail) => {
		const { trucks_count } = detail || {};
		if (!trucks_count) {
			return null;
		}
		return trucks_count > CHECK_IF_COUNT_MORE_THAN_ONE ? `${trucks_count} Trucks` : '1 Truck';
	},
	truck_type     : (detail) => startCase(detail.truck_type || ''),
	container_type : (detail) => startCase(detail.container_type || ''),
	trade_type     : (detail) => startCase(detail.trade_type || ''),
	commodity      : (detail) => startCase(detail.commodity || ''),
};

export function serviceDetails({ detail = {}, service }) {
	const isAir = (AIR_SERVICES || []).includes(detail[service]);
	const isFTL = (FTL_SERVICES || []).includes(detail[service]);
	const isLTL = (LTL_SERVICES || []).includes(detail[service]);

	return { ...detail, isAir, isLTL, isFTL };
}
