import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

interface Filterprops {
	activeTab:string,
}

const useGetPayablesByService = ({ activeTab }:Filterprops) => {
	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/purchase/payable/dashboard/paybles-by-service',
			method  : 'get',
			authKey : 'get_purchase_payable/dashboard/paybles-by-service',
		},
		{ manual: true },
	);

	const getDahboardData = async () => {
		try {
			await trigger({
				params: {
					entity: activeTab,
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getDahboardData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeTab]);

	return {
		data,
		loading,
		getDahboardData,
	};
};

export default useGetPayablesByService;
