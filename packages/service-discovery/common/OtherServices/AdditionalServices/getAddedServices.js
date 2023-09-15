import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';

const getAddedServices = (service_details) => {
	const servicesList = Object.values(service_details || {}) || [];

	const subsidiary_services = servicesList.filter((serviceItem) => serviceItem.service_type === 'subsidiary');

	const different_subsidiary_services = subsidiary_services.reduce((acc, current) => {
		if (current.code in acc) {
			const temp = acc[current.code];
			return { ...acc, [current.code]: [...temp, current] };
		} return { ...acc, [current.code]: [current] };
	}, {});

	const added_services_obj = Object.entries(different_subsidiary_services || {}).map(([code, servicesArray]) => {
		const service = servicesArray[GLOBAL_CONSTANTS.zeroth_index];

		let tradeType = '';

		if (service?.trade_type === 'export') {
			tradeType = 'Origin';
		} else if (service?.trade_type === 'import') {
			tradeType = 'Destination';
		}

		const formattedTitle = `${startCase(service.service_name)} (${code})`;
		const formattedLabel = formattedTitle.includes(tradeType) ? formattedTitle : `${tradeType} ${formattedTitle}`;

		return {
			data         : servicesArray,
			isSelected   : true,
			name         : service.service_name,
			rateData     : servicesArray,
			service_type : 'subsidiary',
			title        : formattedLabel,
			trade_type   : service.trade_type,
		};
	});

	return added_services_obj || [];
};
export default getAddedServices;
