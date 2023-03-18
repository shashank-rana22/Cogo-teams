import { useRequestBf } from '@cogoport/request';

import { FilterInterface } from '../Accruals/interface';

interface ShipmentInterface {
	filters?:FilterInterface
}

const useShipmentView = ({ filters }:ShipmentInterface) => {
	const {
		year = '', month = '', shipmentType = '',
		profitAmount = '', profitType = '', tradeType = '', service = '', range,
		jobState = '', query = '',
	} = filters || {};

	const rangeMapping = {
		'>'  : 'gt',
		'>=' : 'gte',
		'<'  : 'lt',
		'<=' : 'lte',
	};

	const [
		{ data:shipmentViewData, loading:shipmentLoading },
		shipmentTrigger,
	] = useRequestBf(
		{
			url     : 'pnl/accrual/shipments',
			method  : 'get',
			authKey : 'get_pnl_accrual_shipments',
		},
		{ manual: true },
	);
	const refetch = async () => {
		try {
			await shipmentTrigger({
				params: {
					query                : query || undefined,
					year                 : year || undefined,
					month                : month || undefined,
					serviceType          : service || undefined,
					tradeType            : tradeType || undefined,
					jobType              : shipmentType || undefined,
					profitComparisonType : rangeMapping[range] || undefined,
					jobState             : jobState || undefined,
					profitAmount         : profitAmount || undefined,
					profitType           : profitType || undefined,
					page                 : 1,
					pageLimit            : 10,
					// page,
					// sortType,
				},
			});
		} catch (error) {
			// toast.error(error?.data?.message);
		}
	};
	return {
		refetch,
		shipmentViewData,
		shipmentLoading,
	};
};
export default useShipmentView;
