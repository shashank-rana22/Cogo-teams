import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

const useGetUsages = ({ info = {}, currentTab = '' }) => {
	const { organization = {} } = info || {};
	const { id: orgId } = organization;

	const [page, setPage] = useState('');

	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : '/saas_get_usage_history',
	}, { manual: true });

	const getUsages = async () => {
		try {
			await trigger({
				params: {
					page,
					page_limit      : 10,
					organization_id : orgId,
				},
			});
		} catch (err) {
			if (err.code !== 'ERR_CANCELED') Toast.error(getApiErrorString(err.response?.data));
		}
	};

	useEffect(() => {
		if (currentTab === 'usages' && orgId && page) {
			getUsages();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, currentTab, orgId]);

	useEffect(() => {
		if (orgId) {
			setPage(1);
		}
	}, [orgId]);

	return {
		loading, getUsages, setPage, data,
	};
};

export default useGetUsages;
