import { isEmpty } from '@cogoport/utils';

const upsellTransportation = (serviceObj) => {
	let cancelUpsellOriginFor = '';
	let cancelUpsellDestinationFor = '';

	if (!isEmpty(serviceObj.originServices.ftl_freight_service)) {
		cancelUpsellOriginFor = 'trailer_freight_service';
	} else if (!isEmpty(serviceObj.originServices.trailer_freight_service)) {
		cancelUpsellOriginFor = 'ftl_freight_service';
	}

	if (!isEmpty(serviceObj.destinationServices.ftl_freight_service)) {
		cancelUpsellDestinationFor = 'trailer_freight_service';
	} else if (!isEmpty(serviceObj.originServices.trailer_freight_service)) {
		cancelUpsellDestinationFor = 'ftl_freight_service';
	}

	return {
		cancelUpsellOriginFor,
		cancelUpsellDestinationFor,
	};
};

export default upsellTransportation;
