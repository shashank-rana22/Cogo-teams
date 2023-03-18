import { useRequestBf } from '@cogoport/request';

const useShipmentView = ({ filters }) => {
	const {
		year = '', month = '', shipmentType = '',
		profitAmount = '', profitType = '', tradeType = '', service = '', range,
		jobState = '',
	} = filters || {};

	const rangeMapping = {
		'>'  : 'gt',
		'>=' : 'gte',
		'<'  : 'lt',
		'<=' : 'lte',
	};
	const dta = rangeMapping[range];

	console.log({ filters, range, rangeMapping }, 'filters');

	console.log('dta is : ', dta);
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
			const resp = await shipmentTrigger({
				params: {
					// query: filters?.query,
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
			const data = { ...resp.data };
			const dataList = data?.list;
			(dataList || []).map((item, index) => {
				dataList[index] = {
					...item,
					newProfitPercentage: item.profitPercentage,
				};
				return dataList[index];
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
