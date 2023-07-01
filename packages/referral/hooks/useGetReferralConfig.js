import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

const useGetReferralConfig = () => {
	const [isEdit, setIsEdit] = useState(false);

	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : 'get_referral_configuration',
	}, { manual: true });

	const getRules = useCallback(
		async () => {
			try {
				const res = await trigger({});

				if (res?.data?.data !== null) setIsEdit(true);
			} catch (error) {
				console.log('error', error);
			}
		},
		[trigger],
	);

	useEffect(() => {
		getRules();
	}, [getRules]);

	return { configData: data?.data, loading, isEdit, setIsEdit };
};

export default useGetReferralConfig;
