import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

function useGetKRA() {
	const [{ loading, data = {} }, trigger] = useRequest({
		method : 'get',
		url    : '/get_kra',
	}, { manual: true });

	const getKRA = useCallback(({ kra_id }) => {
		try {
			trigger({
				params: {
					kra_id,
				},
			});
		} catch (err) {
			Toast.error(err?.message);
		}
	}, [trigger]);

	return {
		loading,
		data,
		getKRA,
	};
}

export default useGetKRA;
