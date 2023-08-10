import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';

function useUpdateFtlAdditionalService({
	refetch = () => {},
}) {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_ftl_freight_additional_service',
		method : 'POST',
	}, { manual: true });

	const updateService = async (val) => {
		try {
			const res = await trigger({ data: val });
			if (!res?.hasError) {
				refetch();
			}
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		loading,
		updateService,
	};
}

export default useUpdateFtlAdditionalService;
