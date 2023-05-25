import { useRouter } from '@cogoport/next';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

import formatPayload from '../helpers/service-upsell-payload';

export default function useCreateSpotSearch({
	service = {},
	primary_service = {},
	shipmentData = {},
	organization_id = '',
	user = {},
}) {
	const router = useRouter();

	const [{ loading }, trigger] = useRequest({
		url    : '/create_spot_search',
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
			const res = await trigger({ data: { ...payload } });

			if (!res.hasError) {
				let newHref = `${window.location.origin}/${router?.query?.partner_id}/book/`;
				newHref += `${res.data?.id}/${shipmentData?.importer_exporter_id}/${shipmentData?.id}`;

				window.location.href = newHref;
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
