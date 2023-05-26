import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const useGetSimulation = ({ activeTab = '' }) => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_referral_simulation',
		method : 'get',
	}, { manual: true });

	const getSimulation = useCallback(async () => {
		try {
			await trigger({
				params: {
					event: activeTab,
				},
			});
		} catch (error) {
			console.log(error);
		}
	}, [activeTab, trigger]);

	useEffect(() => {
		getSimulation();
	}, [getSimulation]);

	return {
		data,
		loading,
	};
};

export default useGetSimulation;
