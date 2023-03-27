import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useState, useEffect } from 'react';

interface Props {
	recievablesTab?:string
}
const useGetReceivablesList = () => {
	const [recievablesTab, setRecievablesTab] = useState('all');

	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : 'payments/dashboard/bf-receivable',
			method  : 'get',
			authKey : 'get_payments_dashboard_bf_receivable',
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
	}, [JSON.stringify(recievablesTab)]);

	return {
		receivablesData    : data,
		receivablesLoading : loading,
		recievablesTab,
		setRecievablesTab,
	};
};

export default useGetReceivablesList;
