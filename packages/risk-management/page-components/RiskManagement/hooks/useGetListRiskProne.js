import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

const DEFAULT_PAGE_LIMIT = 10;
const useGetListRiskProne = ({ activeTab }) => {
	const [filters, setFilters] = useState({
		pageIndex        : 1,
		search           : undefined,
		originValue      : undefined,
		destinationValue : undefined,
		reason           : undefined,
		hsCode           : undefined,
	});

	const [{ loading, data }, trigger] = useRequest({
		url    : 'fcl_freight/list_risk_prone_shipments',
		method : 'get',
	}, { manual: true, autoCancel: false });

	const { pageIndex, search, originValue, destinationValue, reason, hsCode } = filters || {};
	const { query = '', debounceQuery } = useDebounceQuery();

	useEffect(() => {
		debounceQuery(search);
	}, [debounceQuery, search]);

	const getListParams = useCallback(() => ({
		filters: {
			origin_port_id      : originValue || undefined,
			destination_port_id : destinationValue || undefined,
			risk_sub_reason     : reason,
			q                   : query || undefined,
			hs_code             : hsCode,
			risk_type           : activeTab === 'both' ? ['container_movement', 'bl_do'] : activeTab,
		},
		sort_by            : 'created_at',
		sort_type          : 'desc',
		additional_methods : ['pagination'],
		page_limit         : DEFAULT_PAGE_LIMIT,
		page               : pageIndex,
	}), [activeTab, destinationValue, hsCode, originValue, pageIndex, query, reason]);

	const getDashboardData = useCallback(() => {
		const paramsData = getListParams();
		try {
			trigger({
				params: paramsData,
			});
		} catch (err) {
			Toast.error(err.message);
		}
	}, [trigger, getListParams]);

	useEffect(() => {
		getDashboardData();
	}, [getDashboardData]);

	return {
		data,
		loading,
		getDashboardData,
		filters,
		setFilters,
	};
};

export default useGetListRiskProne;
