import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useCallback, useEffect } from 'react';

import FormatData from '../utils/formatData';

function useGetDocumentCount({
	activeMessageCard,
	activeVoiceCard,
	activeTab,
}) {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_omnichannel_documents',
		method : 'get',
	}, { manual: true });

	const documentsCount = useCallback(async () => {
		try {
			const { userId = '', userMobile = '', leadUserId = '' } = FormatData({
				activeMessageCard,
				activeVoiceCard,
				activeTab,
			});

			const checkConditions = isEmpty(userId) && isEmpty(userMobile);

			await trigger({
				data: {
					user_id       : !isEmpty(userId) ? userId : undefined,
					mobile_number : isEmpty(userId) ? userMobile : undefined,
					lead_user_id  : checkConditions ? leadUserId : undefined,
					is_seen       : false,
				},
			});
		} catch (error) {
			// console.log(error);
		}
	}, [activeMessageCard, activeTab, activeVoiceCard, trigger]);

	useEffect(() => {
		documentsCount();
	}, [documentsCount]);

	return {
		data,
		loading,
		documentsCount,
	};
}

export default useGetDocumentCount;
