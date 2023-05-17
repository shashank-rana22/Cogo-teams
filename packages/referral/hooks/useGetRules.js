import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

const useGetRules = (key) => {
	const [isEdit, setIsEdit] = useState(false);

	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : 'get_referral_configuration',
	}, { manual: true });

	const getRules = useCallback(
		async () => {
			try {
				const res = await trigger({
					params: {
						event: key,
					},
				});

				if (res?.data?.data !== null) setIsEdit(true);
			} catch (error) {
				console.log(error);
			}
		},
		[key, trigger],
	);

	useEffect(() => {
		getRules();
	}, [getRules]);

	return { data, loading, isEdit, setIsEdit };
};

export default useGetRules;
