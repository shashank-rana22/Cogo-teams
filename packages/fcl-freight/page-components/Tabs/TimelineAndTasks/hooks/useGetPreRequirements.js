import { useSelector } from '@cogo/store';
import { useEffect } from 'react';
import { useRequest } from '@cogo/commons/hooks';

const useGetPreRequirements = (getEndPoint, params) => {
	const { scope } = useSelector(({ general }) => ({
		scope: general?.scope,
		query: general?.query,
	}));

	const { data, loading, trigger } = useRequest(
		'get',
		false,
		scope,
	)(getEndPoint);

	const getList = async () => {
		await trigger({ params });
	};

	useEffect(() => {
		getList();
	}, []);

	const doc_data = data?.list?.[0] || {};

	return {
		doc_data,
		data,
		loading,
	};
};

export default useGetPreRequirements;
