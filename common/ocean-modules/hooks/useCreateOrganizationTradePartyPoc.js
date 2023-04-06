import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import getApiErrorString from '../utils/getApiErrorString';

const useCreateOrganizationTradePartyPoc = ({
	shipment_id = '', organization_id = '', refetch = () => {},
	successMessage = 'Successfully Created',
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_organization_trade_party_poc',
		method : 'POST',
	}, { manual: true });

	const apiTrigger = async (val) => {
		try {
			const res = await trigger({ params: { shipment_id, organization_id, ...val } });
			if (!res.hasError) {
				Toast.success(successMessage);
				refetch();
			}
		} catch (err) {
			Toast.error(getApiErrorString(err));
		}
	};

	return {
		apiTrigger, loading,
	};
};

export default useCreateOrganizationTradePartyPoc;
