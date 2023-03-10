import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import FormatData from '../utils/formatData';

function useGetOmnichannelDocumentCount({
	activeMessageCard,
	activeVoiceCard,
	activeTab,
}) {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_omnichannel_document',
		method : 'get',
	}, { manual: true });

	const { userId = '', userMobile = '', leadUserId = '' } = FormatData({
		activeMessageCard,
		activeVoiceCard,
		activeTab,
	});

	const checkConditions = !isEmpty(userId) && !isEmpty(userMobile);

	const documentCount = async () => {
		try {
			await trigger({
				params: {
					user_id       : !isEmpty(userId) ? userId : undefined,
					mobile_number : isEmpty(userId) ? userMobile : undefined,
					lead_user_id  : checkConditions ? leadUserId : undefined,

				},
			});
		} catch (error) {
			// console.log(error);
		}
	};

	useEffect(() => {
		documentCount();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		documentCount,
		data,
		loading,
	};
}

export default useGetOmnichannelDocumentCount;
