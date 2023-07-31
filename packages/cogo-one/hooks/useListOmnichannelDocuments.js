import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useCallback, useMemo, useState } from 'react';

import FormatData from '../utils/formatData';

const FIRST_PAGE = 1;

function useListOmnichannelDocuments({
	activeMessageCard,
	activeVoiceCard,
	activeTab,
	customerId,
	setFilterVisible,
	activeSelect = '',
	type = '',
}) {
	const [pagination, setPagination] = useState(FIRST_PAGE);

	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_omnichannel_documents',
		method : 'get',
	}, { manual: true });

	const { userId = '', userMobile = '', leadUserId = '', orgId = '' } = FormatData({
		activeMessageCard,
		activeVoiceCard,
		activeTab,
	});

	const getDocumentsList = useCallback(async (filters) => {
		const documentTypeFilters = (['kyc_document', 'shipment_document', 'wrong_document']).includes(filters);
		const checkfilters = !isEmpty(filters);
		const checkConditions = isEmpty(userId) && isEmpty(userMobile);
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
					document_type : checkfilters && documentTypeFilters ? filters : undefined,
					state         : checkfilters && !documentTypeFilters ? filters : undefined,
				};
			}

			await trigger({
				params: {
					only_total_count_required : type === 'count',
					kyc_data_required         : type === 'count' ? false : undefined,
					filters                   : filters_payload,
					page                      : pagination,
				},
			});

			setFilterVisible(false);
		} catch (error) {
			console.error('error', error);
		}
	}, [leadUserId, pagination, setFilterVisible, trigger, type, userId, userMobile]);

	const emptyCheck = useMemo(() => !isEmpty(userId) || !isEmpty(userMobile), [userId, userMobile]);

	useEffect(() => {
		if (emptyCheck) {
			getDocumentsList();
		}
	}, [customerId, activeSelect, emptyCheck, getDocumentsList]);

	const { list = [], total_count = 0, is_pan_uploaded, is_gst_uploaded } = data || {};

	return {
		getDocumentsList,
		list,
		documents_count    : total_count,
		loading,
		orgId,
		is_pan_uploaded,
		is_gst_uploaded,
		userId,
		userMobile,
		leadUserId,
		setPagination,
		pagination,
		totalDocumentCount : total_count,
	};
}

export default useListOmnichannelDocuments;
