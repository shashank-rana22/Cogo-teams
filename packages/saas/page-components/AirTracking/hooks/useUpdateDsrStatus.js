import { useCallback } from 'react';

import { useRequest } from '@/packages/request';

const useUpdateDsrStatus = () => {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : 'update_saas_dsr',
	}, { manual: true });

	const updateDsrStatus = useCallback(async ({ id, status }) => {
		try {
			const resp = await trigger({
				data: {
					dsr_id: id,
					status,
				},
			});
			return resp.data?.id;
		} catch (err) {
			return null;
		}
	}, [trigger]);

	return { loading, updateDsrStatus };
};

export default useUpdateDsrStatus;
