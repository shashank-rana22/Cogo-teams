import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useMemo } from 'react';

import getRequiredFilters from '../utils/getRequiredFilters';

const DEFAULT_PRICE_VALUE = Infinity;

const transportationServices = [
	{
		service_type : 'ftl_freight',
		trade_type   : 'export',
		name         : 'export_ftl_freight',
	},
	{
		service_type : 'trailer_freight',
		trade_type   : 'export',
		name         : 'export_trailer_freight',
	},
	{
		service_type : 'ftl_freight',
		trade_type   : 'import',
		name         : 'import_ftl_freight',
	},
	{
		service_type : 'trailer_freight',
		trade_type   : 'import',
		name         : 'import_trailer_freight',
	},
];

const useGetMinPrice = ({ allServices = [], total_price_currency = 'USD', detail = {}, rateCardData = {} }) => {
	const newServices = [
		...allServices.filter(
			(service) => service.service_type !== 'transportation',
		).map((item) => ({
			service_type : item.service_type,
			trade_type   : item.trade_type,
			name         : item.name,
		})),
		...transportationServices,
	];

	const service_attributes = newServices.map((serviceItem) => {
		const { name = '', service_type, trade_type } = serviceItem;

		const filters = getRequiredFilters({ detail, service: name, trade_type, rateCardData });

		return {
			filters,
			id: name,
			service_type,
		};
	});

	const [{ loading, data }] = useRequest({
		method : 'GET',
		url    : 'get_freight_rate_min_price',
		params : {
			currency: total_price_currency,
			service_attributes,
		},
	}, { manual: !allServices || isEmpty(allServices) });

	const startingPrices = useMemo(() => {
		const STARTING_PRICES = [];

		const excludedIds = ['import_ftl_freight', 'import_trailer_freight',
			'export_ftl_freight', 'export_trailer_freight'];

		const filteredArray = (data || []).filter((item) => !excludedIds.includes(item.id));
		const excludedArray = (data || []).filter((item) => excludedIds.includes(item.id));

		const exportFtlFreight = excludedArray.find((item) => item.id === 'export_ftl_freight');
		const exportTrailerFreight = excludedArray.find((item) => item.id === 'export_trailer_freight');
		const minExportTransportationPrice = Math.min(
			exportFtlFreight?.price ? exportFtlFreight.price : DEFAULT_PRICE_VALUE,
			exportTrailerFreight?.price ? exportTrailerFreight.price : DEFAULT_PRICE_VALUE,
		);

		const exportTransportationObject = {
			id    : 'export_transportation',
			price : minExportTransportationPrice === Infinity ? null : minExportTransportationPrice,
		};

		const importFtlFreight = excludedArray.find((item) => item.id === 'import_ftl_freight');
		const importTrailerFreight = excludedArray.find((item) => item.id === 'import_trailer_freight');
		const minImportTransportationPrice = Math.min(
			importFtlFreight?.price ? importFtlFreight.price : DEFAULT_PRICE_VALUE,
			importTrailerFreight?.price ? importTrailerFreight.price : DEFAULT_PRICE_VALUE,
		);

		const importTransportationObject = {
			id    : 'import_transportation',
			price : minImportTransportationPrice === Infinity ? null : minImportTransportationPrice,
		};

		STARTING_PRICES.push(...[exportTransportationObject, importTransportationObject], ...filteredArray);

		return STARTING_PRICES;
	}, [data]);

	return {
		startingPrices,
		loading,
	};
};
export default useGetMinPrice;
