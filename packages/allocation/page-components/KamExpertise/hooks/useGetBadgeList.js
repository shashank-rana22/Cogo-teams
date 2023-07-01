import { useDebounceQuery } from '@cogoport/forms';
import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState, useEffect } from 'react';

function useGetBadgeList() {
	const {
		general: { query = {}, locale = '' },
	} = useSelector((reduxState) => reduxState);

	const { partner_id = '' } = query;

	const [searchValue, setSearchValue] = useState();
	const [expertise, setExpertise] = useState([]);
	const [toggleScreen, setToggleScreen] = useState('badge_details');
	const [badgeItemData, setBadgeItemData] = useState({});
	const [masteryItemData, setMasteryItemData] = useState({});

	const { debounceQuery, query: searchQuery } = useDebounceQuery();

	const [params, setParams] = useState({
		page                              : 1,
		badge_details_data_required       : true,
		performed_by_data_required        : true,
		event_configuration_data_required : true,
		filters                           : {
			status                      : 'active',
			badge_name                  : searchQuery || undefined,
			expertise_configuration_ids : expertise || undefined,
		},
	});

	const [{ loading, data = {} }, refetch] = useAllocationRequest({
		url     : '/kam_expertise_badge_configuration_list',
		method  : 'get',
		authkey : 'get_allocation_kam_expertise_badge_configuration_list',
		params,
	}, { manual: false });

	useEffect(() => {
		setParams((previousParams) => ({
			...previousParams,
			filters: {
				...previousParams.filters,
				badge_name                  : searchQuery || undefined,
				expertise_configuration_ids : expertise || undefined,
			},
		}));
	}, [searchQuery, expertise]);

	const getNextPage = (newPage) => {
		setParams((previousParams) => ({
			...previousParams,
			page: newPage,
		}));
	};

	const { list = [], ...paginationData } = data || {};

	return {
		loading,
		list,
		searchValue,
		setSearchValue,
		expertise,
		setExpertise,
		debounceQuery,
		paginationData,
		getNextPage,
		listRefetch: refetch,
		toggleScreen,
		setToggleScreen,
		badgeItemData,
		setBadgeItemData,
		masteryItemData,
		setMasteryItemData,
		locale,
		partner_id,
	};
}
export default useGetBadgeList;
