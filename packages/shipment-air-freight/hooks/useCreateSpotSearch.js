import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';

import formatPayload from '../commons/utils/service-upsell-payload';

export default function useCreateSpotSearch({
	service = {},
	primary_service = {},
	shipment_data = {},
}) {
	const router = useRouter();

	const { navigation = '' } = router.query;

	const [{ loading }, trigger] = useRequest({
		url    : '/create_spot_search',
		method : 'POST',
	}, { manual: true });

	const onAddService = async (values) => {
		const { payload } = formatPayload({
			service,
			primary_service,
			shipment_data,
			formValues: values,
		});

		try {
			const res = await trigger({ data: { ...payload } });

			if (!res.hasError) {
				let newHref = `${window.location.origin}/${router?.query?.partner_id}/book/`;
				newHref += `${res.data?.id}/${shipment_data?.importer_exporter_id}/${shipment_data?.id}
				?shipment_type=${shipment_data?.shipment_type}&navigation=${navigation}`;

				window.location.href = newHref;
				window.sessionStorage.setItem('shipment_type', shipment_data?.shipment_type);
			}
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		onAddService,
		loading,
	};
}
