import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

const emptyData = { list: [], total: 0, total_page: 0 };

export default function useListBlDOShipment({ prefix = '', stateProps = {} }) {
	const [data, setData] = useState(emptyData);
	const { activeTab, inner_tab, trade_type, page, q } = stateProps;

	const [{ loading }, trigger] = useRequest({
		url    : `${prefix}/list_collection_desk_${activeTab}_shipments`,
		method : 'GET',
	}, { manual: true });

	const listBLs = useCallback(async () => {
		try {
			const finalFilters = {
				[inner_tab] : true,
				trade_type  : trade_type.length ? trade_type : undefined,
				q,
			};
			const res = await trigger({
				params: {
					filters    : { ...finalFilters },
					page,
					page_limit : 10,
				},
			});
			if (res.data?.list?.length === 0) {
				// setFilters({ ...filters, page: 1 });
			} else {
				setData(res.data || {});
			}
		} catch (err) {
			console.log(err);
		}
	}, [trigger, inner_tab, trade_type, page, q]);

	useEffect(() => {
		listBLs();
	}, [listBLs, prefix]);

	return {
		data: {
			list       : data.list || [],
			total      : data.total_count || 0,
			total_page : data.total || 0,
		},
		loading,
	};
}
