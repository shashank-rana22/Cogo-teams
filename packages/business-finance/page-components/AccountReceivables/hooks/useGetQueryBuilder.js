import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { subtractDays } from '@cogoport/utils';
import { useCallback, useEffect, useState } from 'react';

const periodTypes = ['week', 'month'];
const SPLIT_DATES = 1;
const BAR_GRAPH_SPLIT_DATES = 2;
const PAGE_SIZE = 1;
const BAR_GRAPH_LENGTH = 0;
const BAR_GRAPH_DATA_LENGTH = 1;
const useGetQueryBuilder = ({
	queryBuilderForm,
	isQueryBuilderActive,
	selectedBarData,
	filterValues,
	kamOwner,
	outstandingPagination,
	path = '',
	barGraphData = [],
	pageNumber,
}) => {
	const [filters, setFilters] = useState({
		page: 1,
	});

	const {
		profile: { authorizationparameters },
	} = useSelector((state) => state);

	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_organization_wise_outstanding',
		method : 'GET',
	}, { manual: true });

	const { indexValue = '', id } = selectedBarData || {};

	const { bifurcation_type, entity_code, period_type } = filterValues || {};

	const { entity_code: queryBuilderEntity, query_conditions } =		queryBuilderForm || {};

	const getSplitDates = indexValue?.split('to');

	const getDates = useCallback(() => {
		const date = new Date();
		const lastObj = barGraphData[barGraphData.length - BAR_GRAPH_DATA_LENGTH];

		let dateData;

		if (
			barGraphData.length > BAR_GRAPH_LENGTH
			&& lastObj.duration === indexValue
			&& pageNumber === PAGE_SIZE
		) {
			dateData = formatDate({
				date       : subtractDays(date, BAR_GRAPH_SPLIT_DATES),
				dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
				formatType : 'date',
			});
		} else if (barGraphData.length > BAR_GRAPH_LENGTH && lastObj.duration === indexValue) {
			dateData = formatDate({
				date       : subtractDays(new Date(getSplitDates?.[SPLIT_DATES]?.trim()), SPLIT_DATES),
				dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
				formatType : 'date',
			});
		} else if (periodTypes.includes(period_type)) {
			if (indexValue) {
				dateData = formatDate({
					date       : subtractDays(new Date(getSplitDates?.[SPLIT_DATES]?.trim()), SPLIT_DATES),
					dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
					formatType : 'date',
				});
			} else {
				dateData = formatDate({
					date       : subtractDays(date, BAR_GRAPH_SPLIT_DATES),
					dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
					formatType : 'date',
				});
			}
		} else if (indexValue) {
			dateData = `31 ${indexValue}`;
		} else {
			dateData = `31-${date.getMonth()}-${date.getFullYear()}`;
		}

		return dateData;
	}, [barGraphData, getSplitDates, indexValue, pageNumber, period_type]);

	const getQueryBuilder = useCallback(() => {
		const barId = !Number.isNaN(Number(id)) ? [id] : ['301', '101'];
		const formattedPayload = {
			kam_owner_list: {
				entity_code      : entity_code ? [entity_code] : barId,
				is_query_builder : false,
				filters          : {
					query_type : 'kam_owner_list',
					filter_key : bifurcation_type === 'overall' ? undefined : id,
					bifurcation_type:
						bifurcation_type === 'overall' ? undefined : bifurcation_type,
				},
				page_limit : 100,
				end_date   : getDates(),
			},

			kam_owners: {
				entity_code      : entity_code ? [entity_code] : barId,
				is_query_builder : false,
				page_limit       : 10,
				page             : outstandingPagination?.page || PAGE_SIZE,
				kam_owner_id     : kamOwner === 'all' ? undefined : kamOwner,
				filters          : {
					query_type : 'kam_owner',
					filter_key : bifurcation_type === 'overall' ? undefined : id,
					bifurcation_type:
						bifurcation_type === 'overall' ? undefined : bifurcation_type,
				},
				end_date: getDates(),
			},
			query_builder: {
				entity_code  : queryBuilderEntity,
				query_conditions,
				page_limit   : 10,
				page         : filters.page,
				kam_owner_id : filters.kam_id === 'all' ? '' : filters.kam_id,
			},
			queryBuilderKam: {
				entity_code : queryBuilderEntity,
				query_conditions,
				page_limit  : 100,
				page        : filters.page,
				filters     : {
					query_type: 'kam_owner_list',
				},
			},
		};
		const payload = {
			entity_code      : entity_code ? [entity_code] : ['301', '101'],
			query_conditions : [],
			page_limit       : 10,
			page             : outstandingPagination?.page || PAGE_SIZE,
			kam_owner_id     : kamOwner === 'all' ? undefined : kamOwner,
		};

		try {
			trigger({
				params:
					id === undefined && path === 'kam_owners'
						? payload
						: formattedPayload[path],
			});
		} catch (error) {
			console.error(error);
		}
	}, [bifurcation_type, entity_code, filters.kam_id, filters.page, getDates,
		id, kamOwner, outstandingPagination?.page, path, queryBuilderEntity, query_conditions, trigger]);

	const getResult = useCallback(() => {
		if (
			(path === 'kam_owners' && kamOwner !== undefined)
			|| (path === 'query_builder'
				&& isQueryBuilderActive === true
				&& filters.kam_id)
			|| path === 'kam_owner_list'
			|| path === 'queryBuilderKam'
		) {
			return getQueryBuilder();
		}
		return false;
	}, [filters.kam_id, getQueryBuilder, isQueryBuilderActive, kamOwner, path]);

	useEffect(() => {
		getResult();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		queryBuilderForm,
		filters,
		filterValues,
		kamOwner,
		authorizationparameters,
		selectedBarData,
	]);

	return {
		getQueryBuilder,
		data,
		loading,
		setFilters,
		filters,
	};
};

export default useGetQueryBuilder;
