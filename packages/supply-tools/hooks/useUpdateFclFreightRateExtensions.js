import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import getFclFreightRateExtensionsPayload from '../helpers/getFclFreightRateExtensionsPayload';
import toastApiError from '../utils/toastApiError';

const useUpdateFclFreightRateExtensions = ({
	successMessage = 'Updated Successfully!',
	refetch = () => {},
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_fcl_freight_rate_extension_rule_set',
		method : 'POST',
	}, { manual: true });

	const apiTrigger = async (val) => {
		try {
			const payload = getFclFreightRateExtensionsPayload(val);
			await trigger({ data: payload });

			Toast.success(successMessage);

			refetch();
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		loading,
		apiTrigger,
	};
};

export default useUpdateFclFreightRateExtensions;
