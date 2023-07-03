import { startCase, format } from '@cogoport/utils';

const getFiltersTagsArray = (filters) => {
	const SHIPMENT_STATUS_ARRAY = [];
	const RD_STATUS_ARRAY = [];
	const TRADE_TYPE_ARRAY = [];
	const SHIPMENT_SOURCE_ARRAY = [];
	const DEPARTURE_DATE_ARRAY = [];
	const CREATED_DATE_ARRAY = [];
	const CARGO_DATE_ARRAY = [];
	if (filters?.state) {
		SHIPMENT_STATUS_ARRAY.push({
			key     	: '1',
			children : `${startCase(filters?.state)} Shipment`,
			color    : '#F3FAFA',
			closable : true,
		});
	}
	if (filters?.rd_state) {
		RD_STATUS_ARRAY.push({
			key     	: '1',
			children : `${startCase(filters?.rd_state)} RD Status`,
			color    : '#F3FAFA',
			closable : true,
		});
	}
	if (filters?.trade_type) {
		TRADE_TYPE_ARRAY.push({
			key     	: '2',
			children : startCase(filters?.trade_type),
			color    : '#F3FAFA',
			closable : true,
		});
	}
	if (filters?.source) {
		SHIPMENT_SOURCE_ARRAY.push({
			key     	: '2',
			children : startCase(filters?.source),
			color    : '#F3FAFA',
			closable : true,
		});
	}
	if (filters?.departure_date?.startDate || filters?.departure_date?.endDate) {
		DEPARTURE_DATE_ARRAY.push({
			key     	: '2',
			children : `Departure : ${format(filters?.departure_date?.startDate, 'dd MMM YYYY')} -
			${format(filters?.departure_date?.endDate, 'dd MMM YYYY')}`,
			color    : '#F3FAFA',
			closable : true,
		});
	}
	if (filters?.created_date?.startDate || filters?.created_date?.endDate) {
		CREATED_DATE_ARRAY.push({
			key     	: '2',
			children : `Created : ${format(filters?.created_date?.startDate, 'dd MMM YYYY')} -
			${format(filters?.created_date?.endDate, 'dd MMM YYYY')}`,
			color    : '#F3FAFA',
			closable : true,
		});
	}
	if (filters?.cargo_readiness_date?.startDate || filters?.cargo_readiness_date?.endDate) {
		CARGO_DATE_ARRAY.push({
			key     	: '2',
			children : `Cargo Date : ${format(filters?.cargo_readiness_date?.startDate, 'dd MMM YYYY')} -
			${format(filters?.cargo_readiness_date?.endDate, 'dd MMM YYYY')}`,
			color    : '#F3FAFA',
			closable : true,
		});
	}
	return {
		shipmentStatusArray : SHIPMENT_STATUS_ARRAY,
		tradeTypeArray      : TRADE_TYPE_ARRAY,
		shipmentSourceArray : SHIPMENT_SOURCE_ARRAY,
		departureDateArray  : DEPARTURE_DATE_ARRAY,
		createdDateArray    : CREATED_DATE_ARRAY,
		rdStatusArray       : RD_STATUS_ARRAY,
		cargoDateArray      : CARGO_DATE_ARRAY,
	};
};
export default getFiltersTagsArray;
