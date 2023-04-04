import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { format } from '@cogoport/utils';
import { useState, useEffect } from 'react';

interface DateInterface {
	startDate?:Date
	endDate?:Date
}
interface GlobalInterface {
	serviceType?:string[],
	date?: DateInterface
}
interface Props {
	globalFilters?:GlobalInterface;
	entityTabFilters?:string
}

const useGetReceivablesList = ({ globalFilters, entityTabFilters }:Props) => {
	const { startDate, endDate } = globalFilters?.date || {};
	const [recievablesTab, setRecievablesTab] = useState('all');

	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : 'payments/dashboard/finance-receivable-payable',
			method  : 'get',
			authKey : 'get_payments_dashboard_finance_receivable_payable',
		},
		{ manual: true, autoCancel: false },
	);

	useEffect(() => {
		const buyerTypeFilter = () => {
			if (recievablesTab === 'ie' || recievablesTab === 'cp' || recievablesTab === 'enterprise') {
				return recievablesTab;
			}
			return undefined;
		};
		const refetch = () => {
			try {
				trigger({
					params: {
						entityCode   : entityTabFilters === 'all' ? ['101', '301'] : entityTabFilters,
						serviceTypes : globalFilters?.serviceType,
						accountMode  : 'AR',
						buyerType    : buyerTypeFilter(),
						startDate    : startDate ? format(startDate as Date, 'yyyy-MM-dd', {}, false)
							: undefined,
						endDate: endDate
							? format(endDate as Date, 'yyyy-MM-dd', {}, false) : undefined,
					},
				});
			} catch (e) {
				Toast.error(e?.message);
			}
		};
		refetch();
	}, [globalFilters?.serviceType, recievablesTab, endDate, startDate, trigger, entityTabFilters]);

	return {
		receivablesData    : data,
		receivablesLoading : loading,
		recievablesTab,
		setRecievablesTab,
	};
};

export default useGetReceivablesList;
