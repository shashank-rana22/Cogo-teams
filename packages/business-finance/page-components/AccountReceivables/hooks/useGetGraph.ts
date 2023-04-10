import { useRequestBf } from '@cogoport/request';
import { format } from '@cogoport/utils';
import { useEffect } from 'react';

interface FilterInterface {
	entityCode?:string
	serviceType?:string
	companyType?: string
}
interface ParamsInterface {
	filterValue?:FilterInterface
	filters?:SubFilterInterface
	subActiveTab?:string
	entityCode?: string
	toggleData?: boolean
}
interface SubFilterInterface {
	month?:string
	year?:string
	date?:Date
}
const useGetGraph = ({ filters, filterValue, subActiveTab, entityCode, toggleData }:ParamsInterface) => {
	const { serviceType = '', companyType = '' } = filterValue || {};
	const [{ data, loading }, Trigger] = useRequestBf(
		{
			url     : '/payments/dashboard/line-graph-view',
			method  : 'get',
			authKey : 'get_payments_dashboard_line_graph_view',
		},
		{ manual: true },
	);
	useEffect(() => {
		const getJourneyData = async () => {
			await Trigger({
				params: {
					entityCode  : entityCode || undefined,
					companyType : companyType !== 'All' ? companyType : undefined,
					serviceType : serviceType || undefined,
					asOnDate    : filters?.date ? format(
						filters?.date,
						'yyyy-MM-dd 00:00:00',
						{},
						false,
					) : undefined,
					documentType: subActiveTab || undefined,
				},
			});
		};
		if (toggleData) {
			getJourneyData();
		}
	}, [filters, Trigger, subActiveTab, entityCode, companyType, serviceType, toggleData]);
	return {
		data,
		loading,
	};
};
export default useGetGraph;
