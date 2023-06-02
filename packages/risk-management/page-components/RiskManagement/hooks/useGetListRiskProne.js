import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

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
	});
	const { pageIndex, search, originValue, destinationValue, reason } = filters || {};
	const { query = '', debounceQuery } = useDebounceQuery();

	useEffect(() => {
		debounceQuery(search);
	}, [debounceQuery, search]);

	const getDahboardData = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						filters: {
							origin_port_id      : originValue || undefined,
							destination_port_id : destinationValue || undefined,
							risk_sub_reason     : reason,
							q                   : query || undefined,
						},
						risk_type          : activeTab,
						sort_by            : 'created_at',
						sort_type          : 'desc',
						additional_methods : ['pagination'],
						page_limit         : 10,
						page               : pageIndex,

					},
				});
			} catch (err) {
				Toast.error(err.message);
			}
		})();
	}, [trigger, originValue, destinationValue, reason, query, activeTab, pageIndex]);

	useEffect(() => {
		getDahboardData();
	}, [getDahboardData]);

	return {
		data,
		loading,
		getDahboardData,
		filters,
		setFilters,
	};
};

export default useGetListRiskProne;
