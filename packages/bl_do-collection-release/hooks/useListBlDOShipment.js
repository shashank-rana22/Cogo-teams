import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

const emptyData = { list: [], total: 0, total_page: 0 };

export default function useListBlDOShipment({ prefix = '', stateProps = {} }) {
	const [data, setData] = useState(emptyData);
	const { activeTab } = stateProps;
	console.log('state prop', stateProps);

	const [{ loading }, trigger] = useRequest({
		url    : `${prefix}/list_collection_desk_${activeTab}_shipments`,
		method : 'GET',
	}, { manual: true });

	const listBLs = useCallback(async () => {
		try {
			const res = await trigger({
				params: {
					filters    : {},
					page       : 1,
					page_limit : 10,
				},
			});
			if (res.data?.list?.length === 0) {
				// setFilters({ ...filters, page: 1 });
			} else {
				console.log('werwrewe', res.data);
				setData(res.data || {});
			}
		} catch (err) {
			console.log(err);
		}
	}, [trigger]);

	useEffect(() => {
		listBLs();
	}, [listBLs]);

	return {
		data: {
			list       : data.list || [],
			total      : data.total_count || 0,
			total_page : data.total || 0,
		},
		loading,
	};
}
