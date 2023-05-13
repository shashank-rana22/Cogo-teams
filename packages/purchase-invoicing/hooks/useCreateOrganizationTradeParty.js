import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';

const useCreateOrganizationTradeParty = ({
	successMessage = 'Successfully Created',
	refetch,
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_organization_trade_party',
		method : 'POST',
	}, { manual: true });

	const apiTrigger = async (payload) => {
		try {
			const res = await trigger({ data: payload });
			if (!res.hasError) {
				Toast.success(successMessage);
				refetch();
			}
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		apiTrigger, loading,
	};
};

export default useCreateOrganizationTradeParty;
