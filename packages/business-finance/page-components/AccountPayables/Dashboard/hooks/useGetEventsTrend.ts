import { useRequestBf } from '@cogoport/request';
import { useEffect, useState } from 'react';

const useGetEventsTrend = ({ showData }) => {
	const [filters, setFilters] = useState({
		events: 'so2UploadTrend',
		// currency : undefined,
	});

	const {
		events,
		// currency,
		...rest
	} = filters || {};
	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/purchase/payable/dashboard/events-trend',
			method  : 'get',
			authKey : 'get_purchase_payable/dashboard/events-trend',
		},
		{ manual: true },
	);

	const getDahboardData = async () => {
		try {
			await trigger({
				params: {
					event         : events,
					view          : showData,
					previousCount : showData === 'day' ? '30' : '12',
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getDahboardData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(rest), events, showData]);

	return {
		data,
		loading,
		getDahboardData,
		filters,
		setFilters,
	};
};

export default useGetEventsTrend;
