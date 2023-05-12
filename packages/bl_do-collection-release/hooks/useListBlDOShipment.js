import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useEffect, useState, useMemo } from 'react';

import getBlDoPayload from '../helpers/getBlDoPayload';
import toastApiError from '../utils/toastApiError';

const emptyData = { list: [], total: 0, total_page: 0 };

export default function useListBlDOShipment({ prefix = '', stateProps = {} }) {
	const [data, setData] = useState(emptyData);
	const { authParams } = useSelector(({ profile }) => profile) || {};
	const payload = useMemo(() => getBlDoPayload({ stateProps }), [stateProps]);

	const { activeTab } = stateProps;

	const [{ loading }, trigger] = useRequest({
		url    : `${prefix}/list_collection_desk_${activeTab}_shipments`,
		method : 'GET',
	}, { manual: true });

	const listBlDos = useCallback(async () => {
		try {
			const res = await trigger({
				params: payload,
			});
			setData(res.data || {});
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger, payload]);

	useEffect(() => {
		listBlDos();
	}, [listBlDos, authParams]);

	return {
		data: {
			list       : data.list || [],
			total      : data.total_count || 0,
			total_page : data.total || 0,
		},
		refetch: listBlDos,
		loading,
	};
}
