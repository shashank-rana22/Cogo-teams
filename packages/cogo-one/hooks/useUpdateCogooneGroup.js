import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError'; import { useRequest } from '@cogoport/request';

import GROUP_PAYLOAD_FUNC_MAPPING from '../helpers/updateGroupHelper';

function useUpdateCogooneGroup({ activeTab = {}, setAddMembers = () => {} }) {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_cogoone_groups',
		method : 'post',
	}, { manual: true });

	const { groupData = {} } = activeTab || {};

	const updateCogooneGroup = async ({ actionName = '', userIds = [] }) => {
		const { getPayload } = GROUP_PAYLOAD_FUNC_MAPPING[actionName];

		if (!getPayload || loading) {
			return;
		}

		try {
			await trigger({
				data: getPayload({
					userIds,
					groupData,
				}),
			});
			setAddMembers(false);
		} catch (error) {
			Toast.error(
				getApiErrorString(error?.response?.data)
				|| 'Something Went Wrong',
			);
		}
	};

	return {
		updateCogooneGroup,
		loading,
	};
}

export default useUpdateCogooneGroup;
