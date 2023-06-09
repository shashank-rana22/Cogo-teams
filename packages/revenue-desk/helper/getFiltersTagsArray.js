import { startCase, format } from '@cogoport/utils';

const getFiltersTagsArray = (filters) => {
	const shipmentStatusArray = [];
	const rdStatusArray = [];
	const tradeTypeArray = [];
	const shipmentSourceArray = [];
	const departureDateArray = [];
	const createdDateArray = [];
	if (filters?.state) {
		shipmentStatusArray.push({
			key     	: '1',
			children : `${startCase(filters?.state)} Shipment`,
			color    : '#F3FAFA',
			closable : true,
		});
	}
	if (filters?.rd_state) {
		rdStatusArray.push({
			key     	: '1',
			children : `${startCase(filters?.rd_state)} RD Status`,
			color    : '#F3FAFA',
			closable : true,
		});
	}
	if (filters?.trade_type) {
		tradeTypeArray.push({
			key     	: '2',
			children : startCase(filters?.trade_type),
			color    : '#F3FAFA',
			closable : true,
		});
	}
	if (filters?.source) {
		shipmentSourceArray.push({
			key     	: '2',
			children : startCase(filters?.source),
			color    : '#F3FAFA',
			closable : true,
		});
	}
	if (filters?.departure_date?.startDate || filters?.departure_date?.endDate) {
		departureDateArray.push({
			key     	: '2',
			children : `Departure : ${format(filters?.departure_date?.startDate, 'dd MMM YYYY')} -
			${format(filters?.departure_date?.endDate, 'dd MMM YYYY')}`,
			color    : '#F3FAFA',
			closable : true,
		});
	}
	if (filters?.created_date?.startDate || filters?.created_date?.endDate) {
		createdDateArray.push({
			key     	: '2',
			children : `Created : ${format(filters?.created_date?.startDate, 'dd MMM YYYY')} -
			${format(filters?.created_date?.endDate, 'dd MMM YYYY')}`,
			color    : '#F3FAFA',
			closable : true,
		});
	}
	return {
		shipmentStatusArray,
		tradeTypeArray,
		shipmentSourceArray,
		departureDateArray,
		createdDateArray,
		rdStatusArray,
	};
};
export default getFiltersTagsArray;
