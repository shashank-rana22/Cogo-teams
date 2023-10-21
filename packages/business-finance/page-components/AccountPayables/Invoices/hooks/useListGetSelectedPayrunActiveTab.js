import { useRequestBf } from '@cogoport/request';
import { snakeCase } from '@cogoport/utils';

const useListGetSelectedPayrunActiveTab = ({ payrun }) => {
	const [{ data }] = useRequestBf(
		{
			url     : '/purchase/payrun-bill',
			method  : 'get',
			authKey : 'get_purchase_payrun_bill',
			params  : {
				payrunId  : payrun,
				pageSize  : 10,
				pageIndex : 1,
			},
		},
		{ manual: false },
	);

	const { payrunState = '' } = data || {};

	return {
		defaultTab: snakeCase(payrunState),
	};
};

export default useListGetSelectedPayrunActiveTab;
