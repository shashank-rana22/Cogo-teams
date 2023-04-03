import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';

import formatPayload from '../helpers/service-upsell-payload';

const useCreateSpotSearch = ({ service = {}, primary_service = {}, shipmentData = {}, services = [] }) => {
	// const [loading, setLoading] = useRequest(false);
	const { push } = useRouter();

	const [{ loading }, trigger] = useRequest({
		url    : '/create_upsell',
		method : 'POST',
	}, { manual: true });

	console.log('in Search');

	const { shipment_type } = shipmentData;

	const onAddService = async (values) => {
		const { payload } = formatPayload({
			service,
			services,
			primary_service,
			shipmentData,
			formValues: values,
		});

		const res = await trigger({ data: { payload } });

		console.log(res, 'ress');
	};

	return {
		onAddService,
	};
};

export default useCreateSpotSearch;
