import { useRequestBf } from '@cogoport/request';
// import { useSelector } from '@cogoport/store';
// import { format } from '@cogoport/utils';
import { useEffect } from 'react';

// const BILL_TYPE = ['PURCHASE', 'PROFORMA', 'CONSOLIDATED'];

// const formatDate = (date) => (
// 	format(filters?.billDate?.startDate, "yyyy-MM-dd'T'HH:mm:sso", {}, false)
// );
const useGetListStats = () => {
	// const profile = useSelector((state) => state);

	// const entityCode = getEntityCode(profile?.profile?.partner?.id);

	// const showbillType = filters?.billType === 'PURCHASE' ? 'false' : undefined;
	// const showProforma = filters?.billType === 'PROFORMA' ? true : undefined;
	// const showConsolidated = filters?.billType === 'CONSOLIDATED' ? 'CONSOLIDATED' : undefined;

	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/bills/list-stats',
			method  : 'get',
			authKey : 'get_purchase_bills_list_stats',
		},
	);

	useEffect(() => {
		const getData = async () => {
			try {
				await trigger({
					params: {},
				});
			} catch (error) {
				console.log(error);
			}
		};
		getData();
	}, [trigger]);

	return {
		data,
		loading,
	};
};

export default useGetListStats;
