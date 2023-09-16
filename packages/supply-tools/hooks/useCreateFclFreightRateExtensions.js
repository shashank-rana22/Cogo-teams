import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import getFclFreightRateExtensionsPayload from '../helpers/getFclFreightRateExtensionsPayload';

const useCreateFclFreightRateExtensions = ({
	successMessage = 'Created Successfully!',
	refetch = () => {},
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_fcl_freight_rate_extension_rule_set',
		method : 'POST',
	}, { manual: true });

	const apiTrigger = async (val) => {
		try {
			const payload = getFclFreightRateExtensionsPayload(val);
			await trigger({ data: payload });

			Toast.success(successMessage);

			refetch();
		} catch (err) {
			Toast.error(err?.message);
		}
	};

	return {
		loading,
		apiTrigger,
	};
};

export default useCreateFclFreightRateExtensions;
