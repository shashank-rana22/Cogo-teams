import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useCallback, useMemo } from 'react';

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

	const documentsList = useCallback(async (filters) => {
		try {
			const checkConditions = isEmpty(userId) && isEmpty(userMobile);

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
	}, [leadUserId, setFilterVisible, trigger, type, userId, userMobile]);

	const emptyCheck = useMemo(() => !isEmpty(userId) || !isEmpty(userMobile), [userId, userMobile]);

	useEffect(() => {
		if (emptyCheck) {
			documentsList();
		}
	}, [customerId, activeSelect, emptyCheck, documentsList]);

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
