import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';

import formatPayload from '../helpers/service-upsell-payload';

const useCreateSpotSearch = ({ service, primary_service, shipmentData }) => {
	const [loading, setLoading] = useRequest(false);
	const { push } = useRouter();

	console.log('in Search');

	const { shipment_type } = shipmentData;

	const onAddService = async (values) => {
		console.log(values, 'valuesAddService');
	};

	return {
		onAddService,
	};
};

export default useCreateSpotSearch;
