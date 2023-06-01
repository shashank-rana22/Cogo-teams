import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useGetBlDoTimeline = ({ itemData }) => {
	const { id } = itemData || {};
	const [{ loading, data }, trigger] = useRequest({
		url    : 'fcl_freight/get_bl_do_timeline',
		method : 'get',
	}, { manual: true, autoCancel: false });
	const getblDoTimeline = useCallback((async () => {
		try {
			await trigger({
				params: { shipment_id: id },
			});
		} catch (e) {
			Toast.error(e.message);
		}
	}), [id, trigger]);
	return {
		blDoTimelineLoading : loading,
		blDoTimelineData    : data,
		getblDoTimeline,
	};
};

export default useGetBlDoTimeline;
