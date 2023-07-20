import { startCase, format } from '@cogoport/utils';

const getFiltersTagsArray = (filters) => {
	const SHIPMENT_STATUS = [];
	const RD_STATUS = [];
	const TRADE_TYPE = [];
	const SHIPMENT_SOURCE = [];
	const DEPARTURE_DATE = [];
	const CREATED_DATE = [];
	const CARGO_DATE = [];
	if (filters?.state) {
		SHIPMENT_STATUS.push({
			key     	: '1',
			children : `${startCase(filters?.state)} Shipment`,
			color    : '#F3FAFA',
			closable : true,
		});
	}
	if (filters?.rd_state) {
		RD_STATUS.push({
			key     	: '1',
			children : `${startCase(filters?.rd_state)} RD Status`,
			color    : '#F3FAFA',
			closable : true,
		});
	}
	if (filters?.trade_type) {
		TRADE_TYPE.push({
			key     	: '2',
			children : startCase(filters?.trade_type),
			color    : '#F3FAFA',
			closable : true,
		});
	}
	if (filters?.source) {
		SHIPMENT_SOURCE.push({
			key     	: '2',
			children : startCase(filters?.source),
			color    : '#F3FAFA',
			closable : true,
		});
	}
	if (filters?.departure_date?.startDate || filters?.departure_date?.endDate) {
		DEPARTURE_DATE.push({
			key     	: '2',
			children : `Departure : ${format(filters?.departure_date?.startDate, 'dd MMM YYYY')} -
			${format(filters?.departure_date?.endDate, 'dd MMM YYYY')}`,
			color    : '#F3FAFA',
			closable : true,
		});
	}
	if (filters?.created_date?.startDate || filters?.created_date?.endDate) {
		CREATED_DATE.push({
			key     	: '2',
			children : `Created : ${format(filters?.created_date?.startDate, 'dd MMM YYYY')} -
			${format(filters?.created_date?.endDate, 'dd MMM YYYY')}`,
			color    : '#F3FAFA',
			closable : true,
		});
	}
	if (filters?.cargo_readiness_date?.startDate || filters?.cargo_readiness_date?.endDate) {
		CARGO_DATE.push({
			key     	: '2',
			children : `Cargo Date : ${format(filters?.cargo_readiness_date?.startDate, 'dd MMM YYYY')} -
			${format(filters?.cargo_readiness_date?.endDate, 'dd MMM YYYY')}`,
			color    : '#F3FAFA',
			closable : true,
		});
	}
	return {
		shipmentStatusArray : SHIPMENT_STATUS,
		tradeTypeArray      : TRADE_TYPE,
		shipmentSourceArray : SHIPMENT_SOURCE,
		departureDateArray  : DEPARTURE_DATE,
		createdDateArray    : CREATED_DATE,
		rdStatusArray       : RD_STATUS,
		cargoDateArray      : CARGO_DATE,
	};
};
export default getFiltersTagsArray;
