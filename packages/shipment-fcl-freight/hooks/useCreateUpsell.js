import { useRouter } from '@cogoport/next';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

import formatPayload from '../helpers/service-upsell-payload';

const useCreateUpsell = ({ service = {}, primary_service = {}, shipmentData = {} }) => {
	const router = useRouter();

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
		});

		try {
			const res = await trigger({ data: { ...payload } });
			if (!res.hasError) {
				let newHref = `${window.location.origin}/${router?.query?.partner_id}/book/`;
				newHref += `${res.data?.id}/${res.data?.importer_exporter_id}/${shipmentData?.id}`;

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
