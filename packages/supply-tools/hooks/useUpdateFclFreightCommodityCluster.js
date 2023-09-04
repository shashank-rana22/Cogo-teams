import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import getCreateUpdateCommodityPayload from '../helpers/getCreateUpdateCommodityPayload';
import toastApiError from '../utils/toastApiError';

const useUpdateFclFreightCommodityCluster = ({
	successMessage = 'Updated Successfully!',
	refetch = () => {},
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_fcl_freight_commodity_cluster',
		method : 'POST',
	});

	// val wil have formValues as values and item
	const apiTrigger = async (val) => {
		try {
			const payload = getCreateUpdateCommodityPayload(val);
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

export default useUpdateFclFreightCommodityCluster;
