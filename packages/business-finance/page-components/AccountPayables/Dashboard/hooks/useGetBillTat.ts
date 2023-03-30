import { Toast } from '@cogoport/components';
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

	const onApply = async () => {
		try {
			const payload = {
				service     : service || undefined,
				currency    : currency || undefined,
				entity      : activeTab,
				firstEvent  : firstEvent || undefined,
				secondEvent : secondEvent || undefined,
				from        : startDate ? format(startDate as Date, 'yyyy-MM-dd 00:00:00', {}, false)
					: undefined,
				to: endDate
					? format(endDate as Date, 'yyyy-MM-dd 00:00:00', {}, false) : undefined,
			};
			await trigger({ params: payload });
			Toast.success('Please wait Your Request has been Processed!!');
		} catch (e) {
			Toast.error(e?.message);
		}
	};

	useEffect(() => {
		onApply();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeTab, service, currency]);

	return {
		data,
		loading,
		// getDahboardData,
		filters,
		setFilters,
		onApply,
	};
};

export default useGetBillTat;
