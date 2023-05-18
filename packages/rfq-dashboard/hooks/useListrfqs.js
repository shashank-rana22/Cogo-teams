import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useListRfqs = () => {
	const [{ loading, data }, trigger] = useRequest({
		url    : 'list_rfqs',
		method : 'GET',
		params : {
			port_pair_data_required         : 'true',
			rate_card_user_details_required : 'true',
			filters                         : {
				state: 'requested_for_approval',

			},
		},
	}, { manual: false });

	const getRfqsForApproval = async () => {
		try {
			await trigger();
		} catch (error) {
			if (error?.response) {
				Toast.error(getApiErrorString(error?.response?.data));
			}
		}
	};

	return {
		getRfqsForApproval,
		data,
		loading,
	};
};

export default useListRfqs;
