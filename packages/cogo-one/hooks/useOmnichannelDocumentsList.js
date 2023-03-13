import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import FormatData from '../utils/formatData';

function useOmnichannelDocumentsList({
	activeMessageCard,
	activeVoiceCard,
	activeTab,
	customerId,
	setFilterVisible,
}) {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_omnichannel_documents',
		method : 'get',
	}, { manual: true });

	const { userId = '', userMobile = '', leadUserId = '', orgId = '' } = FormatData({
		activeMessageCard,
		activeVoiceCard,
		activeTab,
	});

	const checkConditions = isEmpty(userId) && isEmpty(userMobile);

	const documentsList = async (filters) => {
		try {
			await trigger({
				params: {
					page_limit : 1000,
					filters    : {
						user_id       : !isEmpty(userId) ? userId : undefined,
						mobile_number : isEmpty(userId) ? userMobile : undefined,
						lead_user_id  : checkConditions ? leadUserId : undefined,
						document_type : !isEmpty(filters) ? filters : undefined,
					},
				},
			});
			setFilterVisible(false);
		} catch (error) {
			// console.log(error);
		}
	};

	useEffect(() => {
		if (!(isEmpty(userId)) || !(isEmpty(userMobile))) {
			documentsList();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [customerId]);

	return {
		documentsList,
		list: data?.list || [],
		loading,
		orgId,
	};
}

export default useOmnichannelDocumentsList;
