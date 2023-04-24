import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useState } from 'react';

interface FilterProps {
	activeEntity: string;
	currency:string;
}
const useGetCreatePayRunType = ({ activeEntity, currency }:FilterProps) => {
	const [filters, setFilters] = useState({
		pageIndex: 1,
	});
	const { pageIndex } = filters || {};
	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/purchase/payrun',
			method  : 'get',
			authKey : 'get_purchase_payrun',
		},
		{ manual: true, autoCancel: false },
	);

	const getAdvancedPayment = async () => {
		try {
			await trigger({
				params: {
					pageIndex,
					pageSize   : 10,
					type       : 'ADVANCE_PAYMENT',
					currency,
					state      : 'AUDITED',
					entityCode : activeEntity,
				},
			});
		} catch (err) {
			Toast.error(err.meessage);
		}
	};

	return {
		data,
		loading,
		filters,
		setFilters,
		getAdvancedPayment,
	};
};
export default useGetCreatePayRunType;
