import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError'; import { useRequest } from '@cogoport/request';

import GROUP_PAYLOAD_FUNC_MAPPING from '../helpers/updateGroupHelper';

function useUpdateCogooneGroup({ activeTab = {}, setAddMembers = () => {}, cleanUpFunc = () => {} }) {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_cogoone_groups',
		method : 'post',
	}, { manual: true, autoCancel: false });

	const { groupData = {} } = activeTab || {};

	const updateCogooneGroup = async ({ actionName = '', userIds = [], groupName = '' }) => {
		const { getPayload } = GROUP_PAYLOAD_FUNC_MAPPING[actionName];

		if (!getPayload || loading) {
			return;
		}

		try {
			await trigger({
				data: getPayload({
					userIds,
					groupData,
					groupName,
				}),
			});
			setAddMembers(false);
			cleanUpFunc();
		} catch (error) {
			Toast.error(
				getApiErrorString(error?.response?.data)
				|| 'Something Went Wrong',
			);
		}
	};

	return {
		updateCogooneGroup,
		globalLoading: loading,
	};
}

export default useUpdateCogooneGroup;
