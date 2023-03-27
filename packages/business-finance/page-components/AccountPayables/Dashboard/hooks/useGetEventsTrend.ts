import { useRequestBf } from '@cogoport/request';
import { useEffect, useState } from 'react';

const useGetEventsTrend = ({ showData, filtersData, activeTab }) => {
	const [filters, setFilters] = useState({
		events: 'so2UploadTrend',
	});
	const { service, currency } = filtersData || {};
	const {
		events,
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
					service       : service || undefined,
					currency      : currency || undefined,
					entity        : activeTab,
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getDahboardData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(rest), events, showData, service, currency, activeTab]);

	return {
		data,
		loading,
		getDahboardData,
		filters,
		setFilters,
	};
};

export default useGetEventsTrend;
