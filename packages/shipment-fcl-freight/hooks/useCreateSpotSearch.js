import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';

import formatPayload from '../helpers/service-upsell-payload';

const useCreateSpotSearch = ({ service = {}, primary_service = {}, shipmentData = {}, services = [] }) => {
	// const [loading, setLoading] = useRequest(false);
	const router = useRouter();

	console.log(router, 'router');

	const { query } = router;
	const { partner_id } = query;

	const [{ loading }, trigger] = useRequest({
		url    : 'fcl_freight/create_upsell',
		method : 'POST',
	}, { manual: true });

	const onAddService = async (values) => {
		const { payload } = formatPayload({
			service,
			services,
			primary_service,
			shipmentData,
			formValues: values,
		});

		const res = await trigger({ data: { ...payload } });

		if (!res.hasError) {
			const newHref = `${window.location.origin}/${partner_id}/book/${res.data?.id}/${res.data?.importer_exporter_id}/${shipmentData?.id}`;

			window.location.replace(newHref);

			// push(
			// 	'/book/[checkout_id]/[importer_exporter_id]/[shipment_id]',
			// 	`/book/${res.data?.id}/${res.data?.importer_exporter_id}/${shipmentData?.id}`,
			// );
		}
	};

	return {
		onAddService,
		loading,
	};
};

export default useCreateSpotSearch;
