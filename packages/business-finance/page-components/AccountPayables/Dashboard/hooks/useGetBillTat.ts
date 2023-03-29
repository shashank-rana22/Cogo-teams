import { useRequestBf } from '@cogoport/request';
import { format } from '@cogoport/utils';
import { useEffect, useState } from 'react';

interface FilterProps {
	currency:string,
	service:string,
}
interface ItemProps {
	activeTab:string,
	filtersData:FilterProps,
	firstEvent:string,
	secondEvent:string,
}

const useGetBillTat = ({ activeTab, filtersData, firstEvent, secondEvent }:ItemProps) => {
	const [filters, setFilters] = useState({
		Date: undefined,
	});

	const {
		Date,
		...rest
	} = filters || {};

	const { service, currency } = filtersData || {};

	const { startDate, endDate } = Date || {};

	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/purchase/payable/dashboard/bill-tat',
			method  : 'get',
			authKey : 'get_purchase_payable_dashboard_bill_tat',
		},
		{ manual: true },
	);

	const getDahboardData = async () => {
		try {
			await trigger({
				params: {
					service  : service || undefined,
					currency : currency || undefined,
					entity   : activeTab,
					from     : startDate ? format(startDate as Date, 'yyyy-MM-dd 00:00:00', {}, false)
						: undefined,
					to: endDate
						? format(endDate as Date, 'yyyy-MM-dd 00:00:00', {}, false) : undefined,
					secondEvent : secondEvent || undefined,
					firstEvent  : firstEvent || undefined,
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getDahboardData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(rest), firstEvent, secondEvent, activeTab, service, currency, Date]);

	return {
		data,
		loading,
		getDahboardData,
		filters,
		setFilters,
	};
};

export default useGetBillTat;
