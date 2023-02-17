import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useGetContractStats = ({ id, serviceType }) => {
	const [data, setData] = useState();

	const [{ error, loading }, trigger] = useRequest({
		url    : '/get_contract_projected_stats',
		method : 'GET',
	}, { manual: false });
	const getContractStats = async () => {
		try {
			const res = await trigger({
				params: {
					id,
					service_type: serviceType || undefined,
				},
			});
			setData(res?.data);
		} catch (err) {
			// console.log(err);
		}
	};

	useEffect(() => {
		if (id) {
			getContractStats();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [serviceType]);

	return {
		data,
		loading,
		error,
		getContractStats,
	};
};

export default useGetContractStats;
