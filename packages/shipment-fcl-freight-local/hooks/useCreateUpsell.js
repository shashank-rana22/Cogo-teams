import { useRouter } from '@cogoport/next';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

import formatPayload from '../helpers/service-upsell-payload';

const useCreateUpsell = ({
	service = {},
	primary_service = {},
	shipment_data = {},
}) => {
	const router = useRouter();

	const [{ loading }, trigger] = useRequest({
		url    : 'create_spot_search',
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
				newHref += `${res.data?.id}/${res.data?.importer_exporter_id}/${shipment_data?.id}`;

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
};

export default useCreateUpsell;
