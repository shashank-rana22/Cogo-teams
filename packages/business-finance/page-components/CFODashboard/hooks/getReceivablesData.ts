import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useGetReceivablesList = ({ globalFilters }) => {
	const [recievablesTab, setRecievablesTab] = useState('all');

	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : 'payments/dashboard/finance-receivable-payable',
			method  : 'get',
			authKey : 'get_payments_dashboard_finance_receivable_payable',
		},
		{ manual: true, autoCancel: false },
	);

	const buyerTypeFilter = () => {
		if (recievablesTab === 'ie' || recievablesTab === 'cp' || recievablesTab === 'ent') {
			return recievablesTab;
		}
		return undefined;
	};

	const refetch = () => {
		try {
			trigger({
				params: {
					serviceType : globalFilters?.serviceType,
					accountMode : 'AR',
					buyerType   : buyerTypeFilter(),
				},
			});
		} catch (e) {
			Toast.error(e?.message);
		}
	};
	useEffect(() => {
		refetch();
	}, [JSON.stringify(recievablesTab), globalFilters?.serviceType]);

	return {
		receivablesData    : data,
		receivablesLoading : loading,
		recievablesTab,
		setRecievablesTab,
	};
};

export default useGetReceivablesList;
