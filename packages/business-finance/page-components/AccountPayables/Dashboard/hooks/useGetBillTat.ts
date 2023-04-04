import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { format } from '@cogoport/utils';
import { useState } from 'react';

interface FilterProps {
	currency?: string,
	service?: string,
}
interface ItemProps {
	filtersData: FilterProps,
	firstEvent: string,
	secondEvent: string,
	activeEntity: string,
}

const useGetBillTat = ({ filtersData, firstEvent, secondEvent, activeEntity }:ItemProps) => {
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
		{ manual: true, autoCancel: false },
	);

	const onApply = async () => {
		try {
			const payload = {
				service     : service || undefined,
				currency    : currency || undefined,
				firstEvent  : firstEvent || undefined,
				secondEvent : secondEvent || undefined,
				entity      : activeEntity,
				from        : startDate ? format(startDate as Date, 'yyyy-MM-dd 00:00:00', {}, false)
					: undefined,
				to: endDate
					? format(endDate as Date, 'yyyy-MM-dd 00:00:00', {}, false) : undefined,
			};
			await trigger({ params: payload });
		} catch (e) {
			Toast.error(e?.message);
		}
	};

	return {
		data,
		loading,
		filters,
		setFilters,
		onApply,
	};
};

export default useGetBillTat;
