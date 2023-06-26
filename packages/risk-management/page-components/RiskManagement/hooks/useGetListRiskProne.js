import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

const DEFAULT_PAGE_LIMIT = 10;
const useGetListRiskProne = ({ activeTab }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : 'fcl_freight/list_risk_prone_shipments',
		method : 'get',
	}, { manual: true, autoCancel: false });
	const [filters, setFilters] = useState({
		pageIndex        : 1,
		search           : undefined,
		originValue      : undefined,
		destinationValue : undefined,
		reason           : undefined,
		hsCode           : undefined,
	});
	const { pageIndex, search, originValue, destinationValue, reason, hsCode } = filters || {};
	const { query = '', debounceQuery } = useDebounceQuery();

	useEffect(() => {
		debounceQuery(search);
	}, [debounceQuery, search]);

	const getDashboardData = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						filters: {
							origin_port_id      : originValue || undefined,
							destination_port_id : destinationValue || undefined,
							risk_sub_reason     : reason,
							q                   : query || undefined,
							hs_code             : hsCode,
							risk_type           : activeTab,
						},
						sort_by            : 'created_at',
						sort_type          : 'desc',
						additional_methods : ['pagination'],
						page_limit         : DEFAULT_PAGE_LIMIT,
						page               : pageIndex,
					},
				});
			} catch (err) {
				Toast.error(err.message);
			}
		})();
	}, [trigger, originValue, destinationValue, reason, query, activeTab, pageIndex, hsCode]);

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
