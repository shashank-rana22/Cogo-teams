import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

const useGetList = ({
	activeTab,
	showData,
	sortType,
	sort,
}) => {
	const [pagination, setPagination] = useState(1);
	const [tags, setTags] = useState();
	const [filters, setFilters] = useState({ page: 1 });
	const [shippinglineValue, setshippinglineValue] = useState();
	const apiName = {
		air_tracking   : '/list_untracked_air_shipments',
		ocean_tracking : '/list_untracked_containers',
		truck_tracking : '/list_saas_surface_shipment_details',
	};
	console.log(apiName[activeTab]);
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : apiName[activeTab],
	});
	// const { query: searchQuery, debounceQuery } = useSearchQuery();

	// useEffect(() => {
	// 	debounceQuery(searchValue);
	// }, [searchValue]);
	const refetch = async () => {
		try {
			trigger({
				params: {
					page    : 1,
					filters : {
						...filters,
					},
				},
			});
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		refetch();
	}, [activeTab]);
	return {
		data,
		filters,
		setFilters,
		loading,
		trigger,
		refetch,
		pagination,
		setPagination,
		setTags,
		tags,
		shippinglineValue,
		setshippinglineValue,
	};
};

export default useGetList;
