import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';

import formatPayload from '../helpers/service-upsell-payload';

export default function useCreateSpotSearch({
	service = {},
	primary_service = {},
	shipment_data = {},
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
			shipment_data,
			formValues: values,
			organization_id,
			user,
		});

		try {
			const res = await trigger({ data: { ...payload } });

			if (!res.hasError) {
				let newHref = `${window.location.origin}/${router?.query?.partner_id}/book/`;
				newHref += `${res.data?.id}/${shipment_data?.importer_exporter_id}/${shipment_data?.id}`;

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
