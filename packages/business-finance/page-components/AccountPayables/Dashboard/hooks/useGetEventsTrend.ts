import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

interface FilterProps {
	service?: string,
	currency?: string,
}
interface ItemProps {
	showData: string;
	filtersData: FilterProps;
	activeEntity: string;
}

const useGetEventsTrend = ({ showData, filtersData, activeEntity }:ItemProps) => {
	const [filters, setFilters] = useState({
		events: 'so2UploadTrend',
	});
	const { service, currency } = filtersData || {};
	const {
		events,
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

	const getDahboardData = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						event         : events,
						view          : showData,
						previousCount : showData === 'day' ? '30' : '12',
						service       : service || undefined,
						currency      : currency || undefined,
						entity        : activeEntity,
					},
				});
			} catch (e) {
				Toast.error(e?.message);
			}
		})();
	}, [events, showData, service, currency, activeEntity, trigger]);

	useEffect(() => {
		getDahboardData();
	}, [events, showData, service, currency, getDahboardData]);

	return {
		data,
		loading,
		getDahboardData,
		filters,
		setFilters,
	};
};

export default useGetEventsTrend;
