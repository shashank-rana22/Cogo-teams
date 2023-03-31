import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useEffect, useState } from 'react';

interface FilterProps {
	service:string,
	currency:string,
}
interface ItemProps {
	showData:string;
	filtersData:FilterProps;
}

const useGetEventsTrend = ({ showData, filtersData }:ItemProps) => {
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
			authKey : 'get_purchase_payable_dashboard_events_trend',
		},
		{ manual: true, autoCancel: false },
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
				},
			});
		} catch (e) {
			Toast.error(e?.message);
		}
	};

	useEffect(() => {
		getDahboardData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(rest), events, showData, service, currency]);

	return {
		data,
		loading,
		getDahboardData,
		filters,
		setFilters,
	};
};

export default useGetEventsTrend;
