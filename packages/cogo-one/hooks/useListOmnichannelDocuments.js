import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import FormatData from '../utils/formatData';

function useListOmnichannelDocuments({
	activeMessageCard,
	activeVoiceCard,
	activeTab,
	customerId,
	setFilterVisible,
	activeSelect = '',
	type = '',
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
			let filters_payload = {
				user_id       : !isEmpty(userId) ? userId : undefined,
				mobile_number : isEmpty(userId) ? userMobile : undefined,
				lead_user_id  : checkConditions ? leadUserId : undefined,

			};

			if (type === 'count') {
				filters_payload = { ...filters_payload, is_seen: false };
			} else {
				filters_payload = {
					...filters_payload,
					document_type: !isEmpty(filters) ? filters : undefined,
				};
			}

			await trigger({
				params: {
					page_limit                : type !== 'count' ? 1000 : undefined,
					only_total_count_required : type === 'count',
					filters                   : filters_payload,
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
	}, [customerId, activeSelect]);

	const { list = [], total_count = 0 } = data || {};

	return {
		documentsList,
		list,
		documents_count: total_count,
		loading,
		orgId,
	};
}

export default useListOmnichannelDocuments;
