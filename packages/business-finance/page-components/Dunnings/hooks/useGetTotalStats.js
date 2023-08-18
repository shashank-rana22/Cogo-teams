import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

const useGetTotalStats = () => {
	const [{ loading:statsLoading, data:statsData }, trigger] = useRequestBf(
		{
			url     : '/payments/dunning/card-data',
			method  : 'get',
			authKey : 'get_payments_dunning_card_data',
		},
		{ manual: true },
	);

	useEffect(() => {
		trigger();
	}, [trigger]);

	return {

		statsLoading,
		statsData,
	};
};

export default useGetTotalStats;
