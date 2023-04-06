import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

import getAudienceOptions from '../utils/getAudienceOptions';

const useGetUserGroups = () => {
	const [{ data: audienceData, loading: listAudienceLoading }, triggerAudiences] = useRequest({
		method : 'get',
		url    : '/list_faq_audiences',
		params : {
			page_limit               : 100000,
			pagination_data_required : false,
		},
	}, { manual: false });

	const fetchAudiences = useCallback(() => {
		try {
			triggerAudiences({
				params: {
					page_limit               : 100000,
					pagination_data_required : false,
				},
			});
		} catch (error) {
			Toast.error('error :: ', error);
		}
	}, [triggerAudiences]);

	const { list: audienceList = [] } = audienceData || {};

	const audienceOptions = audienceList.map((audienceItem) => getAudienceOptions({ item: audienceItem }));

	return {
		audienceOptions,
		listAudienceLoading,
		fetchAudiences,
	};
};

export default useGetUserGroups;
