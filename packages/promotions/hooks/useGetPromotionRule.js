import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

import toastApiError from '../utils/toastApiError';

const useGetPromotionRule = ({
	viewAndEditId = '',
	activeList = '',
	defaultParams = {},
}) => {
	const [data, setData] = useState({});

	const [{ loading }, trigger] = useRequest(
		{
			url    : '/get_promotion_rule',
			method : 'GET',
			params : {
				promotion_rule_id : viewAndEditId,
				status            : activeList,
				...(defaultParams || {}),
			},
		},
		{ manual: true },
	);

	const getPromotionRule = useCallback(async () => {
		try {
			const res = await trigger();
			if (res?.data) {
				setData(res.data);
			}
		} catch (err) {
			toastApiError(err);
			setData({});
		}
	}, [trigger]);

	useEffect(() => {
		getPromotionRule();
	}, [getPromotionRule]);

	return {
		data,
		loading,
	};
};

export default useGetPromotionRule;
