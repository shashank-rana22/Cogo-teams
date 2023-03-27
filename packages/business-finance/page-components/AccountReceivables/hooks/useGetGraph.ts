import { useRequestBf } from '@cogoport/request';
import { format } from '@cogoport/utils';
import { useEffect } from 'react';

interface FilterInterface {
	entityType?:string
	serviceType?:string
	companyType?: string
}
interface ParamsInterface {
	filterValue?:FilterInterface
	filters?:SubFilterInterface
	subActiveTab?:string
}
interface SubFilterInterface {
	month?:string
	year?:string
	date?:Date
}
const useGetGraph = ({ filters, filterValue, subActiveTab }:ParamsInterface) => {
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
			try {
				await Trigger({
					params: {
						cogoEntityId : filterValue?.entityType || undefined,
						companyType  : filterValue.companyType !== 'All' ? filterValue.companyType : undefined,
						month        : filters?.month || undefined,
						year         : filters?.year || undefined,
						serviceType  : filterValue?.serviceType || undefined,
						asOnDate     : format(
							filters?.date,
							'yyyy-MM-dd 00:00:00',
							{},
							false,
						) || undefined,
						documentType: subActiveTab || undefined,
					},
				});
			} catch (e) {
				console.log(e);
			}
		};
		getJourneyData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filters, filterValue]);
	return {
		data,
		loading,
	};
};
export default useGetGraph;
