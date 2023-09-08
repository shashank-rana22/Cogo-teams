import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import getFclFreightRateExtensionsPayload from '../helpers/getFclFreightRateExtensionsPayload';
import toastApiError from '../utils/toastApiError';

const useCreateUpdateFclFreightRateExtensions = ({
	successMessage = 'Created Successfully!',
	refetch = () => {},
}) => {
	const { scope = '' } = useSelector((state) => state.general);

	const [{ loading }, trigger] = useRequest({
		url    : '/create_fcl_freight_rate_extension_rule_set',
		method : 'POST',
		scope,
	}, { manual: true });

	const apiTrigger = async (val) => {
		try {
			const payload = getFclFreightRateExtensionsPayload(val);
			const res = await trigger({ data: payload });

			Toast.success(successMessage);

			refetch();

			return res;
		} catch (err) {
			toastApiError(err);
			return err;
		}
	};

	return {
		loading,
		apiTrigger,
	};
};

export default useCreateUpdateFclFreightRateExtensions;
