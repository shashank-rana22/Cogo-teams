import { isEmpty } from '@cogoport/utils';

const upsellTransportation = (serviceObj) => {
	const [cancelUpsellOriginFor, cancelUpsellDestinationFor] = ['originServices', 'destinationServices']
		.map((key) => {
			if (!isEmpty(serviceObj[key].ftl_freight_service)) {
				return 'trailer_freight_service';
			}
			if (!isEmpty(serviceObj[key].trailer_freight_service)) {
				return 'ftl_freight_service';
			}
			return '';
		});

	return {
		cancelUpsellOriginFor,
		cancelUpsellDestinationFor,
	};
};

export default upsellTransportation;
