import { useRouter } from '@cogoport/next';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

import formatPayload from '../helpers/service-upsell-payload';

const useCreateUpsell = ({
	service = {},
	primary_service = {},
	shipmentData = {},
	organization_id = '',
	user = {},
}) => {
	const router = useRouter();

	const { navigation = '' } = router.query;

	const [{ loading }, trigger] = useRequest({
		url    : 'fcl_freight/create_upsell',
		method : 'POST',
	}, { manual: true });

	const onAddService = async (values) => {
		const { payload } = formatPayload({
			service,
			primary_service,
			shipmentData,
			formValues: values,
			organization_id,
			user,
		});

		try {
			const res = await trigger({ data: payload });

			let newHref = `${window.location.origin}/${router?.query?.partner_id}/book/`;
			newHref += `${res.data?.id}/${res.data?.importer_exporter_id}/${shipmentData?.id}
			?shipment_type=${shipmentData?.shipment_type}&navigation=${navigation}`;

			window.location.href = newHref;
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		onAddService,
		loading,
	};
};

export default useCreateUpsell;
