import { isEmpty } from '@cogoport/utils';

const upsellTransportation = (serviceObj) => {
	const [cancelUpsellOriginFor, cancelUpsellDestinationFor] = ['originServices', 'destinationServices']
		.map((key) => {
			if (!isEmpty(serviceObj[key].ftl_freight_service)) {
				return 'ltl_freight_service';
			}
			if (!isEmpty(serviceObj[key].ltl_freight_service)) {
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
