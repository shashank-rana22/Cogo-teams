import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState, useMemo } from 'react';

import getBlDoPayload from '../helpers/getBlDoPayload';

const emptyData = { list: [], total: 0, total_page: 0 };

export default function useListBlDOShipment({ prefix = '', stateProps = {} }) {
	const [data, setData] = useState(emptyData);
	const payload = useMemo(() => getBlDoPayload({ stateProps }), [stateProps]);

	const { activeTab } = stateProps;

	const [{ loading }, trigger] = useRequest({
		url    : `${prefix}/list_collection_desk_${activeTab}_shipments`,
		method : 'GET',
	}, { manual: true });

	const listBLs = useCallback(async () => {
		try {
			const res = await trigger({
				params: payload,
			});
			setData(res.data || {});
		} catch (err) {
			console.log(err);
		}
	}, [trigger, payload]);

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
