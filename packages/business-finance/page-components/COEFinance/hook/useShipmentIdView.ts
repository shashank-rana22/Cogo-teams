import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import useGetFiniteList from './useGetFiniteList';

interface DataType {
	currentPage: number;
	restFilters: FilterTypes;
}
interface FilterTypes {
	serviceType?:string,
	jobState?:string,
}
interface Profile {
	authorizationparameters?: string;
}

interface UseSelectorProps {
	profile?: Profile;
}

interface AllParams {
	shipmentId?:string;
	pendingApproval?: string;
}

const useShipmentIdView = (allParams?: {}) => {
	const { ...params }: AllParams = allParams || {};
	const { authorizationparameters } = useSelector(
		({ profile }: UseSelectorProps) => ({
			authorizationparameters: profile?.authorizationparameters,
		}),
	);

	const [{ data:shipmentData, loading: apiLoading }, trigger] = useRequestBf(
		{
			url     : 'common/job/shipment-id-view',
			method  : 'get',
			authKey : 'get_common_job_shipment_id_view',
		},
	);

	const listAPi = (restFilters: FilterTypes, currentPage: DataType) => {
		const allFilters = {
			...(restFilters || {}),
			...allParams,
		};

		const finalFiletrs: any = {};
		Object.keys(allFilters).forEach((filter) => {
			if (allFilters[filter]) {
				finalFiletrs[filter] = allFilters[filter];
			}
		});

		return trigger({
			params: {
				...allFilters,
				shipmentId  : params?.shipmentId === '' ? undefined : params?.shipmentId,
				jobState    : restFilters?.jobState === '' ? undefined : restFilters?.jobState,
				serviceType : restFilters?.serviceType === '' ? undefined : restFilters?.serviceType,
				pageIndex   : currentPage,
				pageSize    : 10,
			},
		});
	};

	const {
		loading,
		page:pageNo,
		filters,
		list: { data, total, total_page:totalPage, fullResponse },
		hookSetters,
		refetch,
	} = useGetFiniteList(listAPi, {
		...(params || {}),
		authorizationparameters,
	});

	const handleRefetch = () => {
		refetch();
	};

	return {
		loading : loading || apiLoading,
		pageNo,
		filters,
		list    : {
			data,
			totalRecords: total,
			totalPage,
			fullResponse,
		},
		shipmentData,
		hookSetters,
		refetchList : refetch,
		refetch     : handleRefetch,
	};
};

export default useShipmentIdView;
