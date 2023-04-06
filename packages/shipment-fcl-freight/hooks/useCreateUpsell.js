import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';

import formatPayload from '../helpers/service-upsell-payload';
import getApiErrorString from '../utils/getApiErrorString';

const useCreateUpsell = ({ service = {}, primary_service = {}, shipmentData = {} }) => {
	const router = useRouter();

	const { query } = router;
	const { partner_id } = query;

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
				// eslint-disable-next-line max-len
				const newHref = `${window.location.origin}/${partner_id}/book/${res.data?.id}/${res.data?.importer_exporter_id}/${shipmentData?.id}`;

				window.location.replace(newHref);
			}
		} catch (err) {
			Toast.error(getApiErrorString(err));
		}
	};

	return {
		onAddService,
		loading,
	};
};

export default useCreateUpsell;
